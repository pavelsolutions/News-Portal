"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";

const DEBOUNCE_MS = 400;

/**
 * Search field that drives the server-side search: typing (debounced) or
 * submitting updates `/search?q=`, and the page re-renders with real results.
 */
const SearchInput = ({ initialQuery }: { initialQuery: string }) => {
  const router = useRouter();

  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  // The term the URL currently reflects, so we don't re-navigate for it.
  const syncedTerm = useRef(initialQuery);

  const go = (term: string) => {
    syncedTerm.current = term;

    startTransition(() => {
      router.replace(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
    });
  };

  // Debounced live search.
  useEffect(() => {
    const term = value.trim();

    if (term === syncedTerm.current) {
      return;
    }

    const timer = setTimeout(() => go(term), DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    go(value.trim());
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="mb-7">
      <div className="relative mx-auto w-full max-w-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>

        <input
          type="search"
          autoFocus
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="খবর খুঁজুন..."
          aria-label="খবর খুঁজুন"
          className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
        />

        {isPending && (
          <span
            className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-gray-200 border-t-red-600"
            aria-hidden="true"
          />
        )}
      </div>
    </form>
  );
};

export default SearchInput;
