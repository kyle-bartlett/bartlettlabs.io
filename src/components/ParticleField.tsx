import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, random } from "remotion";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

type ParticleFieldProps = {
  count?: number;
  color?: string;
  maxSize?: number;
  speed?: number;
  seed?: string;
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 60,
  color = "#FFFFFF",
  maxSize = 3,
  speed = 1,
  seed = "particles",
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: random(`${seed}-x-${i}`) * 1920,
      y: random(`${seed}-y-${i}`) * 1080,
      size: random(`${seed}-s-${i}`) * maxSize + 0.5,
      speedX: (random(`${seed}-sx-${i}`) - 0.5) * 0.4 * speed,
      speedY: (random(`${seed}-sy-${i}`) - 0.5) * 0.3 * speed,
      opacity: random(`${seed}-o-${i}`) * 0.5 + 0.1,
    }));
  }, [count, maxSize, speed, seed]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const x = (p.x + frame * p.speedX) % 1920;
        const y = (p.y + frame * p.speedY) % 1080;
        // Gentle pulsing opacity
        const pulse =
          p.opacity +
          Math.sin(frame * 0.03 + random(`${seed}-phase-${i}`) * Math.PI * 2) *
            0.15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x < 0 ? x + 1920 : x,
              top: y < 0 ? y + 1080 : y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: Math.max(0, Math.min(1, pulse)),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
