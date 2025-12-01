import { Post, Category, Tag, MediaItem, SEO } from "./types";

// --- Reusable Mock Sub-structures ---

const mockCategory: Category = {
  id: "Y2F0ZWdvcnk6MQ==",
  name: "Next.js Development",
  slug: "nextjs-dev",
};

const mockTag: Tag = {
  id: "dGFnOjI=",
  name: "GraphQL",
  slug: "graphql",
};

const mockMediaItem: MediaItem = {
  uri: "/uploads/2023/10/featured.jpg",
  sourceUrl:
    "https://placehold.co/640x360/1E3A8A/FFFFFF/png?text=Next.js+Blog+Image",
  altText: "Abstract representation of data fetching",
  mediaDetails: {
    height: 360,
    width: 640,
  },
};

const mockSEO: SEO = {
  title: "Mock Post Title | Headless Blog",
  metaDesc:
    "A captivating description for search engines about this mock content.",
  canonical: "http://localhost:3000/posts/mock-post-1",
  opengraphImage: {
    uri: "https://placehold.co/1200x630/1E3A8A/FFFFFF/png?text=OG+Image",
  },
};

// --- Single Mock Post ---

export const mockPost: Post = {
  id: "cG9zdDoxMDI=",
  title: "Mastering Headless WordPress with Next.js App Router",
  slug: "mastering-headless-wordpress-app-router",
  date: "2023-11-20T10:30:00",
  excerpt:
    "<p>This post dives deep into the architecture required to build a fast, SEO-friendly blog using Next.js for rendering and GraphQL to fetch content from a WordPress backend. We cover ISR and static generation.</p>",
  content:
    "<h1>Content goes here</h1><p>The full, rich HTML content of the article.</p>",

  categories: {
    nodes: [
      mockCategory,
      { id: "Y2F0ZWdvcnk6Mg==", name: "Frontend", slug: "frontend" },
    ],
  },
  tags: {
    nodes: [mockTag, { id: "dGFnOjM=", name: "SSR", slug: "ssr" }],
  },
  featuredImage: {
    node: mockMediaItem,
  },
  seo: mockSEO,
};

// --- Mock Post List ---

