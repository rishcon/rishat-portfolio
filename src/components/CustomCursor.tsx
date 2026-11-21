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
        dotRef.current.style.opacity = "1";
      }
      if (ringRef.current && ringRef.current.style.opacity === "0") {
        ringRef.current.style.opacity = "0.35";
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

    const setInteractiveState = (active: boolean) => {
      if (ringRef.current) {
        ringRef.current.style.width = active ? "56px" : "36px";
        ringRef.current.style.height = active ? "56px" : "36px";
        ringRef.current.style.borderColor = "#ffffff";
        ringRef.current.style.opacity = active ? "0.6" : "0.35";
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("a, button, input, select, textarea")) {
        setInteractiveState(true);
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest("a, button, input, select, textarea");
      if (!control || (event.relatedTarget instanceof Node && control.contains(event.relatedTarget))) return;
      setInteractiveState(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor custom-cursor--dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          background: "#ffffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          mixBlendMode: "difference",
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor custom-cursor--ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1px solid #ffffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          marginLeft: "-18px",
          marginTop: "-18px",
          opacity: 0,
          mixBlendMode: "difference",
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s",
        }}
      />
    </>
  );
}
