"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import { authKeys } from "./auth.keys";
import { useAuthStore } from "@/stores/auth.store";
import type { LoginInput } from "./auth.schemas";

export function useLogin() {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),

    onSuccess: async ({ accessToken }) => {
      const user = await authApi.me(accessToken);

      setSession(accessToken, user);

      queryClient.setQueryData(authKeys.me(), user);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
  });
}
