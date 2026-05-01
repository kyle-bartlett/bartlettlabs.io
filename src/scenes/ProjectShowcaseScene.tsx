import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { NoiseBackground } from "../components/NoiseBackground";
import { GlowOrb } from "../components/GlowOrb";
import { TechBadge } from "../components/TechBadge";
import { BrowserFrame } from "../components/frames/BrowserFrame";
import { MacWindowFrame } from "../components/frames/MacWindowFrame";
import { IPhoneFrame } from "../components/frames/IPhoneFrame";
import { TerminalFrame } from "../components/frames/TerminalFrame";
import { WebAppMockup } from "../components/mockups/WebAppMockup";
import { ChatMockup } from "../components/mockups/ChatMockup";
import { DashboardMockup } from "../components/mockups/DashboardMockup";
import { EmailMockup } from "../components/mockups/EmailMockup";
import { TerminalOutput } from "../components/mockups/TerminalOutput";
import { fontInter } from "../lib/fonts";
import type { ProjectEntry } from "../theme";

type ProjectShowcaseSceneProps = {
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
  layoutSide?: "left" | "right";
};

const getTerminalLines = (project: ProjectEntry) => {
  const lines = [
    { text: project.name.toLowerCase().replace(/\s+/g, "-"), isCommand: true },
    { text: `Starting ${project.name}...`, color: "#666680" },
    { text: `Loading modules: ${project.tech.join(", ")}`, color: "#666680" },
    { text: `[OK] ${project.tagline}`, color: "#28C840" },
    { text: `Platforms: ${project.platforms.join(", ")}`, color: "#A78BFA" },
    { text: "Ready.", color: "#28C840", isCommand: false },
  ];
  return lines;
};

const getTerminalOutputLines = (project: ProjectEntry) => [
  {
    text: `$ ${project.name.toLowerCase().replace(/\s+/g, "-")} --status`,
    color: "#00D4AA",
  },
  { text: `[INFO] Initializing ${project.name}...`, color: "#666680" },
  { text: `[OK] Connected to ${project.tech[0]}`, color: "#28C840" },
  { text: `[OK] ${project.tagline}`, color: "#28C840" },
  {
    text: `[INFO] Platforms: ${project.platforms.join(" | ")}`,
    color: "#A78BFA",
  },
  { text: `[READY] All systems operational`, color: "#00D4AA" },
];

const renderMockupContent = (project: ProjectEntry, accentColor: string) => {
  const name = project.name.toLowerCase();

  if (name.includes("gmail") || name.includes("email")) {
    return <EmailMockup accentColor={accentColor} />;
  }
  if (
    name.includes("chat") ||
    name.includes("knowledge") ||
    name.includes("supply chain")
  ) {
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
  if (
    name.includes("agent") ||
    name.includes("forecast") ||
    name.includes("cartographer") ||
    name.includes("homunculus") ||
    name.includes("continuous") ||
    name.includes("automation")
  ) {
    return (
      <TerminalOutput
        lines={getTerminalOutputLines(project)}
        accentColor={accentColor}
      />
    );
  }
  return <WebAppMockup projectName={project.name} accentColor={accentColor} />;
};

const renderFrame = (
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
    renderMockupContent(project, accentColor)
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
    case "terminal":
      return (
        <TerminalFrame
          title={project.name}
          lines={getTerminalLines(project).map((l) => ({
            text: l.text,
            color: l.color,
            isCommand: l.isCommand,
          }))}
          themeColor={accentColor}
          entryDelay={entryDelay}
        />
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

export const ProjectShowcaseScene: React.FC<ProjectShowcaseSceneProps> = ({
  project,
  index,
  theme,
  layoutSide = "left",
}) => {
  const font = theme.font ?? fontInter;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entry animations
  const infoOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const infoSlide = interpolate(frame, [0, fps * 0.5], [60, 0], {
    extrapolateRight: "clamp",
  });
  const categoryOpacity = interpolate(frame, [fps * 0.15, fps * 0.45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [fps * 0.3, fps * 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - fps * 0.3, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const isLeft = layoutSide === "left";
  const slideDir = isLeft ? 1 : -1;

  const infoContent = (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: infoOpacity,
        transform: `translateX(${infoSlide * slideDir}px)`,
        padding: "0 40px",
      }}
    >
      {/* Category badge */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: theme.accent,
          textTransform: "uppercase",
          letterSpacing: 3,
          marginBottom: 14,
          fontFamily: font,
          opacity: categoryOpacity,
        }}
      >
        {project.category}
      </div>

      {/* Project name */}
      <div
        style={{
          fontSize: 56,
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

      {/* Tagline */}
      <div
        style={{
          fontSize: 22,
          color: theme.textSecondary,
          fontFamily: font,
          fontWeight: 400,
          marginBottom: 32,
          opacity: taglineOpacity,
          maxWidth: 500,
          lineHeight: 1.4,
        }}
      >
        {project.tagline}
      </div>

      {/* Tech stack */}
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

      {/* Platforms */}
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
  );

  const frameContent = (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {renderFrame(project, theme.accent, fps * 0.2)}
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        opacity: exitOpacity,
      }}
    >
      <NoiseBackground baseColor={theme.primary} opacity={0.04} />
      <GlowOrb
        color={theme.primary}
        size={350}
        x={isLeft ? 100 : 1200}
        y={200}
        speed={0.5}
      />
      <GlowOrb
        color={theme.accent}
        size={300}
        x={isLeft ? 1300 : 300}
        y={500}
        speed={0.7}
      />

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
          flexDirection: isLeft ? "row" : "row-reverse",
        }}
      >
        {infoContent}
        {frameContent}
      </div>
    </AbsoluteFill>
  );
};
