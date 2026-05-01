import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";

type NoiseBackgroundProps = {
  baseColor: string;
  speed?: number;
  opacity?: number;
  cellSize?: number;
  seed?: string;
};

export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
  baseColor,
  speed = 0.008,
  opacity = 0.06,
  cellSize = 8,
  seed = "noise-bg",
}) => {
  const frame = useCurrentFrame();
  const cols = Math.ceil(1920 / cellSize);
  const rows = Math.ceil(1080 / cellSize);

  const cells = useMemo(() => {
    const result: { x: number; y: number; value: number }[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const noiseVal = noise2D(
          seed,
          col * 0.05 + frame * speed,
          row * 0.05 + frame * speed * 0.7
        );
        // Map from [-1, 1] to [0, 1]
        const normalized = (noiseVal + 1) / 2;
        result.push({
          x: col * cellSize,
          y: row * cellSize,
          value: normalized,
        });
      }
    }
    return result;
  }, [frame, cols, rows, cellSize, speed, seed]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, opacity }}
      >
        {cells.map((cell, i) => (
          <rect
            key={i}
            x={cell.x}
            y={cell.y}
            width={cellSize}
            height={cellSize}
            fill={baseColor}
            opacity={cell.value}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
