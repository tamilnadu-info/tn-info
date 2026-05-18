import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#C8472B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
          gap: 4,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          TN
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 18,
            fontWeight: 600,
            fontFamily: "sans-serif",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          INFO
        </div>
      </div>
    ),
    { ...size }
  );
}
