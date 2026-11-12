import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

// Full-text, LLM-readable export of the whole blog so answer engines can cite
// the site's content directly instead of just its summaries.
export function GET() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const sections = posts
    .map((p) => {
      const slug = p._meta.path.replace(/\.mdx$/, "");
      return `## [${p.title}](${DATA.url}/blog/${slug})\n\nPublished: ${p.publishedAt}\n${p.tags?.length ? `Tags: ${p.tags.join(", ")}\n` : ""}\n${p.content}`;
    })
    .join("\n\n---\n\n");

  const body = `# ${DATA.name} (${DATA.fullName}) — Complete Blog Archive

> ${DATA.description}

All posts in full text. Canonical source: ${DATA.url}/blog

${sections}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
