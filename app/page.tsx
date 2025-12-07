import { Category } from "@/lib/types";
import { Categories } from "@/components/categories";
import { InfinitePostList } from "@/components/infinite-post-list";
import { getCategories, getAllPosts } from "@/lib/queries";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const category =
    typeof params.category === "string" ? params.category : undefined;
  const searchTerm =
    typeof params.search === "string" ? params.search : undefined;

  const CategoriesList: Category[] = await getCategories();
  const { posts, pageInfo } = await getAllPosts(
    8,
    undefined,
    category,
    searchTerm
  );

  return (
    <main>
      {/* Blog Header & Title */}
      <header className="py-8 md:py-10 bg-input/5 bg-grid-dashed">
        <div className="container">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl capitalize">
            {category
              ? `Category: ${category.replace("-", " ")}`
              : searchTerm
              ? `Search: ${searchTerm}`
              : "Latest Posts"}
          </h1>
          <p className="mt-4 text-xl max-w-3xl">
            In this blog I share about; my various technical projects, new
            learnings and tips, personal life updates and other mislaneous stuff
            I find interesting.
          </p>
        </div>
      </header>

      {/* Post List */}
      <section className="container pt-5 pb-10">
        <Categories categories={CategoriesList} />
        <hr className="border-dashed my-5" />
        <InfinitePostList
          initialPosts={posts}
          initialPageInfo={pageInfo}
          category={category}
          searchTerm={searchTerm}
        />
      </section>
    </main>
  );
}
