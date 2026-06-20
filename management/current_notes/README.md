## Business Services

### Language Learning Services

```text
✅ One-on-One Tutoring
✅ Beginner Haitian Creole
✅ Intermediate Haitian Creole
✅ Advanced Haitian Creole
✅ Student Progress Tracking
✅ Lesson Scheduling
```

### Translation Services

```text
✅ Document Translation
✅ Business Translation
✅ Educational Translation
✅ Haitian Creole ↔ French
✅French ↔ Haitian Creole
✅ Certified Translation Requests (Planned)
✅ Translation Order Tracking (Planned)
```

### Documentation Translation Services

The platform will support translation of:

```text
📄 Legal Documents
📄 Immigration Documents
📄 Birth Certificates
📄 Marriage Certificates
📄 Academic Transcripts
📄 Diplomas
📄 Medical Documents
📄 Employment Documents
📄 Business Documents
📄 Contracts
📄 Technical Documentation
📄 User Manuals
📄 Website Content
```

---

## Updated Frontend / Backend Communication

```text
React Frontend
│
├── Tutoring Portal
│
├── Booking Portal
│
├── Translation Request Portal
│
├── Document Upload Portal
│
└── Student Dashboard
        │
        ▼
FastAPI Management API
│
├── Services API
│
├── Availability API
│
├── Booking API
│
├── Translation Request API
│
├── Document Management API
│
└── Authentication API
        │
        ▼
Supabase PostgreSQL
```

---

## Future Translation Workflow

```text
Client uploads document
        │
        ▼
Frontend sends file metadata
        │
        ▼
Translation Request API
        │
        ▼
Supabase Database
        │
        ▼
Translator Assigned
        │
        ▼
Translation Completed
        │
        ▼
Client Downloads Final Translation
```

---

## Planned Translation Request Table

```text
translation_requests

├── id
├── customer_id
├── source_language
├── target_language
├── document_name
├── document_type
├── status
├── requested_date
├── completed_date
├── translator_id
├── price
└── notes
```

---

## Planned File Storage

```text
Supabase Storage

├── Translation Documents
├── Client Uploads
├── Completed Translations
└── Supporting Documents
```
