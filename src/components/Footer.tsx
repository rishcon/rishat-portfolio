export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(244,242,237,0.08)",
        padding: "0 40px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 0",
            borderBottom: "1px solid rgba(244,242,237,0.08)",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            {[
              { label: "GitHub", href: "https://github.com/your_username" },
              { label: "Telegram", href: "https://t.me/your_username" },
              { label: "Email", href: "mailto:your@email.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(244,242,237,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(244,242,237,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,242,237,0.35)")}
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>

          <a
            href="#"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(244,242,237,0.35)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(244,242,237,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,242,237,0.35)")}
          >
            НАВЕРХ ↑
          </a>
        </div>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(244,242,237,0.25)",
              fontWeight: 300,
            }}
          >
            RISHAT © {currentYear}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(244,242,237,0.25)",
              fontWeight: 300,
            }}
          >
            FULL-STACK DEVELOPER · ASTANA / KAZAKHSTAN
          </span>
        </div>

        {/* Large wordmark */}
        <div
          style={{
            overflow: "hidden",
            paddingBottom: "clamp(16px, 2vw, 32px)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(80px, 17vw, 260px)",
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(244,242,237,0.08)",
              lineHeight: 0.85,
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            RISHAT.
          </span>
        </div>
      </div>
    </footer>
  );
}
