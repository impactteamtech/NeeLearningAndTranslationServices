#######################################################################
#                                                                     #
#                    CONTACT-FORM ROUTES                              #
#                                                                     #
#  POST /  →  send the landing-page contact form to the configured    #
#            CONTACT_RECIPIENT_EMAIL via Brevo.                       #
#                                                                     #
#######################################################################


import logging
import traceback

from fastapi import APIRouter, HTTPException, status

from auth.email import send_contact_email
from schemas.contact import ContactRequest, ContactResponse


router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/", response_model=ContactResponse, status_code=status.HTTP_200_OK)
def submit_contact_form(payload: ContactRequest):
    """
    Accept a contact-form submission from the public landing page and
    forward it via Brevo to CONTACT_RECIPIENT_EMAIL. The submitter's
    email is set as reply-to.
    """
    try:
        send_contact_email(
            from_name=payload.name,
            from_email=payload.email,
            phone=payload.phone,
            service=payload.service,
            message=payload.message,
        )
    except Exception as exc:
        # Log the real reason (Brevo response body, etc.) but return a
        # generic message to the client.
        logger.error(
            "Failed to send contact-form email: %s\n%s",
            exc,
            traceback.format_exc(),
        )
        print(f"[error] contact form send failed: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not send your message right now. Please try again later.",
        )

    return ContactResponse(
        success=True,
        message="Your message has been sent. We'll be in touch within 24 hours.",
    )
