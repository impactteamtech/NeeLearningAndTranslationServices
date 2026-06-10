# 🚀 Yuri's API Notes

---

# Yuri's Backend API Development Framework

Before writing any FastAPI code, ask these 6 questions:

## 1. What feature am I building?

Examples:

* Services Management
* Tutor Availability
* Bookings
* Translation Requests
* Payments
* Notifications
* Authentication

---

## 2. What data do I need?

List every piece of information required.

Example (Availability):

* tutor_id
* day
* start_time
* end_time
* is_active

---

## 3. What should the schema look like?

Define the shape and validation rules for the data.

Ask:

* What fields are required?
* What data types are needed?
* What should be optional?

---

## 4. What endpoints do I need?

Think in CRUD.

Create
Read
Update
Delete

Example:

* POST /availability
* GET /availability
* GET /availability/{id}
* PUT /availability/{id}
* DELETE /availability/{id}

---

## 5. Where will the data be stored?

Examples:

* Temporary List (testing)
* PostgreSQL
* Redis
* AWS S3

Ask:

* What is the source of truth?
* How will data persist?

---

## 6. What response should I return?

Success Examples:

* Service Created
* Availability Updated
* Booking Deleted

Error Examples:

* Service Not Found
* Invalid Request
* Unauthorized

---

# Mental Model

Request
↓
Schema Validation
↓
Route Logic
↓
Model / Database
↓
Response
↓
Frontend

Never start coding before answering all six questions.

---

# FastAPI Architecture

## Schema

Purpose:

Defines what valid data looks like.

Questions:

* What fields are required?
* What data types are expected?
* What should be optional?

Examples:

* ServiceCreate
* ServiceResponse
* BookingCreate

Think:

Schema = Shape of Data

---

## Route

Purpose:

Handles incoming requests.

Questions:

* What action should happen?
* Create?
* Read?
* Update?
* Delete?

Think:

Route = Action

---

## Model

Purpose:

Represents stored data.

Current:

* Python List

Future:

* PostgreSQL
* SQLAlchemy Models

Think:

Model = Data Storage

---

## Response

Purpose:

Return information to frontend.

Examples:

* Service Created
* Booking Updated
* Not Found

Think:

Response = What frontend receives

---

# CRUD

## Create

POST

Creates new records.

Examples:

* Create Service
* Create Booking

---

## Read

GET

Retrieve records.

Examples:

* Get Services
* Get Availability

---

## Update

PUT

Modify records.

Examples:

* Update Service
* Update Booking

---

## Delete

DELETE

Remove records.

Examples:

* Delete Service
* Delete Availability

---

# FastAPI Request Lifecycle

1. Request Arrives

↓

2. Schema Validates Data

↓

3. Route Executes Logic

↓

4. Database Is Accessed

↓

5. Response Returned

↓

6. Frontend Receives JSON

---

# API Design Checklist

Before building any endpoint:

* What problem am I solving?
* What data is needed?
* What schema is required?
* What route is required?
* Where is data stored?
* What should be returned?
* What errors can occur?

---

# Nee's Learning Management APIs

## Services

Purpose:

Manage Haitian Creole tutoring services.

CRUD:

* Create Service
* View Service
* Update Service
* Delete Service

Status:

✅ Completed

---

## Availability

Purpose:

Manage tutor schedules.

Data:

* tutor_id
* day
* start_time
* end_time
* is_active

Status:

⏳ In Progress

---

## Bookings

Purpose:

Allow students to reserve tutoring sessions.

Potential Data:

* student_id
* tutor_id
* service_id
* date
* start_time
* end_time
* status

Status:

🔜 Next

---

## Translation Requests

Purpose:

Manage translation jobs.

Potential Data:

* customer_id
* source_language
* target_language
* file_url
* status

Status:

🔜 Future

---

# PostgreSQL Notes

When Ready:

Replace:

Python Lists

With:

PostgreSQL Database

Benefits:

* Data persists after restart
* Relationships between tables
* Production ready
* Scalable

Tables Planned:

* services
* availability
* bookings
* translation_requests
* users

---

# Common Backend Rule

Don't start coding.

Think first:

1. Feature
2. Data
3. Schema
4. Routes
5. Storage
6. Response

Then build.
