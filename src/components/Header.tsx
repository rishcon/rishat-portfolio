import { useEffect, useRef, useState } from "react";

export default function Header({ onOpenBrief }: { onOpenBrief: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimeout = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current || !menuButtonRef.current) return;

      const focusable = [
        menuButtonRef.current,
        ...Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button")),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimeout);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Обо мне", href: "#intro" },
    { label: "Услуги", href: "#capabilities" },
    { label: "Стек", href: "#stack" },
    { label: "Контакты", href: "#contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s cubic-bezier(0.22,1,0.36,1), padding 0.4s cubic-bezier(0.22,1,0.36,1)",
          background: scrolled ? "rgba(243,241,236,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid #D8D5CE" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div
          className="site-container site-header-inner"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: scrolled ? "16px 40px" : "24px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "padding 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <a href="#hero" style={{ textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: "17px",
                  letterSpacing: "0.08em",
                  color: "#111111",
                  lineHeight: 1,
                }}
              >
                РИШАТ
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  color: "#686868",
                  lineHeight: 1.2,
                  marginTop: "3px",
                }}
              >
                FULL-STACK DEVELOPER
              </span>
            </div>
          </a>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#686868",
                  textDecoration: "none",
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#686868")}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenBrief}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 400,
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "#111111",
                border: "1px solid #111111",
                padding: "8px 18px",
                minHeight: "44px",
                background: "transparent",
                cursor: "pointer",
                transition: "background 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#111111";
                e.currentTarget.style.color = "#F4F2ED";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#111111";
              }}
            >
              Обсудить проект
            </button>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "44px",
              height: "44px",
              padding: "11px",
              display: "none",
            }}
            className="show-mobile"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "#111111",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "#111111",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.3s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "#111111",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Навигация"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#F3F1EC",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px",
          transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), visibility 0.4s",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 8vw, 48px)",
                letterSpacing: "-0.02em",
                color: "#111111",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenBrief();
            }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 8vw, 48px)",
              letterSpacing: "-0.02em",
              color: "#111111",
              background: "none",
              border: 0,
              padding: 0,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Обсудить проект
          </button>
        </nav>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
