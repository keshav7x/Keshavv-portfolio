// Lightweight site identity constants. Imported by Edge-runtime routes (OG
// image generation) whose bundle size is capped, so it must not pull in any
// heavy modules (SVG wordmarks, icon sets, etc.). The full `DATA` object in
// `src/data/resume.tsx` spreads this — keep fields in sync via that spread.
export const SITE = {
  name: "Keshavv",
  fullName: "Keshav Chetri",
  jobTitle: "Software Developer",
  url: "https://keshavv.vercel.app",
  location: "Assam, India",
  locationLink: "https://www.google.com/maps/place/Assam",
  xHandle: "keshavdotdev",

  description:
    "Keshavv (Keshav Chetri) is a software developer from Assam, India, exploring backend engineering, distributed systems, and how things work under the hood.",

  avatarUrl: "/projects/me.avif",
} as const;
