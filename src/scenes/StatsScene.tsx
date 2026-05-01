import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlowOrb } from "../components/GlowOrb";
import { NoiseBackground } from "../components/NoiseBackground";
import { fontInter } from "../lib/fonts";

type Stat = {
  value: string;
  label: string;
};

type StatsSceneProps = {
  stats: Stat[];
  theme: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    gradient: string;
    font?: string;
  };
};

const parseNumericValue = (value: string): { num: number; suffix: string } => {
  const match = value.match(/^(\d+)(.*)/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  return { num: 0, suffix: value };
};

export const StatsScene: React.FC<StatsSceneProps> = ({ stats, theme }) => {
  const font = theme.font ?? fontInter;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - fps * 0.4, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <NoiseBackground baseColor={theme.primary} opacity={0.04} />

      <GlowOrb color={theme.primary} size={400} x={300} y={200} speed={0.5} />
      <GlowOrb color={theme.accent} size={350} x={1300} y={500} speed={0.6} />

      <div
        style={{
          display: "flex",
          gap: 80,
          zIndex: 1,
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * fps * 0.2;

          const entryProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 60, mass: 0.5 },
          });

          const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
          const slideY = interpolate(entryProgress, [0, 1], [50, 0]);
          const scale = interpolate(entryProgress, [0, 1], [0.8, 1]);

          // Animated counting
          const { num, suffix } = parseNumericValue(stat.value);
          const countProgress = interpolate(
            frame - delay,
            [0, fps * 1.2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const displayNum = num > 0 ? Math.round(num * countProgress) : 0;
          const displayValue = num > 0 ? `${displayNum}${suffix}` : stat.value;

          return (
            <div
              key={stat.label}
              style={{
                opacity,
                transform: `translateY(${slideY}px) scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 800,
                  fontFamily: font,
                  background: theme.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 20px ${theme.primary}30)`,
                }}
              >
                {displayValue}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: theme.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  fontFamily: font,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
