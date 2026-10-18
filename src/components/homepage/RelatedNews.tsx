import { INews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

export const getLatestNews = async (): Promise<INews[]> => {
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
      throw new Error("Failed to fetch latest news");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
};

const RelatedNews = async () => {
  const news = await getLatestNews();

  const relatedNews = news.slice(1, 6);

  return (
    <div className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
      <h2 className="mb-1 text-lg font-bold text-gray-900">সর্বশেষ খবর</h2>
      <div className="h-0.5 w-10 rounded-full bg-red-600" />

      <div className="mt-3 divide-y divide-gray-100">
        {relatedNews.map((item) => (
          <Link
            key={item.id}
            href={`/article/${item.id}`}
            className="group flex gap-3 py-3 first:pt-3 last:pb-0"
          >
            {/* Thumbnail */}
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  fill
                  sizes="80px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              )}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-red-600">
                {item.category}
              </p>

              <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 transition group-hover:text-red-700">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedNews;
