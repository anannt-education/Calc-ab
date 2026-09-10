import { ImageResponse } from "next/og";

export { alt, size, contentType } from "./opengraph-image";

export default function TwitterImage() {
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
        <div style={{ color: "#C4A35A", fontSize: 28 }}>Anannt Education</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 20 }}>AP Calculus AB</div>
        <div style={{ fontSize: 26, marginTop: 16, color: "#E8E0C8" }}>
          Independent 2027 exam preparation
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
