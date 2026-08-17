import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#fafaf8",
          padding: 84,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 84,
            border: "6px solid #d8401f",
            borderRadius: 10,
            color: "#d8401f",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
            padding: "12px 20px",
            transform: "rotate(-6deg)",
            textTransform: "uppercase",
          }}
        >
          Holds up at 100K+ users
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#15171c",
            lineHeight: 1,
          }}
        >
          Wahaj Ahmed
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 34,
            color: "#565b64",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Full-stack engineer. React and Node systems, drawn on paper, proven
          in production.
        </div>
        <div
          style={{
            marginTop: 44,
            height: 4,
            width: "100%",
            background: "#2b49cf",
          }}
        />
      </div>
    ),
    size,
  );
}
