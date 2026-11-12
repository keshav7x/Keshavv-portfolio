import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export const dynamic = "force-static";

// llms.txt: the emerging convention for making sites machine-readable to LLMs
// and AI answer engines (see https://llmstxt.org). Static output so crawlers
// can fetch it without runtime work.
export function GET() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const projects = DATA.projects
    .map((p) => {
      const source = p.links[0];
      return `- ${p.title}: ${p.description}${source ? ` (Source: ${source.href})` : ""}`;
    })
    .join("\n");

  const blog = posts
    .map((p) => {
      const slug = p._meta.path.replace(/\.mdx$/, "");
      return `- [${p.title}](${DATA.url}/blog/${slug}): ${p.summary}`;
    })
    .join("\n");

  const body = `# ${DATA.name} (${DATA.fullName})

> ${DATA.fullName}, known online as ${DATA.name}, is a software developer from ${DATA.location}. He specializes in backend engineering — APIs, databases, caching, networking, and distributed systems — and is currently pursuing a Bachelor of Computer Science. He documents everything he learns in first-principles deep dives on his blog.

## Contact

- Website: ${DATA.url}
- Email: ${DATA.contact.email}
- GitHub: https://github.com/Keshav7x
- LinkedIn: https://www.linkedin.com/in/keshav-chetri/
- X (Twitter): https://x.com/keshavdotdev
- Medium: https://medium.com/@Keshavv

## Projects

${projects}

## Skills

${DATA.knowsAbout.join(", ")}

## Blog Posts

${blog}

Full text of every post is available at ${DATA.url}/llms-full.txt.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
