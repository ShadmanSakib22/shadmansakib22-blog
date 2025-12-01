// lib/types.ts

// --- Basic Entities ---

/**
 * Defines the structure of a WordPress Category node.
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
}

/**
 * Defines the structure of a WordPress Tag node.
 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

/**
 * Defines the structure of image data, for a featured image or Yoast OpenGraph image.
 */
export interface MediaItem {
  uri: string;
  sourceUrl: string; // The URL to the image file
  altText: string;
  mediaDetails: {
    height: number;
    width: number;
  };
}

// --- SEO/Metadata ---

/**
 * Defines the structure for Yoast SEO data exposed via the WPGraphQL Yoast plugin.
 */
export interface SEO {
  title: string;
  metaDesc: string;
  canonical: string;
  opengraphImage?: {
    uri: string;
  } | null;
}

// --- Core Post Type ---

/**
 * Defines the full structure of a WordPress Post object retrieved via GraphQL.
 */
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
  seo: SEO;
}

// --- Pagination ---

/**
 * Defines the page information object used by cursor-based pagination in WPGraphQL.
 */
export interface PageInfo {
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Defines the return structure for the getAllPosts function.
 */
export interface PostListResponse {
  posts: Post[];
  pageInfo: PageInfo;
  searchTerm?: string;
  category?: string;
}
