import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NoiseBackground } from "../components/NoiseBackground";
import { GlowOrb } from "../components/GlowOrb";
import { TechBadge } from "../components/TechBadge";
import { TerminalFrame } from "../components/frames/TerminalFrame";
import { fontInter, fontMono } from "../lib/fonts";
import type { ProjectEntry } from "../theme";

type CodeProjectSceneProps = {
  project: ProjectEntry;
  index: number;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    gradient: string;
    font?: string;
  };
};

const getProjectTerminalLines = (project: ProjectEntry) => {
  const name = project.name.toLowerCase().replace(/\s+/g, "-");
  return [
    { text: `cd ~/projects/${name}`, isCommand: true, color: undefined },
    { text: `Entering ${project.name}...`, color: "#666680" },
    {
      text: `python main.py --mode=production`,
      isCommand: true,
      color: undefined,
    },
    { text: `[INFO] Loading ${project.tech[0]} engine...`, color: "#A78BFA" },
    { text: `[OK] ${project.tagline}`, color: "#28C840" },
    {
      text: `[INFO] Platforms: ${project.platforms.join(", ")}`,
      color: "#00A1E4",
    },
    { text: `[READY] All systems nominal`, color: "#00D4AA" },
  ];
};

export const CodeProjectScene: React.FC<CodeProjectSceneProps> = ({
  project,
  index,
  theme,
}) => {
  const font = theme.font ?? fontInter;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const infoOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const infoSlide = interpolate(frame, [0, fps * 0.5], [-60, 0], {
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - fps * 0.3, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        opacity: exitOpacity,
      }}
    >
      <NoiseBackground baseColor={theme.accent} opacity={0.03} />
      <GlowOrb color={theme.accent} size={400} x={150} y={150} speed={0.4} />
      <GlowOrb color={theme.primary} size={300} x={1400} y={500} speed={0.6} />

      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: "60px 60px",
          zIndex: 1,
          gap: 40,
        }}
      >
        {/* Left: project info */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: infoOpacity,
            transform: `translateX(${infoSlide}px)`,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: theme.accent,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 14,
              fontFamily: font,
            }}
          >
            {project.category}
          </div>

          <div
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: theme.text,
              fontFamily: font,
              letterSpacing: -2,
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            {project.name}
          </div>

          <div
            style={{
              fontSize: 20,
              color: theme.textSecondary,
              fontFamily: font,
              fontWeight: 400,
              marginBottom: 28,
              maxWidth: 450,
              lineHeight: 1.4,
            }}
          >
            {project.tagline}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tech.map((t, i) => (
              <TechBadge
                key={t}
                label={t}
                index={i}
                delay={fps * 0.5}
                accentColor={theme.accent}
                surfaceColor={theme.surface}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            {project.platforms.map((p, i) => {
              const pOpacity = interpolate(
                frame - (fps * 0.7 + i * 3),
                [0, 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <div
                  key={p}
                  style={{
                    opacity: pOpacity,
                    fontSize: 13,
                    color: theme.textSecondary,
                    fontFamily: font,
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: theme.primary,
                    }}
                  />
                  {p}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: terminal */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TerminalFrame
            title={`${project.name.toLowerCase().replace(/\s+/g, "-")} — zsh`}
            lines={getProjectTerminalLines(project)}
            themeColor={theme.accent}
            entryDelay={fps * 0.3}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
