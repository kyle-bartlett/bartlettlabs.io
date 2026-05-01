import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { flip } from "@remotion/transitions/flip";
import { springTiming } from "@remotion/transitions";
import type { TransitionPresentation } from "@remotion/transitions";

type TransitionConfig = {
  presentation: TransitionPresentation<Record<string, unknown>>;
  timing: ReturnType<typeof springTiming>;
};

const TRANSITION_DURATION = 15; // frames

const presentations = [
  () => slide({ direction: "from-right" }),
  () => slide({ direction: "from-left" }),
  () => wipe({ direction: "from-left" }),
  () => wipe({ direction: "from-top-right" }),
  () => fade(),
  () => flip({ direction: "from-right", perspective: 1200 }),
  () => slide({ direction: "from-bottom" }),
  () => wipe({ direction: "from-top" }),
];

let transitionIndex = 0;

export const getNextTransition = (): TransitionConfig => {
  const presentation = presentations[transitionIndex % presentations.length]();
  transitionIndex++;
  return {
    presentation: presentation as TransitionPresentation<Record<string, unknown>>,
    timing: springTiming({
      durationInFrames: TRANSITION_DURATION,
      config: { damping: 14, stiffness: 80, mass: 0.6 },
    }),
  };
};

export const getFadeTransition = (): TransitionConfig => ({
  presentation: fade() as TransitionPresentation<Record<string, unknown>>,
  timing: springTiming({
    durationInFrames: TRANSITION_DURATION,
    config: { damping: 18, stiffness: 60, mass: 0.8 },
  }),
});

export const getSlideTransition = (
  direction: "from-left" | "from-right" | "from-top" | "from-bottom" = "from-right"
): TransitionConfig => ({
  presentation: slide({ direction }) as TransitionPresentation<Record<string, unknown>>,
  timing: springTiming({
    durationInFrames: TRANSITION_DURATION,
    config: { damping: 14, stiffness: 80, mass: 0.6 },
  }),
});

export const getWipeTransition = (
  direction: "from-left" | "from-top" | "from-top-right" = "from-top"
): TransitionConfig => ({
  presentation: wipe({ direction }) as TransitionPresentation<Record<string, unknown>>,
  timing: springTiming({
    durationInFrames: TRANSITION_DURATION,
    config: { damping: 14, stiffness: 80, mass: 0.6 },
  }),
});

export const TRANSITION_FRAMES = TRANSITION_DURATION;

export const resetTransitionIndex = () => {
  transitionIndex = 0;
};
