"use client";

import type { ISuggestion } from "@/lib/search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

const SUGGEST_DEBOUNCE_MS = 250;
const MIN_TERM_LENGTH = 2;

/** Suggestions are tagged with the term they belong to, so stale ones are ignored. */
interface IMatch {
  term: string;
  items: ISuggestion[];
}

/**
 * Navbar search button: opens a dropdown with live suggestions from
 * `/api/suggest`, which searches the full search pool server-side.
 */
const NavbarSearch = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [match, setMatch] = useState<IMatch | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const term = query.trim();
  const showPanel = term.length >= MIN_TERM_LENGTH;
  const suggestions = match?.term === term ? match.items : [];
  const loading = showPanel && match?.term !== term;

  // Focus the field as soon as the panel opens.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Debounced suggestion lookup.
  useEffect(() => {
    if (!open || term.length < MIN_TERM_LENGTH) {
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/suggest?q=${encodeURIComponent(term)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Suggest responded ${response.status}`);
        }

        const payload = (await response.json()) as { data?: ISuggestion[] };

        if (!cancelled) {
          setMatch({ term, items: payload.data ?? [] });
        }
      } catch {
        if (!cancelled) {
          setMatch({ term, items: [] });
        }
      }
    }, SUGGEST_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [open, term]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setMatch(null);
  };

  const showAll = (value: string) => {
    const next = value.trim();

    if (!next) {
      return;
    }

    close();
    router.push(`/search?q=${encodeURIComponent(next)}`);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    showAll(query);
  };

  return (
    <div className="relative shrink-0">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="খবর খুঁজুন"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-bold text-gray-900 transition hover:bg-red-50 hover:text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="hidden sm:inline">খুঁজুন</span>
      </button>

      {open && (
        <>
          {/* Click-outside catcher */}
          <div
            className="fixed inset-0 z-40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="absolute right-0 top-full z-50 mt-2 w-[min(88vw,22rem)] rounded-2xl border border-gray-100 bg-white p-3 shadow-card-hover">
            <form role="search" onSubmit={handleSubmit}>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>

                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="খবর খুঁজুন..."
                  aria-label="খবর খুঁজুন"
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
                />
              </div>
            </form>

            {showPanel && (
              <div className="mt-2">
                {suggestions.length === 0 ? (
                  <p className="px-2 py-4 text-center text-sm text-gray-400">
                    {loading ? "খোঁজা হচ্ছে..." : "কোনো ফলাফল পাওয়া যায়নি"}
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {suggestions.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/article/${item.id}`}
                          onClick={close}
                          className="group block rounded-lg px-2 py-2.5 transition hover:bg-gray-50"
                        >
                          <p className="text-xs font-semibold text-red-600">
                            {item.category}
                          </p>
                          <p className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 transition group-hover:text-red-700">
                            {item.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  onClick={() => showAll(query)}
                  className="mt-1 w-full rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  সব ফলাফল দেখুন
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarSearch;
