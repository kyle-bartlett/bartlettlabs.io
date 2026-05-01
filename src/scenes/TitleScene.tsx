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

type TitleSceneProps = {
  title: string;
  subtitle: string;
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
  /** Product image path relative to public/, e.g. "images/products/charger.png" */
  backgroundImage?: string;
  /** Logo path relative to public/, e.g. "images/logos/anker-logo.png" */
  logoSrc?: string;
};

export const TitleScene: React.FC<TitleSceneProps> = ({
  title,
  subtitle,
  theme,
  showKnot = false,
  backgroundImage,
  logoSrc,
}) => {
  const font = theme.font ?? fontInter;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.6 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);

  const subtitleOpacity = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleSlide = interpolate(frame, [fps * 0.5, fps * 1.2], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [fps * 0.3, fps * 1.0], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - fps * 0.5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Knot animation
  const knotProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 60, mass: 0.4 },
  });

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
      {backgroundImage && (
        <ProductImageBackground
          src={backgroundImage}
          maxOpacity={0.1}
          position="right"
          scale={0.7}
          delay={0.5}
        />
      )}
      <ParticleField color={theme.accent} count={50} speed={0.8} />

      <GlowOrb color={theme.primary} size={500} x={200} y={100} speed={0.5} />
      <GlowOrb color={theme.accent} size={400} x={1200} y={500} speed={0.7} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 1,
        }}
      >
        {showKnot && (
          <div
            style={{
              opacity: interpolate(knotProgress, [0, 1], [0, 1]),
              transform: `scale(${interpolate(knotProgress, [0, 1], [0.5, 1])}) rotate(${interpolate(knotProgress, [0, 1], [-180, 0])}deg)`,
              fontSize: 80,
              marginBottom: 16,
              filter: `drop-shadow(0 0 30px ${theme.accent}60)`,
            }}
          >
            &#x29D6;
          </div>
        )}

        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 72,
            fontWeight: 800,
            color: theme.text,
            fontFamily: font,
            letterSpacing: -2,
            textAlign: "center",
            background: theme.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </div>

        <div
          style={{
            width: lineWidth,
            height: 3,
            background: theme.gradient,
            borderRadius: 2,
            boxShadow: `0 0 20px ${theme.primary}60`,
          }}
        />

        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleSlide}px)`,
            fontSize: 28,
            color: theme.textSecondary,
            fontFamily: font,
            fontWeight: 400,
            letterSpacing: 4,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      </div>

      {logoSrc && (
        <LogoWatermark
          src={logoSrc}
          opacity={0.06}
          position="top-left"
          size={100}
        />
      )}
    </AbsoluteFill>
  );
};
