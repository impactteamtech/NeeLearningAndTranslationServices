

# ============================================================================
# AVAILABILITY MANAGEMENT API
# ----------------------------------------------------------------------------
# Administrative endpoints for managing teacher availability schedules.
#
# Features:
# - Create availability slots
# - View all availability records
# - View availability by ID
# - Update availability schedules
# - Delete availability schedules
#
# Endpoints:
# - GET    /availability
# - POST   /availability
# - GET    /availability/{availability_id}
# - PUT    /availability/{availability_id}
# - DELETE /availability/{availability_id}
# ============================================================================


from fastapi import APIRouter, HTTPException
from schemas.availability import AvailabilityCreate, AvailabilityResponse
from models.availability import Availability
from database.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import Depends


router = APIRouter()

#get all availability
@router.get("/", response_model=list[AvailabilityResponse])
def get_all_availability(db:Session=Depends(get_db)):
    query = select(Availability) #select availability table
    result = db.execute(query)
    availability_service = result.scalars().all()
    return availability_service
    
    
#create availability
@router.post("/", response_model=AvailabilityResponse)
def create_availability(availability: AvailabilityCreate, db:Session=Depends(get_db)):
    new_avail = Availability(
        teacher_id = availability.teacher_id,
        start_time = availability.start_time,
        end_time = availability.end_time,
        day = availability.day,
        is_active = availability.is_active
    )
    db.add(new_avail)
    db.commit()
    db.refresh(new_avail)
    return new_avail


#get availability by ID
@router.get("/{availability_id}", response_model=AvailabilityResponse)
def get_availability_by_id(availability_id: int, db:Session = Depends(get_db)):
    search = db.get(Availability, availability_id)
    if not search:
        raise HTTPException(status_code=404, detail="unable to locate availability id")
    return search
    
    
    
#update availability 
@router.put("/{availability_id}", response_model=AvailabilityResponse)
def update_availabilty(availability_id:int, updated_availability:AvailabilityCreate, db:Session = Depends(get_db)):
    avail_service = db.get(Availability, availability_id)
    if not avail_service:
        raise HTTPException(status_code= 404, detail="unable to find availability id please try again")
    avail_dict = updated_availability.model_dump()
    for key, value in avail_dict.items():
        setattr(avail_service, key, value)
    db.commit()
    db.refresh(avail_service)
    return avail_service



#delete availability by ID
@router.delete("/{availability_id}")
def delete_availability(availability_id:int, db:Session = Depends(get_db)):
    search_avail = db.get(Availability, availability_id)
    if not search_avail:
        raise HTTPException(status_code= 404, detail="unable to delete availability id please try again")
    db.delete(search_avail)
    db.commit()
    return {"message": "Availability successfully deleted. "}


# ============================================================================
# AVAILABILITY DASHBOARD API (TEACHER & STUDENT)
# ----------------------------------------------------------------------------
# User-facing availability endpoints used by the booking system.
#
# Teacher Features:
# - View personal availability schedule
# - Manage available teaching hours
#
# Student Features:
# - View available time slots for a specific teacher
# - Select availability during booking
#
# Endpoints:
# - GET /availability/teacher/{teacher_id}
# ============================================================================

@router.get("/teacher/{teacher_id}", response_model=list[AvailabilityResponse])
def get_teacher_avail(teacher_id:int, db:Session = Depends(get_db)):
    teacher_avail = select(Availability).where(Availability.teacher_id == teacher_id)
    results = db.scalars(teacher_avail).all()
    return results