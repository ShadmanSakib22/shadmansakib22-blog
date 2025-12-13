"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp, Copy } from "lucide-react";
import { TocDialog } from "@/components/toc-dialog";
import { useCallback, useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface FloatingToolbarProps {
  headings: TocItem[];
}

/**
 * FloatingToolbar: Uses position: fixed and an IntersectionObserver on a sentinel
 * element to automatically hide the toolbar when the bottom of the article is reached,
 * preventing overlap with a dynamic-height footer.
 */
export function FloatingToolbar({ headings }: FloatingToolbarProps) {
  // Start visible; the observer will hide it when the sentinel is detected.
  const [showToolbar, setShowToolbar] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const SENTINEL_ID = "toolbar-sentinel";
    const sentinelElement = document.getElementById(SENTINEL_ID);

    // Only set up the observer if the sentinel exists in the DOM.
    if (sentinelElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Hide toolbar if the sentinel (article end) enters the viewport.
          setShowToolbar(!entry.isIntersecting);
        },
        {
          // Root margin causes the hide action to trigger when the sentinel
          // is near the bottom of the viewport (before the fixed toolbar overlaps).
          rootMargin: "0px 0px -130px 0px",
          threshold: 0.01,
        }
      );

      observer.observe(sentinelElement);

      return () => {
        observer.unobserve(sentinelElement);
      };
    }
    // If the sentinel is missing (e.g., in a non-post page context),
    // the toolbar remains visible (due to useState(true)).
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      // Copy the current URL to the clipboard
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);

      // Revert state after 1.5 seconds for visual feedback
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  const baseClasses =
    "p-1 bg-card border rounded-md fixed bottom-10 right-0.5 sm:right-4 grid gap-1 z-50 transition-opacity duration-300 shadow-lg";
  // Controls visibility using opacity and pointer-events (better for transitions)
  const visibilityClass = showToolbar
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  // Conditional class for successful copy feedback
  const copyButtonClass = copySuccess
    ? "bg-green-500 text-white hover:bg-green-600"
    : "bg-background text-foreground hover:bg-secondary";

  return (
    <div className={`${baseClasses} ${visibilityClass}`}>
      {/* Table of Contents Button/Dialog */}
      <TocDialog headings={headings} />

      {/* Copy Link Button with UX feedback */}
      <Button
        onClick={handleCopy}
        variant="outline"
        size="icon-sm"
        aria-label="Copy link to clipboard"
        className={copyButtonClass}
      >
        <Copy size={18} />
      </Button>

      {/* Scroll to Top Button */}
      <Link href={"#heading-top"} scroll={true}>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Scroll to top of the article"
        >
          <ArrowUp size={18} />
        </Button>
      </Link>
    </div>
  );
}
