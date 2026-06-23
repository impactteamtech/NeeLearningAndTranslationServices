#the function that will handles creating services 

from fastapi import APIRouter, HTTPException
from schemas.service import ServiceCreate, ServiceResponse
from database.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import Depends
from models.service import Service
router = APIRouter()


#route for creating a new service
@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db:Session = Depends(get_db)):

    new_service = Service(
       name=service.name,
       description=service.description,
       category=service.category,
       price=service.price,
       duration_minutes=service.duration_minutes,
       is_active=service.is_active
        )
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service


#route to get services
@router.get("/", response_model=list[ServiceResponse])
def get_services(db:Session = Depends(get_db)):
    query = select(Service)
    result = db.execute(query)
    services = result.scalars().all()

    return services


#route to get service ids
@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int, db:Session = Depends(get_db)):
    service = db.get(Service, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service ID not found")
    return service

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(
    service_id: int,
    updated_service: ServiceCreate,
    db: Session = Depends(get_db)
):
    db_service = db.get(Service, service_id)

    if not db_service:
        raise HTTPException(
            status_code=404,
            detail="Service not found")

    updated_dict = updated_service.model_dump()
    for key, value in updated_dict.items():
        setattr(db_service, key, value)
    db.commit()
    db.refresh(db_service)

    return db_service

#route for deleting a service id 
@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    query_obj_id = db.get(Service, service_id)
    
    if not query_obj_id:
        raise HTTPException(status_code=404, detail= "Service object not found")
    db.delete(query_obj_id)
    db.commit()
    return {"message": "Service successfully deleted"}
    
    