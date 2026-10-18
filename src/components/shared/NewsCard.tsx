import { INews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { formatBnDate } from "@/lib/bn";

const NewsCard = ({ item }: { item: INews }) => {
  return (
    <Link
      href={`/article/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold tracking-wide text-red-600">
          {item.category}
        </p>

        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-6 text-gray-900 transition group-hover:text-red-700">
          {item.title}
        </h3>

        {item.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            {item.description}
          </p>
        )}

        <p className="mt-auto pt-3 text-xs text-gray-400">
          {item.firstPublished && formatBnDate(item.firstPublished)}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
