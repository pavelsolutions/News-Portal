import type { ICategory, INews } from "@/types/news";

const API = "https://news-api-v2.vercel.app";
const REVALIDATE = 3600;

/** Items per page across search and category listings. */
export const PAGE_SIZE = 12;

/** The category endpoint rejects limit > 24 and page > 40. */
export const CATEGORY_MAX_LIMIT = 24;
export const CATEGORY_MAX_PAGE = 40;

export interface INewsPage {
  items: INews[];
  /** Total matches — the category endpoint does not report one. */
  total: number | null;
  hasMore: boolean;
}

export interface IPageQuery {
  limit?: number;
  page?: number;
}

interface INewsApiPayload {
  data?: INews[];
  total?: number;
  count?: number;
}

/** Fetch JSON with the shared revalidation window; resolves to null on failure. */
const getJson = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE },
    });

    if (!response.ok) {
      throw new Error(`News API responded ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("News API error:", url, error);
    return null;
  }
};

/** `/api/news` — the "latest" feed. Only ~45 articles are ever exposed here. */
export const getNewsItems = async ({
  limit = 200,
  offset = 0,
}: { limit?: number; offset?: number } = {}): Promise<INews[]> => {
  const payload = await getJson<INewsApiPayload>(
    `${API}/api/news?limit=${limit}&offset=${offset}`
  );

  return payload?.data ?? [];
};

/**
 * `/api/category/{slug}` — the deep archive. This endpoint paginates by `page`
 * (it silently ignores `offset`) and accepts at most 24 items per page and
 * 40 pages deep.
 */
export const getCategoryItems = async (
  slug: string,
  { limit = CATEGORY_MAX_LIMIT, page = 1 }: IPageQuery = {}
): Promise<INews[]> => {
  const size = Math.min(limit, CATEGORY_MAX_LIMIT);
  const safePage = Math.min(Math.max(page, 1), CATEGORY_MAX_PAGE);

  const payload = await getJson<INewsApiPayload>(
    `${API}/api/category/${encodeURIComponent(slug)}?limit=${size}&page=${safePage}`
  );

  return payload?.data ?? [];
};

/** All categories, as used by the navbar and the search pool. */
export const getCategories = async (): Promise<ICategory[]> => {
  const payload = await getJson<{ data?: ICategory[] }>(`${API}/api/categories`);

  return payload?.data ?? [];
};

/**
 * One page of a category listing. The endpoint reports no total, so `hasMore`
 * is verified by fetching the start of the following page.
 */
export const getCategoryNews = async (
  slug: string,
  { limit = PAGE_SIZE, page = 1 }: IPageQuery = {}
): Promise<INewsPage> => {
  const hasNext = page < CATEGORY_MAX_PAGE;

  const [items, nextItems] = await Promise.all([
    getCategoryItems(slug, { limit, page }),
    hasNext
      ? getCategoryItems(slug, { limit, page: page + 1 })
      : Promise.resolve([]),
  ]);

  return {
    items,
    total: null,
    hasMore: hasNext && nextItems.length > 0,
  };
};

/** Parse a `?page=` value into a safe, 1-based page number. */
export const parsePage = (value?: string): number => {
  const parsed = Number.parseInt(value ?? "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

/** Item offset for a 1-based page. */
export const pageOffset = (page: number, size = PAGE_SIZE): number =>
  (page - 1) * size;
