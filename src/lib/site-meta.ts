// Lightweight site identity constants. Imported by OG image generation routes
// so their bundles stay small: no SVG wordmarks, icon sets, or heavy modules.
// The full `DATA` object in `src/data/resume.tsx` spreads this — keep fields
// in sync via that spread.
export const SITE = {
  name: "Keshavv",
  fullName: "Keshav Chetri",
  jobTitle: "Software Developer",
  url: "https://keshavdotdev.vercel.app",
  location: "Assam, India",
  locationLink: "https://www.google.com/maps/place/Assam",
  xHandle: "keshavdotdev",

  description:
    " a student developer who loves building clean, modern websites and applications where design, functionality, and the little details come together to create thoughtful experiences.",

  avatarUrl: "/projects/me.avif",

  // OG images embed the avatar via satori/resvg, which cannot decode AVIF —
  // use the PNG twin for those routes only.
  avatarOgUrl: "/projects/me.png",
} as const;
