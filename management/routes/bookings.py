#######################################################################
#                                                                     #
#                    ADMIN BOOKING MANAGEMENT API                     #
#                                                                     #
#        Full CRUD operations for booking administration              #
#        - Get All Bookings                                           #
#        - Get Booking By ID                                          #
#        - Create Booking                                             #
#        - Update Booking                                             #
#        - Update Booking Status                                      #
#        - Delete Booking                                             #
#                                                                     #
#######################################################################


from fastapi import APIRouter, HTTPException
from schemas.booking import BookingCreate, BookingResponse
from schemas.booking_status import BookingStatusUpdate
from database.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import Depends
from models.booking import Booking


router = APIRouter()

#get all bookings 
@router.get("/", response_model=list[BookingResponse] )
def get_all_booking(db: Session = Depends(get_db)):
    query = select(Booking) #select the booking table
    result = db.execute(query) #execute the query
    bookings = result.scalars().all() #select everything inside table
    return bookings #return table

#create booking
@router.post("/", response_model=BookingResponse) #this is the return response 
def create_booking(booking: BookingCreate, db:Session=Depends(get_db)): 
    new_booking = Booking(
        student_id = booking.student_id,
        availability_id = booking.availability_id,
        booking_date = booking.booking_date,
        start_time = booking.start_time,
        end_time = booking.end_time,
        status = booking.status,
        notes = booking.notes,
        service_id = booking.service_id,
        teacher_id = booking.teacher_id)

    db.add(new_booking) #adding it to our db
    db.commit() #committing our changes 
    db.refresh(new_booking) #refresh our db
    return new_booking # send the new booking back 

# ============================================================================
# BOOKING DASHBOARD API
# ----------------------------------------------------------------------------
# booking endpoints used by the Student and Teacher dashboards.
#
# Purpose:
# - Retrieve bookings for a specific student
# - Retrieve bookings for a specific teacher
# - Support dashboard views, schedules, and booking history
#
# Endpoints:
# - GET /bookings/student/{student_id}
# - GET /bookings/teacher/{teacher_id}
# ============================================================================

@router.get("/student/{student_id}", response_model=list[BookingResponse])
def get_student_bookings(student_id: int, db:Session = Depends(get_db)):
    booking_list = select(Booking).where(Booking.student_id == student_id)
    result = db.scalars(booking_list).all()
    return result
    
    
@router.get("/teacher/{teacher_id}", response_model=list[BookingResponse])
def get_teacher_bookings(teacher_id: int, db:Session = Depends(get_db)):
    booking_list = select(Booking).where(Booking.teacher_id == teacher_id)
    result = db.scalars(booking_list).all()
    return result
    


# ============================================================================
# BOOKING DASHBOARD API
# ----------------------------------------------------------------------------
# User-facing booking endpoints used by student and teacher dashboards.
#
# Features:
# - View bookings for a specific student
# - View bookings for a specific teacher
# - Support schedules, booking history, and dashboard views
# ============================================================================


#get booking by ID
@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking_by_id(booking_id: int, db: Session = Depends(get_db)):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="unable to retrieve booking id")
    return booking

#update all booking
@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(booking_id:int, updated_booking:BookingCreate, db: Session = Depends(get_db)):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="unable to retrieve booking id")
    update_dict = updated_booking.model_dump()
    for key, value in update_dict.items():
        setattr(booking, key, value)
    db.commit()
    db.refresh(booking)
    return booking
        
#update status of booking
@router.patch("/{booking_id}/status", response_model=BookingResponse)
def update_status(booking_id:int, update_status:BookingStatusUpdate, db: Session = Depends(get_db)):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="unable to find booking id")
    booking.status = update_status.status
    db.commit()
    db.refresh(booking)
    return booking


#delete booking
@router.delete("/{booking_id}")
def delete_booking(booking_id:int, db:Session = Depends(get_db)):
    booking_to_delete = db.get(Booking, booking_id)
    if not booking_to_delete:
        raise HTTPException(status_code=404, detail="Cannot delete booking")
    db.delete(booking_to_delete)
    db.commit()
    return {"message": "Booking successfully deleted"}

    
        






