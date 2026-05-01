import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontInter } from "../../lib/fonts";

type EmailMockupProps = {
  accentColor?: string;
};

const emails = [
  {
    from: "Sarah Chen",
    subject: "Q1 Budget Approval",
    preview: "Hi Kyle, I've reviewed the Q1 budget proposal and...",
    time: "10:34 AM",
    unread: true,
    label: "Auto-reply drafted",
  },
  {
    from: "Mike Johnson",
    subject: "Re: Product Launch Timeline",
    preview: "The updated timeline looks good. Can we discuss the...",
    time: "9:12 AM",
    unread: true,
    label: "Analyzed",
  },
  {
    from: "David Park",
    subject: "Vendor Contract Update",
    preview: "Please find attached the revised contract terms for...",
    time: "Yesterday",
    unread: false,
    label: "Archived",
  },
  {
    from: "Lisa Wang",
    subject: "Team Standup Notes",
    preview: "Here are the key takeaways from today's standup...",
    time: "Yesterday",
    unread: false,
    label: "Summarized",
  },
];

export const EmailMockup: React.FC<EmailMockupProps> = ({
  accentColor = "#6366F1",
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
      }}
    >
      {/* Email list */}
      <div
        style={{
          width: "45%",
          borderRight: "1px solid #1A1A30",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid #1A1A30",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: fontInter,
            }}
          >
            Inbox
          </div>
          <div
            style={{
              background: accentColor,
              borderRadius: 10,
              padding: "2px 8px",
              fontSize: 11,
              color: "#FFF",
              fontFamily: fontInter,
              fontWeight: 700,
            }}
          >
            2
          </div>
        </div>

        {/* Email items */}
        {emails.map((email, i) => {
          const itemOpacity = interpolate(
            frame,
            [fps * 0.2 + i * fps * 0.15, fps * 0.4 + i * fps * 0.15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #1A1A30",
                background: i === 0 ? `${accentColor}10` : "transparent",
                opacity: itemOpacity,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: email.unread ? 700 : 400,
                    color: email.unread ? "#FFFFFF" : "#888",
                    fontFamily: fontInter,
                  }}
                >
                  {email.unread && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: accentColor,
                        marginRight: 6,
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                  {email.from}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#555",
                    fontFamily: fontInter,
                  }}
                >
                  {email.time}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: email.unread ? "#C0C0D0" : "#666",
                  fontFamily: fontInter,
                  fontWeight: email.unread ? 600 : 400,
                  marginBottom: 2,
                }}
              >
                {email.subject}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#555",
                  fontFamily: fontInter,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email.preview}
              </div>
              <div
                style={{
                  marginTop: 4,
                  display: "inline-block",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontSize: 9,
                  fontWeight: 600,
                  color: accentColor,
                  background: `${accentColor}15`,
                  fontFamily: fontInter,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {email.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview pane */}
      <div style={{ flex: 1, padding: 20 }}>
        <div
          style={{
            opacity: interpolate(frame, [fps * 0.5, fps * 0.8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: fontInter,
              marginBottom: 8,
            }}
          >
            {emails[0].subject}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#888",
              fontFamily: fontInter,
              marginBottom: 16,
            }}
          >
            From: {emails[0].from} &middot; {emails[0].time}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#C0C0D0",
              fontFamily: fontInter,
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            Hi Kyle, I've reviewed the Q1 budget proposal and everything looks
            aligned with our targets. A few notes on the marketing allocation
            - I think we should increase the Amazon PPC budget by 15%.
          </div>

          {/* AI draft badge */}
          <div
            style={{
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}40`,
              borderRadius: 8,
              padding: 14,
              opacity: interpolate(
                frame,
                [fps * 1.0, fps * 1.4],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              ),
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: accentColor,
                fontFamily: fontInter,
                fontWeight: 700,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              AI-Generated Draft Reply
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#A0A0B8",
                fontFamily: fontInter,
                lineHeight: 1.6,
              }}
            >
              Thanks Sarah! Agreed on the PPC increase. I'll update the
              allocation sheet and send over the revised numbers by EOD.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
