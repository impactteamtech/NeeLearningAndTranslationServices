# NeeLearningAndTranslationServices

## Overview

Nee's Learning & Translation Services is a modern language-learning and translation platform designed to connect students with qualified tutors and translators.

The platform specializes in Haitian Creole language education while supporting translation services between Haitian Creole, English, French, and additional languages in the future.

Our mission is to make language learning and translation services accessible, affordable, and efficient through a modern web application powered by React, FastAPI, SQLAlchemy, and Supabase PostgreSQL.

---

## Mission

We believe language is more than communication—it is identity, culture, opportunity, and connection.

Nee's Learning & Translation Services aims to promote Haitian Creole globally while providing professional translation services that help bridge communication gaps across cultures.

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

### Infrastructure

* GitHub
* REST APIs
* Docker (Planned)
* GitHub Actions (Planned)
* AWS (Future)

---

## Project Structure

```text
NeeLearningAndTranslationServices/

├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── management/
│   ├── core/
│   │
│   ├── database/
│   │   ├── database.py
│   │   └── base.py
│   │
│   ├── models/
│   │
│   ├── schemas/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── .env
│   │
│   └── main.py
│
└── README.md
```

---

## Architecture

The application follows a monorepo architecture:

### Client

The React frontend application responsible for:

* User Interface
* Student Dashboard
* Tutor Dashboard
* Booking Pages
* Translation Request Pages

### Management API

The FastAPI backend responsible for:

* Business Logic
* Database Operations
* Authentication
* Service Management
* Availability Management
* Booking Management
* Translation Requests

### Database

Supabase PostgreSQL serves as the primary database.

SQLAlchemy is used as the ORM layer between FastAPI and PostgreSQL.

---

## Current Development Status

### Database

* [x] Supabase PostgreSQL Connected
* [x] SQLAlchemy Engine Configured
* [x] SessionLocal Configured
* [x] Database Dependency Injection (`get_db`)
* [x] Services Table Created

### Services API

* [x] Create Service
* [x] Get All Services
* [ ] Get Service By ID
* [ ] Update Service
* [ ] Delete Service

### Availability API

* [x] Schema Design
* [x] Route Design
* [ ] PostgreSQL Migration

### Booking API

* [x] Schema Design
* [x] Route Design
* [ ] PostgreSQL Migration

### Translation Requests API

* [ ] In Development

### Authentication

* [ ] Planned

---

## Database Architecture

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

## API Endpoints

### Services

```http
GET     /api/v1/services
GET     /api/v1/services/{id}
POST    /api/v1/services
PUT     /api/v1/services/{id}
DELETE  /api/v1/services/{id}
```

### Availability

```http
GET     /api/v1/availability
POST    /api/v1/availability
PUT     /api/v1/availability/{id}
DELETE  /api/v1/availability/{id}
```

### Bookings

```http
GET     /api/v1/bookings
POST    /api/v1/bookings
PUT     /api/v1/bookings/{id}
DELETE  /api/v1/bookings/{id}
```

### Translation Requests

```http
GET     /api/v1/translation-requests
POST    /api/v1/translation-requests
```

---

## Development Roadmap

### Phase 1

* Services Management
* Availability Management
* Booking Management
* PostgreSQL Integration

### Phase 2

* User Authentication
* User Profiles
* Tutor Profiles
* Student Profiles

### Phase 3

* Translation Requests
* File Uploads
* Payment Processing

### Phase 4

* Notifications
* Analytics Dashboard
* Reporting
* Mobile Optimization

---

## Contributors

### Impact Team Technologies

#### Frontend Team

* Yassine Benkacem
* Rae

#### Backend Team

* Miracle
* Houbenove "Yuri" Pierre-Louis

#### UI/UX Team

* Rae
* Yassine Benkacem

#### QA Team

* TBD

---

## License

This project is intended for educational and commercial use by the Nee's Learning & Translation Services team.
