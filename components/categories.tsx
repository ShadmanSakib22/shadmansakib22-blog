import { Category } from "@/lib/types";
import Link from "next/link";

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <ul className="text-xs uppercase flex gap-2 flex-wrap">
      <li className="flex shrink-0">
        <Link
          href={`/`}
          className="bg-input/20 hover:bg-accent border p-1 rounded-md"
        >
          All Posts
        </Link>
      </li>
      {categories.map((category: Category) => (
        <li key={category.id} className="flex shrink-0">
          <Link
            href={`/?category=${category.slug}`}
            className="bg-input/20 hover:bg-accent border p-1 rounded-md"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
