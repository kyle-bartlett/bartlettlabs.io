import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Img,
} from "remotion";

type ProductImageProps = {
  /** Path relative to public/ — e.g. "images/products/charger.png" */
  src: string;
  /** 0-1 opacity cap (default 0.12 for subtle background) */
  maxOpacity?: number;
  /** Position preset */
  position?: "center" | "right" | "left" | "bottom-right";
  /** Scale factor (default 0.8) */
  scale?: number;
  /** Delay before fade-in, in seconds */
  delay?: number;
  /** Slow drift direction (px per second) */
  drift?: { x?: number; y?: number };
};

export const ProductImageBackground: React.FC<ProductImageProps> = ({
  src,
  maxOpacity = 0.12,
  position = "right",
  scale = 0.8,
  delay = 0,
  drift = { x: 0, y: -5 },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delay * fps;

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + fps * 1.5],
    [0, maxOpacity],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const entryScale = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 30, mass: 1.2, stiffness: 80 },
    durationInFrames: fps * 2,
  });

  const currentScale = interpolate(entryScale, [0, 1], [scale * 0.9, scale]);

  // Slow drift over time
  const driftX = ((drift.x ?? 0) * frame) / fps;
  const driftY = ((drift.y ?? 0) * frame) / fps;

  const positionStyles: Record<string, React.CSSProperties> = {
    center: { top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${currentScale}) translate(${driftX}px, ${driftY}px)` },
    right: { top: "50%", right: "-5%", transform: `translateY(-50%) scale(${currentScale}) translate(${driftX}px, ${driftY}px)` },
    left: { top: "50%", left: "-5%", transform: `translateY(-50%) scale(${currentScale}) translate(${driftX}px, ${driftY}px)` },
    "bottom-right": { bottom: "-10%", right: "-5%", transform: `scale(${currentScale}) translate(${driftX}px, ${driftY}px)` },
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          opacity,
          filter: "blur(1px) saturate(0.6)",
          maxWidth: "60%",
          maxHeight: "80%",
          objectFit: "contain",
          ...positionStyles[position],
        }}
      />
    </div>
  );
};

type LogoWatermarkProps = {
  /** Path relative to public/ — e.g. "images/logos/anker-logo.png" */
  src: string;
  /** 0-1 opacity (default 0.08) */
  opacity?: number;
  /** Position */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Size in px (default 120) */
  size?: number;
};

export const LogoWatermark: React.FC<LogoWatermarkProps> = ({
  src,
  opacity = 0.08,
  position = "bottom-right",
  size = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fps], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const posMap: Record<string, React.CSSProperties> = {
    "top-left": { top: 40, left: 40 },
    "top-right": { top: 40, right: 40 },
    "bottom-left": { bottom: 40, left: 40 },
    "bottom-right": { bottom: 40, right: 40 },
  };

  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        width: size,
        height: size,
        objectFit: "contain",
        opacity: fadeIn,
        filter: "brightness(2) grayscale(1)",
        pointerEvents: "none",
        ...posMap[position],
      }}
    />
  );
};
