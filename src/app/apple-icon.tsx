import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Génère apple-touch-icon.png (180×180) — monogramme « K. » sur fond noir. */
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
          background: "#000000",
        }}
      >
        <div
          style={{
            width: 108,
            height: 108,
            border: "5px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span style={{ fontSize: 70, fontWeight: 500, color: "#ffffff" }}>K</span>
          <span
            style={{
              position: "absolute",
              right: 18,
              bottom: 24,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ffffff",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
