import React from "react";
import { Composition } from "remotion";
import { WorkReel, WORK_REEL_DURATION } from "./compositions/WorkReel";
import {
  PersonalReel,
  PERSONAL_REEL_DURATION,
} from "./compositions/PersonalReel";
import { WORK_FPS, PERSONAL_FPS, WORK_WIDTH, WORK_HEIGHT } from "./theme";
import "./styles.css";
import "./lib/fonts";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="WorkReel"
        component={WorkReel}
        durationInFrames={WORK_REEL_DURATION}
        fps={WORK_FPS}
        width={WORK_WIDTH}
        height={WORK_HEIGHT}
      />
      <Composition
        id="PersonalReel"
        component={PersonalReel}
        durationInFrames={PERSONAL_REEL_DURATION}
        fps={PERSONAL_FPS}
        width={WORK_WIDTH}
        height={WORK_HEIGHT}
      />
    </>
  );
};
