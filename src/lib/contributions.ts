export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionsData = {
  total: number;
  contributions: ContributionDay[];
};

export const GITHUB_USERNAME = "Keshav7x";

const DAY_MS = 86400000;

/** How long a fetched contribution calendar stays fresh (ISR + CDN). */
const REVALIDATE_SECONDS = 3600;

function computeLevel(count: number, max: number): number {
  if (count <= 0 || max <= 0) return 0;
  return Math.min(4, Math.ceil((count / max) * 4));
}

async function fetchFromGraphQL(
  token: string
): Promise<ContributionsData> {
  const to = new Date();
  const from = new Date(to.getTime() - 365 * DAY_MS);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: GITHUB_USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? "GraphQL error");

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error("No contribution data");

  const contributions: ContributionDay[] = [];
  for (const week of calendar.weeks ?? []) {
    for (const day of week.contributionDays ?? []) {
      contributions.push({
        date: day.date.slice(0, 10),
        count: day.contributionCount,
        level: 0,
      });
    }
  }

  const max = Math.max(...contributions.map((c) => c.count), 1);
  for (const c of contributions) {
    c.level = computeLevel(c.count, max);
  }

  return {
    total: calendar.totalContributions as number,
    contributions,
  };
}

async function fetchPublic(): Promise<ContributionsData> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!res.ok) throw new Error(`Public API ${res.status}`);

  const json = await res.json();
  const contributions: ContributionDay[] = (json.contributions ?? []).map(
    (c: { date: string; count: number; level: number }) => ({
      date: c.date,
      count: c.count,
      level: c.level,
    })
  );

  return {
    total:
      json.total?.lastYear ??
      contributions.reduce((sum: number, c) => sum + c.count, 0),
    contributions,
  };
}

/**
 * Contribution calendar for the last year.
 *
 * Never throws: an unreachable GitHub API degrades to an empty calendar
 * instead of taking the page down with it.
 */
export async function getContributions(): Promise<ContributionsData> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      return await fetchFromGraphQL(token);
    } catch (e) {
      console.error("GitHub GraphQL fetch failed, falling back:", e);
    }
  }

  try {
    return await fetchPublic();
  } catch (e) {
    console.error("Public contributions fetch failed:", e);
    return { total: 0, contributions: [] };
  }
}
