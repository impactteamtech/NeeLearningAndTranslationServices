import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "../../lib/api/services.api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useAdminServices = () =>
  useQuery({
    queryKey: queryKeys.admin.services,
    queryFn: servicesApi.list,
    retry: 1,
  });

export const useAdminService = (serviceId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.service(serviceId ?? "none"),
    queryFn: () => servicesApi.getById(serviceId as number | string),
    enabled: serviceId !== undefined && serviceId !== "",
    retry: 1,
  });

export const useAdminTeacherServices = (teacherId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.teacherServices(teacherId ?? "none"),
    queryFn: () => servicesApi.getByTeacher(teacherId as number | string),
    enabled: teacherId !== undefined && teacherId !== "",
    retry: 1,
  });
