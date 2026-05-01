import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type TechBadgeProps = {
  label: string;
  index: number;
  delay?: number;
  accentColor: string;
  surfaceColor: string;
};

export const TechBadge: React.FC<TechBadgeProps> = ({
  label,
  index,
  delay = 0,
  accentColor,
  surfaceColor,
}) => {
  const frame = useCurrentFrame();
  const stagger = delay + index * 3;

  const opacity = interpolate(frame - stagger, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame - stagger, [0, 8], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: surfaceColor,
        border: `1px solid ${accentColor}40`,
        borderRadius: 6,
        padding: "6px 14px",
        fontSize: 16,
        color: accentColor,
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        fontWeight: 500,
        display: "inline-block",
      }}
    >
      {label}
    </div>
  );
};
