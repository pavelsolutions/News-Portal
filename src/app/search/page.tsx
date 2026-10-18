import type { Metadata } from "next";
import Link from "next/link";
import NewsCard from "@/components/shared/NewsCard";
import Pagination from "@/components/shared/Pagination";
import SearchInput from "@/components/search/SearchInput";
import { toBnDigits } from "@/lib/bn";
import { PAGE_SIZE, pageOffset, parsePage } from "@/lib/news";
import { getSearchPool } from "@/lib/news-pool";
import { filterByQuery } from "@/lib/search";

export const metadata: Metadata = {
  title: "অনুসন্ধান — Bangla News 24",
  robots: { index: false },
};

interface ISearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

const SearchPage = async ({ searchParams }: ISearchPageProps) => {
  const { q = "", page: pageParam } = await searchParams;

  const term = q.trim();
  const pool = await getSearchPool();

  const matches = filterByQuery(pool.items, term);

  // Clamp past-the-end pages so an out-of-range URL lands on the last page
  // instead of rendering an empty grid.
  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const page = Math.min(parsePage(pageParam), pageCount);

  const offset = pageOffset(page);
  const items = matches.slice(offset, offset + PAGE_SIZE);
  const hasMore = offset + items.length < matches.length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="font-medium transition hover:text-red-600">
          হোম
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-400">অনুসন্ধান</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
        <span className="h-7 w-1.5 rounded-full bg-red-600" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          অনুসন্ধান
        </h1>
      </div>

      <SearchInput initialQuery={term} />

      {!term ? (
        /* Empty query */
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
          <p className="text-base font-semibold text-gray-900">
            অনুসন্ধান করতে একটি শব্দ লিখুন
          </p>

          <p className="mt-2 text-sm text-gray-500">
            এই মুহূর্তে {toBnDigits(pool.total)}টি সংবাদ অনুসন্ধানযোগ্য
          </p>
        </div>
      ) : matches.length === 0 ? (
        /* No matches */
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
          <p className="text-base font-semibold text-gray-900">
            “{term}” এর জন্য কোনো ফলাফল পাওয়া যায়নি
          </p>

          <p className="mt-2 text-sm text-gray-500">অন্য শব্দ দিয়ে চেষ্টা করুন</p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      ) : (
        <>
          {/* Result count */}
          <p className="mb-5 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">“{term}”</span> এর জন্য{" "}
            {toBnDigits(matches.length)}টি ফলাফল
          </p>

          {/* Results */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          <Pagination
            page={page}
            hasMore={hasMore}
            basePath="/search"
            params={{ q: term }}
          />
        </>
      )}
    </main>
  );
};

export default SearchPage;
