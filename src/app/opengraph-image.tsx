import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt =
  "VMarket Digital — growth systems combining marketing, AI agents, CRM, and analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time from the same tokens as the page —
 * warm paper, ink type, one steel rule. No binary asset in the repo.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 78px",
          background: "#f7f4ee",
          color: "#0e1116",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="40" height="40" viewBox="0 0 100 100">
            <path fill="#1a658f" d="M0 9 L50 56 L100 9 L100 43 L50 90 L0 43 Z" />
            <path fill="#1a658f" opacity="0.4" d="M0 59 L33 91 L0 91 Z" />
            <path fill="#1a658f" opacity="0.4" d="M100 59 L67 91 L100 91 Z" />
          </svg>
          <span style={{ fontSize: 25, fontWeight: 700, letterSpacing: 3 }}>
            VMARKET
          </span>
          <span style={{ fontSize: 17, letterSpacing: 5, color: "#6b7280" }}>DIGITAL</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.0, letterSpacing: -3 }}>
            Growth is a system,
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: -3,
              color: "#1a658f",
              fontStyle: "italic",
            }}
          >
            not a line item.
          </span>
          <span style={{ marginTop: 30, fontSize: 25, color: "#5a6270", maxWidth: 940 }}>
            Marketing · Websites &amp; apps · AI chat and voice agents · CRM · Analytics
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #d3cabb",
            paddingTop: 24,
            fontSize: 20,
            color: "#6b7280",
          }}
        >
          <span>USA · Canada · UK · Australia · Middle East · Africa</span>
          <span style={{ color: "#b44710", fontWeight: 600 }}>
            {site.url.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
