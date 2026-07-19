import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheck,
  FiClipboard,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiEye,
  FiFileText,
  FiRefreshCw,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { useCurrentUser } from "../../features/auth/authQueries";
import {
  learnerKeys,
  useDeleteTranslationFile,
  useTranslateText,
  useTranslationFile,
  useTranslationLanguages,
  useTranslationRequestFileLists,
  useUploadTranslationFile,
} from "../../features/learner/learnerQueries";
import {
  learnerFileUploadSchema,
  MAX_QUICK_TRANSLATION_CHARACTERS,
  quickTranslationSchema,
  type LearnerFileUploadValues,
  type QuickTranslationValues,
} from "../../features/learner/learnerFiles.schema";
import type { TranslationFile, TranslationItem } from "../../features/learner/learnerTypes";
import { getErrorMessage } from "../ui/adminFormat";

const lastRequestStorageKey = (userId?: number) =>
  userId ? `nee-last-translation-request:${userId}` : "";

const requestIdsStorageKey = (userId?: number) =>
  userId ? `nee-translation-request-ids:${userId}` : "";

const normalizeRequestIds = (requestIds: number[]) =>
  [...new Set(requestIds)].filter((requestId) => Number.isInteger(requestId) && requestId > 0);

const readLastRequestId = (userId?: number) => {
  const key = lastRequestStorageKey(userId);
  if (!key || typeof window === "undefined") return undefined;

  const parsed = Number(window.localStorage.getItem(key));
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
};

const readStoredRequestIds = (userId?: number) => {
  const key = requestIdsStorageKey(userId);
  if (!key || typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown;
    const storedIds = Array.isArray(parsed) ? parsed.map(Number) : [];
    const legacyId = readLastRequestId(userId);
    return normalizeRequestIds(legacyId ? [legacyId, ...storedIds] : storedIds);
  } catch {
    const legacyId = readLastRequestId(userId);
    return legacyId ? [legacyId] : [];
  }
};

const writeStoredRequestIds = (userId: number, requestIds: number[]) => {
  const key = requestIdsStorageKey(userId);
  if (!key || typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(normalizeRequestIds(requestIds)));
};

const rememberRequestId = (userId: number, requestId: number) => {
  writeStoredRequestIds(userId, [requestId, ...readStoredRequestIds(userId)]);

  const key = lastRequestStorageKey(userId);
  if (!key || typeof window === "undefined") return;
  window.localStorage.setItem(key, String(requestId));
};

const generateTranslationRequestId = () =>
  Math.floor(Date.now() / 1000);

const formatFileSize = (bytes?: number) => {
  if (!Number.isFinite(bytes) || !bytes) return "Unknown size";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (value?: string) => {
  if (!value) return "Unknown date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const fileKind = (fileName?: string, fileType?: string) => {
  const extension = fileName?.match(/\.([a-z0-9]+)$/i)?.[1]?.toUpperCase();
  return extension || fileType || "FILE";
};

const looksLikeProviderError = (text?: string) =>
  /invalid (?:source |target )?language|translation (?:request )?failed|provider (?:failed|error|unavailable)|service unavailable|too many requests|rate limit|quota (?:exceeded|reached)|langpair=.*(?:iso|rfc)|all providers failed/i.test(
    text ?? "",
  );

const translationErrorMessage = (item?: TranslationItem) =>
  item?.error?.trim() ||
  (looksLikeProviderError(item?.translated) ? item?.translated.trim() : "");

const hasTranslationError = (item?: TranslationItem) =>
  Boolean(translationErrorMessage(item));

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1.5 text-xs font-bold text-red-600">{message}</p> : null;

const Notice = ({
  tone,
  children,
}: {
  tone: "success" | "error" | "info";
  children: React.ReactNode;
}) => {
  const classes = {
    success: "border-emerald-100 bg-emerald-50 text-emerald-700",
    error: "border-red-100 bg-red-50 text-red-700",
    info: "border-blue-100 bg-blue-50 text-haiti-navy",
  };

  return (
    <div className={`rounded-2xl border p-4 text-sm font-semibold ${classes[tone]}`}>
      {children}
    </div>
  );
};

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
    <div>
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
        <FiFileText className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-extrabold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    </div>
  </div>
);

