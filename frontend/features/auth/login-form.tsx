"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/features/auth/auth.schemas";
import { useLogin } from "@/features/auth/auth.mutations";
import { AuthLayout } from "./auth-layout";
import { FormField } from "./form-field";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    try {
      await login.mutateAsync(values);
      router.replace("/dashboard");
    } catch {
      // The mutation error is rendered below.
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue managing your projects and tasks."
      footer={
        <>
          New to TaskFlow?{" "}
          <Link
            href="/register"
            className="font-medium text-teal-700 hover:text-teal-800"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />

        {login.isError && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {login.error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || login.isPending}
          className="flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {login.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
