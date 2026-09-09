import { useRef, useEffect, useState } from "react";
import { projects } from "../data/projects";
import { useIsMobile } from "../hooks/useIsMobile";

function ProjectItem({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      style={{
        padding: "clamp(40px, 8vh, 80px) 0",
        borderTop: "1px solid #D8D5CE",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : index % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr",
        gap: "clamp(40px, 6vw, 100px)",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Text side */}
      <div style={{ order: isMobile ? 2 : index % 2 === 0 ? 1 : 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              color: "#707070",
              fontWeight: 300,
            }}
          >
            {project.number}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              color: "#707070",
              fontWeight: 300,
            }}
          >
            {project.industry.toUpperCase()}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 60px)",
            letterSpacing: "-0.03em",
            color: "#111111",
            margin: "0 0 12px 0",
            lineHeight: 0.95,
          }}
        >
          {project.name}
        </h2>

        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "#707070",
            margin: "0 0 28px 0",
          }}
        >
          {project.category}
        </p>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "#707070",
            lineHeight: 1.65,
            margin: "0 0 32px 0",
            maxWidth: "400px",
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "#707070",
                border: "1px solid #D8D5CE",
                padding: "5px 12px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(13px, 1vw, 15px)",
            letterSpacing: "0.02em",
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
          Открыть проект <span>↗</span>
        </a>
      </div>

      {/* Image side */}
      <div
        className="section-heading-grid"
        style={{
          order: isMobile ? 1 : index % 2 === 0 ? 2 : 1,
          position: "relative",
          overflow: "hidden",
          background: project.accent,
          aspectRatio: "16/10",
          cursor: "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(17,17,17,0.04)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
      </div>
    </article>
  );
}

export default function Projects() {
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
      id="projects"
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(60px, 10vh, 120px) 40px",
        borderTop: "1px solid #D8D5CE",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "80px",
          marginBottom: "clamp(40px, 8vh, 80px)",
          alignItems: "end",
        }}
      >
        <span className="reveal" style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "#707070",
          fontWeight: 300,
          alignSelf: "end",
        }}>
          02 / SELECTED WORK
        </span>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 110px)",
            letterSpacing: "-0.03em",
            color: "#111111",
            margin: 0,
            lineHeight: 0.9,
          }}
        >
          ИЗБРАННЫЕ
          <br />
          ПРОЕКТЫ
        </h2>
      </div>

      {/* Projects */}
      {projects.map((project, i) => (
        <ProjectItem key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
