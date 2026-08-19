# ============================================================================
# EMAIL UTILITY (Brevo)
# ----------------------------------------------------------------------------
# Sends transactional emails via the Brevo API:
#   - password reset link
#   - welcome email on signup
#   - contact-form message (from the landing page)
#
# All emails share a single branded HTML template that matches the landing
# page design language (navy/red palette, serif headings, tracked uppercase
# labels, pill CTAs).
#
# Configure these in your project-root .env:
#   BREVO_API_KEY              (your Brevo API key)
#   BREVO_SENDER_EMAIL         (verified sender in your Brevo account)
#   BREVO_SENDER_NAME          (display name that shows up in the inbox)
#   FRONTEND_URL               (e.g. http://localhost:5173)
#   CONTACT_RECIPIENT_EMAIL    (where landing-page contact forms are sent)
#
# IMPORTANT: BREVO_SENDER_EMAIL must be verified inside Brevo (dashboard →
# Senders). If it's not verified, the API will accept the request but the
# mail will silently not be delivered, OR it will return a 400.
# ============================================================================

import os
from html import escape
from pathlib import Path

import httpx
from dotenv import load_dotenv


# Load the project-root .env explicitly so it works regardless of cwd.
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
load_dotenv(PROJECT_ROOT / ".env")

BREVO_API_KEY = os.getenv("BREVO_API_KEY", "").strip()
BREVO_SENDER_EMAIL = os.getenv("BREVO_SENDER_EMAIL", "").strip()
BREVO_SENDER_NAME = os.getenv("BREVO_SENDER_NAME", "Nee's Learning").strip()
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173").strip().rstrip("/")
CONTACT_RECIPIENT_EMAIL = os.getenv(
    "CONTACT_RECIPIENT_EMAIL", "neeslearning@gmail.com"
).strip()

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"


# ─── Brand tokens (mirrored from client/src/index.css) ─────────────────
BRAND = {
    "navy":      "#06439f",
    "navy_dark": "#001578",
    "accent":    "#CE1126",  # haiti red
    "ink":       "#0b1533",
    "text":      "#1f2937",
    "muted":     "#6b7280",
    "border":    "#e2e8f0",
    "bg":        "#f5f7fb",
    "card":      "#ffffff",
    "serif":     "'Roxborough CF', Georgia, 'Times New Roman', serif",
    "sans":      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
    "cta_bg":    "linear-gradient(135deg, #080c18 0%, #0d1f7a 45%, #00209F 100%)",
    "cta_bg_fallback": "#00209F",
}


def _ensure_brevo_configured() -> None:
    if not BREVO_API_KEY or not BREVO_SENDER_EMAIL:
        raise RuntimeError(
            "Brevo is not configured. Set BREVO_API_KEY and BREVO_SENDER_EMAIL "
            "in your project-root .env file."
        )


def _post_to_brevo(payload: dict) -> None:
    """
    POST a message payload to Brevo. On non-2xx we raise with the actual
    response body so the caller/log shows the real reason.
    """
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    with httpx.Client(timeout=15.0) as client:
        response = client.post(BREVO_API_URL, json=payload, headers=headers)
        if response.status_code >= 400:
            try:
                body = response.json()
            except Exception:
                body = response.text
            raise RuntimeError(
                f"Brevo API returned {response.status_code}: {body}"
            )


