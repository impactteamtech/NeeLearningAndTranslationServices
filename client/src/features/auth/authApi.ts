import { apiRequest } from "../../lib/apiClient";
import type {
  AuthToken,
  AuthUser,
  GoogleAuthorization,
  LoginInput,
  RegisterInput,
} from "./authTypes";

export const authApi = {
  register: (input: RegisterInput) =>
    apiRequest<AuthUser>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  login: (input: LoginInput) =>
    apiRequest<AuthToken>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  logout: () =>
    apiRequest<unknown>(
      "/api/v1/auth/logout",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      true
    ),

  getMe: () => apiRequest<AuthUser>("/api/v1/auth/me", {}, true),

  getGoogleAuthorization: () =>
    apiRequest<GoogleAuthorization>("/api/v1/auth/google/login"),

  exchangeGoogleCode: (code: string) =>
    apiRequest<AuthToken>(
      `/api/v1/auth/google/callback?code=${encodeURIComponent(code)}`
    ),
};
