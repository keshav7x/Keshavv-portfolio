import { Redis } from "@upstash/redis";

const VIEWS_KEY = "portfolio:views";

export type ViewStats = {
  /** Total page views. */
  views: number;
};

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.UPSTASH;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function isViewCounterEnabled(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      (process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.UPSTASH)
  );
}

/** Increments the view counter and returns the new total. */
export async function recordView(): Promise<ViewStats | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const views = await redis.incr(VIEWS_KEY);
    return { views };
  } catch (error) {
    console.error("Failed to record view:", error);
    return null;
  }
}
