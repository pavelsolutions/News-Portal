import { INews } from '@/types/news';
import Image from 'next/image';
import Link from 'next/link';
import { formatBnDate } from '@/lib/bn';

export const getMainNews = async (): Promise<INews[]> => {
    try {
        const response = await fetch(
            "https://news-api-v2.vercel.app/api/news",
            {
                next: {
                    revalidate: 3600,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Main News");
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error("Error fetching main news:", error);
        return [];
    }
};

const MainNews = async () => {
  const mainNews = await getMainNews();

  const news = mainNews[0];

  if (!news) {
    return null;
  }

  return (
    <Link
      href={`/article/${news.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-gray-900 shadow-card"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <span className="inline-block rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
          {news.category}
        </span>

        <h2 className="mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">
          {news.title}
        </h2>

        {news.description && (
          <p className="mt-2 hidden max-w-2xl line-clamp-2 text-sm leading-6 text-white/80 sm:block">
            {news.description}
          </p>
        )}

        <p className="mt-3 text-xs text-white/60">
          {news.firstPublished && formatBnDate(news.firstPublished)}
        </p>
      </div>
    </Link>
  );
};

export default MainNews;
