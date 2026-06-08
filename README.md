# NeeLearningAndTranslationServices
# Nee's Learning & Translation Services

## Overview

Nee's Learning & Translation Services is a modern language-learning and translation platform designed to connect students with qualified tutors and translators.

The platform specializes in Haitian Creole language education while also supporting translation services between Haitian Creole, English, French, and additional languages in the future.

Our goal is to make language learning and translation services accessible, affordable, and efficient through a modern web application powered by React, FastAPI, and PostgreSQL.

---

## Features

### Language Learning

* One-on-one Haitian Creole tutoring
* Beginner, Intermediate, and Advanced courses
* Flexible scheduling
* Student progress tracking
* Online lesson booking

### Translation Services

* Document translation
* Certified translation requests
* Multi-language support
* Secure file uploads
* Translation order tracking

### Administration

* Service management
* Tutor management
* Availability management
* Booking management
* Translation request management
* Reporting and analytics

---

## Technology Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

### Backend

* FastAPI
* Python
* SQLAlchemy
* Alembic
* JWT Authentication

### Database

* PostgreSQL

### Cloud & Infrastructure

* AWS
* Docker
* GitHub Actions
* REST APIs

---

## Project Structure

```text
NeeLearningAndTranslationServices/

├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── authentication/
│   ├── users/
│   └── public_api/
│
├── management/
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   ├── services/
│   └── main.py
│
└── README.md
```

---

## API Modules

### Services API

Manage tutoring and translation services.

```http
GET     /api/v1/services
POST    /api/v1/services
PUT     /api/v1/services/{id}
DELETE  /api/v1/services/{id}
```

### Availability API

Manage tutor schedules.

```http
GET     /api/v1/availability
POST    /api/v1/availability
PUT     /api/v1/availability/{id}
DELETE  /api/v1/availability/{id}
```

### Booking API

Manage lesson bookings.

```http
GET     /api/v1/bookings
POST    /api/v1/bookings
PUT     /api/v1/bookings/{id}
DELETE  /api/v1/bookings/{id}
```

### Translation Requests API

Manage translation orders and requests.

```http
GET     /api/v1/translation-requests
POST    /api/v1/translation-requests
```

---

## Vision

Our mission is to promote Haitian Creole language education globally while providing professional translation services that help bridge communication gaps across cultures.

We believe language is more than communication—it is identity, culture, and opportunity.

---

## Contributors

Impact Team Technologies

Project Contributors:

* Frontend Developers (Yassine, Rae)
* Backend Developers (Miracle, Yuri)
* Management API Developers (Miracle, Yuri)
* UI/UX Designers (Rae, Yassine)
* QA Testers (TBD)

---

## License

This project is intended for educational and commercial use by the Nee's Learning & Translation Services team.
