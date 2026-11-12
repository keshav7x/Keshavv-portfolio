import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ArrowRight } from "lucide-react";
import { DATA } from "@/data/resume";

const DESCRIPTION =
  "First-principles deep dives into backend engineering, system design, low-level design (LLD), caching, networking, and API performance — written by Keshavv (Keshav Chetri).";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  const page = normalizePage(pageParam, totalPages);

  const title = page > 1 ? `Blog — Page ${page}` : "Blog";

  return {
    title,
    description: DESCRIPTION,
    keywords: [
      "backend engineering blog",
      "system design blog",
      "low-level design",
      "caching guide",
      "latency and throughput",
      "networking fundamentals",
      "LLD from scratch",
      DATA.fullName,
      DATA.name,
    ],
    alternates: {
      canonical: page > 1 ? `/blog?page=${page}` : "/blog",
    },
    openGraph: {
      title: `${title} | ${DATA.name}`,
      description: DESCRIPTION,
      url: page > 1 ? `${DATA.url}/blog?page=${page}` : `${DATA.url}/blog`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${DATA.name}`,
      description: DESCRIPTION,
    },
  };
}

const PAGE_SIZE = 5;

const blogJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${DATA.url}/blog#blog`,
  url: `${DATA.url}/blog`,
  name: `${DATA.name}'s Blog`,
  description: DESCRIPTION,
  inLanguage: "en",
  author: { "@id": `${DATA.url}#person`, "@type": "Person", name: DATA.fullName },
  publisher: { "@id": `${DATA.url}#person` },
  blogPost: [...allPosts]
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map((post) => {
      const slug = post._meta.path.replace(/\.mdx$/, "");
      return {
        "@type": "BlogPosting",
        headline: post.title,
        url: `${DATA.url}/blog/${slug}`,
        datePublished: post.publishedAt,
        description: post.summary,
        author: { "@id": `${DATA.url}#person`, "@type": "Person", name: DATA.fullName },
      };
    }),
}).replace(/</g, "\\u003c");

