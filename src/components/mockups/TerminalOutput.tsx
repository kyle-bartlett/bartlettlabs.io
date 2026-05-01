import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontMono } from "../../lib/fonts";

type TerminalOutputProps = {
  lines: { text: string; color?: string }[];
  accentColor?: string;
};

export const TerminalOutput: React.FC<TerminalOutputProps> = ({
  lines,
  accentColor = "#00D4AA",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A14",
        padding: 20,
        fontFamily: fontMono,
        fontSize: 13,
        lineHeight: 1.8,
        overflow: "hidden",
      }}
    >
      {lines.map((line, i) => {
        const lineOpacity = interpolate(
          frame,
          [fps * 0.3 + i * fps * 0.12, fps * 0.5 + i * fps * 0.12],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div key={i} style={{ opacity: lineOpacity }}>
            <span style={{ color: line.color || "#C0C0D0" }}>
              {line.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
