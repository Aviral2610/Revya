import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SOCIAL_IMAGE_ALT } from "@/lib/seo";

export const alt = SOCIAL_IMAGE_ALT;
export const size = {
  width: 1200,
  height: 600
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(135deg, #17201a 0%, #5c7460 60%, #d3a168 100%)",
          color: "#fffaf3",
          display: "flex",
          height: "100%",
          padding: "42px",
          width: "100%"
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255, 250, 243, 0.14)",
            borderRadius: "36px",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "44px"
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
            <div
              style={{
                alignItems: "center",
                background: "#fffaf3",
                borderRadius: "20px",
                color: "#17201a",
                display: "flex",
                fontSize: "28px",
                fontWeight: 800,
                height: "60px",
                justifyContent: "center",
                width: "60px"
              }}
            >
              RV
            </div>
            <div style={{ display: "flex", fontSize: "30px", fontWeight: 700 }}>Revya</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "820px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "62px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.02
              }}
            >
              Online weight-loss care with clinician-guided GLP-1 support.
            </div>
            <div
              style={{
                color: "rgba(255, 250, 243, 0.82)",
                display: "flex",
                fontSize: "28px",
                lineHeight: 1.25
              }}
            >
              {SITE_DESCRIPTION}
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: "24px",
              fontWeight: 700,
              gap: "20px"
            }}
          >
            <div>Online assessment</div>
            <div>Clinician review</div>
            <div>Portal support</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
