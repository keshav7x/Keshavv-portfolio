
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Code2,
  Database,
  Layers3,
  Monitor,
  Wrench,
} from "lucide-react";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiFastify,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiDrizzle,
  SiGit,
  SiGithub,
  SiDocker,
  SiBun,
  SiVercel,
  SiFigma,
  SiPostman,
  SiAxios,
  SiJsonwebtokens,
} from "react-icons/si";

import type { IconType } from "react-icons";
import type { CSSProperties } from "react";

const categories = [
  { id: "all", label: "All", icon: Layers3 },
  { id: "backend", label: "Backend", icon: Code2 },
  { id: "database", label: "Data", icon: Database },
  { id: "architecture", label: "Architecture", icon: Layers3 },
  { id: "frontend", label: "Frontend", icon: Monitor },
  { id: "tools", label: "Tools", icon: Wrench },
] as const;

type Category = (typeof categories)[number]["id"];

type Skill = {
  name: string;
  category: Exclude<Category, "all">;
  color: string;
};

const skills: Skill[] = [
  // Backend
  {
    name: "TypeScript",
    category: "backend",
    color: "#3178C6",
  },
  {
    name: "JavaScript",
    category: "backend",
    color: "#F7DF1E",
  },
  {
    name: "Go",
    category: "backend",
    color: "#F73F1E",
  },
  {
    name: "Node.js",
    category: "backend",
    color: "#5FA04E",
  },
  {
    name: "Express.js",
    category: "backend",
    color: "#FFFFFF",
  },
  {
    name: "Fastify",
    category: "backend",
    color: "#FFFFFF",
  },

  // Data
  {
    name: "PostgreSQL",
    category: "database",
    color: "#4169E1",
  },
  {
    name: "MongoDB",
    category: "database",
    color: "#47A248",
  },
  {
    name: "Redis",
    category: "database",
    color: "#FF4438",
  },
  {
    name: "Drizzle ORM",
    category: "database",
    color: "#C5F74F",
  },
  {
    name: "Prisma",
    category: "database",
    color: "#5A67D8",
  },

  // Architecture
{ name: "OOP", category: "architecture", color: "#DDEDE5" },
{ name: "SOLID Principles", category: "architecture", color: "#F3E1E7" },
{ name: "Design Patterns", category: "architecture", color: "#E8E0F5" },
{ name: "Low-Level Design", category: "architecture", color: "#DCEBFA" },
{ name: "System Design", category: "architecture", color: "#F5E6D5" },
{ name: "Database Design", category: "architecture", color: "#E2E8F0" },

  // Frontend
  {
    name: "React",
    category: "frontend",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    category: "frontend",
    color: "#FFFFFF",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    color: "#06B6D4",
  },
  {
    name: "Framer Motion",
    category: "frontend",
    color: "#BB4BFF",
  },

  // Tools
  {
    name: "Git",
    category: "tools",
    color: "#F05032",
  },
  {
    name: "GitHub",
    category: "tools",
    color: "#FFFFFF",
  },
  {
    name: "Docker",
    category: "tools",
    color: "#2496ED",
  },
  {
    name: "Bun",
    category: "tools",
    color: "#FBF0DF",
  },
  {
    name: "Vercel",
    category: "tools",
    color: "#FFFFFF",
  },
  {
    name: "Figma",
    category: "tools",
    color: "#F24E1E",
  },
  {
    name: "Postman",
    category: "tools",
    color: "#FF6C37",
  },
  {
    name: "Axios",
    category: "tools",
    color: "#5A29E4",
  },
  {
    name: "JWT",
    category: "tools",
    color: "#FB015B",
  },
];

// Technology logo mapping
const skillIcons: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  Fastify: SiFastify,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  "Drizzle ORM": SiDrizzle,
  Prisma: SiPrisma,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Bun: SiBun,
  Vercel: SiVercel,
  Figma: SiFigma,
  Postman: SiPostman,
  Axios: SiAxios,
  JWT: SiJsonwebtokens,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("all");

  const filteredSkills = useMemo(
    () =>
      activeCategory === "all"
        ? skills
        : skills.filter(
            (skill) => skill.category === activeCategory
          ),
    [activeCategory]
  );

  return (
    <section id="skills" className="w-full py-12">
      {/* Section heading */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            What I work with
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Skills & Technologies
            <span className="text-muted-foreground">.</span>
          </h2>
        </div>

        <span className="hidden font-mono text-xs text-muted-foreground sm:block">
          {String(skills.length).padStart(2, "0")} SKILLS
        </span>
      </div>

      <p className="mb-8 max-w-xl text-sm leading-7 text-muted-foreground">
        Technologies, tools, and engineering concepts I use to
        build software and explore how systems work.
      </p>

      {/* Category filters */}
      <div className="mb-7 flex gap-1 overflow-x-auto border-b border-border pb-3 scrollbar-none">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="relative flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="skills-active-tab"
                  className="absolute inset-0 rounded-md bg-muted"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              <Icon className="relative z-10 size-3.5" />

              <span
                className={`relative z-10 ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills pills */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -5,
            transition: { duration: 0.15 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-wrap gap-2"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skillIcons[skill.name] ?? Code2;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.025,
                  duration: 0.25,
                }}
                whileHover={{ y: -2 }}
                className="
                  group inline-flex cursor-default
                  items-center gap-2
                  rounded-lg
                  border border-border/70
                  bg-background/50
                  px-3 py-2
                  transition-all duration-300
                  hover:border-foreground/20
                  hover:bg-muted/50
                "
              >
                <Icon
                  size={15}
                  aria-hidden="true"
                  className="
                    shrink-0
                    text-muted-foreground/70
                    transition-all duration-300
                    group-hover:text-[var(--skill-color)]
                    group-hover:drop-shadow-[0_0_6px_var(--skill-color)]
                  "
                  style={
                    {
                      "--skill-color": skill.color,
                    } as CSSProperties
                  }
                />

                <span
                  className="
                    whitespace-nowrap
                    text-[13px] font-medium
                    text-muted-foreground
                    transition-colors duration-300
                    group-hover:text-foreground
                  "
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
        <p className="text-xs text-muted-foreground">
          Always learning. Always building.
        </p>

        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {filteredSkills.length} displayed
        </span>
      </div>
    </section>
  );
}
