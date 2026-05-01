import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontMono } from "../../lib/fonts";

type TerminalLine = {
  text: string;
  color?: string;
  isCommand?: boolean;
};

type TerminalFrameProps = {
  title?: string;
  lines: TerminalLine[];
  themeColor?: string;
  entryDelay?: number;
  typingSpeed?: number;
};

export const TerminalFrame: React.FC<TerminalFrameProps> = ({
  title = "Terminal",
  lines,
  themeColor = "#00D4AA",
  entryDelay = 0,
  typingSpeed = 1.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - entryDelay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  const rotateY = interpolate(entryProgress, [0, 1], [15, 0]);
  const translateX = interpolate(entryProgress, [0, 1], [60, 0]);
  const opacity = interpolate(entryProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(frame * 0.02) * 3;

  // Calculate typing progress for each line
  const charsPerFrame = typingSpeed;
  const entryStartFrame = entryDelay + fps * 0.5;

  return (
    <div
      style={{
        width: 780,
        opacity,
        transform: `perspective(1200px) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${floatY}px)`,
        filter: `drop-shadow(0 20px 60px ${themeColor}25)`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          borderRadius: 20,
          background: `radial-gradient(ellipse at center, ${themeColor}12 0%, transparent 70%)`,
          filter: "blur(30px)",
          zIndex: -1,
        }}
      />

      {/* Title bar */}
      <div
        style={{
          background: "#1E1E2E",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
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
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 13,
            color: "#A0A0B8",
            fontFamily: fontMono,
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      </div>

      {/* Terminal body */}
      <div
        style={{
          background: "#0A0A14",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          padding: "20px 24px",
          minHeight: 400,
          fontFamily: fontMono,
          fontSize: 14,
          lineHeight: 1.8,
        }}
      >
        {lines.map((line, lineIndex) => {
          // Calculate when this line starts typing
          const prevChars = lines
            .slice(0, lineIndex)
            .reduce((sum, l) => sum + l.text.length, 0);
          const lineStartFrame =
            entryStartFrame + prevChars / charsPerFrame;
          const elapsed = frame - lineStartFrame;
          const visibleChars = Math.floor(elapsed * charsPerFrame);

          if (visibleChars <= 0) return null;

          const displayText = line.text.slice(
            0,
            Math.min(visibleChars, line.text.length)
          );
          const isTyping = visibleChars < line.text.length;

          return (
            <div key={lineIndex} style={{ display: "flex" }}>
              {line.isCommand && (
                <span style={{ color: themeColor, marginRight: 8 }}>
                  ${" "}
                </span>
              )}
              <span style={{ color: line.color || "#C0C0D0" }}>
                {displayText}
                {isTyping && line.isCommand && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 16,
                      background: themeColor,
                      marginLeft: 2,
                      opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
