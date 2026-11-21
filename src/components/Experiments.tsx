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
        className="site-container"
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
              color: "#AAA8A3",
              fontWeight: 300,
            }}
          >
            05 / BEYOND
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
            color: "#AAA8A3",
            lineHeight: 1.65,
            margin: "0 0 clamp(48px, 8vh, 80px) 0",
            maxWidth: "520px",
          }}
        >
          Экспериментирую с AI, автоматизацией, мониторингом данных, Telegram-ботами и собственными веб-продуктами.
        </p>
      </div>

      <div className="site-container" style={{ paddingBottom: "clamp(60px, 10vh, 120px)" }}>
        <div
          className="keyword-field"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px clamp(24px, 4vw, 64px)",
          }}
        >
          {keywords.map((kw) => (
            <span
              key={kw}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(48px, 8vw, 120px)",
                letterSpacing: "-0.03em",
                color: "transparent",
                WebkitTextStroke: "1px #77746F",
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
