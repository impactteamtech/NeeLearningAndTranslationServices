#store metadata for the file only

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from database.database import engine
from datetime import datetime



class Base(DeclarativeBase):
    pass

class FileUpload(Base):
    __tablename__ = "files"
    id: Mapped[int] = mapped_column(primary_key=True)
    uploaded_by_user_id: Mapped[int] = mapped_column()
    file_name: Mapped[str] = mapped_column()
    file_size: Mapped[int] = mapped_column()
    file_url: Mapped[str] = mapped_column()
    file_type: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column()
    related_translation_requests_id: Mapped[int] = mapped_column()

#creating file table 
Base.metadata.create_all(engine)