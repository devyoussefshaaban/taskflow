import { ProtectedRoute } from "@/features/auth/protected-route";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold text-slate-950">
            Welcome to TaskFlow
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Your projects and tasks, all in one place.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
