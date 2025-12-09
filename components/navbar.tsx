"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import ButtonInput from "@/components/ui/button-input";
import { SearchModal } from "@/components/search-modal";
import { Blend, Search } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <section className="bg-background text-foreground border-b shadow-lg py-3 sticky top-0 z-50">
      <nav className="container flex items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tighter flex items-center ">
            Shadman
            <Blend />
            BLOG
          </h1>
        </Link>
        <div className="flex gap-3 ml-auto items-center">
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex">
            <ButtonInput>
              <input
                type="text"
                data-slot="input"
                className="focus:outline-none ring-0 border-0 px-2 py-1"
                placeholder="search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                variant={"outline"}
                className="border-0 border-l text-primary rounded-none"
              >
                <Search />
              </Button>
            </ButtonInput>
          </form>

          {/* Search modal for mobile */}
          <SearchModal>
            <Button
              variant={"outline"}
              size={"icon-sm"}
              className="sm:hidden text-primary"
            >
              <Search />
            </Button>
          </SearchModal>
          <ThemeToggler />
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
