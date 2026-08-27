import logoCursor from "@/assets/logo-cursor.png";
import logoClaude from "@/assets/logo-claude.png";
import logoClaudeCode from "@/assets/logo-claude-code.png";
import logoFigma from "@/assets/logo-figma.png";
import logoReact from "@/assets/logo-react.png";
import logoGithub from "@/assets/logo-github.png";
import logoSwift from "@/assets/logo-swift.png";

export type ProjectToolId =
  | "cursor"
  | "claude"
  | "claude-code"
  | "figma"
  | "react"
  | "github"
  | "swift";

export type ProjectToolLogo = {
  id: ProjectToolId;
  src: string;
  label: string;
  fit: "cover" | "contain";
  pad?: boolean;
  bare?: boolean;
};

export const PROJECT_TOOL_LOGOS: Record<ProjectToolId, ProjectToolLogo> = {
  cursor: { id: "cursor", src: logoCursor, label: "Cursor", fit: "cover" },
  "claude-code": {
    id: "claude-code",
    src: logoClaudeCode,
    label: "Claude Code",
    fit: "contain",
    pad: true,
  },
  claude: { id: "claude", src: logoClaude, label: "Claude", fit: "contain", pad: true },
  figma: { id: "figma", src: logoFigma, label: "Figma", fit: "cover" },
  react: { id: "react", src: logoReact, label: "React", fit: "contain", pad: true, bare: true },
  github: { id: "github", src: logoGithub, label: "GitHub", fit: "cover" },
  swift: { id: "swift", src: logoSwift, label: "Swift", fit: "cover" },
};

export const AI_STACK_TOOL_IDS: ProjectToolId[] = [
  "cursor",
  "claude-code",
  "claude",
  "figma",
  "react",
  "github",
  "swift",
];

export const getProjectToolLogos = (ids: ProjectToolId[]) =>
  ids.map((id) => PROJECT_TOOL_LOGOS[id]);
