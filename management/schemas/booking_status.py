
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
    
    
class BookingStatusUpdate(BaseModel):
    status : Status = Status.PENDING
    
