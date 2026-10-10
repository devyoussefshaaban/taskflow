"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { authApi } from "./auth.api";
import { authKeys } from "./auth.keys";

export function useCurrentUser() {
  const token = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      if (!token) {
        throw new Error("Authentication required");
      }

      try {
        return await authApi.me(token);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.toLowerCase().includes("unauthorized")
        ) {
          logout();
        }

        throw error;
      }
    },
    enabled: Boolean(token),
    retry: false,
  });
}
