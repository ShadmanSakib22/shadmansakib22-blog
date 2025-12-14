// @lib/types.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface MediaItem {
  sourceUrl: string; // The URL to the image file (Required)
  uri?: string | null;
  altText?: string | null;
  mediaDetails?: {
    height: number;
    width: number;
  } | null;
}

export interface SEO {
  title: string;
  metaDesc: string;
  opengraphDescription?: string | null;
  opengraphImage?: {
    sourceUrl: string;
  } | null;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO 8601 date string
  excerpt: string;
  content: string; // Raw HTML content

  // Relationships
  categories: {
    nodes: Category[];
  };
  tags: {
    nodes: Tag[];
  };
  featuredImage?: {
    node: MediaItem;
  } | null;

  // Metadata
  seo?: SEO | null;
}

export interface PageInfo {
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PostListResponse {
  posts: Post[];
  pageInfo: PageInfo;
}

export interface SitemapItem {
  slug: string;
  modified: string;
  type: "post" | "page" | "category";
}
