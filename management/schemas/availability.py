#Availability schema 

from pydantic import BaseModel
from enums.enums import Day
from datetime import time
#days validation

    
#availability creation
class AvailabilityCreate(BaseModel):
    day: Day
    start_time: time
    end_time: time
    is_active: bool = True


class AvailabilityResponse(AvailabilityCreate):
    id: int
    
    class Config:
        from_attributes = True