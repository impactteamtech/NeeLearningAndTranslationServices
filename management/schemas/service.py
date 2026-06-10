#Service schema is about how the data should look like 

from pydantic import BaseModel

# schema for service being created 
class ServiceCreate(BaseModel):
    name: str
    description: str
    category: str
    price: float
    duration_minutes: int
    is_active: bool = True
    
#example responses for service response   
class ServiceResponse(ServiceCreate):
    id: int
    
    class Config:
        from_attributes = True