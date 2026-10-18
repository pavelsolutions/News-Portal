import { NextResponse, type NextRequest } from "next/server";
import { getSearchPool } from "@/lib/news-pool";
import { filterByQuery, type ISuggestion } from "@/lib/search";

const MAX_SUGGESTIONS = 5;
const MIN_TERM_LENGTH = 2;

/**
 * Live search suggestions for the navbar dropdown.
 *
 * Runs server-side because the news API sends no CORS headers, so the browser
 * cannot query it directly.
 */
export const GET = async (request: NextRequest) => {
  const term = (request.nextUrl.searchParams.get("q") ?? "").trim();

  if (term.length < MIN_TERM_LENGTH) {
    return NextResponse.json({ data: [] });
  }

  const pool = await getSearchPool();

  const data: ISuggestion[] = filterByQuery(pool.items, term)
    .slice(0, MAX_SUGGESTIONS)
    .map(({ id, title, category }) => ({ id, title, category }));

  return NextResponse.json({ data });
};
