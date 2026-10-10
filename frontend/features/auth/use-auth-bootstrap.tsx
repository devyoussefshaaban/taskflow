"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useCurrentUser } from "./use-current-user";

export function useAuthBootstrap() {
  const [hydrated, setHydrated] = useState(false);
  const { isSuccess, isError, isPending } = useCurrentUser();

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    } else {
      void useAuthStore.persist.rehydrate();
    }

    return unsubscribe;
  }, []);

  const token = useAuthStore((state) => state.accessToken);

  return {
    isReady: hydrated && (!token || !isPending),
    isAuthenticated: hydrated && Boolean(token) && isSuccess,
  };
}
