import React from "react";

const CommingSoon = () => {
  return (
    <div className="w-full max-w-2xl text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
        Coming Soon
      </p>

      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Work smarter with <span className="text-primary">TaskFlow</span>
      </h1>

      <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
        Projects, tasks, and teamwork — all in one simple and powerful
        workspace.
      </p>

      <p className="mt-8 text-sm text-muted-foreground">
        We&apos;re putting the finishing touches on it.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
        <a
          href="mailto:imdevyoussefshaaban@gmail.com"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Email
        </a>

        <a
          href="https://wa.me/201281534401"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          WhatsApp
        </a>

        <a
          href="https://github.com/devyoussefshaaban"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/imdevyoussefshaaban"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          LinkedIn
        </a>

        <a
          href="https://devyoussefshaaban.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Portfolio
        </a>
      </div>
    </div>
  );
};

export default CommingSoon;
