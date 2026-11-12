# Keshav Chetri — Portfolio

Personal portfolio and blog of **Keshav Chetri (Keshavv)** — software developer from Assam, India, focused on backend engineering, distributed systems, and databases. Live at [keshavv.vercel.app](https://keshavv.vercel.app).

Built with Next.js 16 (App Router), [shadcn/ui](https://ui.shadcn.com/), [Magic UI](https://magicui.design/), Tailwind CSS v4, and content-collections (MDX).

## Search & AI discoverability (SEO / GEO)

- Full metadata: OpenGraph, Twitter cards, canonical URLs, keywords, per-page titles
- Structured data (JSON-LD): `Person`, `ProfilePage`, `WebSite`, `Blog`, `BlogPosting`, `BreadcrumbList`, `FAQPage`
- `robots.txt` explicitly allowing search engines **and** AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, …)
- `sitemap.xml` and `manifest.webmanifest`
- RSS feed at `/rss.xml`
- `/llms.txt` and `/llms-full.txt` (full-text, machine-readable blog archive per [llmstxt.org](https://llmstxt.org))
- Dynamic OG images for every page and post

## Development

```bash
bun install
bun run dev     # start dev server
bun run build   # production build
bun run lint
```

Edit `src/data/resume.tsx` to change all site content (bio, projects, socials, keywords). Blog posts live in `content/*.mdx`.

## Environment variables

- `GITHUB_TOKEN` — GitHub contributions graph
- `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_VERIFICATION` — optional search-console verification meta tags

## License

MIT
