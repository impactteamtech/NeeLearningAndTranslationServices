#Availability schema 

from pydantic import BaseModel
from enum import Enum
from datetime import time
#days validation
class Day(str, Enum):
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday"
    
#availability creation
class AvailabilityCreate(BaseModel):
    tutors: str
    day: Day
    start_time: time
    end_time: time
    is_active: bool = True


class AvailabilityResponse(AvailabilityCreate):
    id: int
    
    class Config:
        from_attributes = True