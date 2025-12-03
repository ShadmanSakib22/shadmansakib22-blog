import { Post, Category } from "@/lib/types";
import { mockPostList } from "@/lib/mock-data";
import PostCard from "@/components/post-card";
import { Categories } from "@/components/categories";

// Mock Category Data for the navigation bar
const mockCategories: Category[] = [
  { id: "all", name: "All Posts", slug: "" },
  { id: "dev", name: "Next.js Development", slug: "nextjs-dev" },
  { id: "frontend", name: "Frontend", slug: "frontend" },
  { id: "seo", name: "SEO Strategy", slug: "seo-strategy" },
  { id: "tech", name: "Technology Trends", slug: "tech" },
];

const posts: Post[] = mockPostList;

export default function Home() {
  return (
    <main>
      {/* Blog Header & Title */}
      <header className="mb-8 md:mb-10 container">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Latest Posts
        </h1>
        <p className="mt-4 text-xl">
          Deep dives into new learnings, technical projects, and the occasional
          life update.
        </p>
      </header>

      {/* Post List */}
      <section className="bg-background pt-5 pb-10">
        <div className="container">
          <Categories categories={mockCategories} />
          <hr className="border-dashed my-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
