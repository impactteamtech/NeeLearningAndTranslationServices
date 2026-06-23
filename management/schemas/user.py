# User schemas - defines how authentication data should look like

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# schema for user registration
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: Optional[str] = "user"


# schema for user login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# schema for user response (never includes password)
class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# schema for token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
