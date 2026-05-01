import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontInter, fontMono } from "../../lib/fonts";

type WebAppMockupProps = {
  projectName: string;
  accentColor?: string;
  features?: string[];
};

export const WebAppMockup: React.FC<WebAppMockupProps> = ({
  projectName,
  accentColor = "#6366F1",
  features = ["Dashboard", "Analytics", "Settings"],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sidebarOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const contentOpacity = interpolate(frame, [fps * 0.2, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0B0B18",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 180,
          background: "#111122",
          padding: "20px 12px",
          opacity: sidebarOpacity,
          borderRight: "1px solid #1A1A30",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: accentColor,
            fontFamily: fontInter,
            marginBottom: 16,
            padding: "0 8px",
          }}
        >
          {projectName}
        </div>

        {["Dashboard", "Projects", "Reports", "Team", "Settings"].map(
          (item, i) => {
            const isActive = i === 0;
            return (
              <div
                key={item}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  color: isActive ? "#FFFFFF" : "#666680",
                  fontFamily: fontInter,
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? `${accentColor}20` : "transparent",
                  borderLeft: isActive
                    ? `2px solid ${accentColor}`
                    : "2px solid transparent",
                }}
              >
                {item}
              </div>
            );
          }
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 24, opacity: contentOpacity }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: fontInter,
            }}
          >
            Dashboard
          </div>
          <div
            style={{
              background: accentColor,
              padding: "6px 16px",
              borderRadius: 6,
              fontSize: 12,
              color: "#FFFFFF",
              fontFamily: fontInter,
              fontWeight: 600,
            }}
          >
            + New
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total", value: "2,847" },
            { label: "Active", value: "1,204" },
            { label: "Growth", value: "+23%" },
          ].map((stat, i) => {
            const cardOpacity = interpolate(
              frame,
              [fps * 0.4 + i * 4, fps * 0.7 + i * 4],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  background: "#151528",
                  borderRadius: 10,
                  padding: 16,
                  border: "1px solid #1A1A30",
                  opacity: cardOpacity,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#666680",
                    fontFamily: fontInter,
                    marginBottom: 4,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: fontMono,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fake chart area */}
        <div
          style={{
            background: "#151528",
            borderRadius: 10,
            padding: 20,
            border: "1px solid #1A1A30",
            height: 200,
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const barHeight = 30 + Math.sin(i * 0.8 + 1) * 50 + i * 8;
            const barProgress = interpolate(
              frame,
              [fps * 0.6 + i * 2, fps * 1.0 + i * 2],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: barHeight * barProgress,
                  background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}40 100%)`,
                  borderRadius: 4,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
