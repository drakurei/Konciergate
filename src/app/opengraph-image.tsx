import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Konciergate — L'Europe comme vos clients la méritent.";

/** Image Open Graph / Twitter Card par défaut (1200×630). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            border: "5px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: 48,
          }}
        >
          <span style={{ fontSize: 96, fontWeight: 500 }}>K</span>
          <span
            style={{
              position: "absolute",
              right: 26,
              bottom: 34,
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "#b8925a",
            }}
          />
        </div>
        <div style={{ fontSize: 40, letterSpacing: 14, fontWeight: 300 }}>
          KONCIERGATE
        </div>
        <div style={{ fontSize: 26, color: "#b8925a", marginTop: 26 }}>
          L&apos;Europe comme vos clients la méritent.
        </div>
      </div>
    ),
    { ...size },
  );
}
