const toolLogos: Record<string, string> = {
  "Figma": "https://cdn.simpleicons.org/figma/F24E1E",
  "Research Strategy": "https://cdn.simpleicons.org/googleanalytics/FF6B6B",
  "Notebook LLM": "https://cdn.simpleicons.org/notion/000000",
  "Cursor": "https://www.cursor.com/favicon.ico",
  "Lovable": "https://lovable.dev/favicon.ico",
  "Shift-UI": "https://cdn.simpleicons.org/shift/6366F1",
  "React": "https://cdn.simpleicons.org/react/61DAFB",
  "Tailwind": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "HTML": "https://cdn.simpleicons.org/html5/E34F26",
  "CSS": "https://cdn.simpleicons.org/css3/1572B6",
  "JavaScript": "https://cdn.simpleicons.org/javascript/F7DF1E",
};

export function ToolBox() {
  const tools = {
    "Design": ["Figma", "Research Strategy"],
    "Notebook LLM": ["Notebook LLM"],
    "Coding": ["Cursor", "Lovable"],
    "Frameworks": ["Shift-UI", "React", "Tailwind"],
    "Languages": ["HTML", "CSS", "JavaScript"],
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-medium mb-12">Craft</h2>
        <div className="flex flex-col gap-12">
          {Object.entries(tools).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-medium mb-4 text-muted-foreground">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border bg-background hover:bg-muted transition-colors"
                  >
                    {toolLogos[tool] && (
                      <img
                        src={toolLogos[tool]}
                        alt={`${tool} logo`}
                        className="w-5 h-5"
                      />
                    )}
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

