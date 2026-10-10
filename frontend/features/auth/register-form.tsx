"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/auth.schemas";
import { useRegister, useLogin } from "@/features/auth/auth.mutations";
import { AuthLayout } from "./auth-layout";
import { FormField } from "./form-field";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterInput) {
    const { confirmPassword, ...payload } = values;

    try {
      await registerMutation.mutateAsync(payload);

      // Registration succeeded; establish a session using login.
      await login.mutateAsync({
        email: payload.email,
        password: payload.password,
      });

      router.replace("/dashboard");
    } catch {
      // Preserve the form and display the appropriate error.
    }
  }

  const isPending =
    isSubmitting || registerMutation.isPending || login.isPending;

  const error = registerMutation.error ?? login.error;

  return (
    <AuthLayout
      title="Create your account"
      description="Set up your workspace and start organizing your work."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-teal-700 hover:text-teal-800"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="name"
          label="Full name"
          autoComplete="name"
          placeholder="Your name"
          {...register("name")}
          error={errors.name?.message}
        />

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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          {...register("password")}
          error={errors.password?.message}
        />

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password again"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Creating your account..." : "Create account"}
        </button>

        <p className="text-center text-xs leading-5 text-slate-500">
          By creating an account, you agree to use TaskFlow responsibly and
          respectfully.
        </p>
      </form>
    </AuthLayout>
  );
}
