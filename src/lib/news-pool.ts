import type { INews } from "@/types/news";
import { getCategories, getCategoryItems, getNewsItems } from "@/lib/news";

/**
 * How many pages of 24 to pull from each scrapable category.
 *
 * `/api/news` alone only exposes ~45 articles, so anything older is invisible
 * to a search that relies on it. Pulling a couple of pages per category widens
 * the searchable corpus to ~340 articles for the cost of 15 cached requests.
 * Raising this trades latency for depth: every extra page is 7 more requests
 * (7 categories), and the API caps out at page 40 (~5,400 articles).
 */
export const CATEGORY_PAGES = 2;

const CATEGORY_PAGE_SIZE = 24;

/** Per-process cache, on top of Next's fetch cache, to avoid re-merging per request. */
const MEMO_TTL_MS = 5 * 60 * 1000;

export interface ISearchPool {
  items: INews[];
  total: number;
}

let memo: { builtAt: number; pool: ISearchPool } | null = null;
let inFlight: Promise<ISearchPool> | null = null;

const publishedAt = (value?: string): number => {
  const time = value ? Date.parse(value) : NaN;

  return Number.isFinite(time) ? time : 0;
};

const buildPool = async (): Promise<ISearchPool> => {
  const [latest, categories] = await Promise.all([
    getNewsItems({ limit: 200 }),
    getCategories(),
  ]);

  const slugs = categories
    .filter((category) => category.scrapable)
    .map((category) => category.slug);

  const categoryPages = await Promise.all(
    slugs.flatMap((slug) =>
      Array.from({ length: CATEGORY_PAGES }, (_, index) =>
        getCategoryItems(slug, { limit: CATEGORY_PAGE_SIZE, page: index + 1 })
      )
    )
  );

  // The same story can appear in more than one category, so dedupe by id.
  const merged = new Map<string, INews>();

  [...latest, ...categoryPages.flat()].forEach((item) => {
    if (item?.id && !merged.has(item.id)) {
      merged.set(item.id, item);
    }
  });

  const items = [...merged.values()].sort(
    (a, b) => publishedAt(b.firstPublished) - publishedAt(a.firstPublished)
  );

  return { items, total: items.length };
};

/**
 * The articles search runs against: the latest feed plus the first few pages of
 * every scrapable category, deduped and sorted newest first.
 */
export const getSearchPool = async (): Promise<ISearchPool> => {
  if (memo && Date.now() - memo.builtAt < MEMO_TTL_MS) {
    return memo.pool;
  }

  if (!inFlight) {
    // Concurrent callers share one build.
    inFlight = buildPool().finally(() => {
      inFlight = null;
    });
  }

  try {
    const pool = await inFlight;

    memo = { builtAt: Date.now(), pool };

    return pool;
  } catch (error) {
    console.error("Search pool build failed:", error);

    return { items: [], total: 0 };
  }
};
