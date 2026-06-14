from fastapi import FastAPI
from routes import services, availability, bookings


app = FastAPI(
    title="Nee's Learning Management API",
    description="Internal management API for Haitian Creole tutoring and translation services",
    version="1.0.0"
)

app.include_router(
    services.router,
    prefix="/api/v1/services",
    tags=["Services"]
)
app.include_router(
    availability.router,
    prefix="/api/v1/availability",
    tags=['Availability']
)
app.include_router(
    bookings.router,
    prefix="/api/v1/bookings",
    tags=['Bookings']
)


@app.get("/")
def home():
    return {"message": "Nee's Learning Management API is running"}