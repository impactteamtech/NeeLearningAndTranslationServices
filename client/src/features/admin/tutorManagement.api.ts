import { API_BASE_PATH } from "../../config/api";
import { apiRequest } from "../../lib/apiClient";
import type {
  RegisteredTutor,
  RegisterTutorInput,
  ServiceWithTutorResponse,
  TutorService,
  TutorWithServices,
} from "./tutorManagementTypes";

const toStringArray = (value?: string[] | string | null) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const toNumberOrNull = (value?: number | string | null) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return null;
};

const toText = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() ? value : fallback;

const normalizeService = (service: ServiceWithTutorResponse): TutorService => ({
  id: service.id ?? crypto.randomUUID(),
  name: toText(service.name, "Untitled service"),
  description: toText(service.description),
  category: toText(service.category),
  language: toText(service.language),
  durationMinutes: toNumberOrNull(service.duration_minutes),
  price: toNumberOrNull(service.price),
  isActive: service.is_active ?? false,
});

export const normalizeTutorsWithServices = (
  services: ServiceWithTutorResponse[]
): TutorWithServices[] => {
  const grouped = new Map<string, TutorWithServices>();

  services.forEach((service) => {
    const tutor = service.tutor;
    const tutorId = tutor?.tutor_id ?? tutor?.id;
    if (tutorId === undefined || tutorId === null || tutorId === "") return;

    const key = String(tutorId);
    const existing = grouped.get(key);
    const serviceItem = normalizeService(service);

    if (existing) {
      existing.services.push(serviceItem);
      return;
    }

    grouped.set(key, {
      tutorId,
      fullName: toText(tutor?.full_name, `Tutor #${tutorId}`),
      email: toText(tutor?.email),
      bio: tutor?.bio ?? null,
      specialization: toStringArray(tutor?.specialization),
      yearsOfExperience: toNumberOrNull(tutor?.years_of_experience),
      hourlyRate: toNumberOrNull(tutor?.hourly_rate),
      meetingPlatforms: toStringArray(tutor?.meeting_platform),
      isVerified: tutor?.is_verified ?? false,
      services: [serviceItem],
    });
  });

  return Array.from(grouped.values()).sort((a, b) =>
    a.fullName.localeCompare(b.fullName)
  );
};

export const tutorManagementApi = {
  registerTutor: (payload: RegisterTutorInput) =>
    apiRequest<RegisteredTutor>(
      `${API_BASE_PATH}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          full_name: payload.fullName,
          role: "tutor",
        }),
      },
      true
    ),

  getTutorsWithServices: async () => {
    const services = await apiRequest<ServiceWithTutorResponse[]>(
      `${API_BASE_PATH}/services/with-tutors`,
      {},
      true
    );

    return normalizeTutorsWithServices(services);
  },
};
