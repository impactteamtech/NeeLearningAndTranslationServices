#######################################################################
#                                                                     #
#                    CONTACT-FORM SCHEMAS                             #
#                                                                     #
#  Payload for the landing-page contact form (POST /api/v1/contact).  #
#                                                                     #
#######################################################################


from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    service: str = Field(min_length=1, max_length=120)
    message: str = Field(min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    success: bool
    message: str
