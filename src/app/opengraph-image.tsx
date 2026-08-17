import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerendered at build time, so the card is a static asset at request time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0a0a0b",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 96,
            letterSpacing: "-0.04em",
            color: "#ededee",
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            letterSpacing: "-0.01em",
            color: "#8a8a8d",
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          Full-stack engineer. I build React and Node systems that hold up past
          100,000 users.
        </div>
        <div
          style={{
            marginTop: 44,
            height: 1,
            width: "100%",
            background: "#1e1e21",
          }}
        />
      </div>
    ),
    size,
  );
}
