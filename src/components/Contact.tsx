import { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const contacts = [
  { label: "Telegram", href: "https://t.me/LazerRising", display: "@LazerRising" },
  { label: "WhatsApp", href: "https://wa.me/77066834200", display: "+7 706 683 42 00" },
  { label: "Email", href: "mailto:kaatrr12150305@gmail.com", display: "kaatrr12150305@gmail.com" },
];

export default function Contact({ onOpenBrief }: { onOpenBrief: () => void }) {
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
      { threshold: 0.1 },
    );
    ref.current.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="contact" className="contact-section">
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "80px",
            alignItems: "end",
            marginBottom: "clamp(60px, 10vh, 100px)",
          }}
        >
          <div>
            <h2 className="reveal contact-heading">ЕСТЬ<br />ПРОЕКТ?</h2>
            <p className="reveal reveal-delay-1 contact-copy">
              Расскажите, что хотите сделать. Посмотрю задачу и предложу вариант реализации.
            </p>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="contact-list">
              {contacts.map((contact) => {
                const content = (
                  <>
                    <span className="contact-label">{contact.label.toUpperCase()}</span>
                    <span className="contact-value">
                      {contact.display}
                      {contact.href && <span aria-hidden="true">↗</span>}
                    </span>
                  </>
                );

                return contact.href ? (
                  <a key={contact.label} className="contact-row contact-row--link" href={contact.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={contact.label} className="contact-row contact-row--disabled" aria-label={`${contact.label}: контакт будет добавлен`}>
                    {content}
                  </div>
                );
              })}
              <div className="contact-location">
                <span>АСТАНА, КАЗАХСТАН</span>
                <span>РАБОТАЮ УДАЛЁННО</span>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-3" style={{ textAlign: "center" }}>
          <button type="button" className="contact-cta" onClick={onOpenBrief}>
            ОБСУДИТЬ ПРОЕКТ <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
