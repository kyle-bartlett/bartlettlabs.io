import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontInter } from "../../lib/fonts";

type MacWindowFrameProps = {
  title?: string;
  themeColor?: string;
  children: React.ReactNode;
  entryDelay?: number;
};

export const MacWindowFrame: React.FC<MacWindowFrameProps> = ({
  title = "Application",
  themeColor = "#6366F1",
  children,
  entryDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - entryDelay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const rotateY = interpolate(entryProgress, [0, 1], [-20, 0]);
  const translateX = interpolate(entryProgress, [0, 1], [-80, 0]);
  const opacity = interpolate(entryProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(frame * 0.02) * 3;
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

      {/* Title bar */}
      <div
        style={{
          background: "linear-gradient(180deg, #3A3A4E 0%, #2A2A3E 100%)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
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

        {/* Centered title */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 13,
            color: "#A0A0B8",
            fontFamily: fontInter,
            fontWeight: 500,
          }}
        >
          {title}
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
