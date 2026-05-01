import React from "react";
import { Audio, staticFile } from "remotion";

type TransitionSoundProps = {
  src?: string;
  volume?: number;
};

export const TransitionSound: React.FC<TransitionSoundProps> = ({
  src = "audio/whoosh.mp3",
  volume = 0.15,
}) => {
  return <Audio src={staticFile(src)} volume={volume} />;
};
