from pydantic import BaseModel
from datetime import datetime

#metadata frontend sends 
class FileCreate(BaseModel):
    uploaded_by_user_id: int
    related_translation_request_id: int

#store the file
class FileResponse(FileCreate):
    id: int
    file_url: str
    file_name: str
    file_type: str
    file_size: int
    created_at: datetime

    class Config:
        from_attributes = True