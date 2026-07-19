from pydantic import BaseModel
from datetime import datetime




#store the file
class FileResponse(BaseModel):
    id: int
    file_url: str
    file_name: str
    file_type: str
    file_size: int
    created_at: datetime
    uploaded_by_user_id: int
    related_translation_request_id: int
    

    class Config:
        from_attributes = True



# schema for updating file metadata
class FileUpdate(BaseModel):
    file_name: str | None = None
    related_translation_request_id: int | None = None
