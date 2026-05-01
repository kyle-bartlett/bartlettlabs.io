import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type GlowOrbProps = {
  color: string;
  size: number;
  x: number;
  y: number;
  speed?: number;
};

export const GlowOrb: React.FC<GlowOrbProps> = ({
  color,
  size,
  x,
  y,
  speed = 1,
}) => {
  const frame = useCurrentFrame();

  const offsetX = Math.sin(frame * 0.02 * speed) * 30;
  const offsetY = Math.cos(frame * 0.015 * speed) * 20;
  const pulseScale = interpolate(
    Math.sin(frame * 0.03 * speed),
    [-1, 1],
    [0.8, 1.2]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x + offsetX,
        top: y + offsetY,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
        transform: `scale(${pulseScale})`,
        filter: "blur(40px)",
        pointerEvents: "none",
      }}
    />
  );
};
