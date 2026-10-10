import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="grid h-dvh w-full grid-cols-1 overflow-hidden bg-white lg:grid-cols-2">
      {/* Form Section */}
      <section className="flex min-h-0 min-w-0 items-center justify-center overflow-y-auto px-6 py-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="my-auto w-full max-w-md py-2">
          {/* Brand */}
          <Link
            href="/"
            aria-label="TaskFlow home"
            className="mb-8 inline-flex items-center gap-3"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-teal-600 text-lg font-bold text-white shadow-sm">
              T
            </span>

            <span className="text-xl font-bold tracking-tight text-slate-950">
              TaskFlow
            </span>
          </Link>

          {/* Heading */}
          <header className="mb-7">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </header>

          {/* Form */}
          {children}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-500">
            {footer}
          </div>
        </div>
      </section>

      {/* Brand Panel */}
      <aside className="relative hidden min-h-0 min-w-0 flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14 2xl:p-20">
        {/* Decorative backgrounds */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-[32rem] rounded-full bg-teal-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 size-[28rem] rounded-full bg-indigo-500/15 blur-3xl"
        />

        {/* Brand message */}
        <div className="relative">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            Your workspace, in sync
          </span>
        </div>

        {/* Main content */}
        <div className="relative mx-auto w-full max-w-xl">
          {/* Feature labels */}
          <div className="mb-8 flex flex-wrap gap-2">
            {["Projects", "Tasks", "Teams", "Collaboration"].map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          <h2 className="text-4xl font-semibold leading-[1.15] tracking-tight xl:text-5xl 2xl:text-6xl">
            Plan clearly.
            <br />
            Work together.
            <br />
            <span className="text-teal-300">Deliver better.</span>
          </h2>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-400 xl:text-lg xl:leading-8">
            Bring your projects, tasks, and team collaboration into one
            organized workspace. Spend less time managing work and more time
            moving it forward.
          </p>
        </div>

        {/* Bottom branding */}
        <div className="relative flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-400">
            Plan. Organize. Collaborate. Deliver.
          </p>

          <span className="text-xs text-slate-500">TaskFlow © 2026</span>
        </div>
      </aside>
    </div>
  );
}