const TranslationResult = ({
  result,
  provider,
  copied,
  onCopy,
}: {
  result?: TranslationItem;
  provider?: string;
  copied: boolean;
  onCopy: () => void;
}) => {
  if (!result) {
    return (
      <EmptyState
        title="No translation yet"
        description="Enter text, choose a target language, and your translated result will appear here."
      />
    );
  }

  const errorMessage = translationErrorMessage(result);

  if (errorMessage) {
    return (
      <Notice tone="error">
        <span className="flex items-center gap-2 font-extrabold">
          <FiAlertCircle /> Translation failed.
        </span>
        <span className="mt-2 block whitespace-pre-wrap break-words leading-6">
          {errorMessage}
        </span>
        <span className="mt-2 block text-xs">Provider: {result.provider || provider || "Unknown"}</span>
      </Notice>
    );
  }

  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-600">Translation ready</p>
          <h3 className="mt-1 text-base font-extrabold text-slate-950">Translated text</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Provider: {result.provider || provider || "Automatic"}
          </p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-xs font-extrabold transition ${
            copied
              ? "bg-emerald-50 text-emerald-700"
              : "bg-blue-50 text-haiti-navy hover:bg-haiti-navy hover:text-white"
          }`}
        >
          {copied ? <FiCheck className="size-4" /> : <FiCopy className="size-4" />}
          {copied ? "Copied" : "Copy translated text"}
        </button>
      </div>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="whitespace-pre-wrap break-words text-base font-semibold leading-8 text-slate-900">
          {result.translated}
        </p>
      </div>
      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Original text</p>
        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
          {result.original}
        </p>
      </div>
    </article>
  );
};

const FileUploadProgress = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? (
    <div className="mt-4 overflow-hidden rounded-full bg-blue-50">
      <div className="h-2 w-1/2 animate-pulse rounded-full bg-haiti-navy" />
    </div>
  ) : null;

const TranslationFileCard = ({
  file,
  canDelete,
  onDetails,
  onDelete,
}: {
  file: TranslationFile;
  canDelete: boolean;
  onDetails: () => void;
  onDelete: () => void;
}) => (
  <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,.035)]">
    <div className="flex min-w-0 items-start gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-haiti-navy">
        <FiFileText className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-extrabold text-slate-950">{file.file_name}</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              File #{file.id} - {fileKind(file.file_name, file.file_type)} - {formatFileSize(file.file_size)}
            </p>
          </div>
          <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-600">
            Request #{file.related_translation_request_id}
          </span>
        </div>

        <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
          <div>
            <dt className="font-bold uppercase tracking-[0.12em] text-slate-400">Uploaded</dt>
            <dd className="mt-1 font-semibold text-slate-700">{formatDate(file.created_at)}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-[0.12em] text-slate-400">Uploader</dt>
            <dd className="mt-1 font-semibold text-slate-700">User #{file.uploaded_by_user_id}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-[0.12em] text-slate-400">Type</dt>
            <dd className="mt-1 font-semibold text-slate-700">{file.file_type || "Unknown"}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onDetails}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-haiti-navy"
          >
            Details <FiEye className="size-4" />
          </button>
          {file.file_url ? (
            <>
              <a
                href={file.file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-haiti-navy"
              >
                Open <FiExternalLink className="size-4" />
              </a>
              <a
                href={file.file_url}
                download={file.file_name}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-haiti-navy px-3 text-xs font-extrabold text-white transition hover:bg-haiti-navy-dark"
              >
                Download <FiDownload className="size-4" />
              </a>
            </>
          ) : null}
          {canDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-xs font-extrabold text-red-700 transition hover:bg-red-100"
            >
              Delete <FiTrash2 className="size-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  </article>
);

const TranslationFileDetailsDrawer = ({
  fileId,
  onClose,
}: {
  fileId?: number;
  onClose: () => void;
}) => {
  const fileQuery = useTranslationFile(fileId);

  if (!fileId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 p-4 backdrop-blur-sm">
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-haiti-red">File Details</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">File #{fileId}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Close file details"
          >
            <FiX className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {fileQuery.isLoading ? (
            <div className="space-y-3">
              <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
              <div className="h-32 animate-pulse rounded-2xl bg-slate-100" />
            </div>
          ) : fileQuery.isError ? (
            <Notice tone="error">File details could not be loaded. {getErrorMessage(fileQuery.error)}</Notice>
          ) : fileQuery.data ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-lg font-extrabold text-slate-950">{fileQuery.data.file_name}</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {fileKind(fileQuery.data.file_name, fileQuery.data.file_type)} - {formatFileSize(fileQuery.data.file_size)}
                </p>
              </div>
              <dl className="grid gap-3 text-sm">
                {[
                  ["File ID", `#${fileQuery.data.id}`],
                  ["File type", fileQuery.data.file_type || "Unknown"],
                  ["File size", formatFileSize(fileQuery.data.file_size)],
                  ["Uploaded", formatDate(fileQuery.data.created_at)],
                  ["Uploader", `User #${fileQuery.data.uploaded_by_user_id}`],
                  ["Translation request", `Request #${fileQuery.data.related_translation_request_id}`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-100 p-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{label}</dt>
                    <dd className="mt-1 font-semibold text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>
              {fileQuery.data.file_url ? (
                <a
                  href={fileQuery.data.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-haiti-navy px-4 text-sm font-extrabold text-white transition hover:bg-haiti-navy-dark"
                >
                  Open file <FiExternalLink className="size-4" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
};

const DeleteFileDialog = ({
  file,
  isDeleting,
  error,
  onCancel,
  onConfirm,
}: {
  file: TranslationFile | null;
  isDeleting: boolean;
  error?: unknown;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <span className="grid size-12 place-items-center rounded-2xl bg-red-50 text-red-700">
          <FiTrash2 className="size-5" />
        </span>
        <h2 className="mt-4 text-xl font-extrabold text-slate-950">Delete this file?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          This action will remove <span className="font-extrabold text-slate-800">{file.file_name}</span> from the translation request and may not be reversible.
        </p>
        {error ? (
          <div className="mt-4">
            <Notice tone="error">Delete failed. {getErrorMessage(error)}</Notice>
          </div>
        ) : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-extrabold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? <FiRefreshCw className="size-4 animate-spin" /> : <FiTrash2 className="size-4" />}
            Delete file
          </button>
        </div>
      </div>
    </div>
  );
};

export const LearnerFilesPage = () => {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const languagesQuery = useTranslationLanguages();
  const translateText = useTranslateText();
  const uploadFile = useUploadTranslationFile();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [uploadedRequestIds, setUploadedRequestIds] = useState<number[]>([]);
  const [detailsFileId, setDetailsFileId] = useState<number>();
  const [deleteTarget, setDeleteTarget] = useState<TranslationFile | null>(null);

  const quickForm = useForm<QuickTranslationValues>({
    defaultValues: { sourceText: "", target: "" },
  });
  const uploadForm = useForm<LearnerFileUploadValues>({
    defaultValues: {},
  });

  const sourceText = useWatch({ control: quickForm.control, name: "sourceText" }) ?? "";
  const target = useWatch({ control: quickForm.control, name: "target" }) || "";
  const selectedUploadFile = useWatch({ control: uploadForm.control, name: "file" });
  const result = translateText.data?.translations?.[0];
  const languages = languagesQuery.data?.languages ?? [];
  const selectedLanguage = languages.find((language) => language.code === target);
  const requestIds = normalizeRequestIds([...uploadedRequestIds, ...readStoredRequestIds(user?.id)]);

  const requestFileQueries = useTranslationRequestFileLists(requestIds);
  const deleteFile = useDeleteTranslationFile();

  const submitQuickTranslation = (values: QuickTranslationValues) => {
    const parsed = quickTranslationSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof QuickTranslationValues;
        quickForm.setError(field, { message: issue.message });
      });
      return;
    }

    setCopied(false);
    translateText.mutate({
      texts: [parsed.data.sourceText],
      target: parsed.data.target,
    });
  };

  const clearQuickTranslation = () => {
    quickForm.reset({ sourceText: "", target });
    translateText.reset();
    setCopied(false);
  };

  const copyTranslatedText = async () => {
    if (!result?.translated || hasTranslationError(result)) return;
    try {
      await navigator.clipboard.writeText(result.translated);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const chooseFile = (file: File | null) => {
    if (file) {
      uploadForm.setValue("file", file, { shouldDirty: true, shouldValidate: true });
    } else {
      uploadForm.resetField("file");
    }
    uploadForm.clearErrors("file");
  };

  const submitUpload = (values: LearnerFileUploadValues) => {
    const parsed = learnerFileUploadSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LearnerFileUploadValues;
        uploadForm.setError(field, { message: issue.message });
      });
      return;
    }

    if (!user?.id) {
      uploadForm.setError("file", { message: "Sign in again before uploading." });
      return;
    }

    const formData = new FormData();
    const generatedRequestId = generateTranslationRequestId();
    formData.append("file", parsed.data.file);
    formData.append("uploaded_by_user_id", String(user.id));
    formData.append("related_translation_request_id", String(generatedRequestId));

    uploadFile.mutate(formData, {
      onSuccess: async () => {
        toast.success("Your file was uploaded successfully.");
        setUploadedRequestIds((current) => normalizeRequestIds([generatedRequestId, ...current]));
        rememberRequestId(user.id, generatedRequestId);
        setFileInputKey((key) => key + 1);
        uploadForm.reset();
        await queryClient.invalidateQueries({
          queryKey: learnerKeys.translationRequestFiles(generatedRequestId),
        });
      },
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteFile.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("File deleted.");
        setDeleteTarget(null);
      },
    });
  };

  const requestFiles = [
    ...new Map(
      requestFileQueries
        .flatMap((query) => query.data ?? [])
        .map((file) => [file.id, file] as const),
    ).values(),
  ].sort((first, second) => {
    const firstDate = new Date(first.created_at).getTime();
    const secondDate = new Date(second.created_at).getTime();
    if (Number.isFinite(firstDate) && Number.isFinite(secondDate) && firstDate !== secondDate) {
      return secondDate - firstDate;
    }
    return second.id - first.id;
  });
  const requestFilesError = requestFileQueries.find((query) => query.isError)?.error;
  const requestFilesLoading = requestFileQueries.some((query) => query.isLoading);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-linear-to-br from-haiti-navy via-[#083b8d] to-haiti-navy-dark px-5 py-7 text-white shadow-[0_18px_50px_rgba(6,67,159,.18)] sm:px-8 sm:py-9">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
          <FiClipboard /> Learner translation portal
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Translation Center
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100">
          Translate text and manage files associated with your translation requests.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_14px_45px_rgba(15,23,42,.055)] xl:grid-cols-[minmax(0,1fr)_minmax(0,.92fr)]">
        <form
          onSubmit={quickForm.handleSubmit(submitQuickTranslation)}
          className="border-b border-slate-200 p-5 sm:p-6 xl:border-b-0 xl:border-r"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-haiti-red">Quick Translation</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">Translate text directly</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                This uses the real translation API and does not create a translation request.
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-haiti-navy">
              <FiClipboard className="size-5" />
            </span>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Text to translate
            </span>
            <textarea
              {...quickForm.register("sourceText")}
              maxLength={MAX_QUICK_TRANSLATION_CHARACTERS}
              placeholder="Enter text to translate..."
              className="min-h-56 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-haiti-navy focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <FieldError message={quickForm.formState.errors.sourceText?.message} />
              {!quickForm.formState.errors.sourceText ? (
                <p className="text-xs font-semibold text-slate-400">Quick translations are not saved as requests.</p>
              ) : null}
              <span className="text-xs font-semibold text-slate-400">
                {sourceText.length.toLocaleString()} / {MAX_QUICK_TRANSLATION_CHARACTERS.toLocaleString()}
              </span>
            </div>
          </label>

          <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-end">
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                Target language
              </span>
              <select
                {...quickForm.register("target")}
                disabled={languagesQuery.isLoading || languagesQuery.isError || languages.length === 0}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 outline-none transition hover:border-slate-300 focus:border-haiti-navy focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-wait disabled:opacity-60"
              >
                <option value="">Select language</option>
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name} ({language.code.toUpperCase()})
                  </option>
                ))}
              </select>
              <FieldError message={quickForm.formState.errors.target?.message} />
            </label>
            <button
              type="button"
              onClick={clearQuickTranslation}
              disabled={!sourceText && !translateText.data && !translateText.error}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={translateText.isPending || !sourceText.trim() || !target}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-haiti-navy px-6 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(6,67,159,.20)] transition hover:-translate-y-0.5 hover:bg-haiti-navy-dark disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
            >
              {translateText.isPending ? (
                <>
                  <FiRefreshCw className="size-4 animate-spin" /> Translating
                </>
              ) : (
                <>
                  Translate <FiArrowRight className="size-4" />
                </>
              )}
            </button>
          </div>

          {languagesQuery.isError ? (
            <div className="mt-4">
              <Notice tone="error">Target languages could not be loaded. {getErrorMessage(languagesQuery.error)}</Notice>
            </div>
          ) : null}
        </form>

        <div className="bg-slate-50/60 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Translation result</p>
              <p className="mt-1 text-sm font-extrabold text-slate-950">
                {selectedLanguage ? `Target: ${selectedLanguage.name}` : "Choose a language"}
              </p>
            </div>
            {translateText.isPending ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-haiti-navy">
                <FiRefreshCw className="size-3.5 animate-spin" /> Loading
              </span>
            ) : null}
          </div>

          {translateText.isError ? (
            <Notice tone="error">Translation failed. {getErrorMessage(translateText.error)}</Notice>
          ) : translateText.isPending ? (
            <div className="grid min-h-56 place-items-center rounded-2xl border border-blue-100 bg-blue-50/60 p-8 text-center">
              <div>
                <span className="mx-auto block size-8 animate-spin rounded-full border-[3px] border-blue-200 border-t-haiti-navy" />
                <p className="mt-4 text-sm font-extrabold text-slate-900">Translating your text...</p>
              </div>
            </div>
          ) : (
            <TranslationResult
              result={result}
              provider={translateText.data?.provider}
              copied={copied}
              onCopy={copyTranslatedText}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <form
          onSubmit={uploadForm.handleSubmit(submitUpload)}
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,.045)] sm:p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-haiti-red">Upload File</p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">Attach a file to a request</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Choose a PDF or document. The translation request number and your learner ID are handled automatically.
          </p>

          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click();
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              chooseFile(event.dataTransfer.files.item(0));
            }}
            className="mt-6 grid min-h-44 cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-5 text-center transition hover:border-haiti-navy hover:bg-blue-50"
          >
            <input
              key={fileInputKey}
              ref={fileInputRef}
              type="file"
              className="sr-only"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={(event) => chooseFile(event.target.files?.item(0) ?? null)}
            />
            <div>
              <FiUploadCloud className="mx-auto size-8 text-haiti-navy" />
              <p className="mt-3 text-sm font-extrabold text-slate-900">
                {selectedUploadFile ? selectedUploadFile.name : "Drop a file here or click to browse"}
              </p>
              <p className="mt-1 text-xs text-slate-500">PDF, DOC, DOCX, TXT, and RTF are accepted.</p>
            </div>
          </div>
          <FieldError message={uploadForm.formState.errors.file?.message} />

          {selectedUploadFile ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="truncate text-sm font-extrabold text-slate-900">{selectedUploadFile.name}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {selectedUploadFile.type || "Unknown type"} - {formatFileSize(selectedUploadFile.size)}
              </p>
            </div>
          ) : null}

          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold leading-6 text-haiti-navy">
            A translation request number will be generated automatically when you upload.
          </div>

          {uploadFile.isError ? (
            <div className="mt-4">
              <Notice tone="error">Upload failed. {getErrorMessage(uploadFile.error)}</Notice>
            </div>
          ) : null}
          <FileUploadProgress isVisible={uploadFile.isPending} />

          <button
            type="submit"
            disabled={uploadFile.isPending}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-haiti-navy px-6 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(6,67,159,.20)] transition hover:-translate-y-0.5 hover:bg-haiti-navy-dark disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
          >
            {uploadFile.isPending ? (
              <>
                <FiRefreshCw className="size-4 animate-spin" /> Uploading
              </>
            ) : (
              <>
                Upload file <FiArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,.045)] sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-haiti-red">Translation Request Files</p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">All requested files</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            After you upload PDFs or documents, every tracked translation request file appears here automatically.
          </p>

          {requestIds.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-extrabold">
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-haiti-navy">
                {requestIds.length} request{requestIds.length === 1 ? "" : "s"} tracked
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">
                {requestFiles.length} file{requestFiles.length === 1 ? "" : "s"}
              </span>
            </div>
          ) : null}

          <div className="mt-5 space-y-3">
            {requestIds.length === 0 ? (
              <EmptyState
                title="No translated documents uploaded yet"
                description="Upload a PDF or document using the form on the left. After that, this page remembers each request and reloads all of its files after refresh."
              />
            ) : requestFilesLoading ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-500">Loading files for your translation requests...</p>
                <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
              </div>
            ) : requestFilesError ? (
              <Notice tone="error">Files could not be loaded. {getErrorMessage(requestFilesError)}</Notice>
            ) : requestFiles.length === 0 ? (
              <EmptyState
                title="No files have been uploaded for these translation requests."
                description="Upload a file using the card on the left, then the file list will refresh automatically."
              />
            ) : (
              requestFiles.map((file) => (
                <TranslationFileCard
                  key={file.id}
                  file={file}
                  canDelete={file.uploaded_by_user_id === user?.id}
                  onDetails={() => setDetailsFileId(file.id)}
                  onDelete={() => {
                    deleteFile.reset();
                    setDeleteTarget(file);
                  }}
                />
              ))
            )}
          </div>
        </section>
      </div>

      <TranslationFileDetailsDrawer fileId={detailsFileId} onClose={() => setDetailsFileId(undefined)} />
      <DeleteFileDialog
        file={deleteTarget}
        isDeleting={deleteFile.isPending}
        error={deleteFile.error}
        onCancel={() => {
          if (!deleteFile.isPending) setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
      />
    </section>
  );
};
