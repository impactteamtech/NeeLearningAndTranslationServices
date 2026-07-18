from fastapi import FastAPI
from routes import bookings, services, availability, auth, google_auth, files, translation_requests
from routes import google_auth
from routes import translation_req


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
    tags=["Bookings"]
)
app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["Authentication"]
)
app.include_router(
    google_auth.router,
    prefix="/api/v1/auth",
    tags=["Google Authentication"]
)
app.include_router(
    files.router,
    prefix="/api/v1/files",
    tags=["Files"])
app.include_router(
    translation_requests.router,
    prefix="/api/v1/translation-requests",
    tags=["Translation Requests"]
)
app.include_router(
    translation_req.router,
    prefix="/api/v1/translate",
    tags=["Translation"]
    
)
    



@app.get("/")
def home():
    return {"message": "Nee's Learning Management API is running"}
