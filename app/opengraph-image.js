import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SOCIAL_IMAGE_ALT } from "@/lib/seo";

export const alt = SOCIAL_IMAGE_ALT;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(135deg, #fbf5ed 0%, #efe2d4 100%)",
          color: "#17201a",
          display: "flex",
          height: "100%",
          padding: "56px",
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at top left, rgba(92, 116, 96, 0.22), transparent 42%), radial-gradient(circle at bottom right, rgba(211, 161, 104, 0.24), transparent 34%)",
            border: "1px solid rgba(23, 32, 26, 0.08)",
            borderRadius: "40px",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            padding: "56px"
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "18px" }}>
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(135deg, #5c7460 0%, #d3a168 100%)",
                borderRadius: "24px",
                color: "#fffaf3",
                display: "flex",
                fontSize: "34px",
                fontWeight: 800,
                height: "72px",
                justifyContent: "center",
                width: "72px"
              }}
            >
              RV
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ fontSize: "34px", fontWeight: 700 }}>Revya</div>
              <div
                style={{
                  color: "#55605b",
                  display: "flex",
                  fontSize: "22px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}
              >
                Online Weight-Loss Care
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "760px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1
              }}
            >
              Clinician-guided weight-loss care, online.
            </div>
            <div
              style={{
                color: "#55605b",
                display: "flex",
                fontSize: "30px",
                lineHeight: 1.25
              }}
            >
              {SITE_DESCRIPTION}
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            {["Eligibility screening", "Clinician review", "Portal support"].map((item) => (
              <div
                key={item}
                style={{
                  alignItems: "center",
                  background: "rgba(255, 250, 243, 0.86)",
                  border: "1px solid rgba(23, 32, 26, 0.08)",
                  borderRadius: "999px",
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: 700,
                  padding: "14px 22px"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
