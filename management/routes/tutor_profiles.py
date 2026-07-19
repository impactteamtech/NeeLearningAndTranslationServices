#######################################################################
#                                                                     #
#                    TUTOR PROFILE API                                #
#                                                                     #
#        Manage tutor profile data for tutor accounts.               #
#        Profile is created when a learner becomes a tutor via       #
#        POST /auth/become-tutor.                                     #
#                                                                     #
#        - GET  /tutor-profiles/me          → own profile            #
#        - GET  /tutor-profiles/{user_id}   → by user id             #
#        - GET  /tutor-profiles/            → all tutors             #
#        - PUT  /tutor-profiles/me          → update own             #
#                                                                     #
#######################################################################


from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from database.database import get_db
from models.tutor_profile import TutorProfile
from models.user import User
from schemas.tutor_profile import TutorProfileUpdate, TutorProfileResponse
from auth.dependencies import get_current_user
from enums.enums import UserRole

router = APIRouter()


# ─── Get all tutor profiles ─────────────────────────────────────────
@router.get("/", response_model=list[TutorProfileResponse])
def get_all_tutor_profiles(db: Session = Depends(get_db)):
    profiles = db.execute(select(TutorProfile)).scalars().all()
    return profiles


# ─── Get own tutor profile ──────────────────────────────────────────
@router.get("/me", response_model=TutorProfileResponse)
def get_my_tutor_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role not in [UserRole.TUTOR, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Only tutors can access a tutor profile")

    profile = db.execute(
        select(TutorProfile).where(TutorProfile.user_id == current_user.id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Tutor profile not found")
    return profile


# ─── Get tutor profile by user ID ───────────────────────────────────
@router.get("/{user_id}", response_model=TutorProfileResponse)
def get_tutor_profile_by_user_id(user_id: int, db: Session = Depends(get_db)):
    profile = db.execute(
        select(TutorProfile).where(TutorProfile.user_id == user_id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Tutor profile not found")
    return profile


# ─── Update own tutor profile ───────────────────────────────────────
@router.put("/me", response_model=TutorProfileResponse)
def update_my_tutor_profile(
    updates: TutorProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role not in [UserRole.TUTOR, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Only tutors can update a tutor profile")

    profile = db.execute(
        select(TutorProfile).where(TutorProfile.user_id == current_user.id)
    ).scalars().first()

    if not profile:
        raise HTTPException(status_code=404, detail="Tutor profile not found")

    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile
