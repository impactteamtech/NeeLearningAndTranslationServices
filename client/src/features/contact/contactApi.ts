import { apiRequest } from "../../lib/apiClient";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactApi = {
  submit: (payload: ContactPayload) =>
    apiRequest<ContactResponse>("/api/v1/contact/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
