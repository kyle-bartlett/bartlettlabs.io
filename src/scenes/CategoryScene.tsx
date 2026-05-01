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

type CategorySceneProps = {
  category: string;
  projectCount: number;
  theme: {
    primary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
    gradient: string;
    font?: string;
  };
};

export const CategoryScene: React.FC<CategorySceneProps> = ({
  category,
  projectCount,
  theme,
}) => {
  const font = theme.font ?? fontInter;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 70, mass: 0.6 },
  });

  const lineWidth = interpolate(titleProgress, [0, 1], [0, 200]);
  const textOpacity = interpolate(titleProgress, [0.2, 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textScale = interpolate(titleProgress, [0.2, 0.8], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const countOpacity = interpolate(frame, [fps * 0.5, fps * 1.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - fps * 0.3, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Decorative shapes
  const shapeRotation = frame * 0.3;
  const shapeFloat = Math.sin(frame * 0.02) * 10;

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <NoiseBackground baseColor={theme.accent} opacity={0.03} />

      <GlowOrb color={theme.accent} size={500} x={700} y={300} speed={0.4} />

      {/* Decorative corner shapes */}
      <div
        style={{
          position: "absolute",
          top: 80 + shapeFloat,
          right: 120,
          width: 60,
          height: 60,
          border: `2px solid ${theme.accent}25`,
          borderRadius: 12,
          transform: `rotate(${shapeRotation}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 100 - shapeFloat,
          left: 140,
          width: 40,
          height: 40,
          border: `2px solid ${theme.primary}20`,
          borderRadius: "50%",
          transform: `rotate(${-shapeRotation}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200 + shapeFloat * 0.5,
          left: 100,
          width: 30,
          height: 30,
          background: `${theme.accent}08`,
          borderRadius: 6,
          transform: `rotate(${shapeRotation * 0.5}deg)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: theme.gradient,
            borderRadius: 1,
            boxShadow: `0 0 15px ${theme.primary}40`,
          }}
        />

        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            fontSize: 52,
            fontWeight: 700,
            color: theme.text,
            fontFamily: font,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          {category}
        </div>

        <div
          style={{
            opacity: countOpacity,
            fontSize: 18,
            color: theme.textSecondary,
            fontFamily: font,
            fontWeight: 400,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {projectCount} {projectCount === 1 ? "project" : "projects"}
        </div>

        <div
          style={{
            width: lineWidth,
            height: 2,
            background: theme.gradient,
            borderRadius: 1,
            boxShadow: `0 0 15px ${theme.primary}40`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
