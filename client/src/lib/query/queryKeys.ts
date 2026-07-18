export const queryKeys = {
  auth: {
    user: ["auth", "user"] as const,
  },
  admin: {
    services: ["admin", "services"] as const,
    service: (id: number | string) => ["admin", "services", id] as const,
    teacherServices: (teacherId: number | string) =>
      ["admin", "services", "teacher", teacherId] as const,
    availability: ["admin", "availability"] as const,
    availabilitySlot: (id: number | string) => ["admin", "availability", id] as const,
    teacherAvailability: (teacherId: number | string) =>
      ["admin", "availability", "teacher", teacherId] as const,
    bookings: ["admin", "bookings"] as const,
    booking: (id: number | string) => ["admin", "bookings", id] as const,
    studentBookings: (studentId: number | string) =>
      ["admin", "bookings", "student", studentId] as const,
    teacherBookings: (teacherId: number | string) =>
      ["admin", "bookings", "teacher", teacherId] as const,
    translationRequests: ["admin", "translation-requests"] as const,
    file: (id: number | string) => ["admin", "files", id] as const,
    requestFiles: (requestId: number | string) =>
      ["admin", "files", "translation-request", requestId] as const,
  },
};
