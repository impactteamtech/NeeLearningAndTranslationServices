

#booking schema
from pydantic import BaseModel
from enum import Enum
from datetime import time, date
from typing import Optional
class Status(str, Enum):
    PENDING = "Pending"
    COMPLETED = "Completed"
    CONFIRMED = "Confirmed"
    CANCELLED = "Cancelled"
    
    
class BookingCreate(BaseModel):
    student_id : int
    service_id : int
    availability_id : int
    booking_date : date
    start_time : time
    end_time : time
    status : Status = Status.PENDING
    notes : Optional[str] = None
    
class BookingResponse(BookingCreate):
    id : int
    
    class Config:
        from_attributes = True
    