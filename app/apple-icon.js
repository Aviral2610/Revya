import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #17201a 0%, #5c7460 72%, #d3a168 100%)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "rgba(255, 250, 243, 0.14)",
            border: "1px solid rgba(255, 250, 243, 0.18)",
            borderRadius: "40px",
            color: "#fffaf3",
            display: "flex",
            fontSize: "72px",
            fontWeight: 800,
            height: "128px",
            justifyContent: "center",
            width: "128px"
          }}
        >
          RV
        </div>
      </div>
    ),
    size
  );
}
