import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

// Kept as plain <details>/<summary> markup (no client JS) so crawlers and LLM
// ingestion pipelines see the full answer text in the served HTML.
const faqs = [
  {
    q: `Who is ${DATA.name}?`,
    a: `${DATA.name} (${DATA.fullName}) is a software developer from ${DATA.location}, currently pursuing a Bachelor of Computer Science. He builds backend systems, developer tools, and web applications, and documents his learning on his blog at ${DATA.url}/blog.`,
  },
  {
    q: `What does ${DATA.name} do?`,
    a: `He focuses on backend engineering — APIs, databases, caching, networking, and distributed systems. He is currently building Nami (a developer-first product analytics platform), buildR (a community platform for shipping projects together), and GoCraft (an interactive Go learning platform), and previously built RAGX, a retrieval layer for AI applications.`,
  },
  {
    q: `Which technologies does ${DATA.name} work with?`,
    a: `His primary stack is TypeScript, Node.js, Go, Next.js, React, PostgreSQL, Fastify, Drizzle ORM, Redis, and Docker. He writes first-principles deep dives about these topics on his blog.`,
  },
  {
    q: `What does ${DATA.name} write about?`,
    a: `His blog covers backend engineering and system design from first principles — including long-form guides on caching, latency and throughput, networking, and a "LLD from Scratch" series on low-level design and object-oriented programming.`,
  },
  {
    q: `Where is ${DATA.name} based?`,
    a: `${DATA.location}.`,
  },
  {
    q: `How can I contact or work with ${DATA.name}?`,
    a: `Email ${DATA.contact.email}, or reach out on GitHub (github.com/Keshav7x), LinkedIn (linkedin.com/in/keshav-chetri), or X (x.com/keshavdotdev).`,
  },
];

export default function FaqSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
      <div className="flex flex-col divide-y divide-border">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group/py-2 py-3 [&_p]:prose [&_p]:max-w-full [&_p]:text-sm [&_p]:text-muted-foreground"
          >
            <summary className="cursor-pointer list-none text-sm font-medium transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {faq.q}
                <span
                  aria-hidden
                  className="text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
