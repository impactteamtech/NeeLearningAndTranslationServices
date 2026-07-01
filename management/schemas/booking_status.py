
#booking update schema
from pydantic import BaseModel
from enums.enums import Status


    
    
class BookingStatusUpdate(BaseModel):
    status : Status = Status.PENDING
    
