import { toBnDigits } from "@/lib/bn";
import Link from "next/link";
import type { ReactNode } from "react";

const FEATURES = [
  "সর্বশেষ সংবাদ সবার আগে পড়ুন",
  "পছন্দের বিষয় ও লেখক সেভ করুন",
  "যেকোনো ডিভাইসে প্রোফাইল সিঙ্ক থাকে",
];

interface AuthShellProps {
  kicker: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

/** Shared two-column layout for the sign-in and sign-up pages. */
const AuthShell = ({ kicker, title, subtitle, children }: AuthShellProps) => {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center bg-gray-50 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 p-10 text-white shadow-card lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-black/10" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-red-600">
                B
              </span>

              <span className="text-lg font-bold">Bangla News 24</span>
            </Link>

            <h2 className="mt-12 text-3xl font-bold leading-snug">
              সত্য ও বস্তুনিষ্ঠ
              <br />
              সংবাদের নির্ভরযোগ্য ঠিকানা
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
              বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, বিশ্লেষণ এবং মতামত — সব এক
              জায়গায়।
            </p>
          </div>

          <ul className="relative mt-10 space-y-4">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm text-white/90"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>

                {feature}
              </li>
            ))}
          </ul>
        </aside>

        {/* Form column */}
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-md">
            {/* Brand (mobile) */}
            <div className="mb-6 flex justify-center lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-lg font-bold text-white">
                  B
                </span>

                <span className="text-left">
                  <span className="block text-xl font-bold text-red-600">
                    Bangla News 24
                  </span>

                  <span className="block text-xs text-gray-400">
                    সত্য ও বস্তুনিষ্ঠ সংবাদ
                  </span>
                </span>
              </Link>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8">
              <div className="mb-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-red-600">
                  {kicker}
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {title}
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {subtitle}
                </p>
              </div>

              {children}
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              © {toBnDigits(new Date().getFullYear())} Bangla News 24. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthShell;
