import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/query/queryKeys";
import { tutorManagementApi } from "./tutorManagement.api";

export const tutorQueryKeys = {
  all: ["admin", "tutors"] as const,
  withServices: () => ["admin", "tutors", "with-services"] as const,
};

export const useTutorsWithServices = () =>
  useQuery({
    queryKey: tutorQueryKeys.withServices(),
    queryFn: tutorManagementApi.getTutorsWithServices,
    retry: 1,
  });

export const useRegisterTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tutorManagementApi.registerTutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tutorQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.services });
    },
  });
};
