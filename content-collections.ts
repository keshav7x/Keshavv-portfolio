import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { z } from "zod";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

const posts = defineCollection({
    name: "posts",
    directory: "content",
    include: "**/*.mdx",
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        summary: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        readingTime: z.string().optional(),
        readTime: z.string().optional(),
        image: z.string().optional(),
        content: z.string(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document, {
            remarkPlugins: [remarkGfm, remarkMath, remarkCodeMeta],
            rehypePlugins: [rehypeKatex],
        });
        return {
            ...document,
            summary: document.summary ?? document.description ?? "",
            readingTime: document.readingTime ?? document.readTime,
            mdx,
        };
    },
});

// Lightweight, metadata-only view of the same posts. Used by routes that must
// stay lean (e.g. Edge-runtime OG image generation) where embedding every
// post's full compiled MDX would blow past bundle-size limits. Generated as
// its own module (.content-collections/generated/allPostMetas.js).
const postMeta = defineCollection({
    name: "postMeta",
    directory: "content",
    include: "**/*.mdx",
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        summary: z.string().optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
    transform: async (document) => {
        return {
            title: document.title,
            publishedAt: document.publishedAt,
            summary: document.summary ?? document.description ?? "",
            tags: document.tags ?? [],
            path: document._meta.path.replace(/\.mdx$/, ""),
        };
    },
});

export default defineConfig({
    collections: [posts, postMeta],
});
