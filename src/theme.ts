// Bartlett Labs + Anker color themes for both reels
import { fontMontserrat, fontInter } from "./lib/fonts";

export const ankerTheme = {
  primary: "#00A1E4",
  secondary: "#0A2540",
  accent: "#4DC9F6",
  background: "#061424",
  surface: "#0D1F38",
  text: "#FFFFFF",
  textSecondary: "#B0BEC5",
  success: "#00C853",
  warning: "#FFB800",
  error: "#FF4757",
  gradient: "linear-gradient(145deg, #061424 0%, #0A2540 40%, #00A1E4 100%)",
  font: fontMontserrat,
};

export const bartlettLabsTheme = {
  primary: "#6366F1",
  secondary: "#1E1B4B",
  accent: "#A78BFA",
  background: "#0F0D1A",
  surface: "#1A1730",
  text: "#FFFFFF",
  textSecondary: "#A5A3C9",
  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
  gradient: "linear-gradient(135deg, #1E1B4B 0%, #6366F1 100%)",
  knot: "#A78BFA",
  font: fontInter,
};

export const WORK_FPS = 30;
export const PERSONAL_FPS = 30;
export const WORK_WIDTH = 1920;
export const WORK_HEIGHT = 1080;

export type FrameType = "browser" | "desktop" | "phone" | "terminal";

export type ProjectEntry = {
  name: string;
  tagline: string;
  category: string;
  tech: string[];
  platforms: string[];
  frameType?: FrameType;
  screenshot?: string;
};

export const workProjects: ProjectEntry[] = [
  {
    name: "LarkAgentX",
    tagline: "AI assistant built INTO our messaging platform",
    category: "AI Platform",
    tech: ["FastAPI", "PostgreSQL", "SwiftUI", "Electron"],
    platforms: ["Web", "Desktop", "iOS"],
    frameType: "browser",
  },
  {
    name: "Supply Chain Knowledge Hub",
    tagline: "AI chatbot that knows our supply chain",
    category: "AI Tool",
    tech: ["Next.js", "Claude AI", "RAG", "Google Workspace"],
    platforms: ["Web"],
    frameType: "browser",
  },
  {
    name: "Gmail Brain",
    tagline: "Email automation with AI-powered replies",
    category: "Productivity",
    tech: ["Next.js 16", "Claude AI", "Google APIs", "Neon DB"],
    platforms: ["Web", "Desktop (coming)", "iOS (coming)"],
    frameType: "browser",
  },
  {
    name: "DP Team Automation",
    tagline: "CPFR automations for every major retailer",
    category: "Automation",
    tech: ["Google Apps Script", "Python", "Google APIs"],
    platforms: ["Walmart", "Target", "Best Buy", "Costco"],
    frameType: "terminal",
  },
  {
    name: "Analysis Dashboards",
    tagline: "Interactive data visualizations",
    category: "Data Viz",
    tech: ["D3.js", "HTML/CSS"],
    platforms: ["Web"],
    frameType: "browser",
  },
  {
    name: "Walmart Store Change Forecast",
    tagline: "Data-driven forecast for 2026 layout changes",
    category: "Analytics",
    tech: ["Python", "Pandas", "Matplotlib"],
    platforms: ["CLI + Excel"],
    frameType: "terminal",
  },
  {
    name: "Lark Training Cartographer",
    tagline: "Extracts and maps Feishu training docs",
    category: "DevTool",
    tech: ["Node.js", "Playwright", "Tesseract OCR"],
    platforms: ["CLI"],
    frameType: "terminal",
  },
  {
    name: "Sleepless Agent",
    tagline: "My AI agent works while I sleep",
    category: "AI Agent",
    tech: ["Python", "Claude SDK", "Slack", "Git"],
    platforms: ["Daemon"],
    frameType: "terminal",
  },
];

