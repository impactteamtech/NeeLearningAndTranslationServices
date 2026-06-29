from fastapi import APIRouter, HTTPException
from fastapi import Depends, File, Form, UploadFile
from schemas.file_upload import  FileResponse
from sqlalchemy.orm import Session
from config.supabase import supabase
from database.database import get_db
from models.file import FileUpload
from enums.enums import AllowedFileTypes
import uuid
import os
#files route creation 
router = APIRouter()

@router.post("/upload", response_model=FileResponse)
async def upload_file(file:UploadFile = File(), uploaded_by_user_id: int = Form(), related_translation_request_id: int = Form(), db: Session = Depends(get_db)):
    #create the variable we will extract
    file_name = file.filename
    file_type = file.content_type
    file_content = await file.read()
    file_size = len(file_content)

    #extension validation
    allowed_extensions = [file_type.value for file_type in AllowedFileTypes]
    name_parts = os.path.splitext(file_name.lower())
    #name_part become a tuple so we can unpack them
    _, extension = name_parts
    #validate with what our actual extensions needs to be
    if extension in allowed_extensions:
        pass
    else:
        raise HTTPException(status_code=400, detail="Your request is invalid")
    #create a unique file name 
    unique_filename = uuid.uuid4().hex
    storage_filename = f"{unique_filename}{extension}"
    
    #upload to supabase storage 
    try:
        BUCKET_NAME = "uploads"
        
        supabase.storage.from_(BUCKET_NAME).upload(
            file=file_content,
            path = storage_filename,
            file_options = {
                "content-type": file_type,
                "cache-control": "3600"
            }
        )
    except Exception as supabase_error:
        raise HTTPException(status_code=500, detail=f"storage upload failed: {str(supabase_error)}")
    #create the file storage url since our bucket is private
    storage_path = f"translation_requests/{related_translation_request_id}/{storage_filename}"
    new_file_record = FileUpload(
        file_name=file_name,
        storage_path=storage_filename,
        file_url=storage_path,
        file_size=file_size,
        uploaded_by_user_id=uploaded_by_user_id,
        related_translation_request_id=related_translation_request_id
    )
    db.add(new_file_record)
    db.commit()
    db.refresh(new_file_record)
    
    return new_file_record #return the record to the frontend