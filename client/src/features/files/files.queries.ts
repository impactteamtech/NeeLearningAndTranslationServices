import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { filesApi } from "../../lib/api/files.api";
import { queryKeys } from "../../lib/query/queryKeys";

export const useAdminTranslationRequests = () =>
  useQuery({
    queryKey: queryKeys.admin.translationRequests,
    queryFn: filesApi.getTranslationRequests,
    retry: false,
    staleTime: 60_000,
  });

export const useAdminFile = (fileId?: number | string) =>
  useQuery({
    queryKey: queryKeys.admin.file(fileId ?? "none"),
    queryFn: () => filesApi.getUploadById(fileId as number | string),
    enabled: fileId !== undefined && fileId !== "",
    retry: 1,
  });

export const useAdminTranslationRequestFiles = (
  translationRequestId?: number | string
) =>
  useQuery({
    queryKey: queryKeys.admin.requestFiles(translationRequestId ?? "none"),
    queryFn: () =>
      filesApi.getByTranslationRequest(translationRequestId as number | string),
    enabled: translationRequestId !== undefined && translationRequestId !== "",
    retry: 1,
  });

export const useAdminTranslationRequestFileLists = (
  translationRequestIds: Array<number | string>
) =>
  useQueries({
    queries: [...new Set(translationRequestIds)]
      .filter((translationRequestId) => String(translationRequestId).trim() !== "")
      .map((translationRequestId) => ({
        queryKey: queryKeys.admin.requestFiles(translationRequestId),
        queryFn: () => filesApi.getByTranslationRequest(translationRequestId),
        retry: 1,
        staleTime: 60_000,
      })),
  });

export const useDeleteAdminFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: filesApi.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "files"],
      });
    },
  });
};
