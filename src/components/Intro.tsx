import { useRef, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
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
      id="intro"
      className="site-container intro-grid"
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(80px, 14vh, 160px) 40px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
        gap: "80px",
        alignItems: "start",
        borderTop: "1px solid #D8D5CE",
      }}
    >
      {/* Label */}
      <div className="reveal">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.14em",
            color: "#707070",
            fontWeight: 300,
          }}
        >
          01 / ОБО МНЕ
        </span>
      </div>

      {/* Content */}
      <div>
        <blockquote
          className="reveal reveal-delay-1"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 3.5vw, 48px)",
            letterSpacing: "-0.02em",
            color: "#111111",
            lineHeight: 1.2,
            margin: "0 0 40px 0",
            padding: 0,
            borderLeft: "none",
          }}
        >
          «Мне интересны проекты, где хороший дизайн должен не просто выглядеть красиво, а работать.»
        </blockquote>

        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            color: "#707070",
            lineHeight: 1.65,
            margin: "0 0 20px 0",
            maxWidth: "560px",
          }}
        >
          Разрабатываю сайты, лендинги и веб-сервисы. Работаю с frontend, backend, API, автоматизацией и AI-интеграциями.
        </p>

        <p
          className="reveal reveal-delay-3"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            color: "#707070",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "560px",
          }}
        >
          Могу подключиться к готовому проекту или собрать продукт с нуля.
        </p>
      </div>
    </section>
  );
}
