import { ImageResponse } from "next/og";

export const alt = "Anannt Education — independent AP Calculus AB preparation for 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#1B3A5F",
          color: "#F7F4EC",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#C4A35A",
            fontSize: 28,
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "#C4A35A",
              color: "#1B3A5F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontFamily: "Georgia, serif",
            }}
          >
            ∫
          </div>
          Anannt Education
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          AP Calculus AB
        </div>
        <div style={{ fontSize: 28, marginTop: 16, maxWidth: 900, lineHeight: 1.35, color: "#E8E0C8" }}>
        Independent Calculus AB self-prep for May 2027 — two public lessons: limits, then FTC.
        </div>
        <div style={{ fontSize: 18, marginTop: 36, color: "#C4A35A" }}>
          Not affiliated with College Board · No score predictions
        </div>
      </div>
    ),
    { ...size }
  );
}
