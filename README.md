# NeeLearningAndTranslationServices

## Overview

Nee's Learning & Translation Services is a modern language-learning and translation platform designed to connect students with qualified tutors and translators.

The platform specializes in Haitian Creole language education while also supporting translation services between Haitian Creole, English, French, and additional languages in the future.

Our goal is to make language learning and translation services accessible, affordable, and efficient through a modern web application powered by React, FastAPI, SQLAlchemy, and Supabase PostgreSQL.

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
* Pydantic
* Alembic (Planned)
* JWT Authentication (Planned)

### Database

* PostgreSQL
* Supabase

### Cloud & Infrastructure

* Supabase
* AWS (Future)
* Docker (Planned)
* GitHub Actions (Planned)
* REST APIs

---

## Current Development Status

### Services Module

* [x] Create Service
* [x] Get All Services
* [ ] Get Service By ID
* [ ] Update Service
* [ ] Delete Service

### Availability Module

* [x] Schema Design
* [x] Route Design
* [ ] PostgreSQL Migration

### Booking Module

* [x] Schema Design
* [x] Route Design
* [ ] PostgreSQL Migration

### Translation Requests Module

* [ ] In Development

### Authentication & Users

* [ ] Planned

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
│   ├── core/
│   ├── database/
│   │   ├── database.py
│   │   └── base.py
│   │
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   ├── services/
│   └── main.py
│
└── README.md
```

---

## Database Architecture

The application uses SQLAlchemy ORM with Supabase PostgreSQL.

### Current Tables

#### Services

```text
services
├── id
├── name
├── description
├── category
├── price
├── duration_minutes
└── is_active
```

### Planned Tables

```text
users
availability
bookings
translation_requests
payments
```

---

## API Modules

### Services API

Manage tutoring and translation services.

```http
GET     /api/v1/services
GET     /api/v1/services/{id}
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

### Project Contributors

* Frontend Developers

  * Yassine Benkacem
  * Rae

* Backend Developers

  * Miracle
  * Houbenove "Yuri" Pierre-Louis

* Management API Developers

  * Miracle
  * Houbenove "Yuri" Pierre-Louis

* UI/UX Designers

  * Rae
  * Yassine Benkacem

* QA Testers

  * TBD

---

## License

This project is intended for educational and commercial use by the Nee's Learning & Translation Services team.
