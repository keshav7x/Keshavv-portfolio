import Image from "next/image";
import FadeUp from "@/components/magicui/fade-up";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import FaqSection from "@/components/section/faq-section";
import ProjectsSection from "@/components/section/projects-section";
import StudentSection from "@/components/section/student-section";
import SkillsSection from "@/components/section/skills-section";
import SkillsContribution from "@/components/skills-contribution";
import HeroUnderline from "@/components/hero-underline";
import ViewCounter from "@/components/view-counter";
import { getContributions } from "@/lib/contributions";

const BLUR_FADE_DELAY = 0.04;

const sameAs = Object.values(DATA.contact.social)
  .map((social) => social.url)
  .filter((url) => url.startsWith("http"));

const faqs = [
  {
    q: `Who is ${DATA.name}?`,
    a: `${DATA.name} (${DATA.fullName}) is a software developer from ${DATA.location}, currently pursuing a Bachelor of Computer Science. He builds backend systems, developer tools, and web applications, and documents his learning on his blog at ${DATA.url}/blog.`,
  },
  {
    q: `What is keshavdotdev?`,
    a: `keshavdotdev is the online handle of ${DATA.name} (${DATA.fullName}), a software developer from ${DATA.location}. He uses it on X (@keshavdotdev) and across his portfolio at ${DATA.url}, where he writes about backend engineering and distributed systems.`,
  },
  {
    q: `Is Keshavv the same person as Keshav Chetri?`,
    a: `Yes. ${DATA.name} is the online name of ${DATA.fullName}, a software developer from ${DATA.location}. He publishes code at github.com/Keshav7x, writes at ${DATA.url}/blog and medium.com/@Keshavv, and posts as @keshavdotdev on X.`,
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

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${DATA.url}#profile`,
      url: DATA.url,
      name: `${DATA.name} — ${DATA.jobTitle}`,
      description: DATA.description,
      isPartOf: { "@id": `${DATA.url}#website` },
      mainEntity: { "@id": `${DATA.url}#person` },
      about: { "@id": `${DATA.url}#person` },
      inLanguage: "en",
      datePublished: "2026-11-01",
    },
    {
      "@type": "Person",
      "@id": `${DATA.url}#person`,
      name: DATA.name,
      alternateName: [DATA.fullName, "keshavdotdev"],
      disambiguatingDescription:
        "keshavdotdev is the online handle of Keshavv (Keshav Chetri), a software developer from Assam, India, known for backend engineering deep dives at keshavv.vercel.app and on X (@keshavdotdev).",
      givenName: "Keshav",
      familyName: "Chetri",
      jobTitle: DATA.jobTitle,
      url: DATA.url,
      description: DATA.description,
      image: `${DATA.url}${DATA.avatarUrl}`,
      email: `mailto:${DATA.contact.email}`,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Assam",
        addressCountry: "IN",
      },
      nationality: "Indian",
      sameAs,
      knowsAbout: DATA.knowsAbout,
      hasPart: { "@id": `${DATA.url}#blog` },
      mainEntityOfPage: { "@id": `${DATA.url}#profile` },
    },
    {
      "@type": "WebSite",
      "@id": `${DATA.url}#website`,
      url: DATA.url,
      name: DATA.name,
      alternateName: ["keshavv", "keshavdotdev"],
      description: DATA.description,
      inLanguage: "en",
      publisher: { "@id": `${DATA.url}#person` },
      author: { "@id": `${DATA.url}#person` },
    },
    {
      "@type": "Blog",
      "@id": `${DATA.url}#blog`,
      url: `${DATA.url}/blog`,
      name: `${DATA.name}'s Blog`,
      description:
        "First-principles deep dives into backend engineering, system design, low-level design, caching, networking, and performance.",
      inLanguage: "en",
      author: { "@id": `${DATA.url}#person` },
      publisher: { "@id": `${DATA.url}#person` },
    },
    {
      "@type": "FAQPage",
      "@id": `${DATA.url}#faq`,
      isPartOf: { "@id": `${DATA.url}#profile` },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
}).replace(/</g, "\\u003c");

export default async function Page() {
  const contributions = await getContributions();

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <div className="relative w-fit">
                <h1 className="hero-title text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  Hi, I&apos;m {DATA.name.split(" ")[0]}
                </h1>
                <HeroUnderline />
              </div>
              <p
                className="fade-up text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                style={{ "--fade-delay": "0.08s" } as React.CSSProperties}
              >
                {DATA.description}
              </p>
            </div>
            <FadeUp delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  width={128}
                  height={128}
                  priority
                  sizes="(max-width: 768px) 200px, 128px"
                  className="size-24 md:size-32 rounded-full border object-cover shadow-lg ring-4 ring-muted"
                />
                <ViewCounter />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <FadeUp delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </FadeUp>
          <FadeUp delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </FadeUp>
        </div>
      </section>
      <section id="student">
        <FadeUp delay={BLUR_FADE_DELAY * 5}>
          <StudentSection />
        </FadeUp>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <FadeUp delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </FadeUp>
          <p className="text-muted-foreground">
            Bachelor of Computer Science (BCS)<br />
            Currently in 2nd Year<br />
            Exploring computer science beyond the classroom — from understanding how software works under the hood to building real-world applications. Particularly interested in backend engineering, databases, and distributed systems.
          </p>
        </div>
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="contribution-graph">
        <SkillsContribution data={contributions} />
      </section>
      <section id="projects">
        <FadeUp delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </FadeUp>
      </section>
      <section id="faq">

      </section>
      <section id="contact">
        <FadeUp delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </FadeUp>
      </section>
    </main>
  );
}
