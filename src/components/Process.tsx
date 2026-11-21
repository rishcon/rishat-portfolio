import { useRef, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Задача",
    description: "Разбираюсь в продукте, аудитории и цели.",
  },
  {
    number: "02",
    title: "Структура",
    description: "Продумываю страницы, сценарии и архитектуру.",
  },
  {
    number: "03",
    title: "Разработка",
    description: "Собираю интерфейс, backend и необходимые интеграции.",
  },
  {
    number: "04",
    title: "Запуск",
    description: "Тестирую, адаптирую и разворачиваю проект.",
  },
];

export default function Process() {
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
      id="process"
      className="site-container"
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(60px, 10vh, 120px) 40px",
        borderTop: "1px solid #D8D5CE",
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
            color: "#686868",
            fontWeight: 300,
          }}
        >
          04 / PROCESS
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
          КАК Я
          <br />
          РАБОТАЮ.
        </h2>
      </div>

      <div className="reveal reveal-delay-2">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="process-row"
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              gap: "40px",
              alignItems: "start",
              padding: "clamp(24px, 4vh, 44px) 0",
              borderTop: "1px solid #D8D5CE",
              borderBottom: i === steps.length - 1 ? "1px solid #D8D5CE" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 300,
                color: "#8A8882",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {step.number}
            </span>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 2vw, 28px)",
                letterSpacing: "-0.01em",
                color: "#111111",
                margin: 0,
                lineHeight: 1.2,
                paddingTop: "4px",
              }}
            >
              {step.title}
            </h3>
            <p
              className="process-desc"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.1vw, 16px)",
                color: "#686868",
                margin: 0,
                lineHeight: 1.6,
                paddingTop: "4px",
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
