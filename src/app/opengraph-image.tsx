import { ImageResponse } from "next/og";

export const alt = "Anannt Study — Calculus AB, two open lessons for May 2027";
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
          background: "#0F245C",
          color: "#F4EFE4",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#E4A31A",
            fontSize: 22,
            letterSpacing: 1,
          }}
        >
          Anannt Study
        </div>
        <div
          style={{
            marginTop: 12,
            height: 1,
            width: 120,
            background: "#E4A31A",
          }}
        />
        <div style={{ fontSize: 58, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Calculus AB
        </div>
        <div style={{ fontSize: 26, marginTop: 16, maxWidth: 900, lineHeight: 1.35, color: "#F4EFE4" }}>
          Two open lessons: limit vs function value, then FTC accumulation. No account.
        </div>
        <div style={{ fontSize: 18, marginTop: 36, color: "#E4A31A" }}>
          Independent self-prep · not affiliated with College Board
        </div>
      </div>
    ),
    { ...size }
  );
}
