
"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  href?: string;
  description: React.ReactNode;
  dates?: string;
  status?: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

function ProjectImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="h-full w-full bg-muted" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 80vw, 320px"
      onError={() => setImageError(true)}
      className="object-cover object-top"
    />
  );
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  status,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const [showTags, setShowTags] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  const projectHref = href || link;
  const statusLabel = status ?? "Active";
  const statusDot =
    statusLabel.toLowerCase() === "paused" ? "bg-amber-500" : "bg-emerald-500";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "border border-border bg-card",
        "transition-colors duration-300",
        className
      )}
    >
      {/* Image / Hover Artwork */}
      <div className="relative h-[180px] shrink-0 overflow-hidden bg-muted/30">

        {/* Radial burst - visible on hover */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 opacity-0",
            "transition-opacity duration-500 ease-out",
            "group-hover:opacity-100",
            "bg-[repeating-conic-gradient(from_-15deg_at_50%_100%,#f7d88a_0deg_9deg,#f7d88a_9deg_15deg,#e85e4d_15deg_21deg,#e85e4d_21deg_25deg,#248e8b_25deg_34deg,#248e8b_34deg_40deg)]"
          )}
        />

        {/* Screenshot */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2",
            "h-[132px] w-[80%]",
            "-translate-x-1/2 translate-y-[12px]",
            "overflow-hidden rounded-t-xl",
            "border-2 border-foreground/90",
            "bg-background shadow-2xl",
            "transition-all duration-500",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:translate-y-0",
            "group-hover:w-[82%]"
          )}
        >
          {video && !mediaError ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setMediaError(true)}
              className="h-full w-full object-cover object-top"
            />
          ) : image && !mediaError ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">

        {/* Metadata */}
        <div className="mb-5 flex items-center justify-between gap-3">
          {dates && (
            <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
              {dates}
            </span>
          )}

          <span className="ml-auto flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className={cn("size-2.5 rounded-full", statusDot)} />
            {statusLabel}
          </span>
        </div>

        {/* Title + External Links */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="min-w-0 truncate text-xl font-bold tracking-tight text-blue-500 transition-colors duration-300 group-hover:text-blue-400">
            {title}
          </h3>

          <div className="flex shrink-0 items-center gap-3 text-muted-foreground">
            {links?.map((item, index) => (
              <Link
                key={`${item.type}-${index}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.type}
                title={item.type}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {item.icon}
              </Link>
            ))}

            {projectHref && (
              <Link
                href={projectHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title}`}
                className="transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground"
              >
                <ArrowUpRight className="size-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 font-mono text-sm leading-[1.5] text-foreground/90 [&_a]:text-blue-400 [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_strong]:font-bold [&_ul]:ml-4 [&_ul]:list-disc">
          {description}
        </div>

        {/* Expandable Tags */}
        {tags.length > 0 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowTags((prev) => !prev)}
              aria-expanded={showTags}
              className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {showTags ? "Hide tags" : "Show tags"}
              <span>· {tags.length}</span>

              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-300",
                  showTags && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                showTags
                  ? "mt-3 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="flex flex-wrap gap-2 overflow-hidden">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-md border-border bg-transparent px-2 py-1 font-mono text-[11px] font-normal text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
