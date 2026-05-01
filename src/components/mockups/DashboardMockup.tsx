import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontInter, fontMono } from "../../lib/fonts";

type DashboardMockupProps = {
  projectName?: string;
  accentColor?: string;
};

export const DashboardMockup: React.FC<DashboardMockupProps> = ({
  projectName = "Analytics",
  accentColor = "#00A1E4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B18",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: fontInter,
            opacity: interpolate(frame, [0, fps * 0.3], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {projectName}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["7D", "30D", "90D"].map((period, i) => (
            <div
              key={period}
              style={{
                padding: "4px 10px",
                borderRadius: 4,
                fontSize: 11,
                fontFamily: fontMono,
                fontWeight: 600,
                color: i === 1 ? "#FFF" : "#666680",
                background: i === 1 ? `${accentColor}30` : "transparent",
                border: `1px solid ${i === 1 ? accentColor : "#1A1A30"}`,
              }}
            >
              {period}
            </div>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "flex", gap: 12 }}>
        {[
          { label: "Revenue", value: "$847K", change: "+12.3%" },
          { label: "Users", value: "24.1K", change: "+8.7%" },
          { label: "Conversion", value: "3.2%", change: "+0.4%" },
          { label: "Avg Order", value: "$34.99", change: "-1.2%" },
        ].map((kpi, i) => {
          const cardOpacity = interpolate(
            frame,
            [fps * 0.2 + i * 3, fps * 0.5 + i * 3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const isNeg = kpi.change.startsWith("-");
          return (
            <div
              key={kpi.label}
              style={{
                flex: 1,
                background: "#111122",
                borderRadius: 8,
                padding: 12,
                border: "1px solid #1A1A30",
                opacity: cardOpacity,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#666680",
                  fontFamily: fontInter,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {kpi.label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: fontMono,
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: isNeg ? "#FF4757" : "#28C840",
                  fontFamily: fontMono,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart + table row */}
      <div style={{ display: "flex", gap: 12, flex: 1 }}>
        {/* Line chart area */}
        <div
          style={{
            flex: 2,
            background: "#111122",
            borderRadius: 8,
            padding: 16,
            border: "1px solid #1A1A30",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#666680",
              fontFamily: fontInter,
              marginBottom: 12,
            }}
          >
            Revenue Trend
          </div>
          {/* Fake line chart using SVG */}
          <svg width="100%" height="80%" viewBox="0 0 400 150">
            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1={0}
                y1={i * 50}
                x2={400}
                y2={i * 50}
                stroke="#1A1A30"
                strokeWidth={1}
              />
            ))}
            {/* Animated line */}
            <polyline
              points="0,120 40,100 80,110 120,80 160,90 200,60 240,70 280,40 320,50 360,20 400,30"
              fill="none"
              stroke={accentColor}
              strokeWidth={2}
              strokeDasharray={1200}
              strokeDashoffset={interpolate(
                frame,
                [fps * 0.5, fps * 2],
                [1200, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              )}
            />
            {/* Area fill */}
            <polygon
              points="0,120 40,100 80,110 120,80 160,90 200,60 240,70 280,40 320,50 360,20 400,30 400,150 0,150"
              fill={`${accentColor}10`}
            />
          </svg>
        </div>

        {/* Side table */}
        <div
          style={{
            flex: 1,
            background: "#111122",
            borderRadius: 8,
            padding: 16,
            border: "1px solid #1A1A30",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#666680",
              fontFamily: fontInter,
              marginBottom: 12,
            }}
          >
            Top Channels
          </div>
          {["Amazon", "DTC", "Retail", "B2B", "Wholesale"].map(
            (channel, i) => {
              const rowOpacity = interpolate(
                frame,
                [fps * 0.8 + i * 3, fps * 1.1 + i * 3],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={channel}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid #1A1A30",
                    opacity: rowOpacity,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "#A0A0B8",
                      fontFamily: fontInter,
                    }}
                  >
                    {channel}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      fontFamily: fontMono,
                      fontWeight: 600,
                    }}
                  >
                    {Math.floor(47 - i * 8)}%
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
