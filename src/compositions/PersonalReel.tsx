import React from "react";
import { TransitionSeries } from "@remotion/transitions";
import { TitleScene } from "../scenes/TitleScene";
import { ProjectShowcaseScene } from "../scenes/ProjectShowcaseScene";
import { CodeProjectScene } from "../scenes/CodeProjectScene";
import { HeroScene } from "../scenes/HeroScene";
import { CategoryScene } from "../scenes/CategoryScene";
import { StatsScene } from "../scenes/StatsScene";
import { OutroScene } from "../scenes/OutroScene";
import {
  bartlettLabsTheme,
  personalProjects,
  PERSONAL_FPS,
} from "../theme";
import {
  getFadeTransition,
  getSlideTransition,
  getWipeTransition,
  getNextTransition,
  TRANSITION_FRAMES,
  resetTransitionIndex,
} from "../lib/transitions";

// Timing constants (in frames at 30fps)
const TITLE_DURATION = PERSONAL_FPS * 4;
const STATS_DURATION = PERSONAL_FPS * 4;
const CATEGORY_DURATION = PERSONAL_FPS * 2.5;
const PROJECT_DURATION = PERSONAL_FPS * 5;
const HERO_DURATION = PERSONAL_FPS * 6;
const OUTRO_DURATION = PERSONAL_FPS * 5;

// Hero projects
const HERO_PROJECT_NAMES = ["LarkAgentX", "Gmail Brain", "Continuous Claude", "KDP Book Dashboard"];

const isHeroProject = (name: string) => HERO_PROJECT_NAMES.includes(name);
const isTerminalProject = (name: string) => {
  const terminalProjects = [
    "Sleepless Agent",
    "Continuous Claude",
    "homunculus",
    "DP Team Automation",
    "sports-intel-platform",
    "Lark Training Cartographer",
  ];
  return terminalProjects.includes(name);
};

// Group projects by category
const groupByCategory = (
  projects: typeof personalProjects
): Record<string, typeof personalProjects> => {
  const groups: Record<string, typeof personalProjects> = {};
  for (const p of projects) {
    if (!groups[p.category]) {
      groups[p.category] = [];
    }
    groups[p.category].push(p);
  }
  return groups;
};

