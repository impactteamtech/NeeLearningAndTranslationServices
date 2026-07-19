import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "./adminApi";

export const adminKeys = {
  teacherProfiles: ["admin", "teacher-profiles"] as const,
  users: ["admin", "users"] as const,
  services: ["admin", "services"] as const,
  availability: ["admin", "availability"] as const,
  bookings: ["admin", "bookings"] as const,
};

export const useTeacherProfiles = () =>
  useQuery({
    queryKey: adminKeys.teacherProfiles,
    queryFn: adminApi.getTeacherProfiles,
    staleTime: 60_000,
  });

export const useCreateTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.createTutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.teacherProfiles });
      queryClient.invalidateQueries({ queryKey: adminKeys.users });
    },
  });
};

export const useAdminUsers = () =>
  useQuery({
    queryKey: adminKeys.users,
    queryFn: adminApi.getUsers,
    retry: 1,
    staleTime: 5 * 60_000,
  });

export const useAdminServices = () =>
  useQuery({
    queryKey: adminKeys.services,
    queryFn: adminApi.getServices,
    staleTime: 5 * 60_000,
  });

export const useAdminAvailability = () =>
  useQuery({
    queryKey: adminKeys.availability,
    queryFn: adminApi.getAvailability,
    staleTime: 5 * 60_000,
  });

export const useAdminBookings = () =>
  useQuery({
    queryKey: adminKeys.bookings,
    queryFn: adminApi.getBookings,
    retry: 1,
    staleTime: 60_000,
  });
