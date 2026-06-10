#the function that will handles creating services 

from fastapi import APIRouter, HTTPException
from schemas.service import ServiceCreate, ServiceResponse
from models.service import services_db

router = APIRouter()
#route for creating a new service
@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate):
    new_service = service.model_dump()
    new_service["id"] = len(services_db) + 1
    services_db.append(new_service)
    return new_service

#route to get services
@router.get("/", response_model=list[ServiceResponse])
def get_services():
    return services_db

#route to get service ids
@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int):
    for service in services_db:
        if service["id"] == service_id:
            return service

    raise HTTPException(status_code=404, detail="Service not found")

#route for updating service id 
@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, updated_service: ServiceCreate):
    for index, service in enumerate(services_db):
        if service["id"] == service_id:
            new_data = updated_service.model_dump()
            new_data["id"] = service_id
            services_db[index] = new_data
            return new_data

    raise HTTPException(status_code=404, detail="Service not found")

#route for deleting a service id 
@router.delete("/{service_id}")
def delete_service(service_id: int):
    for service in services_db:
        if service["id"] == service_id:
            services_db.remove(service)
            return {"message": "Service deleted successfully"}

    raise HTTPException(status_code=404, detail="Service not found")