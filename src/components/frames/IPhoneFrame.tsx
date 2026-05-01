import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type IPhoneFrameProps = {
  themeColor?: string;
  children: React.ReactNode;
  entryDelay?: number;
};

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  themeColor = "#6366F1",
  children,
  entryDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - entryDelay,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.7 },
  });

  const translateY = interpolate(entryProgress, [0, 1], [120, 0]);
  const scale = interpolate(entryProgress, [0, 1], [0.85, 1]);
  const opacity = interpolate(entryProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(frame * 0.025) * 3;
  const kenBurns = interpolate(frame, [0, 300], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  const PHONE_WIDTH = 320;
  const PHONE_HEIGHT = 690;
  const BORDER_RADIUS = 50;
  const BEZEL = 8;

  return (
    <div
      style={{
        width: PHONE_WIDTH,
        height: PHONE_HEIGHT,
        opacity,
        transform: `translateY(${translateY + floatY}px) scale(${scale})`,
        filter: `drop-shadow(0 30px 80px ${themeColor}40)`,
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          borderRadius: BORDER_RADIUS + 20,
          background: `radial-gradient(ellipse at center, ${themeColor}15 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: -1,
        }}
      />

      {/* Phone outer shell */}
      <div
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          borderRadius: BORDER_RADIUS,
          background: "#1A1A2E",
          border: `2px solid #333350`,
          padding: BEZEL,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Side button (power) */}
        <div
          style={{
            position: "absolute",
            right: -3,
            top: 160,
            width: 3,
            height: 40,
            background: "#333350",
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
          }}
        />

        {/* Side buttons (volume) */}
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 140,
            width: 3,
            height: 30,
            background: "#333350",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 185,
            width: 3,
            height: 30,
            background: "#333350",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: BORDER_RADIUS - BEZEL,
            overflow: "hidden",
            background: "#000",
            position: "relative",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 100,
              height: 28,
              borderRadius: 20,
              background: "#000",
              zIndex: 10,
            }}
          />

          {/* Content with Ken Burns */}
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

          {/* Home indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 4,
              borderRadius: 2,
              background: "#FFFFFF30",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};
