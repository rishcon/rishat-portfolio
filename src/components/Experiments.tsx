import { useRef, useEffect } from "react";

const keywords = ["AI", "AUTOMATION", "DATA", "WEB APPS", "API", "BOTS", "PRODUCTS", "LLM", "AI AGENTS", "TELEGRAM"];

export default function Experiments() {
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

  const doubled = [...keywords, ...keywords];

  return (
    <section
      ref={ref}
      style={{
        background: "#111111",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(60px, 10vh, 120px) 40px clamp(40px, 6vh, 80px)",
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
              color: "rgba(244,242,237,0.4)",
              fontWeight: 300,
            }}
          >
            06 / BEYOND
          </span>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 96px)",
              letterSpacing: "-0.03em",
              color: "#F4F2ED",
              margin: 0,
              lineHeight: 0.9,
            }}
          >
            НЕ ТОЛЬКО
            <br />
            ЛЕНДИНГИ.
          </h2>
        </div>

        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.3vw, 20px)",
            color: "rgba(244,242,237,0.55)",
            lineHeight: 1.65,
            margin: "0 0 clamp(48px, 8vh, 80px) 0",
            maxWidth: "520px",
          }}
        >
          Экспериментирую с AI, автоматизацией, мониторингом данных, Telegram-ботами и собственными веб-продуктами.
        </p>
      </div>

      {/* Moving keywords */}
      <div style={{ overflow: "hidden", paddingBottom: "clamp(60px, 10vh, 120px)" }}>
        <div
          className="float-keywords"
          style={{
            display: "inline-flex",
            gap: "0",
            whiteSpace: "nowrap",
          }}
        >
          {doubled.map((kw, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(48px, 8vw, 120px)",
                letterSpacing: "-0.03em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(244,242,237,0.15)",
                paddingRight: "clamp(32px, 5vw, 80px)",
                lineHeight: 1,
              }}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
