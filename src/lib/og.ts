import { readFile } from "node:fs/promises";
import path from "node:path";
import { SITE } from "@/lib/site-meta";

// next/og runs on the Node runtime; import.meta.url fetches are not
// implemented there, so fonts are read from disk relative to the project root.
export type OgFontData = {
  cabinetGrotesk: Buffer;
  clashDisplay: Buffer;
};

export async function getOgFontData(): Promise<OgFontData | null> {
  try {
    const fontsDir = path.join(process.cwd(), "public", "fonts");
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readFile(path.join(fontsDir, "CabinetGrotesk-Medium.ttf")),
      readFile(path.join(fontsDir, "ClashDisplay-Semibold.ttf")),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load fonts:", error);
    return null;
  }
}

// resvg (used by ImageResponse) cannot decode AVIF, so OG images embed a PNG
// twin of the avatar. Explicit width/height props on <img> are required.
// The PNG is inlined from disk so OG rendering does not depend on the deployed
// site already serving it.
export async function getOgAvatar(): Promise<{ src?: string }> {
  const url = SITE.avatarOgUrl || SITE.avatarUrl;
  if (!url) return {};

  try {
    const file = await readFile(path.join(process.cwd(), "public", url.replace(/^\//, "")));
    return { src: `data:image/png;base64,${file.toString("base64")}` };
  } catch (error) {
    console.error("Failed to inline OG avatar:", error);
    return { src: new URL(url, SITE.url).toString() };
  }
}

export function fontOptions(fontData: OgFontData | null) {
  if (!fontData) return undefined;
  return [
    {
      name: "Cabinet Grotesk",
      data: fontData.cabinetGrotesk,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Cabinet Grotesk",
      data: fontData.cabinetGrotesk,
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "Clash Display",
      data: fontData.clashDisplay,
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}
