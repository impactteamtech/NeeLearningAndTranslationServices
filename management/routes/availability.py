from fastapi import APIRouter, HTTPException
from schemas.availability import AvailabilityCreate, AvailabilityResponse
from models.availability import availability_db


router = APIRouter()

@router.post("/", response_model=AvailabilityResponse)
def create_availabilty(availabilty: AvailabilityCreate):
    new_availability = availabilty.model_dump()
    new_availability["id"] = len(availability_db) + 1
    availability_db.append(new_availability)
    return new_availability
#get all availability
@router.get("/", response_model=list[AvailabilityResponse])
def get_all_availability():
    return availability_db

#get availability by ID
@router.get("/{availability_id}", response_model=AvailabilityResponse)
def get_availability_by_id(availability_id: int):
    for availability in availability_db:
        if availability["id"] == availability_id:
            return availability
    raise HTTPException(status_code=404, detail="availability id not found please try again")

#update availability 

@router.put("/{availability_id}", response_model=AvailabilityResponse)
def update_availability(availability_id: int, update_availability:AvailabilityCreate):
    for index, availability in enumerate(availability_db):
        if availability["id"] == availability_id:
            new_ava = update_availability.model_dump()
            new_ava["id"] = availability_id
            availability_db[index] = new_ava
            return new_ava
    raise HTTPException(status_code=404, detail="unable to update availabilty")

#route to delete availability
@router.delete("/{availability_id}")
def delete_availability(availability_id: int):
    for availabilty in availability_db:
        if availabilty["id"] == availability_id:
            availability_db.remove(availabilty)
            return {"message": "Availability successfully deleted"}
        
    raise HTTPException(status_code=404, detail="unable to find availability id to delete")