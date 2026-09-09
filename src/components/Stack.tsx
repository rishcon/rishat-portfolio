import { useRef, useEffect } from "react";

const stackGroups = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Vite"],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "Flask", "REST API"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "SQL", "JSON"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Linux"],
  },
  {
    label: "AI / Automation",
    items: ["OpenAI API", "LLM", "AI agents", "Telegram bots", "API integrations"],
  },
];

const marqueeItems = [
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "FASTAPI",
  "POSTGRESQL",
  "GIT",
  "API",
  "AI",
  "VITE",
  "FLASK",
  "JAVASCRIPT",
  "VERCEL",
  "LINUX",
  "LLM",
  "BOTS",
];

export default function Stack() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const doubledItems = [...marqueeItems, ...marqueeItems];

  return (
    <section
      ref={ref}
      id="stack"
      style={{
        borderTop: "1px solid #D8D5CE",
        overflow: "hidden",
      }}
    >
      {/* Marquee strip */}
      <div
        style={{
          background: "#111111",
          padding: "18px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "inline-flex",
            gap: "0",
          }}
        >
          {doubledItems.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#F4F2ED",
                fontWeight: 400,
                paddingRight: "48px",
                opacity: 0.7,
              }}
            >
              {item}
              <span style={{ marginLeft: "48px", opacity: 0.3 }}>—</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(60px, 10vh, 120px) 40px",
        }}
      >
        <div
          className="section-heading-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "80px",
            marginBottom: "clamp(48px, 8vh, 80px)",
            alignItems: "end",
          }}
        >
          <span
            className="reveal"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              color: "#707070",
              fontWeight: 300,
            }}
          >
            04 / STACK
          </span>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 96px)",
              letterSpacing: "-0.03em",
              color: "#111111",
              margin: 0,
              lineHeight: 0.9,
            }}
          >
            ИНСТРУМЕНТЫ,
            <br />
            С КОТОРЫМИ
            <br />
            Я РАБОТАЮ.
          </h2>
        </div>

        {/* Stack grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "0",
            borderLeft: "1px solid #D8D5CE",
            borderTop: "1px solid #D8D5CE",
          }}
          className="reveal reveal-delay-2"
        >
          {stackGroups.map((group) => (
            <div
              key={group.label}
              style={{
                borderRight: "1px solid #D8D5CE",
                borderBottom: "1px solid #D8D5CE",
                padding: "28px 24px",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "#707070",
                  margin: "0 0 16px 0",
                  fontWeight: 300,
                }}
              >
                {group.label.toUpperCase()}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(13px, 1.1vw, 16px)",
                      color: "#111111",
                      lineHeight: 1.3,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
