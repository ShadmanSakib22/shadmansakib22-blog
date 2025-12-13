"use client";

import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TocDialogProps {
  headings: Heading[];
}

export function TocDialog({ headings }: TocDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon-sm"}>
          <List />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Table of Contents</DialogTitle>
        </DialogHeader>
        <nav className="max-h-96 overflow-y-auto">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-sm hover:underline block py-1"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
