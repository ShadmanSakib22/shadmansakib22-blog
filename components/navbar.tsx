import Link from "next/link";
import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import ButtonInput from "@/components/ui/button-input";
import { Blend, Search } from "lucide-react";

const Navbar = () => {
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
          <ButtonInput className="hidden sm:flex">
            <input
              type="text"
              data-slot="input"
              className="focus:outline-none ring-0 border-0 px-2 py-1"
              placeholder="search..."
            />
            <Button
              variant={"outline"}
              className="border-0 border-l text-primary rounded-none"
            >
              <Search />
            </Button>
          </ButtonInput>

          {/*Todo: Click to open search modal on mobile */}
          <Button
            variant={"outline"}
            size={"icon-sm"}
            className="sm:hidden text-primary"
          >
            <Search />
          </Button>
          <ThemeToggler />
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
