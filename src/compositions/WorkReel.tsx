import React from "react";
import { TransitionSeries } from "@remotion/transitions";
import { TitleScene } from "../scenes/TitleScene";
import { ProjectShowcaseScene } from "../scenes/ProjectShowcaseScene";
import { CodeProjectScene } from "../scenes/CodeProjectScene";
import { HeroScene } from "../scenes/HeroScene";
import { StatsScene } from "../scenes/StatsScene";
import { OutroScene } from "../scenes/OutroScene";
import { ankerTheme, workProjects, WORK_FPS } from "../theme";
import {
  getFadeTransition,
  getSlideTransition,
  getWipeTransition,
  getNextTransition,
  TRANSITION_FRAMES,
  resetTransitionIndex,
} from "../lib/transitions";

// Timing constants (in frames at 30fps)
const TITLE_DURATION = WORK_FPS * 4;
const STATS_DURATION = WORK_FPS * 4;
const PROJECT_DURATION = WORK_FPS * 6;
const HERO_DURATION = WORK_FPS * 7;
const OUTRO_DURATION = WORK_FPS * 5;

// Hero projects (top flagship projects)
const HERO_PROJECT_NAMES = [
  "LarkAgentX",
  "Gmail Brain",
  "Supply Chain Knowledge Hub",
];

const isHeroProject = (name: string) => HERO_PROJECT_NAMES.includes(name);
const isTerminalProject = (name: string) => {
  const terminalProjects = [
    "Sleepless Agent",
    "Walmart Store Change Forecast",
    "Lark Training Cartographer",
    "DP Team Automation",
  ];
  return terminalProjects.includes(name);
};

export const WorkReel: React.FC = () => {
  resetTransitionIndex();

  const elements: React.ReactNode[] = [];

  // 1. Title
  elements.push(
    <TransitionSeries.Sequence key="title" durationInFrames={TITLE_DURATION}>
      <TitleScene
        title="AI-Powered at Anker"
        subtitle="What one person can build with AI"
        theme={ankerTheme}
        backgroundImage="images/products/anker-product.png"
        logoSrc="images/logos/anker-logo.png"
      />
    </TransitionSeries.Sequence>,
  );

  // Transition: Title -> Stats (fade)
  const fadeT = getFadeTransition();
  elements.push(
    <TransitionSeries.Transition
      key="t-title-stats"
      timing={fadeT.timing}
      presentation={fadeT.presentation}
    />,
  );

  // 2. Stats
  elements.push(
    <TransitionSeries.Sequence key="stats" durationInFrames={STATS_DURATION}>
      <StatsScene
        stats={[
          { value: "8+", label: "Projects" },
          { value: "6", label: "Platforms" },
          { value: "1", label: "Developer" },
        ]}
        theme={ankerTheme}
      />
    </TransitionSeries.Sequence>,
  );

  // Transition: Stats -> first project (slide from-right)
  const slideRightT = getSlideTransition("from-right");
  elements.push(
    <TransitionSeries.Transition
      key="t-stats-project"
      timing={slideRightT.timing}
      presentation={slideRightT.presentation}
    />,
  );

  // 3. Projects
  workProjects.forEach((project, index) => {
    const isHero = isHeroProject(project.name);
    const isTerminal = isTerminalProject(project.name);
    const duration = isHero ? HERO_DURATION : PROJECT_DURATION;

    if (isHero) {
      elements.push(
        <TransitionSeries.Sequence
          key={`project-${index}`}
          durationInFrames={duration}
        >
          <HeroScene
            project={project}
            theme={ankerTheme}
            annotations={[
              { text: project.tech[0], x: 120, y: 130, delay: 0.8 },
              { text: project.platforms[0], x: 1400, y: 200, delay: 1.2 },
              { text: "AI-Powered", x: 140, y: 800, delay: 1.5 },
            ]}
          />
        </TransitionSeries.Sequence>,
      );
    } else if (isTerminal) {
      elements.push(
        <TransitionSeries.Sequence
          key={`project-${index}`}
          durationInFrames={duration}
        >
          <CodeProjectScene
            project={project}
            index={index}
            theme={ankerTheme}
          />
        </TransitionSeries.Sequence>,
      );
    } else {
      elements.push(
        <TransitionSeries.Sequence
          key={`project-${index}`}
          durationInFrames={duration}
        >
          <ProjectShowcaseScene
            project={project}
            index={index}
            theme={ankerTheme}
            layoutSide={index % 2 === 0 ? "left" : "right"}
          />
        </TransitionSeries.Sequence>,
      );
    }

    // Transition between projects
    if (index < workProjects.length - 1) {
      const t = getNextTransition();
      elements.push(
        <TransitionSeries.Transition
          key={`t-project-${index}`}
          timing={t.timing}
          presentation={t.presentation}
        />,
      );
    }
  });

  // Transition: last project -> Outro (fade)
  const fadeOutT = getFadeTransition();
  elements.push(
    <TransitionSeries.Transition
      key="t-project-outro"
      timing={fadeOutT.timing}
      presentation={fadeOutT.presentation}
    />,
  );

  // 4. Outro
  elements.push(
    <TransitionSeries.Sequence key="outro" durationInFrames={OUTRO_DURATION}>
      <OutroScene
        headline="Built with AI. Powered by Curiosity."
        subline="Every tool shown was designed, built, and shipped by a single developer using AI-assisted development."
        theme={ankerTheme}
        backgroundImage="images/products/anker-product.png"
        logoSrc="images/logos/anker-logo.png"
      />
    </TransitionSeries.Sequence>,
  );

  return <TransitionSeries>{elements}</TransitionSeries>;
};

// Calculate total duration accounting for transitions
const heroCount = workProjects.filter((p) =>
  HERO_PROJECT_NAMES.includes(p.name),
).length;
const normalCount = workProjects.length - heroCount;
const projectTransitions = workProjects.length - 1;

export const WORK_REEL_DURATION =
  TITLE_DURATION +
  STATS_DURATION +
  heroCount * HERO_DURATION +
  normalCount * PROJECT_DURATION +
  OUTRO_DURATION -
  // Subtract overlap from transitions (each transition overlaps by its duration)
  (2 + projectTransitions) * TRANSITION_FRAMES;
