import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf: number;
    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "56px";
        ringRef.current.style.height = "56px";
        ringRef.current.style.borderColor = "#111111";
        ringRef.current.style.opacity = "0.6";
      }
    };

    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "#111111";
        ringRef.current.style.opacity = "0.35";
      }
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          background: "#111111",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1px solid #111111",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          marginLeft: "-18px",
          marginTop: "-18px",
          opacity: 0.35,
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s",
        }}
      />
    </>
  );
}
