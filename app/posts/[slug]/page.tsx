import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getPost } from "@/lib/queries";
import { Post } from "@/lib/types";
import { formatPostDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const post = await getPost(slug);

//   if (!post) {
//     return {
//       title: "Post Not Found",
//     };
//   }

//   return {
//     title: post.seo?.title || post.title,
//     description:
//       post.seo?.metaDesc || post.excerpt.replace(/<[^>]*>/g, "").trim(),
//     openGraph: {
//       title: post.seo?.opengraphTitle || post.title,
//       description:
//         post.seo?.metaDesc || post.excerpt.replace(/<[^>]*>/g, "").trim(),
//       images: post.seo?.opengraphImage?.sourceUrl
//         ? [{ url: post.seo.opengraphImage.sourceUrl }]
//         : [],
//     },
//     twitter: {
//       title: post.seo?.twitterTitle || post.title,
//     },
//   };
// }

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post: Post | null = await getPost(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post.featuredImage?.node;

  return (
    <main className="bg-input/5 bg-grid-dashed">
      <article className="container max-w-7xl bg-card border-x py-10">
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

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
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
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
