# ============================================================================
# TUTOR PROFILE MODEL
# ----------------------------------------------------------------------------
# Separate profile table for tutors linked to the users table.
# A learner can request to become a tutor — this table is created then.
# ============================================================================

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, ForeignKey, DateTime, func
from database.database import engine
from datetime import datetime


class Base(DeclarativeBase):
    pass


class TutorProfile(Base):
    __tablename__ = "tutor_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    bio: Mapped[str | None] = mapped_column(String(500), nullable=True)
    specialization: Mapped[str | None] = mapped_column(String(200), nullable=True)
    years_of_experience: Mapped[int | None] = mapped_column(nullable=True)
    hourly_rate: Mapped[float | None] = mapped_column(nullable=True)
    is_verified: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


Base.metadata.create_all(bind=engine)
