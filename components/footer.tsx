import { Facebook, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/newsletter-form";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-4">
          <NewsletterForm />
          <section className="flex gap-4 items-end justify-between">
            <div className="space-y-1">
              <h4 className="font-semibold">Social Media</h4>
              <div className="flex gap-2">
                <Button variant={"outline"} size={"icon-sm"}>
                  <Github />
                </Button>
                <Button variant={"outline"} size={"icon-sm"}>
                  <Linkedin />
                </Button>
                <Button variant={"outline"} size={"icon-sm"}>
                  <Facebook />
                </Button>
              </div>
            </div>
            <nav className="flex gap-2 sm:hidden text-xs">
              <a
                href=""
                className="hover:underline underline-offset-4 px-2 border-l"
              >
                Portfolio
              </a>
              <a
                href=""
                className="hover:underline underline-offset-4 px-2 border-l"
              >
                RSS
              </a>
              <a
                href=""
                className="hover:underline underline-offset-4 px-2 border-l"
              >
                Sitemap
              </a>
            </nav>
          </section>
        </div>
        <hr />
        <div className="flex flex-col sm:flex-row  justify-between items-center gap-4 pt-4 pb-2 text-sm">
          <nav className="hidden sm:flex gap-4">
            <a href="" className="hover:underline underline-offset-4">
              Portfolio
            </a>
            <a
              href=""
              className="hover:underline underline-offset-4 px-2 border-l"
            >
              RSS
            </a>
            <a
              href=""
              className="hover:underline underline-offset-4 px-2 border-l"
            >
              Sitemap
            </a>
          </nav>
          <p>Copyright &copy; 2025 Shadman Sakib</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
