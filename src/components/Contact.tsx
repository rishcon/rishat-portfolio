import { useRef, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const contacts = [
  { label: "Telegram", href: "https://t.me/your_username", display: "@your_username" },
  { label: "WhatsApp", href: "https://wa.me/77000000000", display: "+7 (700) 000-00-00" },
  { label: "Email", href: "mailto:your@email.com", display: "your@email.com" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

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
      id="contact"
      style={{
        background: "#111111",
        padding: "clamp(80px, 14vh, 160px) 40px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "80px",
            alignItems: "end",
            marginBottom: "clamp(60px, 10vh, 100px)",
          }}
        >
          {/* Heading */}
          <div>
            <h2
              className="reveal"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(64px, 12vw, 180px)",
                letterSpacing: "-0.04em",
                color: "#F4F2ED",
                margin: "0 0 32px 0",
                lineHeight: 0.85,
              }}
            >
              ЕСТЬ
              <br />
              ПРОЕКТ?
            </h2>
            <p
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.3vw, 20px)",
                color: "rgba(244,242,237,0.55)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "380px",
              }}
            >
              Расскажите, что хотите сделать. Посмотрю задачу и предложу вариант реализации.
            </p>
          </div>

          {/* Contact options */}
          <div className="reveal reveal-delay-2">
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "24px 0",
                    borderTop: "1px solid rgba(244,242,237,0.1)",
                    textDecoration: "none",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(244,242,237,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(244,242,237,0.1)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      color: "rgba(244,242,237,0.4)",
                      fontWeight: 300,
                    }}
                  >
                    {contact.label.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(14px, 1.1vw, 18px)",
                      color: "#F4F2ED",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {contact.display}
                    <span style={{ opacity: 0.5 }}>↗</span>
                  </span>
                </a>
              ))}
              <div
                style={{
                  borderTop: "1px solid rgba(244,242,237,0.1)",
                  paddingTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "rgba(244,242,237,0.3)",
                    fontWeight: 300,
                  }}
                >
                  АСТАНА, КАЗАХСТАН
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "rgba(244,242,237,0.3)",
                    fontWeight: 300,
                  }}
                >
                  РАБОТАЮ УДАЛЁННО
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Big CTA */}
        <div className="reveal reveal-delay-3" style={{ textAlign: "center" }}>
          <a
            href="mailto:your@email.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(14px, 1.3vw, 18px)",
              letterSpacing: "0.08em",
              color: "#111111",
              background: "#F4F2ED",
              textDecoration: "none",
              padding: "20px 48px",
              transition: "background 0.3s, color 0.3s, gap 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F3F1EC";
              e.currentTarget.style.gap = "20px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F4F2ED";
              e.currentTarget.style.gap = "12px";
            }}
          >
            НАПИСАТЬ МНЕ <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
