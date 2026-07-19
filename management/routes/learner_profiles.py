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
#                                                                     #
#######################################################################


from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from database.database import get_db
from models.learner_profile import LearnerProfile
from models.user import User
from schemas.learner_profile import LearnerProfileUpdate, LearnerProfileResponse
from models.learner_profile import StudentProfile
from models.user import User
from schemas.learner_profile import StudentProfileUpdate, StudentProfileResponse
from auth.dependencies import get_current_user

router = APIRouter()


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
