"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthBootstrap } from "@/features/auth/use-auth-bootstrap";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isReady, isAuthenticated } = useAuthBootstrap();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <p className="text-sm text-slate-500">Verifying your session...</p>
      </div>
    );
  }

  return children;
}
