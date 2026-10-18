import { IArticleBody } from "@/types/news";
import Image from "next/image";

const ArticleBody = ({
  body,
  title,
  priorityFirstImage = false,
}: {
  body: IArticleBody[];
  title: string;
  priorityFirstImage?: boolean;
}) => {
  const items = body ?? [];
  const firstImageIndex = items.findIndex((item) => item.type === "image");

  return (
    <div className="mt-8">
      {items.map((item, index) => {
        if (item.type === "text") {
          return (
            <p
              key={index}
              className="mt-6 text-[17px] leading-[2] text-gray-800 first:mt-0 sm:text-lg"
            >
              {item.text}
            </p>
          );
        }

        if (item.type === "subheading") {
          return (
            <h2
              key={index}
              className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
              {item.text}
            </h2>
          );
        }

        if (item.type === "image") {
          return (
            <figure key={index} className="my-8">
              <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-card">
                <Image
                  src={item.url}
                  alt={item.altText || title}
                  width={item.width}
                  height={item.height}
                  priority={priorityFirstImage && index === firstImageIndex}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto w-full"
                />
              </div>

              {item.caption && (
                <figcaption className="mt-2.5 text-sm leading-6 text-gray-500">
                  {item.caption}
                </figcaption>
              )}

              {item.copyrightHolder && (
                <p className="mt-1 text-xs text-gray-400">
                  © {item.copyrightHolder}
                </p>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
};

export default ArticleBody;