export const PersonalReel: React.FC = () => {
  resetTransitionIndex();

  const elements: React.ReactNode[] = [];
  const grouped = groupByCategory(personalProjects);
  const categories = Object.keys(grouped);

  // 1. Title
  elements.push(
    <TransitionSeries.Sequence
      key="title"
      durationInFrames={TITLE_DURATION}
    >
      <TitleScene
        title="Bartlett Labs"
        subtitle="Full-Stack Portfolio"
        theme={bartlettLabsTheme}
        showKnot
      />
    </TransitionSeries.Sequence>
  );

  // Transition: Title -> Stats (fade)
  const fadeT = getFadeTransition();
  elements.push(
    <TransitionSeries.Transition
      key="t-title-stats"
      timing={fadeT.timing}
      presentation={fadeT.presentation}
    />
  );

  // 2. Stats
  elements.push(
    <TransitionSeries.Sequence
      key="stats"
      durationInFrames={STATS_DURATION}
    >
      <StatsScene
        stats={[
          { value: `${personalProjects.length}+`, label: "Projects" },
          { value: `${categories.length}`, label: "Categories" },
          { value: "5+", label: "Platforms" },
        ]}
        theme={bartlettLabsTheme}
      />
    </TransitionSeries.Sequence>
  );

  // 3. Category sections with project cards
  let projectIndex = 0;
  let transitionCounter = 0;

  categories.forEach((category, catIndex) => {
    const projects = grouped[category];

    // Transition: before category header
    const catT =
      catIndex === 0
        ? getSlideTransition("from-right")
        : getWipeTransition("from-top");
    elements.push(
      <TransitionSeries.Transition
        key={`t-cat-${catIndex}`}
        timing={catT.timing}
        presentation={catT.presentation}
      />
    );

    // Category header
    elements.push(
      <TransitionSeries.Sequence
        key={`cat-${category}`}
        durationInFrames={CATEGORY_DURATION}
      >
        <CategoryScene
          category={category}
          projectCount={projects.length}
          theme={bartlettLabsTheme}
        />
      </TransitionSeries.Sequence>
    );

    // Transition: category -> first project
    const catProjectT = getSlideTransition("from-bottom");
    elements.push(
      <TransitionSeries.Transition
        key={`t-cat-project-${catIndex}`}
        timing={catProjectT.timing}
        presentation={catProjectT.presentation}
      />
    );

    // Project cards in this category
    projects.forEach((project, pIndex) => {
      const isHero = isHeroProject(project.name);
      const isTerminal = isTerminalProject(project.name);
      const duration = isHero ? HERO_DURATION : PROJECT_DURATION;

      if (isHero && !isTerminal) {
        elements.push(
          <TransitionSeries.Sequence
            key={`project-${projectIndex}`}
            durationInFrames={duration}
          >
            <HeroScene
              project={project}
              theme={bartlettLabsTheme}
              annotations={[
                { text: project.tech[0], x: 120, y: 130, delay: 0.8 },
                { text: project.platforms[0], x: 1400, y: 200, delay: 1.2 },
                { text: project.category, x: 140, y: 800, delay: 1.5 },
              ]}
            />
          </TransitionSeries.Sequence>
        );
      } else if (isTerminal) {
        elements.push(
          <TransitionSeries.Sequence
            key={`project-${projectIndex}`}
            durationInFrames={duration}
          >
            <CodeProjectScene
              project={project}
              index={projectIndex}
              theme={bartlettLabsTheme}
            />
          </TransitionSeries.Sequence>
        );
      } else {
        elements.push(
          <TransitionSeries.Sequence
            key={`project-${projectIndex}`}
            durationInFrames={duration}
          >
            <ProjectShowcaseScene
              project={project}
              index={projectIndex}
              theme={bartlettLabsTheme}
              layoutSide={projectIndex % 2 === 0 ? "left" : "right"}
            />
          </TransitionSeries.Sequence>
        );
      }

      // Transition between projects (within same category)
      if (pIndex < projects.length - 1) {
        const t = getNextTransition();
        elements.push(
          <TransitionSeries.Transition
            key={`t-project-${projectIndex}`}
            timing={t.timing}
            presentation={t.presentation}
          />
        );
        transitionCounter++;
      }

      projectIndex++;
    });
  });

  // Transition: last project -> Outro (fade)
  const fadeOutT = getFadeTransition();
  elements.push(
    <TransitionSeries.Transition
      key="t-project-outro"
      timing={fadeOutT.timing}
      presentation={fadeOutT.presentation}
    />
  );

  // 4. Outro
  elements.push(
    <TransitionSeries.Sequence
      key="outro"
      durationInFrames={OUTRO_DURATION}
    >
      <OutroScene
        headline="Bartlett Labs"
        subline="Web apps. Desktop apps. iOS apps. AI agents. All built by one developer with AI."
        theme={bartlettLabsTheme}
        showKnot
      />
    </TransitionSeries.Sequence>
  );

  return <TransitionSeries>{elements}</TransitionSeries>;
};

// Calculate total duration
const grouped = groupByCategory(personalProjects);
const categoryCount = Object.keys(grouped).length;

const heroCount = personalProjects.filter((p) =>
  HERO_PROJECT_NAMES.includes(p.name)
).length;
const normalCount = personalProjects.length - heroCount;

// Count intra-category transitions (projects within same category - 1 per category)
const intraCatTransitions = Object.values(grouped).reduce(
  (sum, projects) => sum + Math.max(0, projects.length - 1),
  0
);

// Total transitions:
// 1 (title->stats) + categoryCount (stats/prev->cat) + categoryCount (cat->project) + intraCat + 1 (->outro)
const totalTransitions = 1 + categoryCount + categoryCount + intraCatTransitions + 1;

export const PERSONAL_REEL_DURATION =
  TITLE_DURATION +
  STATS_DURATION +
  categoryCount * CATEGORY_DURATION +
  heroCount * HERO_DURATION +
  normalCount * PROJECT_DURATION +
  OUTRO_DURATION -
  totalTransitions * TRANSITION_FRAMES;
