// @lib/queries.ts

import { Category, Post, PostListResponse } from "@/lib/types";

if (!process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT) {
  throw new Error(
    "NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT environment variable is required"
  );
}

const GRAPHQL_ENDPOINT =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT
    : "/api/graphql";

async function fetchGraphQL(
  query: string,
  variables?: Record<string, unknown>
) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const query = `
    query GetCategories {
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data.data.categories.nodes;
}

export async function getAllPosts(
  first?: number,
  after?: string,
  categorySlug?: string,
  searchTerm?: string
): Promise<PostListResponse> {
  const query = `
    query GetAllPosts($first: Int, $after: String, $categorySlug: String, $searchTerm: String) {
      posts(
        first: $first,
        after: $after,
        where: {
          categoryName: $categorySlug,
          search: $searchTerm
        }
      ) {
        nodes {
          id
          title
          slug
          date
          excerpt
          content
          categories {
            nodes {
              id
              name
              slug
            }
          }
          tags {
            nodes {
              id
              name
              slug
            }
          }
          featuredImage {
            node {
              uri
              sourceUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;
  const variables = { first, after, categorySlug, searchTerm };
  const data = await fetchGraphQL(query, variables);
  return {
    posts: data.data.posts.nodes,
    pageInfo: data.data.posts.pageInfo,
  };
}

export async function getPost(slug: string): Promise<Post | null> {
  const query = `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        excerpt
        content
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        featuredImage {
          node {
            uri
            sourceUrl
            altText
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
  `;
  const variables = { slug };
  const data = await fetchGraphQL(query, variables);
  return data.data.post || null;
}
