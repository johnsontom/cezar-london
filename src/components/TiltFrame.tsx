"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type TiltFrameProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  intensity?: number;
};

/**
 * Restrained CSS-3D perspective on selected campaign images. Genuine 3D
 * rendering is reserved for the chrome emblem section; here a small rotation
 * is enough to give the photograph depth without costing performance.
 */
export function TiltFrame({ children, className = "", intensity = 5 }: TiltFrameProps) {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * intensity * 2, y: x * intensity * 2 });
    setActive(true);
  };

  const reset = () => {
    setRotation({ x: 0, y: 0 });
    setActive(false);
  };

  return (
    <div
      className={`[perspective:1400px] ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <div
        ref={frameRef}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        className={`h-full w-full ${
          active
            ? "transition-transform duration-300 ease-out"
            : "transition-transform duration-[900ms] ease-editorial"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
