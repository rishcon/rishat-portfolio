import { useRef, useEffect, useState } from "react";

const capabilities = [
  {
    number: "01",
    title: "Сайты и лендинги",
    description: "Корпоративные сайты и лендинги для услуг и продуктов.",
  },
  {
    number: "02",
    title: "Frontend",
    description: "Интерфейсы на React, адаптивная вёрстка и личные кабинеты.",
  },
  {
    number: "03",
    title: "Backend",
    description: "API, базы данных, авторизация и серверная логика.",
  },
  {
    number: "04",
    title: "Интеграции",
    description: "Telegram, сторонние API и внешние сервисы.",
  },
  {
    number: "05",
    title: "AI & автоматизация",
    description: "LLM API, AI-инструменты и автоматизация рабочих процессов.",
  },
  {
    number: "06",
    title: "Поддержка",
    description: "Обновления, исправления и развитие проекта после запуска.",
  },
];

function CapabilityRow({
  item,
  delay,
}: {
  item: (typeof capabilities)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="capability-row"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        alignItems: "center",
        gap: "32px",
        padding: "24px 0",
        borderTop: "1px solid #D8D5CE",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          color: "#686868",
          fontWeight: 300,
        }}
      >
        {item.number}
      </span>
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(18px, 2.2vw, 32px)",
          letterSpacing: "-0.01em",
          color: hovered ? "#111111" : "#111111",
          transition: "color 0.3s",
        }}
      >
        {item.title}
      </span>
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "clamp(12px, 1vw, 14px)",
          color: "#686868",
          maxWidth: "300px",
          textAlign: "right",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 0.3s, transform 0.3s",
          lineHeight: 1.5,
        }}
      >
        {item.description}
      </span>
    </div>
  );
}

export default function Capabilities() {
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
      id="capabilities"
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
          02 / ЧТО Я ДЕЛАЮ
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
          ОТ ИНТЕРФЕЙСА
          <br />
          ДО ЗАПУСКА.
        </h2>
      </div>

      <div style={{ borderBottom: "1px solid #D8D5CE" }}>
        {capabilities.map((item, i) => (
          <CapabilityRow key={item.number} item={item} delay={i * 0.06} />
        ))}
      </div>
    </section>
  );
}
