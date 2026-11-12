import { Icons } from "@/components/icons";
import { SITE } from "@/lib/site-meta";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  ...SITE,
  initials: "K",

  keywords: [
    "Keshavv",
    "Keshav Chetri",
    "keshavdotdev",
    "keshavdotdev developer",
    "keshavdotdev portfolio",
    "Keshav Chetri developer",
    "Keshavv developer",
    "Keshavv portfolio",
    "Keshavv blog",
    "who is keshavv",
    "who is keshavdotdev",
    "Keshav Chetri portfolio",
    "Keshav Chetri backend engineer",
    "software developer India",
    "backend developer Assam",
    "backend engineer",
    "distributed systems",
    "system design",
    "low-level design",
    "TypeScript developer",
    "Go developer",
    "Next.js developer",
    "keshavv.vercel.app",
  ],

  knowsAbout: [
    "Backend Engineering",
    "Distributed Systems",
    "Databases",
    "System Design",
    "Low-Level Design (LLD)",
    "Caching",
    "Networking",
    "API Design",
    "TypeScript",
    "Node.js",
    "Go",
    "Next.js",
    "React",
    "PostgreSQL",
    "Docker",
    "Redis",
  ],

  summary:
    "Namaste! I'm Keshavv, a developer who loves building things and figuring out what makes them tick.\n\nI'm deeply interested in **backend engineering, distributed systems, databases, and infrastructure**. I enjoy going beyond the abstractions, questioning how things work, and learning by building real-world systems.",

  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Go", icon: Golang },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Docker", icon: Docker },
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  contact: {
    email: "Keshavcodes4@gmail.com",

    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Keshav7x",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/keshav-chetri/",
        icon: Icons.linkedin,
        navbar: true,
      },

      X: {
        name: "X",
        url: "https://x.com/keshavdotdev",
        icon: Icons.x,
        navbar: true,
      },
      Medium: {
        name: "Medium",
        url: "https://medium.com/@Keshavv",
        icon: Icons.globe,
        navbar: true,
      },

      Email: {
        name: "Send Email",
        url: "mailto:Keshavcodes4@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  education: {
    degree: "Bachelor of Computer Science (BCS)",
    start: "2nd Year",
    end: "Present",
  },

  // Projects currently being developed or previously developed.
  projects: [
    {
      title: "Nami",
      description:
        "A developer-first product analytics and event-tracking platform that helps developers understand how users interact with their products.",
      status: "Building",
      technologies: [
        "TypeScript",
        "Fastify",
        "Drizzle ORM",
        "PostgreSQL",
        "Redis",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "TanStack",
      ],
      image: "/projects/nami.avif",
      links: [],
    },

    {
      title: "buildR",
      description:
        "Stop watching. Start building. A community-driven platform where developers discover project ideas, vote on what gets built, form teams, and ship real projects together.",
      status: "Building",
      technologies: [
        "TypeScript",
        "Fastify",
        "Drizzle ORM",
        "PostgreSQL",
        "Redis",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "TanStack",
      ],
      image: "/projects/buildR.avif",
      links: [],
    },

    {
      title: "RAGX",
      description:
        "The retrieval layer for AI. Developer-first retrieval infrastructure for document ingestion, parsing, chunking, embeddings, vector storage, and semantic search.",
      status: "Paused",
      technologies: [
        "TypeScript",
        "Bun",
        "Turborepo",
        "PostgreSQL",
        "pgvector",
        "Gemini",
      ],
      image: "/projects/coming-soon.avif",
      links: [
        {
          type: "Source",
          href: "https://github.com/keshav7x/RAGX",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
  title: "GoCraft",
  description:
    "An interactive learning platform focused on mastering Go, backend engineering, and computer science through structured lessons, hands-on challenges, and gamified learning.",
  status: "Building",
  technologies: [
    "TypeScript",
    "Go",
    "Next.js",
    "Fastify",
    "tRPC",
    "Drizzle ORM",
    "PostgreSQL",
    "Turborepo",
    "Bun",
  ],
  image: "/projects/coming-soon.avif",
  links: [
    {
      type: "Source",
      href: "https://github.com/Keshav7x/GoCraft",
      icon: <Icons.github className="size-3" />,
    },
  ],
},
  ],


  } as const;
