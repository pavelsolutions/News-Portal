import { INews } from "@/types/news";
import NewsCard from "@/components/shared/NewsCard";
import SectionHeader from "@/components/shared/SectionHeader";

const getRelatedNews = async (topicId?: string): Promise<INews[]> => {
  const url = topicId
    ? `https://news-api-v2.vercel.app/api/category/${topicId}`
    : "https://news-api-v2.vercel.app/api/news";

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch related news");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching related news:", error);
    return [];
  }
};

const RelatedArticles = async ({
  topicId,
  currentId,
}: {
  topicId?: string;
  currentId: string;
}) => {
  const news = await getRelatedNews(topicId);

  const related = news.filter((item) => item.id !== currentId).slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 border-t border-gray-100 pt-8">
      <SectionHeader title="সম্পর্কিত সংবাদ" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
