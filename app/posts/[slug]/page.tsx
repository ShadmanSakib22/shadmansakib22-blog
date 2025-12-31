import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getPost } from "@/lib/queries";
import { Post } from "@/lib/types";
import { formatPostDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import * as cheerio from "cheerio";
import { FloatingToolbar } from "@/components/floating-toolbar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  const fallbackTitle = post.title || "Untitled Post";
  const fallbackDescription =
    post.excerpt?.replace(/<[^>]*>/g, "").trim() || "No description provided.";
  const seoData = post.seo;

  // Use the main SEO title and description as the fallback for OpenGraph
  const ogTitle = seoData?.title || fallbackTitle;
  const ogDescription =
    seoData?.opengraphDescription || seoData?.metaDesc || fallbackDescription;

  return {
    // Primary Metadata (Google SERP)
    title: seoData?.title || fallbackTitle,
    description: seoData?.metaDesc || fallbackDescription,

    // Open Graph (Social Sharing)
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      // Images: Pulls the sourceUrl from the complex opengraphImage node
      images: seoData?.opengraphImage?.sourceUrl
        ? [{ url: seoData.opengraphImage.sourceUrl }]
        : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post: Post | null = await getPost(slug);

  if (!post) {
    notFound();
  }

  const $ = cheerio.load(post.content);
  const headings: { level: number; text: string; id: string }[] = [];

  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    let id = $el.attr("id");
    if (!id) {
      id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      if (!id) id = `heading-${headings.length + 1}`;
      $el.attr("id", id);
    }
    headings.push({ level: parseInt(el.tagName.slice(1)), text, id });
  });

  const modifiedContent = $.html();

  const featuredImage = post.featuredImage?.node;

  return (
    <main className="bg-input/5 bg-grid-dashed relative overflow-hidden">
      {/* Toolbar */}
      <FloatingToolbar headings={headings} />
      <article
        className="container max-w-5xl bg-card border-x py-10"
        id="main-article-content"
      >
        <div className="max-w-[calc(100%-20px)]">
          {/* Post Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              <Link
                href="/"
                className="border border-primary text-primary rounded-full p-1 hover:bg-secondary"
              >
                <ArrowLeft size={16} />
              </Link>

              <div className="flex flex-wrap gap-2">
                {post.categories.nodes.map((category) => (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className="p-1 px-2.5 rounded-md"
                  >
                    {category.name}
                  </Badge>
                ))}
                {post.tags?.nodes.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="p-1 px-2.5 rounded-md"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            <h1
              className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4"
              id="heading-top"
            >
              {post.title}
            </h1>
            <time dateTime={post.date} className="text-muted-foreground">
              {formatPostDate(post.date)}
            </time>
          </header>

          {/* Featured Image */}
          {featuredImage?.sourceUrl && (
            <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
              <Image
                src={featuredImage.sourceUrl}
                alt={featuredImage.altText || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Post Content */}
          <div
            className="prose md:prose-lg lg:prose-xl prose-neutral dark:prose-invert max-w-[calc(100%-20px)]"
            dangerouslySetInnerHTML={{ __html: modifiedContent }}
          />
        </div>

        <div id="toolbar-sentinel" className="h-px w-full" />
      </article>
    </main>
  );
}
