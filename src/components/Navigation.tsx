import { useState } from "react";

const tabs = [
  "Work",
  "Resume",
  "Testimonials",
  "Learn",
  "Speaking",
  "About",
  "Explorations",
  "Past project",
];

export function Navigation() {
  const [activeTab, setActiveTab] = useState("Work");

  return (
    <nav className="border-b">
      <div className="container px-6 lg:px-12">
        <div className="flex gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "border-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
