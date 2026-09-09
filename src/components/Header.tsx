import { useState, useEffect } from "react";

export default function Header({ onOpenBrief }: { onOpenBrief: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const navLinks = [
    { label: "Проекты", href: "#projects" },
    { label: "Обо мне", href: "#intro" },
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
          className="site-header-inner"
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
          {/* Wordmark */}
          <a href="#" style={{ textDecoration: "none" }}>
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
                  color: "#707070",
                  lineHeight: 1.2,
                  marginTop: "3px",
                }}
              >
                FULL-STACK DEVELOPER
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
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
                  color: "#707070",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#707070")}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "none",
            }}
            className="show-mobile"
            aria-label="Меню"
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

      {/* Mobile menu */}
      <div
        id="mobile-menu"
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
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
