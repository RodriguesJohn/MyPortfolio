export type ToolItem = {
  name: string;
  logo?: string;
};

export type ToolCategory = {
  id: string;
  label: string;
  tools: ToolItem[];
};

const icon = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}/${color ?? "FFFFFF"}`;

export const TOOL_STACK: ToolCategory[] = [
  {
    id: "design",
    label: "Design",
    tools: [
      { name: "Figma", logo: icon("figma", "F24E1E") },
      { name: "Research & strategy" },
    ],
  },
  {
    id: "ai",
    label: "AI & build",
    tools: [
      { name: "Claude", logo: icon("anthropic", "D97757") },
      { name: "Cursor", logo: "https://www.cursor.com/favicon.ico" },
      { name: "Codex" },
      { name: "Notebook LM", logo: icon("googlegemini", "8E75B2") },
      { name: "Lovable", logo: "https://lovable.dev/favicon.ico" },
      { name: "v0", logo: "https://v0.dev/favicon.ico" },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    tools: [
      { name: "Vercel", logo: icon("vercel", "FFFFFF") },
      { name: "Supabase", logo: icon("supabase", "3FCF8E") },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    tools: [
      { name: "React", logo: icon("react", "61DAFB") },
      { name: "Tailwind CSS", logo: icon("tailwindcss", "06B6D4") },
      { name: "Vite", logo: icon("vite", "646CFF") },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    tools: [
      { name: "TypeScript", logo: icon("typescript", "3178C6") },
      { name: "JavaScript", logo: icon("javascript", "F7DF1E") },
      { name: "HTML", logo: icon("html5", "E34F26") },
      { name: "CSS", logo: icon("css3", "1572B6") },
    ],
  },
  {
    id: "native",
    label: "Native",
    tools: [
      { name: "SwiftUI", logo: icon("swift", "F05138") },
      { name: "Xcode", logo: icon("xcode", "147EFB") },
      { name: "React Native", logo: icon("reactnative", "61DAFB") },
    ],
  },
];
