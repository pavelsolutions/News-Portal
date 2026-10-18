export interface INews {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

export interface INewsSection {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: INews[];
}

export interface IArticleByline {
  name: string;
  role: string | null;
}

export interface IArticleImage {
  type: "image";
  url: string;
  width: number;
  height: number;
  caption: string | null;
  altText: string | null;
  copyrightHolder: string | null;
}

export interface IArticleText {
  type: "text";
  text: string;
}

export interface IArticleSubheading {
  type: "subheading";
  text: string;
}

export type IArticleBody =
  | IArticleImage
  | IArticleText
  | IArticleSubheading;

export interface ITopic {
  id: string;
  name: string;
}

/** BBC-style rich text payload used by some article fields (e.g. description). */
export interface IRichText {
  blocks?: unknown[];
}

export interface IArticle {
  id: string;
  title: string;
  description: string | IRichText | null;
  link: string;
  firstPublished: string;
  lastPublished: string;
  byline: IArticleByline[];
  topics: ITopic[];
  tags: string[];
  imageUrl: string;
  body: IArticleBody[];
  wordCount: number;
  source: string;
  sourceUrl: string;
}

export interface ICategory {
  id: string;
  title: string;
  slug: string;
  scrapable: boolean;
}