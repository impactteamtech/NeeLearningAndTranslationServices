import { useQuery } from "@tanstack/react-query";
import { availabilityApi } from "../../lib/api/availability.api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useAdminAvailability = () =>
  useQuery({
    queryKey: queryKeys.admin.availability,
    queryFn: availabilityApi.list,
    retry: 1,
  });

export const useAdminAvailabilitySlot = (availabilityId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.availabilitySlot(availabilityId ?? "none"),
    queryFn: () => availabilityApi.getById(availabilityId as number | string),
    enabled: availabilityId !== undefined && availabilityId !== "",
    retry: 1,
  });

export const useAdminTeacherAvailability = (teacherId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.teacherAvailability(teacherId ?? "none"),
    queryFn: () => availabilityApi.getByTeacher(teacherId as number | string),
    enabled: teacherId !== undefined && teacherId !== "",
    retry: 1,
  });
