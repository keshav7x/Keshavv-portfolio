"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export interface AnimatedThemeTogglerProps {
  variant?: "rectangle" | "circle";
  className?: string;
}

export function AnimatedThemeToggler({
  variant = "circle",
  className,
}: AnimatedThemeTogglerProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className={cn(
        "rounded-full border-2 border-border bg-transparent p-2 transition-all duration-200 hover:bg-muted/50 flex items-center justify-between",
        variant === "rectangle" ? "rounded-md p-1" : "rounded-full",
        className,
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Icons.globe className="size-3" />
      <span
        className={cn(
          "text-xs text-muted-foreground",
          variant === "rectangle" ? "font-medium" : "",
        )}
      >
        {variant}
      </span>
    </button>
  );
}