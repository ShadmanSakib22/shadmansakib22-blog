"use client";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button
      variant="default"
      className="size-[30px]"
      onClick={toggleTheme}
      aria-label="theme toggle"
    >
      <SunMoon />
    </Button>
  );
}
