import type { INews } from "@/types/news";

/**
 * Mirrors the news API's own `q` semantics: a case-insensitive substring match
 * against the title or the description. Kept dependency-free so both server
 * components and client components can use it.
 */
export const matchesQuery = (item: INews, term: string): boolean => {
  const needle = term.trim().toLowerCase();

  if (!needle) {
    return false;
  }

  return [item.title, item.description]
    .filter((field): field is string => typeof field === "string")
    .some((field) => field.toLowerCase().includes(needle));
};

/** Filter a list, preserving order. */
export const filterByQuery = (items: INews[], term: string): INews[] => {
  const needle = term.trim();

  return needle ? items.filter((item) => matchesQuery(item, needle)) : [];
};

/** The trimmed shape the navbar dropdown needs. */
export interface ISuggestion {
  id: string;
  title: string;
  category: string;
}
