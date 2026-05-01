import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { NoiseBackground } from "../components/NoiseBackground";
import { ParticleField } from "../components/ParticleField";
import { GlowOrb } from "../components/GlowOrb";
import { TechBadge } from "../components/TechBadge";
import { BrowserFrame } from "../components/frames/BrowserFrame";
import { MacWindowFrame } from "../components/frames/MacWindowFrame";
import { IPhoneFrame } from "../components/frames/IPhoneFrame";
import { WebAppMockup } from "../components/mockups/WebAppMockup";
import { ChatMockup } from "../components/mockups/ChatMockup";
import { EmailMockup } from "../components/mockups/EmailMockup";
import { DashboardMockup } from "../components/mockups/DashboardMockup";
import { fontInter } from "../lib/fonts";
import type { ProjectEntry } from "../theme";

type Annotation = {
  text: string;
  x: number;
  y: number;
  delay: number;
};

type HeroSceneProps = {
  project: ProjectEntry;
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
  annotations?: Annotation[];
};

const defaultAnnotations: Annotation[] = [
  { text: "AI-Powered", x: 100, y: 120, delay: 0.8 },
  { text: "Real-time", x: 1400, y: 200, delay: 1.2 },
  { text: "Multi-platform", x: 120, y: 800, delay: 1.6 },
];

const renderHeroMockup = (project: ProjectEntry, accentColor: string) => {
  const name = project.name.toLowerCase();
  if (name.includes("gmail") || name.includes("email")) {
    return <EmailMockup accentColor={accentColor} />;
  }
  if (name.includes("knowledge") || name.includes("supply")) {
    return <ChatMockup projectName={project.name} accentColor={accentColor} />;
  }
  if (
    name.includes("dashboard") ||
    name.includes("analysis") ||
    name.includes("kdp")
  ) {
    return (
      <DashboardMockup projectName={project.name} accentColor={accentColor} />
    );
  }
  return <WebAppMockup projectName={project.name} accentColor={accentColor} />;
};

const renderHeroFrame = (
  project: ProjectEntry,
  accentColor: string,
  entryDelay: number,
) => {
  const frameType = (project as any).frameType || "browser";
  const screenshot = (project as any).screenshot;

  const content = screenshot ? (
    <Img
      src={staticFile(screenshot)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : (
    renderHeroMockup(project, accentColor)
  );

  switch (frameType) {
    case "desktop":
      return (
        <MacWindowFrame
          title={project.name}
          themeColor={accentColor}
          entryDelay={entryDelay}
        >
          {content}
        </MacWindowFrame>
      );
    case "phone":
      return (
        <IPhoneFrame themeColor={accentColor} entryDelay={entryDelay}>
          {content}
        </IPhoneFrame>
      );
    default:
      return (
        <BrowserFrame
          url={`${project.name.toLowerCase().replace(/\s+/g, "-")}.app`}
          themeColor={accentColor}
          entryDelay={entryDelay}
        >
          {content}
        </BrowserFrame>
      );
  }
};

export const HeroScene: React.FC<HeroSceneProps> = ({
  project,
  theme,
  annotations = defaultAnnotations,
}) => {
  const font = theme.font ?? fontInter;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - fps * 0.4, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Title overlay animation
  const titleOpacity = interpolate(frame, [fps * 0.5, fps * 1.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleSlide = interpolate(frame, [fps * 0.5, fps * 1.0], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        opacity: exitOpacity,
      }}
    >
      <NoiseBackground baseColor={theme.primary} opacity={0.03} />
      <ParticleField color={theme.accent} count={30} speed={0.5} />
      <GlowOrb color={theme.primary} size={500} x={300} y={100} speed={0.3} />
      <GlowOrb color={theme.accent} size={400} x={1200} y={500} speed={0.5} />

      {/* Centered device frame */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        {renderHeroFrame(project, theme.accent, fps * 0.1)}
      </div>

      {/* Project info overlay - bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 80,
          zIndex: 10,
          opacity: titleOpacity,
          transform: `translateY(${titleSlide}px)`,
        }}
      >
        <div
          style={{
            background: `${theme.background}CC`,
            backdropFilter: "blur(20px)",
            borderRadius: 16,
            padding: "24px 32px",
            border: `1px solid ${theme.accent}30`,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: theme.accent,
              textTransform: "uppercase",
              letterSpacing: 3,
              fontFamily: font,
              marginBottom: 8,
            }}
          >
            {project.category}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: theme.text,
              fontFamily: font,
              letterSpacing: -1,
              marginBottom: 8,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              fontSize: 16,
              color: theme.textSecondary,
              fontFamily: font,
              marginBottom: 16,
              maxWidth: 400,
            }}
          >
            {project.tagline}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {project.tech.slice(0, 4).map((t, i) => (
              <TechBadge
                key={t}
                label={t}
                index={i}
                delay={fps * 1.0}
                accentColor={theme.accent}
                surfaceColor={theme.surface}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating annotations */}
      {annotations.map((ann, i) => {
        const annProgress = spring({
          frame: frame - ann.delay * fps,
          fps,
          config: { damping: 12, stiffness: 60, mass: 0.5 },
        });
        const annFloat = Math.sin(frame * 0.02 + i) * 5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ann.x,
              top: ann.y + annFloat,
              zIndex: 10,
              opacity: annProgress,
              transform: `scale(${annProgress})`,
            }}
          >
            <div
              style={{
                background: `${theme.accent}20`,
                border: `1px solid ${theme.accent}50`,
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 13,
                color: theme.accent,
                fontFamily: font,
                fontWeight: 600,
                backdropFilter: "blur(10px)",
              }}
            >
              {ann.text}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
