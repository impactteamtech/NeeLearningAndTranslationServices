from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from database.database import get_db
from models.file import FileUpload
from models.user import User
from schemas.file_upload import TranslationRequestSummaryResponse

router = APIRouter()


@router.get("", response_model=list[TranslationRequestSummaryResponse])
def get_translation_request_summaries(db: Session = Depends(get_db)):
    request_query = (
        select(
            FileUpload.related_translation_request_id.label("id"),
            FileUpload.uploaded_by_user_id.label("learner_id"),
            User.full_name.label("learner_name"),
            User.email.label("learner_email"),
            func.min(FileUpload.created_at).label("created_at"),
            func.max(FileUpload.created_at).label("updated_at"),
            func.count(FileUpload.id).label("file_count"),
        )
        .join(User, User.id == FileUpload.uploaded_by_user_id, isouter=True)
        .group_by(
            FileUpload.related_translation_request_id,
            FileUpload.uploaded_by_user_id,
            User.full_name,
            User.email,
        )
        .order_by(func.max(FileUpload.created_at).desc())
    )

    rows = db.execute(request_query).mappings().all()
    return [
        {
            **dict(row),
            "status": "pending",
        }
        for row in rows
    ]
