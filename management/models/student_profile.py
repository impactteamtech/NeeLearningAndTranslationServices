# ============================================================================
# STUDENT PROFILE MODEL
# ----------------------------------------------------------------------------
# Separate profile table for students linked to the users table.
# Every new user gets a student profile automatically at registration.
# ============================================================================

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, ForeignKey, DateTime, func
from database.database import engine
from datetime import datetime


class Base(DeclarativeBase):
    pass


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    bio: Mapped[str | None] = mapped_column(String(500), nullable=True)
    learning_goals: Mapped[str | None] = mapped_column(String(500), nullable=True)
    preferred_language: Mapped[str | None] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


Base.metadata.create_all(bind=engine)