export const personalProjects: ProjectEntry[] = [
  // AI & Agents
  {
    name: "LarkAgentX",
    tagline: "Multi-platform AI assistant",
    category: "AI & Agents",
    tech: ["FastAPI", "PostgreSQL", "SwiftUI", "Electron"],
    platforms: ["Web", "Desktop", "iOS"],
    frameType: "browser",
  },
  {
    name: "Sleepless Agent",
    tagline: "24/7 AgentOS via Slack",
    category: "AI & Agents",
    tech: ["Python", "Claude SDK"],
    platforms: ["Daemon"],
    frameType: "terminal",
  },
  {
    name: "Continuous Claude",
    tagline: "Multi-agent dev environment",
    category: "AI & Agents",
    tech: ["Python", "109 Skills", "32 Agents"],
    platforms: ["CLI"],
    frameType: "terminal",
  },
  {
    name: "homunculus",
    tagline: "Self-evolving AI instinct system",
    category: "AI & Agents",
    tech: ["Python", "AI Learning"],
    platforms: ["CLI"],
    frameType: "terminal",
  },
  {
    name: "Gmail Brain",
    tagline: "AI email automation with role-based replies",
    category: "AI & Agents",
    tech: ["Next.js 16", "Claude AI", "Google APIs"],
    platforms: ["Web", "Desktop (coming)", "iOS (coming)"],
    frameType: "browser",
  },
  // Productivity
  {
    name: "KDP Book Dashboard",
    tagline: "AI-powered book research, creation & publishing",
    category: "Productivity",
    tech: ["Next.js", "Prisma", "Fabric.js", "Cheerio"],
    platforms: ["Web"],
    frameType: "browser",
  },
  {
    name: "plannotator",
    tagline: "Interactive plan review for Claude Code",
    category: "Productivity",
    tech: ["TypeScript", "Bun"],
    platforms: ["Web"],
    frameType: "browser",
  },
  {
    name: "YouTube Tutorial Aggregator",
    tagline: "Turns tutorials into step-by-step courses",
    category: "Productivity",
    tech: ["Google Apps Script", "AI"],
    platforms: ["Web"],
    frameType: "browser",
  },
  {
    name: "Supply Chain Knowledge Hub",
    tagline: "AI chatbot for supply chain teams",
    category: "Productivity",
    tech: ["Next.js", "Claude AI", "RAG"],
    platforms: ["Web"],
    frameType: "browser",
  },
  // Finance & Commerce
  {
    name: "ZipWise",
    tagline: "iOS app with full native experience",
    category: "Finance & Commerce",
    tech: ["React Native", "Xcode", "CocoaPods"],
    platforms: ["iOS"],
    frameType: "phone",
  },
  {
    name: "retirement-planner",
    tagline: "Financial planning calculator",
    category: "Finance & Commerce",
    tech: ["HTML/JS"],
    platforms: ["Web"],
    frameType: "browser",
  },
  {
    name: "Franchise Investment Analyzer",
    tagline: "Investment analysis tool",
    category: "Finance & Commerce",
    tech: ["Bolt"],
    platforms: ["Web"],
    frameType: "browser",
  },
  // Sports & Fun
  {
    name: "sports-intel-platform",
    tagline: "Multi-agent sports analytics",
    category: "Sports & Fun",
    tech: ["Python", "AI Agents", "Obsidian"],
    platforms: ["CLI"],
    frameType: "terminal",
  },
  {
    name: "Purdue Basketball Calendar",
    tagline: "Boilermaker hoops with Raycast",
    category: "Sports & Fun",
    tech: ["Python", "Raycast"],
    platforms: ["macOS"],
    frameType: "desktop",
  },
  // Automation
  {
    name: "DP Team Automation",
    tagline: "CPFR for Walmart, Target, Best Buy, Costco",
    category: "Automation",
    tech: ["Google Apps Script", "Python"],
    platforms: ["Google Sheets"],
    frameType: "terminal",
  },
  {
    name: "Analysis Dashboards",
    tagline: "D3 data visualizations",
    category: "Automation",
    tech: ["D3.js", "HTML"],
    platforms: ["Web"],
    frameType: "browser",
  },
];
