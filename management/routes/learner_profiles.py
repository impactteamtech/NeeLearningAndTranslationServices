#######################################################################
#                                                                     #
#                    LEARNER PROFILE API                              #
#                                                                     #
#        Manage learner profile data linked to a user account.       #
#        A profile is auto-created at registration.                  #
#                                                                     #
#        - GET  /learner-profiles/me                → own profile    #
#        - GET  /learner-profiles/{user_id}         → by user id     #
#        - PUT  /learner-profiles/me                → update own     #
#        - POST /learner-profiles/me/profile-picture → upload photo  #
#                                                                     #
#######################################################################


import os
import uuid
from urllib.parse import urlparse

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import select

from config.supabase_config import supabase_config
from database.database import get_db
from models.learner_profile import LearnerProfile
from models.user import User
from schemas.learner_profile import LearnerProfileUpdate, LearnerProfileResponse
from auth.dependencies import get_current_user

router = APIRouter()


# ─── Constants ──────────────────────────────────────────────────────
BUCKET_NAME = "uploads"
PROFILE_PIC_FOLDER = "profile_pictures/learners"
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


def _storage_path_from_url(public_url: str) -> str | None:
    """Extract the storage path from a Supabase public URL."""
    try:
        parsed = urlparse(public_url)
        marker = f"/object/public/{BUCKET_NAME}/"
        idx = parsed.path.find(marker)
        if idx == -1:
            return None
        return parsed.path[idx + len(marker):]
    except Exception:
        return None


# ─── Get own learner profile ────────────────────────────────────────
@router.get("/me", response_model=LearnerProfileResponse)
def get_my_learner_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.execute(
        select(LearnerProfile).where(LearnerProfile.user_id == current_user.id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Learner profile not found")
    return profile


# ─── Get learner profile by user ID ─────────────────────────────────
@router.get("/{user_id}", response_model=LearnerProfileResponse)
def get_learner_profile_by_user_id(user_id: int, db: Session = Depends(get_db)):
    profile = db.execute(
        select(LearnerProfile).where(LearnerProfile.user_id == user_id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Learner profile not found")
    return profile


# ─── Update own learner profile ─────────────────────────────────────
@router.put("/me", response_model=LearnerProfileResponse)
def update_my_learner_profile(
    updates: LearnerProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.execute(
        select(LearnerProfile).where(LearnerProfile.user_id == current_user.id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Learner profile not found")

    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile


# ─── Upload / replace own profile picture ───────────────────────────
@router.post("/me/profile-picture", response_model=LearnerProfileResponse)
async def upload_learner_profile_picture(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Upload (or replace) the learner's profile picture.
    Stores the image in Supabase Storage and saves the public URL on the profile.
    """
    profile = db.execute(
        select(LearnerProfile).where(LearnerProfile.user_id == current_user.id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Learner profile not found")

    # validate extension
    _, extension = os.path.splitext((file.filename or "").lower())
    if extension not in ALLOWED_IMAGE_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid image type. Allowed: {sorted(ALLOWED_IMAGE_EXTENSIONS)}",
        )

    # read + size check
    file_content = await file.read()
    if len(file_content) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="Image is too large (max 5 MB).")

    # upload to Supabase
    storage_filename = f"{uuid.uuid4().hex}{extension}"
    storage_path = f"{PROFILE_PIC_FOLDER}/{current_user.id}/{storage_filename}"

    try:
        supabase_config.storage.from_(BUCKET_NAME).upload(
            path=storage_path,
            file=file_content,
            file_options={"content-type": file.content_type or "image/jpeg"},
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Upload failed: {exc}")

    public_url = supabase_config.storage.from_(BUCKET_NAME).get_public_url(storage_path)

    # remove the old picture from storage (best-effort)
    old_url = profile.profile_picture_url
    if old_url:
        old_path = _storage_path_from_url(old_url)
        if old_path:
            try:
                supabase_config.storage.from_(BUCKET_NAME).remove([old_path])
            except Exception:
                pass  # best-effort cleanup

    profile.profile_picture_url = str(public_url)
    db.commit()
    db.refresh(profile)
    return profile


# ─── Delete own profile picture ─────────────────────────────────────
@router.delete("/me/profile-picture", response_model=LearnerProfileResponse)
def delete_learner_profile_picture(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.execute(
        select(LearnerProfile).where(LearnerProfile.user_id == current_user.id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Learner profile not found")

    if profile.profile_picture_url:
        storage_path = _storage_path_from_url(profile.profile_picture_url)
        if storage_path:
            try:
                supabase_config.storage.from_(BUCKET_NAME).remove([storage_path])
            except Exception:
                pass  # best-effort cleanup

    profile.profile_picture_url = None
    db.commit()
    db.refresh(profile)
    return profile
