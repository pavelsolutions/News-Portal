import { toBnDigits } from "@/lib/bn";
import Link from "next/link";

interface PaginationProps {
  /** Current 1-based page. */
  page: number;
  /** Whether a further page exists. */
  hasMore: boolean;
  /** Route the links should point at, e.g. `/search`. */
  basePath: string;
  /** Query params to preserve (e.g. the search term). `page` is managed here. */
  params?: Record<string, string>;
}

const Pagination = ({
  page,
  hasMore,
  basePath,
  params = {},
}: PaginationProps) => {
  const hasPrev = page > 1;

  if (!hasPrev && !hasMore) {
    return null;
  }

  const hrefFor = (target: number) => {
    const search = new URLSearchParams(params);

    if (target > 1) {
      search.set("page", String(target));
    } else {
      search.delete("page");
    }

    const query = search.toString();

    return query ? `${basePath}?${query}` : basePath;
  };

  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition";

  return (
    <nav
      aria-label="পৃষ্ঠা পরিবর্তন"
      className="mt-10 flex items-center justify-between gap-3 border-t border-gray-100 pt-6"
    >
      {hasPrev ? (
        <Link
          href={hrefFor(page - 1)}
          className={`${base} border border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          পূর্ববর্তী
        </Link>
      ) : (
        <span className={`${base} cursor-not-allowed text-gray-300`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          পূর্ববর্তী
        </span>
      )}

      <span className="text-sm font-semibold text-gray-500">
        পৃষ্ঠা {toBnDigits(page)}
      </span>

      {hasMore ? (
        <Link
          href={hrefFor(page + 1)}
          className={`${base} border border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
        >
          পরবর্তী
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      ) : (
        <span className={`${base} cursor-not-allowed text-gray-300`}>
          পরবর্তী
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      )}
    </nav>
  );
};

export default Pagination;
