  import { tokenStorage } from "../features/auth/tokenStorage";

export const API_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV
    ? ""
    : "https://neelearningandtranslationservices.onrender.com")
).replace(/\/$/, "");

type ApiErrorBody = {
  detail?: string | Array<{ loc?: Array<string | number>; msg?: string }>;
  message?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const getErrorMessage = (body: ApiErrorBody, fallback: string) => {
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail)) {
    return body.detail
      .map((error) => {
        const field = error.loc?.filter((item) => item !== "body").join(".");
        return [field, error.msg].filter(Boolean).join(": ");
      })
      .filter(Boolean)
      .join(", ");
  }
  return body.message ?? fallback;
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  authenticated = false
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const token = tokenStorage.get();
    if (!token) throw new ApiError("You are not authenticated.", 401);
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    throw new ApiError(
      getErrorMessage(body, `Request failed with status ${response.status}.`),
      response.status
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
