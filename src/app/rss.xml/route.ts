import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const items = posts
    .map((p) => {
      const slug = p._meta.path.replace(/\.mdx$/, "");
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${DATA.url}/blog/${slug}</link>
      <guid isPermaLink="true">${DATA.url}/blog/${slug}</guid>
      <description>${escape(p.summary ?? "")}</description>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <author>${escape(DATA.contact.email)} (${escape(DATA.fullName)})</author>
${(p.tags ?? []).map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${DATA.name} — Blog`)}</title>
    <link>${DATA.url}/blog</link>
    <description>${escape(DATA.description)}</description>
    <language>en</language>
    <atom:link href="${DATA.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
