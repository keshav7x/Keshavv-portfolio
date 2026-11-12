
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const iconClass =
    "flex size-10 items-center justify-center rounded-xl border border-transparent bg-transparent text-muted-foreground transition-all duration-200 hover:border-border hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const tooltipClass =
    "rounded-lg border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-xl";

  return (
    <nav aria-label="Primary" className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-3">
      <Dock
        className="
          pointer-events-auto
          flex h-14 w-fit max-w-full items-center gap-1.5
          rounded-2xl border border-border/70
          bg-background/80 px-2
          shadow-lg shadow-black/5
          backdrop-blur-2xl
          supports-[backdrop-filter]:bg-background/65
        "
      >
        {/* Navigation */}
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          const icon = (
            <DockIcon className={iconClass}>
              <item.icon className="size-[18px]" />
            </DockIcon>
          );

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                {isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    {icon}
                  </a>
                ) : (
                  <Link href={item.href} aria-label={item.label}>
                    {icon}
                  </Link>
                )}
              </TooltipTrigger>

              <TooltipContent
                side="top"
                sideOffset={10}
                className={tooltipClass}
              >
                {item.label}
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          );
        })}

        <Separator
          orientation="vertical"
          className="mx-1 h-6 w-px bg-border"
        />

        {/* Social Links */}
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => {
            const isExternal = social.url.startsWith("http");
            const Icon = social.icon;

            return (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={name}
                  >
                    <DockIcon className={iconClass}>
                      <Icon className="size-[18px]" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  sideOffset={10}
                  className={tooltipClass}
                >
                  {name}
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            );
          })}

        <Separator
          orientation="vertical"
          className="mx-1 h-6 w-px bg-border"
        />

        {/* Theme Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className={iconClass}
            >
              {mounted ? (
                isDark ? (
                  <Sun className="size-[18px] transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="size-[18px] transition-transform duration-300 hover:-rotate-12" />
                )
              ) : (
                <span className="size-[18px]" />
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent
            side="top"
            sideOffset={10}
            className={tooltipClass}
          >
            {isDark ? "Light mode" : "Dark mode"}
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </nav>
  );
}
