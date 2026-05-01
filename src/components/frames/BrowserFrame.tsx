import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontInter } from "../../lib/fonts";

type BrowserFrameProps = {
  url?: string;
  themeColor?: string;
  children: React.ReactNode;
  entryDelay?: number;
};

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = "localhost:3000",
  themeColor = "#6366F1",
  children,
  entryDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry: 3D perspective tilt spring to flat
  const entryProgress = spring({
    frame: frame - entryDelay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const rotateY = interpolate(entryProgress, [0, 1], [25, 0]);
  const translateX = interpolate(entryProgress, [0, 1], [100, 0]);
  const opacity = interpolate(entryProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle float while on screen
  const floatY = Math.sin(frame * 0.02) * 4;

  // Ken Burns slow zoom on content
  const kenBurns = interpolate(frame, [0, 300], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 780,
        opacity,
        transform: `perspective(1200px) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${floatY}px)`,
        filter: `drop-shadow(0 20px 60px ${themeColor}30)`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          borderRadius: 20,
          background: `radial-gradient(ellipse at center, ${themeColor}18 0%, transparent 70%)`,
          filter: "blur(30px)",
          zIndex: -1,
        }}
      />

      {/* Chrome bar */}
      <div
        style={{
          background: "#1E1E2E",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 7 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FF5F57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FEBC2E",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28C840",
            }}
          />
        </div>

        {/* Tab */}
        <div
          style={{
            background: "#2A2A3E",
            borderRadius: 6,
            padding: "5px 14px",
            fontSize: 12,
            color: "#A0A0B8",
            fontFamily: fontInter,
            fontWeight: 500,
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {url.replace(/^https?:\/\//, "")}
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: "#12121E",
            borderRadius: 6,
            padding: "6px 14px",
            fontSize: 13,
            color: "#666680",
            fontFamily: fontInter,
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "#28C840", fontSize: 10 }}>&#x1F512;</span>
          {url}
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          background: "#0F0F1A",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          overflow: "hidden",
          height: 440,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `scale(${kenBurns})`,
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
