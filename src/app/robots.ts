import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

// Explicitly welcome search engines AND generative engines (ChatGPT,
// Perplexity, Claude, Gemini, ...) so the site can be quoted and cited by AI
// assistants, not just crawled.
const AI_CRAWLERS = [
  // OpenAI / ChatGPT / SearchGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini / AI Overviews)
  "Google-Extended",
  // Others that power AI answers
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "FacebookBot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "YouBot",
  "Diffbot",
  "ImagesiftBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
    host: DATA.url,
  };
}
