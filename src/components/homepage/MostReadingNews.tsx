import { INews } from "@/types/news";
import Link from "next/link";
import { toBnDigits } from "@/lib/bn";
import SectionHeader from "../shared/SectionHeader";

export const getMostReadNews = async (): Promise<INews[]> => {
    try {
        const response = await fetch(
            "https://news-api-v2.vercel.app/api/news/most-read",
            {
                next: {
                    revalidate: 3600,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Most Read News");
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error("Error fetching most read:", error);
        return [];
    }
};

const MostReadingNews = async () => {
    const mostReadNews = await getMostReadNews();

    if (mostReadNews.length === 0) {
        return null;
    }

    return (
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6">
            <SectionHeader title="সর্বাধিক পঠিত" />

            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {mostReadNews.slice(0, 6).map((news, index) => (
                    <Link
                        key={news.id}
                        href={`/article/${news.id}`}
                        className="group flex items-start gap-4"
                    >
                        <span className="text-2xl font-black leading-none tabular-nums text-red-600/80">
                            {toBnDigits(String(index + 1).padStart(2, "0"))}
                        </span>

                        <p className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 transition group-hover:text-red-700">
                            {news.title}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MostReadingNews;
