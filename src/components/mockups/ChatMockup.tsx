import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontInter } from "../../lib/fonts";

type ChatMockupProps = {
  projectName?: string;
  accentColor?: string;
  messages?: { role: "user" | "ai"; text: string }[];
};

const defaultMessages: ChatMockupProps["messages"] = [
  { role: "user", text: "What's our Q1 forecast for chargers?" },
  {
    role: "ai",
    text: "Based on the latest data, Q1 charger revenue is projected at $12.4M, up 18% from last quarter. Key drivers include the new 240W GaN lineup and holiday momentum.",
  },
  { role: "user", text: "Break it down by channel" },
  {
    role: "ai",
    text: "Amazon: $5.8M (47%) | DTC: $3.1M (25%) | Retail: $2.4M (19%) | B2B: $1.1M (9%)",
  },
];

export const ChatMockup: React.FC<ChatMockupProps> = ({
  projectName = "AI Assistant",
  accentColor = "#00A1E4",
  messages = defaultMessages,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B18",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid #1A1A30",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#FFF",
          }}
        >
          AI
        </div>
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: fontInter,
            }}
          >
            {projectName}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#28C840",
              fontFamily: fontInter,
            }}
          >
            Online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflow: "hidden",
        }}
      >
        {messages.map((msg, i) => {
          const msgOpacity = interpolate(
            frame,
            [fps * 0.3 + i * fps * 0.4, fps * 0.5 + i * fps * 0.4],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const slideY = interpolate(
            frame,
            [fps * 0.3 + i * fps * 0.4, fps * 0.5 + i * fps * 0.4],
            [20, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const isUser = msg.role === "user";

          return (
            <div
              key={i}
              style={{
                opacity: msgOpacity,
                transform: `translateY(${slideY}px)`,
                alignSelf: isUser ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <div
                style={{
                  background: isUser ? accentColor : "#1A1A30",
                  color: isUser ? "#FFFFFF" : "#C0C0D0",
                  padding: "10px 14px",
                  borderRadius: 12,
                  borderBottomRightRadius: isUser ? 4 : 12,
                  borderBottomLeftRadius: isUser ? 12 : 4,
                  fontSize: 13,
                  fontFamily: fontInter,
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #1A1A30",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#111122",
            borderRadius: 20,
            padding: "10px 16px",
            fontSize: 13,
            color: "#444460",
            fontFamily: fontInter,
          }}
        >
          Ask anything...
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#FFF",
          }}
        >
          &#x2191;
        </div>
      </div>
    </div>
  );
};
