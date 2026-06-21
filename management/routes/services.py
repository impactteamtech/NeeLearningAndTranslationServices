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

   # update by id 
   
@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(
    service_id: int,
    updated_service: ServiceCreate,
    db: Session = Depends(get_db)
):
    # first we get the table and the id 
    db_service = db.get(Service, service_id)
    
    # if we cant find it return none or error code
    if not db_service:
        raise HTTPException(status_code=404, detail="unable to retrieve service")
    #then we convert the object db_service to a dictionary to loop and to update
    updated_dict = updated_service.model_dump()
    #then we loop through it
    for key, value in updated_dict.items():
        setattr(db_service, key, value)
    db.commit() #commiting our change to our db
    db.refresh(db_service) #refreshing to show our changes 
    return db_service

#deleting a service by id 
@router.delete("/{service_id}")
def delete_service(service_id:int, db:Session = Depends(get_db)):
    #first we find the table and the obj we want to delete by its id
    query_obj = db.get(Service, service_id) #Service here is our Service table 
    if not query_obj:
        raise HTTPException(status_code=404, detail="unable to find service please try again")
    #if we find the table and the id we can now delete it 
    db.delete(query_obj)
    db.commit() #commit our changes 
    return {"message": "service successfully deleted!!"} 

