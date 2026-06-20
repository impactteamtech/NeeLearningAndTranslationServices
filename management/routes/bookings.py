#booking route 
from fastapi import APIRouter, HTTPException
from schemas.booking import BookingResponse, BookingCreate
from models.booking import booking_db


router = APIRouter()

#get all bookings 
@router.get("/", response_model=list[BookingResponse] )
def get_all_booking():
    return booking_db 

#create bookings 
@router.post("/", response_model=BookingResponse)
def create_booking(booking:BookingCreate):
    new_booking = booking.model_dump()
    new_booking["id"] = len(booking_db) + 1 
    booking_db.append(new_booking)
    return new_booking

#get booking by id 
@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking_by_id(booking_id:int):
    for booking in booking_db:
        if booking["id"] == booking_id:
            return booking
    raise HTTPException(status_code=404, detail="unable to find booking with such ID")

#update booking 
@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(booking_id: int, update_booking:BookingCreate):
    for index, booking in enumerate(booking_db):
        if booking["id"] == booking_id:
            new_booking = update_booking.model_dump()
            new_booking["id"] = booking_id
            booking_db[index] = new_booking
            return new_booking 
    raise HTTPException(status_code=404, detail="unable to update booking at this time.")


#delete booking 
@router.delete("/{booking_id}")
def delete_booking(booking_id:int):
    for booking in booking_db:
        if booking["id"] == booking_id:
            booking_db.remove(booking)
            return {"message": "booking successfully deleted"}
    raise HTTPException(status_code=404, detail="unable to delete booking at this time.")