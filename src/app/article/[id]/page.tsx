import { IArticle, IArticleImage } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatBnDate, toBnDigits } from "@/lib/bn";
import ArticleBody from "./ArticleBody";
import ShareButtons from "./ShareButtons";
import RelatedArticles from "./RelatedArticles";

interface IArticleProps {
    params: Promise<{
        id: string;
    }>;
}

export const getArticle = async (
    id: string
): Promise<IArticle | null> => {
    try {
        const response = await fetch(
            `https://news-api-v2.vercel.app/api/article/${id}`,
            {
                next: {
                    revalidate: 3600,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch article");
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error("Error fetching article:", error);
        return null;
    }
};

// Some article fields are BBC-style rich text objects ({ blocks: [...] })
// rather than plain strings. Flatten them to text.
const richTextToPlain = (value: unknown): string => {
    if (typeof value === "string") {
        return value;
    }

    if (!value || typeof value !== "object") {
        return "";
    }

    const node = value as { blocks?: unknown[]; text?: unknown };

    if (Array.isArray(node.blocks)) {
        return node.blocks
            .map((block) => richTextToPlain(block))
            .filter(Boolean)
            .join(" ")
            .trim();
    }

    if (typeof node.text === "string") {
        return node.text;
    }

    return "";
};

// The API returns the lead image twice: as `imageUrl` (.jpg.webp) and as the
// first body image (.jpg). Normalize so the two variants compare equal.
const normalizeImageUrl = (url?: string): string =>
    (url ?? "")
        .split("?")[0]
        .split("#")[0]
        .toLowerCase()
        .replace(/(\.webp|\.jpe?g|\.png|\.gif)+$/g, "");

export const generateMetadata = async ({
    params,
}: IArticleProps): Promise<Metadata> => {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        return { title: "সংবাদ পাওয়া যায়নি" };
    }

    const description = richTextToPlain(article.description);

    return {
        title: article.title,
        description: description || undefined,
        openGraph: {
            title: article.title,
            description: description || undefined,
            type: "article",
            images: article.imageUrl ? [article.imageUrl] : undefined,
        },
    };
};

const ArticlePage = async ({ params }: IArticleProps) => {
    const { id } = await params;

    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    const topic = article.topics?.[0];
    const authors = article.byline ?? [];
    const description = richTextToPlain(article.description);
    const bodyItems = article.body ?? [];
    const readingMinutes = Math.max(
        1,
        Math.round((article.wordCount || 0) / 200)
    );

    // Skip the standalone hero when it's just the first body image repeated.
    const leadImage = bodyItems.find(
        (item): item is IArticleImage => item.type === "image"
    );
    const heroDuplicated =
        !!article.imageUrl &&
        !!leadImage &&
        normalizeImageUrl(article.imageUrl) === normalizeImageUrl(leadImage.url);

    // Absolute URL for share links; falls back to the local dev base.
    const shareUrl = `${
        process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
    }/article/${article.id}`;

    return (
        <main className="bg-white">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">

                {/* Breadcrumb */}
                <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <Link
                        href="/"
                        className="font-medium transition hover:text-red-600"
                    >
                        হোম
                    </Link>

                    {topic && (
                        <>
                            <span className="text-gray-300">/</span>
                            <Link
                                href={`/category/${topic.id}`}
                                className="font-medium transition hover:text-red-600"
                            >
                                {topic.name}
                            </Link>
                        </>
                    )}

                    <span className="text-gray-300">/</span>
                    <span className="line-clamp-1 text-gray-400">
                        {article.title}
                    </span>
                </nav>

                {/* Article Header */}
                <header>
                    {topic && (
                        <Link
                            href={`/category/${topic.id}`}
                            className="inline-block rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-600 ring-1 ring-red-100 transition hover:bg-red-100"
                        >
                            {topic.name}
                        </Link>
                    )}

                    <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                        {article.title}
                    </h1>

                    {description && (
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            {description}
                        </p>
                    )}

                    {/* Byline */}
                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-gray-200 py-4">
                        {authors.length > 0 && (
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white ring-2 ring-red-100">
                                    {authors[0].name?.charAt(0)}
                                </span>

                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {authors
                                            .map((author) => author.name)
                                            .join(", ")}
                                    </p>

                                    {authors[0].role && (
                                        <p className="text-xs text-gray-400">
                                            {authors[0].role}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                            <span>{formatBnDate(article.firstPublished)}</span>
                            <span className="h-1 w-1 rounded-full bg-gray-300" />
                            <span>{toBnDigits(readingMinutes)} মিনিট পড়া</span>
                        </div>
                    </div>
                </header>

                {/* Main Image (omitted when the first body image is the same) */}
                {article.imageUrl && !heroDuplicated && (
                    <figure className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-card">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-cover"
                        />
                    </figure>
                )}

                {/* Article Body */}
                <ArticleBody
                    body={bodyItems}
                    title={article.title}
                    priorityFirstImage={heroDuplicated}
                />

                {/* Source */}
                {article.source && (
                    <p className="mt-10 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
                        সূত্র:{" "}
                        {article.sourceUrl ? (
                            <a
                                href={article.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-red-600 transition hover:text-red-700"
                            >
                                {article.source}
                            </a>
                        ) : (
                            <span className="font-semibold text-gray-700">
                                {article.source}
                            </span>
                        )}
                    </p>
                )}

                {/* Share */}
                <ShareButtons title={article.title} url={shareUrl} />

                {/* Tags */}
                {article.tags?.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-gray-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Related News */}
                <RelatedArticles topicId={topic?.id} currentId={article.id} />

            </div>
        </main>
    );
};

export default ArticlePage;
