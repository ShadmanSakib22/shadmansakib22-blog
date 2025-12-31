import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";
import { formatPostDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const postUrl = `/posts/${post.slug}`;
  const featuredImage = post.featuredImage?.node;

  // Clean up excerpt: WordPress excerpts - use regex to strip HTML tags
  const cleanedExcerpt = post.excerpt
    ? post.excerpt.replace(/<[^>]*>/g, "").trim()
    : "No summary available.";

  return (
    <Link href={postUrl} passHref className="group h-fit">
      <Card className="p-0 overflow-hidden! border-none bg-transparent shadow-none">
        {/* Featured Image Section */}
        {featuredImage?.sourceUrl && (
          <div className="relative w-full aspect-video overflow-hidden rounded-lg">
            <Image
              src={featuredImage.sourceUrl}
              alt={featuredImage.altText || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader className="p-0">
          {/* Post Title */}
          <CardTitle className="text-xl font-bold leading-snug group-hover:text-primary transition-colors duration-200">
            {post.title}
          </CardTitle>

          {/* Date */}
          <p className="text-sm text-foreground/80">
            {formatPostDate(post.date)}
          </p>

          {/* Post Categories */}
          <div className="flex flex-wrap gap-2">
            {post.categories.nodes.slice(0, 2).map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0 mb-0">
          {/* Post Excerpt (Summary) */}
          <p
            className="text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: cleanedExcerpt }}
          />
        </CardContent>
        <CardFooter className="p-0 flex gap-1 text-secondary-foreground">
          Read More{" "}
          <MoveRight className="group-hover:translate-x-4 transition-transform duration-300" />
        </CardFooter>
      </Card>
    </Link>
  );
}
