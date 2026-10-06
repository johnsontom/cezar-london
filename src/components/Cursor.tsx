"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Refined desktop cursor: a precise dot with a lagging chrome ring that
 * expands over interactive elements. Disabled for touch and reduced motion.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    setEnabled(true);
    document.body.dataset.cursor = "custom";

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      setActive(Boolean(el));
      setLabel(el?.dataset.cursorLabel ?? null);
    };

    const loop = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.16;
      ring.current.y += (target.current.y - ring.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      frame.current = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    frame.current = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (frame.current) window.cancelAnimationFrame(frame.current);
      delete document.body.dataset.cursor;
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden lg:block">
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border border-ivory/45 transition-[width,height,background-color,border-color,opacity] duration-500 ease-editorial ${
          active ? "h-16 w-16 bg-ivory/[0.06] backdrop-blur-[1px]" : "h-8 w-8"
        }`}
      >
        {label ? (
          <span className="eyebrow text-[8px] leading-none text-ivory">{label}</span>
        ) : null}
      </div>
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-1 w-1 rounded-full bg-ivory transition-opacity duration-300 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
