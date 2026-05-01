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
import { ParticleField } from "../components/ParticleField";
import { fontInter } from "../lib/fonts";
import {
  ProductImageBackground,
  LogoWatermark,
} from "../components/ProductImageBackground";

type OutroSceneProps = {
  headline: string;
  subline: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
    gradient: string;
    font?: string;
  };
  showKnot?: boolean;
  backgroundImage?: string;
  logoSrc?: string;
};

export const OutroScene: React.FC<OutroSceneProps> = ({
  headline,
  subline,
  theme,
  showKnot = false,
  backgroundImage,
  logoSrc,
}) => {
  const font = theme.font ?? fontInter;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const headlineProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 70, mass: 0.6 },
  });

  const opacity = interpolate(headlineProgress, [0, 1], [0, 1]);
  const scale = interpolate(headlineProgress, [0, 1], [0.9, 1]);

  const subOpacity = interpolate(frame, [fps * 0.6, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subSlide = interpolate(frame, [fps * 0.6, fps * 1.2], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade to black at the very end
  const endFade = interpolate(
    frame,
    [durationInFrames - fps * 1.5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Knot animation
  const knotProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 50, mass: 0.5 },
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        justifyContent: "center",
        alignItems: "center",
        opacity: endFade,
      }}
    >
      <NoiseBackground baseColor={theme.primary} opacity={0.04} />
      {backgroundImage && (
        <ProductImageBackground
          src={backgroundImage}
          maxOpacity={0.08}
          position="left"
          scale={0.6}
          delay={0.3}
        />
      )}
      <ParticleField color={theme.accent} count={40} speed={0.6} />

      <GlowOrb color={theme.primary} size={600} x={400} y={200} speed={0.3} />
      <GlowOrb color={theme.accent} size={500} x={1100} y={400} speed={0.5} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          zIndex: 1,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {showKnot && (
          <div
            style={{
              opacity: interpolate(knotProgress, [0, 1], [0, 1]),
              transform: `scale(${interpolate(knotProgress, [0, 1], [0.3, 1])})`,
              fontSize: 60,
              marginBottom: 10,
              filter: `drop-shadow(0 0 25px ${theme.accent}50)`,
            }}
          >
            &#x29D6;
          </div>
        )}

        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: theme.text,
            fontFamily: font,
            letterSpacing: -2,
            textAlign: "center",
            background: theme.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 20px ${theme.primary}30)`,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subSlide}px)`,
            fontSize: 22,
            color: theme.textSecondary,
            fontFamily: font,
            fontWeight: 400,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          {subline}
        </div>
      </div>

      {logoSrc && (
        <LogoWatermark
          src={logoSrc}
          opacity={0.06}
          position="bottom-right"
          size={100}
        />
      )}
    </AbsoluteFill>
  );
};
