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
          background: "#0F245C",
          color: "#F4EFE4",
        }}
      >
        <div style={{ color: "#E4A31A", fontSize: 22 }}>Anannt Study</div>
        <div style={{ height: 1, width: 120, background: "#E4A31A", marginTop: 12 }} />
        <div style={{ fontSize: 58, fontWeight: 700, marginTop: 20 }}>Calculus AB</div>
        <div style={{ fontSize: 24, marginTop: 16, color: "#F4EFE4" }}>
          Two open lessons · May 2027 planning
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
