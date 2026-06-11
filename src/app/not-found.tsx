import Link from "next/link";
import "./globals.css";

/**
 * Global 404 — rendered outside the locale layout, so it carries its own
 * <html>/<body>. Bilingual copy since we don't know the visitor's locale here.
 */
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 30% 15%, #ffffff 0%, #faf9f7 55%, #f1efe9 100%)",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div>
          {/* Kite outline */}
          <svg
            viewBox="0 0 120 160"
            width="96"
            aria-hidden
            style={{ margin: "0 auto 20px", display: "block", opacity: 0.8 }}
          >
            <g
              fill="none"
              stroke="#3f9c8b"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M60 8 L102 52 L60 96 L18 52 Z" />
              <path d="M60 8 L60 96 M18 52 L102 52" />
              <path d="M60 96 C 52 112, 72 118, 62 132 C 54 143, 70 148, 64 158" />
            </g>
          </svg>

          <h1
            style={{
              fontSize: "clamp(48px, 10vw, 96px)",
              fontWeight: 900,
              color: "#383836",
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            404
          </h1>
          <p style={{ fontSize: 18, color: "#4b4b48", margin: "0 0 6px" }}>
            This page flew away with the kite.
          </p>
          <p dir="rtl" style={{ fontSize: 16, color: "#777", margin: "0 0 28px" }}>
            هذه الصفحة طارت مع الطائرة الورقية.
          </p>
          <Link
            href="/en"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              borderRadius: 999,
              backgroundColor: "#383836",
              color: "#fdd451",
              fontWeight: 700,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            Back to Kite Coffee
          </Link>
        </div>
      </body>
    </html>
  );
}
