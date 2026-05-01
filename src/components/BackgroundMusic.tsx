import React from "react";
import { Audio, interpolate, useVideoConfig, staticFile } from "remotion";

type BackgroundMusicProps = {
  src?: string;
  volume?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
};

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src = "audio/background.mp3",
  volume = 0.3,
  fadeInDuration = 2,
  fadeOutDuration = 3,
}) => {
  const { fps, durationInFrames } = useVideoConfig();

  const fadeInFrames = fadeInDuration * fps;
  const fadeOutFrames = fadeOutDuration * fps;

  return (
    <Audio
      src={staticFile(src)}
      volume={(f) => {
        const fadeIn = interpolate(f, [0, fadeInFrames], [0, volume], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(
          f,
          [durationInFrames - fadeOutFrames, durationInFrames],
          [volume, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return Math.min(fadeIn, fadeOut);
      }}
      loop
    />
  );
};