export const mockPostList: Post[] = [
  // --- Original 3 Posts ---
  mockPost,
  {
    ...mockPost,
    id: "cG9zdDoxMDM=",
    title: "Optimizing GraphQL Queries for Cursor Pagination",
    slug: "optimizing-graphql-queries-for-pagination",
    date: "2023-11-18T14:45:00",
    excerpt:
      "<p>Learn how to efficiently handle large datasets by implementing cursor-based pagination provided by the WPGraphQL API, which improves performance over traditional offset pagination.</p>",
    featuredImage: {
      node: {
        ...mockMediaItem,
        sourceUrl:
          "https://placehold.co/640x360/374151/FFFFFF/png?text=Pagination+Tech",
      },
    },
    seo: { ...mockSEO, title: "Optimizing GraphQL" },
  },
  {
    ...mockPost,
    id: "cG9zdDoxMDQ=",
    title: "The Essential Role of Sitemaps and RSS in SEO",
    slug: "sitemaps-rss-seo-essentials",
    date: "2023-11-15T09:00:00",
    excerpt:
      "<p>An in-depth look at why XML Sitemaps and RSS feeds remain crucial tools for content discovery by search engines and user aggregators, respectively, even in modern web development.</p>",
    categories: {
      nodes: [
        { id: "Y2F0ZWdvcnk6Mw==", name: "SEO Strategy", slug: "seo-strategy" },
      ],
    },
    featuredImage: {
      node: {
        ...mockMediaItem,
        sourceUrl:
          "https://placehold.co/640x360/000000/FFFFFF/png?text=RSS+Sitemap",
      },
    },
    seo: { ...mockSEO, title: "Sitemaps and RSS" },
  },
  // --- 5 New Posts ---
  {
    ...mockPost,
    id: "cG9zdDoxMDU=",
    title: "Building a Real-time Chat with Firebase/Firestore",
    slug: "firebase-realtime-chat",
    date: "2023-11-12T11:00:00",
    excerpt:
      "<p>A step-by-step guide to setting up a scalable, real-time chat application using the power of Firebase and Firestore for seamless data synchronization across clients.</p>",
    categories: {
      nodes: [
        { id: "Y2F0ZWdvcnk6NA==", name: "Backend", slug: "backend" },
        mockCategory,
      ],
    },
    featuredImage: {
      node: {
        ...mockMediaItem,
        sourceUrl:
          "https://placehold.co/640x360/000000/FFFFFF/png?text=Firestore+Chat",
      },
    },
    seo: { ...mockSEO, title: "Firebase Real-time Chat" },
  },
  {
    ...mockPost,
    id: "cG9zdDoxMDY=",
    title: "Accessibility First: Designing for All Users",
    slug: "accessibility-first-design",
    date: "2023-11-10T08:30:00",
    excerpt:
      "<p>Understanding and implementing WCAG standards is essential for modern web development. This article covers core principles and practical examples of building accessible components.</p>",
    categories: {
      nodes: [{ id: "Y2F0ZWdvcnk6Mg==", name: "Frontend", slug: "frontend" }],
    },
    featuredImage: {
      node: {
        ...mockMediaItem,
        sourceUrl:
          "https://placehold.co/640x360/4CAF50/FFFFFF/png?text=A11Y+Design",
      },
    },
    seo: { ...mockSEO, title: "Accessibility First" },
  },
  {
    ...mockPost,
    id: "cG9zdDoxMDc=",
    title: "A Deep Dive into React Server Components (RSC)",
    slug: "react-server-components-deep-dive",
    date: "2023-11-05T16:20:00",
    excerpt:
      "<p>Explore how RSC transforms data fetching and rendering logic in the Next.js App Router, drastically improving client-side bundle size and initial load times for complex applications.</p>",
    categories: {
      nodes: [mockCategory],
    },
    featuredImage: {
      node: {
        ...mockMediaItem,
        sourceUrl:
          "https://placehold.co/640x360/FF9800/FFFFFF/png?text=RSC+Next",
      },
    },
    seo: { ...mockSEO, title: "Deep Dive into RSC" },
  },
  {
    ...mockPost,
    id: "cG9zdDoxMDg=",
    title: "Customizing Tailwind CSS for Brand Consistency",
    slug: "customizing-tailwind-css",
    date: "2023-11-01T10:15:00",
    excerpt:
      "<p>Tailwind's utility-first approach is powerful, but true brand alignment requires careful extension of the theme. Learn how to customize colors, spacing, and typography.</p>",
    categories: {
      nodes: [{ id: "Y2F0ZWdvcnk6Mg==", name: "Frontend", slug: "frontend" }],
    },
    featuredImage: {
      node: {
        ...mockMediaItem,
        sourceUrl:
          "https://placehold.co/640x360/9C27B0/FFFFFF/png?text=Tailwind+Custom",
      },
    },
    seo: { ...mockSEO, title: "Customizing Tailwind" },
  },
  {
    ...mockPost,
    id: "cG9zdDoxMDk=",
    title: "Exploring the Future of Web Assembly (Wasm)",
    slug: "future-of-web-assembly",
    date: "2023-10-28T14:00:00",
    excerpt:
      "<p>Web Assembly promises near-native performance for web applications. Discover the latest advancements and how Wasm modules are being integrated with JavaScript ecosystems today.</p>",
    categories: {
      nodes: [
        { id: "Y2F0ZWdvcnk6NQ==", name: "Technology Trends", slug: "tech" },
      ],
    },
    featuredImage: {
      node: {
        ...mockMediaItem,
        sourceUrl:
          "https://placehold.co/640x360/03A9F4/FFFFFF/png?text=Web+Assembly",
      },
    },
    seo: { ...mockSEO, title: "Future of Wasm" },
  },
];
