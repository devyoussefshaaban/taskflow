import { apiRequest } from "@/lib/api-client";
import type { AuthResponse, User } from "./auth.types";
import type { LoginInput, RegisterInput } from "./auth.schemas";

export const authApi = {
  login: (input: LoginInput) =>
    apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: input,
    }),

  register: (input: Omit<RegisterInput, "confirmPassword">) =>
    apiRequest<User>("/auth/register", {
      method: "POST",
      body: input,
    }),

  me: (token: string) => apiRequest<User>("/auth/me", { token }),
};
