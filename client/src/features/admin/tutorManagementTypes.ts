import type { AuthUser } from "../auth/authTypes";

export type RegisterTutorInput = {
  fullName: string;
  email: string;
  password: string;
};

export type RegisteredTutor = AuthUser;

export type TutorService = {
  id: number | string;
  name: string;
  description: string;
  category: string;
  language: string;
  durationMinutes: number | null;
  price: number | null;
  isActive: boolean;
};

export type TutorWithServices = {
  tutorId: number | string;
  fullName: string;
  email: string;
  bio: string | null;
  specialization: string[];
  yearsOfExperience: number | null;
  hourlyRate: number | null;
  meetingPlatforms: string[];
  isVerified: boolean;
  services: TutorService[];
};

export type ServiceWithTutorResponse = {
  id?: number | string;
  name?: string | null;
  description?: string | null;
  category?: string | null;
  language?: string | null;
  duration_minutes?: number | string | null;
  price?: number | string | null;
  is_active?: boolean | null;
  tutor?: {
    tutor_id?: number | string | null;
    id?: number | string | null;
    full_name?: string | null;
    email?: string | null;
    bio?: string | null;
    specialization?: string[] | string | null;
    years_of_experience?: number | string | null;
    hourly_rate?: number | string | null;
    meeting_platform?: string[] | string | null;
    is_verified?: boolean | null;
  } | null;
};