// All motion lives here as CSS, so the page stays a server component (no client JS, no extra deps).
// One load sequence: header settles, rows cascade, the progress rail fills.
const MOTION_CSS = `
@keyframes blog-rise {
  from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes blog-rail {
  from { transform: scaleX(0); }
  to   { transform: scaleX(var(--to)); }
}
@media (prefers-reduced-motion: no-preference) {
  .blog-rise {
    opacity: 0;
    animation: blog-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(var(--i, 0) * 70ms + 50ms);
  }
  .blog-rail {
    transform: scaleX(0);
    animation: blog-rail 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
  }
}
@media (prefers-reduced-motion: reduce) {
  .blog-rail { transform: scaleX(var(--to)); }
}
`;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const pagerBase =
    "h-8 w-fit px-3 flex items-center justify-center text-sm border border-border rounded-lg";

  return (
    <section id="blog">
      <style>{MOTION_CSS}</style>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: blogJsonLd }}
      />

      <header className="mb-8">
        <h1
          className="blog-rise mb-2 flex items-center text-2xl font-semibold tracking-tight"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          Blog
          <span className="ml-2 rounded-md border border-border bg-card px-2 py-1 text-sm font-normal tabular-nums text-muted-foreground">
            {sortedPosts.length} posts
          </span>
        </h1>
        <p
          className="blog-rise max-w-prose text-sm text-muted-foreground"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Deep dives into backend engineering, system design, and the craft of building
          software.
        </p>
      </header>

      {paginatedPosts.length > 0 ? (
        <>
          {/* key = page, so the cascade replays on every page change */}
          <ul key={pagination.page} className="flex flex-col">
            {paginatedPosts.map((post, i) => {
              const slug = post._meta.path.replace(/\.mdx$/, "");
              return (
                <li
                  key={slug}
                  className="blog-rise"
                  style={{ "--i": i + 2 } as React.CSSProperties}
                >
                  <Link
                    href={`/blog/${slug}`}
                    className="group/blog relative grid gap-x-8 gap-y-1 rounded-lg py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 md:grid-cols-[7rem_1fr]"
                  >
                    {/* Hover surface: eases in with a slight scale, bleeds past the text edge */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-x-3 inset-y-0 -z-10 scale-[0.98] rounded-xl bg-muted/50 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/blog:scale-100 group-hover/blog:opacity-100 group-focus-visible/blog:scale-100 group-focus-visible/blog:opacity-100 motion-reduce:transition-none"
                    />

                    {/* Date and reading time sit in a quiet left gutter on desktop */}
                    <div className="flex gap-x-2 pt-[5px] text-xs text-muted-foreground md:flex-col md:gap-y-0.5">
                      <span className="tabular-nums transition-colors duration-300 group-hover/blog:text-foreground">
                        {post.publishedAt}
                      </span>
                      {post.readingTime && (
                        <span className="text-muted-foreground/70">{post.readingTime}</span>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col gap-y-2">
                      <h2 className="flex items-start justify-between gap-4 text-lg font-medium tracking-tight">
                        <span className="relative inline-block transition-transform duration-300 ease-out group-hover/blog:translate-x-1 motion-reduce:transform-none after:absolute after:-bottom-[2px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground/40 after:transition-transform after:duration-500 after:ease-out group-hover/blog:after:scale-x-100 motion-reduce:after:hidden">
                          {post.title}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="mt-1.5 size-4 shrink-0 -translate-x-2 text-foreground opacity-0 transition-all duration-300 ease-out group-hover/blog:translate-x-0 group-hover/blog:opacity-100 motion-reduce:transition-none"
                        />
                      </h2>

                      {post.summary && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover/blog:text-foreground/80">
                          {post.summary}
                        </p>
                      )}

                      {(post.category || (post.tags && post.tags.length > 0)) && (
                        <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                          {post.category && (
                            <span className="rounded-md border border-border px-1.5 py-0.5 text-xs text-muted-foreground transition-colors duration-300 group-hover/blog:border-foreground/30 group-hover/blog:text-foreground">
                              {post.category}
                            </span>
                          )}
                          {post.tags?.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags && post.tags.length > 4 && (
                            <span className="px-1 text-xs text-muted-foreground/70">
                              +{post.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {pagination.totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-8 flex flex-col gap-4 border-t border-border pt-6"
            >
              {/* Progress rail: fills to the current page position */}
              <div
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={pagination.totalPages}
                aria-valuenow={pagination.page}
                aria-label={`Page ${pagination.page} of ${pagination.totalPages}`}
                className="h-px w-full bg-border"
              >
                <div
                  key={pagination.page}
                  className="blog-rail h-px origin-left bg-foreground"
                  style={
                    { "--to": pagination.page / pagination.totalPages } as React.CSSProperties
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm tabular-nums text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </p>
                <div className="flex gap-2">
                  {pagination.hasPreviousPage ? (
                    <Link
                      href={`/blog?page=${pagination.page - 1}`}
                      className={`${pagerBase} transition-[background-color,transform] hover:bg-accent/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    >
                      Previous
                    </Link>
                  ) : (
                    <span aria-disabled className={`${pagerBase} cursor-not-allowed opacity-50`}>
                      Previous
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link
                      href={`/blog?page=${pagination.page + 1}`}
                      className={`${pagerBase} transition-[background-color,transform] hover:bg-accent/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    >
                      Next
                    </Link>
                  ) : (
                    <span aria-disabled className={`${pagerBase} cursor-not-allowed opacity-50`}>
                      Next
                    </span>
                  )}
                </div>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div
          className="blog-rise flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-4 py-12"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <p className="text-center text-muted-foreground">
            No posts yet. The first one is on its way.
          </p>
        </div>
      )}
    </section>
  );
}
