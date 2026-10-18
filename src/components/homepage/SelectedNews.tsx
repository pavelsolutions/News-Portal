import { INewsSection } from "@/types/news";
import NewsCard from "../shared/NewsCard";
import SectionHeader from "../shared/SectionHeader";

export const getNewsSections = async (): Promise<INewsSection[]> => {
  try {
    const response = await fetch(
      "https://news-api-v2.vercel.app/api/news/sections",
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news sections");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching news sections:", error);
    return [];
  }
};

const SelectedNews = async () => {
  const sections = await getNewsSections();
  const selectedSections = sections.filter((section) =>
    [
      "নির্বাচিত খবর",
      "বাংলাদেশ",
      "ভারত",
      "বিশ্ব",
      "স্বাস্থ্য",
      "ভিডিও",
      "অন্যান্য খবর",
    ].includes(section.title)
  );

  return (
    <div className="space-y-10">
      {selectedSections.map((section) => (
        <section key={section.curationId}>
          <SectionHeader title={section.title} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {section.articles.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SelectedNews;
