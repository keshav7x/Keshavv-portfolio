import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a, #3f3f46)",
          color: "#ffffff",
          fontSize: 116,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        K
      </div>
    ),
    size
  );
}
