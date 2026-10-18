import { INews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBnDate, toBnDigits } from "@/lib/bn";
import { PAGE_SIZE, getCategoryNews, parsePage } from "@/lib/news";
import NewsCard from "@/components/shared/NewsCard";
import Pagination from "@/components/shared/Pagination";

interface ICategoryProps {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

/**
 * Category listing keyed by slug (e.g. `/category/politics`).
 * Page 1 leads with a featured story; the rest follow in a grid.
 */
const CategoryPage = async ({ params, searchParams }: ICategoryProps) => {
  const { categoryId } = await params;
  const { page: pageParam } = await searchParams;

  const page = parsePage(pageParam);

  const result = await getCategoryNews(categoryId, {
    limit: PAGE_SIZE,
    page,
  });

  // Empty first page means the category doesn't exist; an empty later page
  // means the reader went past the end.
  if (result.items.length === 0) {
    notFound();
  }

  const title = result.items[0].category || categoryId;

  const isFirstPage = page === 1;
  const featured = isFirstPage ? result.items[0] : null;
  const gridItems = isFirstPage ? result.items.slice(1) : result.items;

  const badge =
    isFirstPage && !result.hasMore
      ? `${toBnDigits(result.items.length)} টি সংবাদ`
      : `পৃষ্ঠা ${toBnDigits(page)}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="font-medium transition hover:text-red-600">
          হোম
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-400">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-7 flex items-end justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-red-600" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h1>
        </div>

        <span className="shrink-0 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500 ring-1 ring-gray-200">
          {badge}
        </span>
      </div>

      {/* Featured (first page only) */}
      {featured && (
        <Link
          href={`/article/${featured.id}`}
          className="group mb-8 grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition duration-300 hover:shadow-card-hover lg:grid-cols-2"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
            {featured.imageUrl && (
              <Image
                src={featured.imageUrl}
                alt={featured.imageAlt || featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-7">
            <p className="text-xs font-bold tracking-wide text-red-600">
              {featured.category}
            </p>

            <h2 className="mt-2 text-xl font-bold leading-snug text-gray-900 transition group-hover:text-red-700 sm:text-2xl">
              {featured.title}
            </h2>

            {featured.description && (
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                {featured.description}
              </p>
            )}

            <p className="mt-4 text-xs text-gray-400">
              {formatBnDate(featured.firstPublished)}
            </p>
          </div>
        </Link>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gridItems.map((item: INews) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      <Pagination
        page={page}
        hasMore={result.hasMore}
        basePath={`/category/${categoryId}`}
      />
    </main>
  );
};

export default CategoryPage;
