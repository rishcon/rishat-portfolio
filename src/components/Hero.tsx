import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Hero({ onOpenBrief }: { onOpenBrief: () => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 100);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: "100svh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        padding: "0 40px",
        maxWidth: "1440px",
        margin: "0 auto",
        position: "relative",
        paddingTop: "100px",
      }}
    >
      {/* Top row: status + year */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: "0",
        }}
      >
        {/* Main headline block */}
        <div style={{ flex: 1 }}>
          {/* Status indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "clamp(40px, 8vh, 80px)",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#111111",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "#707070",
              }}
            >
              Открыт к новым проектам
            </span>
          </div>

          {/* Giant headline */}
          <div
            style={{
              transform: isMobile ? "none" : `translate(${mousePos.x * -8}px, ${mousePos.y * -4}px)`,
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
              willChange: "transform",
            }}
          >
            {["РАЗРАБАТЫВАЮ", "САЙТЫ И", "ВЕБ-ПРОДУКТЫ."].map((line, i) => (
              <div
                key={line}
                style={{
                  overflow: "hidden",
                  lineHeight: 0.9,
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(52px, 9.5vw, 148px)",
                    letterSpacing: "-0.03em",
                    color: "#111111",
                    margin: 0,
                    lineHeight: 0.9,
                    display: "block",
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(100%)",
                    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1 + 0.15}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1 + 0.15}s`,
                  }}
                >
                  {line}
                </h1>
              </div>
            ))}
          </div>

          {/* Supporting copy + CTAs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "40px",
              marginTop: "clamp(40px, 6vh, 72px)",
              alignItems: "end",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s",
            }}
          >
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.4vw, 20px)",
                color: "#707070",
                lineHeight: 1.55,
                margin: 0,
                maxWidth: "420px",
              }}
            >
              Проектирую и разрабатываю современные сайты и веб-сервисы — от интерфейса до backend и запуска.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
              <a
                href="#projects"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(13px, 1.1vw, 16px)",
                  letterSpacing: "0.01em",
                  color: "#111111",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  borderBottom: "1px solid #111111",
                  paddingBottom: "2px",
                  transition: "gap 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
              >
                Смотреть проекты <span>↓</span>
              </a>
              <button
                type="button"
                onClick={onOpenBrief}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#707070",
                  background: "none",
                  border: 0,
                  padding: 0,
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#707070")}
              >
                Обсудить проект →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom metadata strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid #D8D5CE",
          paddingTop: "20px",
          paddingBottom: "32px",
          marginTop: "clamp(40px, 8vh, 80px)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.7s",
        }}
      >
        <div style={{ display: "flex", gap: "40px" }}>
          {[
            ["ASTANA", "KAZAKHSTAN"],
            ["AVAILABLE", "FOR PROJECTS"],
            ["2026", ""],
          ].map(([top, bottom]) => (
            <div key={top} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "#111111",
                  fontWeight: 400,
                }}
              >
                {top}
              </span>
              {bottom && (
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "#707070",
                    fontWeight: 300,
                  }}
                >
                  {bottom}
                </span>
              )}
            </div>
          ))}
        </div>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "#707070",
          }}
        >
          FULL-STACK DEVELOPER
        </span>
      </div>
    </section>
  );
}
