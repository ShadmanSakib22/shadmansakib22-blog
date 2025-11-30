import * as React from "react";

import { cn } from "@/lib/utils";

export default function ButtonInput({
  className,
  children,
}: React.ComponentProps<"input">) {
  return (
    <div
      className={cn(
        "flex gap-1 items-center overflow-hidden",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md border bg-input/5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