# ─── Reusable branded email shell ──────────────────────────────────────
def _render_email(
    *,
    preheader: str,
    eyebrow: str,
    headline: str,
    body_html: str,
    cta_label: str | None = None,
    cta_url: str | None = None,
    footer_note: str | None = None,
) -> str:
    """
    Assemble a table-based branded email that matches the landing page.
    All CSS is inlined for email-client compatibility.

    Parameters:
        preheader   - hidden preview text shown by inbox lists
        eyebrow     - small uppercase tracked line above the headline
        headline    - serif hero line
        body_html   - main body markup (already-safe HTML)
        cta_label   - optional pill CTA text
        cta_url     - optional pill CTA target
        footer_note - optional small print above the divider
    """
    b = BRAND

    cta_block = ""
    if cta_label and cta_url:
        cta_block = f"""
        <tr>
          <td align="center" style="padding: 8px 0 4px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center"
                    style="border-radius: 999px; background: {b['cta_bg_fallback']};
                           background-image: {b['cta_bg']};
                           box-shadow: 0 8px 24px rgba(0,32,159,0.35);">
                  <a href="{cta_url}"
                     style="display: inline-block; padding: 14px 34px;
                            font-family: {b['sans']};
                            font-size: 12px; font-weight: 700;
                            letter-spacing: 0.14em; text-transform: uppercase;
                            color: #ffffff; text-decoration: none;
                            border-radius: 999px;">
                    {escape(cta_label)}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        """

    footer_note_block = ""
    if footer_note:
        footer_note_block = f"""
        <tr>
          <td style="padding: 24px 0 0; font-family: {b['sans']};
                     font-size: 12px; line-height: 1.6; color: {b['muted']};">
            {footer_note}
          </td>
        </tr>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nee's Learning</title>
</head>
<body style="margin: 0; padding: 0; background-color: {b['bg']};
             font-family: {b['sans']}; color: {b['text']};
             -webkit-font-smoothing: antialiased;">
  <!-- Preheader (hidden preview text) -->
  <div style="display: none; overflow: hidden; line-height: 1px;
              opacity: 0; max-height: 0; max-width: 0;">
    {escape(preheader)}
  </div>

  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"
         style="background-color: {b['bg']}; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Outer card -->
        <table role="presentation" width="600" border="0" cellpadding="0" cellspacing="0"
               style="width: 100%; max-width: 600px; background-color: {b['card']};
                      border-radius: 20px; overflow: hidden;
                      box-shadow: 0 10px 30px rgba(6, 67, 159, 0.08);
                      border: 1px solid {b['border']};">

          <!-- Brand bar -->
          <tr>
            <td style="background: {b['navy']};
                       background-image: linear-gradient(135deg, {b['navy_dark']} 0%, {b['navy']} 100%);
                       padding: 22px 32px;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family: {b['serif']};
                                 font-size: 22px; font-weight: 700;
                                 letter-spacing: -0.01em; color: #ffffff;">
                      Nee's Learning
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-family: {b['sans']};
                                 font-size: 10px; font-weight: 700;
                                 letter-spacing: 0.16em; text-transform: uppercase;
                                 color: rgba(255,255,255,0.75);">
                      Haitian Creole · Kreyòl Ayisyen
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent stripe (haitian flag red) -->
          <tr>
            <td style="height: 3px; background-color: {b['accent']}; line-height: 0; font-size: 0;">&nbsp;</td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding: 44px 40px 36px;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 0 12px; font-family: {b['sans']};
                             font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
                             text-transform: uppercase; color: {b['accent']};">
                    {escape(eyebrow)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 20px; font-family: {b['serif']};
                             font-size: 30px; font-weight: 700; line-height: 1.15;
                             letter-spacing: -0.02em; color: {b['ink']};">
                    {headline}
                  </td>
                </tr>
                <tr>
                  <td style="font-family: {b['sans']};
                             font-size: 15px; line-height: 1.7; color: {b['text']};">
                    {body_html}
                  </td>
                </tr>
                {cta_block}
                {footer_note_block}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 28px;
                       border-top: 1px solid {b['border']};
                       background-color: #fafbfd;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: {b['sans']};
                             font-size: 11px; line-height: 1.6; color: {b['muted']};">
                    Nee's Learning · Language learning and translation support
                    <br>
                    for school, work, and everyday life.
                  </td>
                  <td align="right"
                      style="font-family: {b['sans']};
                             font-size: 11px; font-weight: 700;
                             letter-spacing: 0.14em; text-transform: uppercase;
                             color: {b['navy']};">
                    <a href="{FRONTEND_URL}" style="color: {b['navy']}; text-decoration: none;">
                      neeslearning.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Post-card small print -->
        <table role="presentation" width="600" border="0" cellpadding="0" cellspacing="0"
               style="width: 100%; max-width: 600px; padding: 16px 32px 0;">
          <tr>
            <td align="center"
                style="font-family: {b['sans']};
                       font-size: 11px; line-height: 1.6; color: {b['muted']};">
              You're receiving this email from Nee's Learning.
              If it doesn't look right for you, ignore it or reply and let us know.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


# ─── Password reset ────────────────────────────────────────────────────
def send_password_reset_email(to_email: str, reset_token: str) -> None:
    """Send a password reset link. Raises on failure."""
    _ensure_brevo_configured()

    reset_link = f"{FRONTEND_URL}/reset-password?token={reset_token}"

    body_html = f"""
        <p style="margin: 0 0 14px;">
          We received a request to reset the password for your Nee's Learning
          account. Tap the button below to choose a new one — the link is
          valid for the next <strong>15 minutes</strong>.
        </p>
        <p style="margin: 0 0 4px; font-size: 13px; color: {BRAND['muted']};">
          If the button doesn't work, paste this URL into your browser:
        </p>
        <p style="margin: 0 0 4px; font-family: {BRAND['sans']};
                  font-size: 12px; color: {BRAND['navy']}; word-break: break-all;">
          <a href="{reset_link}" style="color: {BRAND['navy']}; text-decoration: underline;">
            {reset_link}
          </a>
        </p>
    """

    html = _render_email(
        preheader="Reset your Nee's Learning password.",
        eyebrow="Password Reset",
        headline="Let's get you back in.",
        body_html=body_html,
        cta_label="Reset Password",
        cta_url=reset_link,
        footer_note=(
            "If you didn't request this reset, you can safely ignore this "
            "message — your password will stay the same."
        ),
    )

    payload = {
        "sender": {"name": BREVO_SENDER_NAME, "email": BREVO_SENDER_EMAIL},
        "to": [{"email": to_email}],
        "subject": "Reset your Nee's Learning password",
        "htmlContent": html,
    }
    _post_to_brevo(payload)


# ─── Welcome email ─────────────────────────────────────────────────────
def send_welcome_email(to_email: str, full_name: str) -> None:
    """Send a welcome email to a newly registered user. Raises on failure."""
    _ensure_brevo_configured()

    display_name = (full_name or "").strip() or "there"
    safe_name = escape(display_name)

    body_html = f"""
        <p style="margin: 0 0 18px;">
          Bonjou {safe_name}, and welcome to Nee's Learning. We're thrilled
          to have you here — you're now part of a community learning
          Haitian Creole with intention, care, and a little bit of joy.
        </p>

        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"
               style="margin: 12px 0 22px; border-collapse: separate;">
          <tr>
            <td style="padding: 16px 18px; border: 1px solid {BRAND['border']};
                       border-radius: 14px; background-color: #fafbfd;">
              <div style="font-family: {BRAND['sans']};
                          font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
                          text-transform: uppercase; color: {BRAND['navy']};
                          margin-bottom: 10px;">
                What you can do next
              </div>
              <ul style="margin: 0; padding-left: 20px;
                         font-family: {BRAND['sans']};
                         font-size: 14px; line-height: 1.75; color: {BRAND['text']};">
                <li>Browse Haitian Creole tutoring services</li>
                <li>Book a session with a tutor that fits your schedule</li>
                <li>Request certified translations for school or work</li>
                <li>Track your progress in your lesson history</li>
              </ul>
            </td>
          </tr>
        </table>

        <p style="margin: 0 0 6px;">
          Questions? Just reply to this email — a real person will read it.
        </p>
    """

    html = _render_email(
        preheader=f"Welcome to Nee's Learning, {display_name}.",
        eyebrow="Welcome Aboard",
        headline=f"Welcome, {safe_name}.",
        body_html=body_html,
        cta_label="Open Your Portal",
        cta_url=FRONTEND_URL,
        footer_note="Mèsi ampil for joining us. We're glad you're here.",
    )

    payload = {
        "sender": {"name": BREVO_SENDER_NAME, "email": BREVO_SENDER_EMAIL},
        "to": [{"email": to_email, "name": display_name}],
        "subject": f"Welcome to Nee's Learning, {display_name}",
        "htmlContent": html,
    }
    _post_to_brevo(payload)


# ─── Contact form (landing page) ───────────────────────────────────────
def send_contact_email(
    *,
    from_name: str,
    from_email: str,
    phone: str | None,
    service: str,
    message: str,
) -> None:
    """
    Forward a landing-page contact-form submission to CONTACT_RECIPIENT_EMAIL.
    Reply-to is set to the submitter's email so the recipient can reply
    directly from Gmail.
    """
    _ensure_brevo_configured()
    if not CONTACT_RECIPIENT_EMAIL:
        raise RuntimeError("CONTACT_RECIPIENT_EMAIL is not configured.")

    safe_name = escape(from_name)
    safe_email = escape(from_email)
    safe_phone = escape(phone.strip()) if phone and phone.strip() else "—"
    safe_service = escape(service)
    safe_message = escape(message or "").replace("\n", "<br>")

    def _row(label: str, value: str) -> str:
        return f"""
          <tr>
            <td style="padding: 10px 16px 10px 0; vertical-align: top;
                       font-family: {BRAND['sans']};
                       font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
                       text-transform: uppercase; color: {BRAND['muted']};
                       white-space: nowrap; width: 110px;">
              {label}
            </td>
            <td style="padding: 10px 0; vertical-align: top;
                       font-family: {BRAND['sans']};
                       font-size: 14px; line-height: 1.55; color: {BRAND['text']};
                       border-bottom: 1px solid {BRAND['border']};">
              {value}
            </td>
          </tr>
        """

    body_html = f"""
        <p style="margin: 0 0 20px;">
          A new message just came through the landing-page contact form.
          You can reply to this email to respond directly to the sender.
        </p>

        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"
               style="border-collapse: collapse; margin-bottom: 8px;">
          {_row("Name", safe_name)}
          {_row("Email",
              f'<a href="mailto:{safe_email}" style="color: {BRAND["navy"]}; text-decoration: none;">{safe_email}</a>')}
          {_row("Phone", safe_phone)}
          {_row("Service", safe_service)}
        </table>

        <div style="margin-top: 24px; padding: 18px 20px;
                    border: 1px solid {BRAND['border']}; border-radius: 14px;
                    background-color: #fafbfd;">
          <div style="font-family: {BRAND['sans']};
                      font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
                      text-transform: uppercase; color: {BRAND['navy']};
                      margin-bottom: 10px;">
            Message
          </div>
          <div style="font-family: {BRAND['sans']};
                      font-size: 14px; line-height: 1.7; color: {BRAND['text']};
                      white-space: pre-wrap;">
            {safe_message}
          </div>
        </div>
    """

    html = _render_email(
        preheader=f"New contact form message from {from_name}.",
        eyebrow="Contact Form",
        headline="New inquiry from the site.",
        body_html=body_html,
        cta_label="Reply by Email",
        cta_url=f"mailto:{from_email}",
        footer_note="Sent from the Nee's Learning landing page.",
    )

    payload = {
        "sender": {"name": BREVO_SENDER_NAME, "email": BREVO_SENDER_EMAIL},
        "to": [{"email": CONTACT_RECIPIENT_EMAIL, "name": "Nee's Learning"}],
        "replyTo": {"email": from_email, "name": from_name},
        "subject": f"[Contact] {service} — {from_name}",
        "htmlContent": html,
    }
    _post_to_brevo(payload)
