import { INews } from "@/types/news";
import Link from "next/link";

export const getBreakingNews = async (): Promise<INews[]> => {
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
      throw new Error("Failed to fetch news");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

const BreakingNews = async () => {
  const mainNews = await getBreakingNews();

  if (mainNews.length === 0) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden bg-red-700">
      <div className="mx-auto flex h-10 max-w-7xl items-center px-4 sm:px-6">
        {/* Label */}
        <div className="z-10 mr-4 flex shrink-0 items-center gap-2 rounded-full bg-white/15 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          <span className="text-xs font-bold text-white">সর্বশেষ</span>
        </div>

        {/* Ticker Area */}
        <div className="flex-1 overflow-hidden">
          <div className="breaking-track flex w-max items-center whitespace-nowrap">
            {mainNews.map((news) => (
              <Link
                key={news.id}
                href={`/article/${news.id}`}
                className="flex items-center transition hover:opacity-80"
              >
                <span className="px-4 text-sm text-white">{news.title}</span>

                <span className="text-sm text-white/50">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakingNews;
