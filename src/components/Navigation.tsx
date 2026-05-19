import { useState } from "react";
import { Menu, X } from "lucide-react";

const tabs = [
  "Work Highlights",
  "All Projects",
  "AI Design Academy",
  "Publication",
  "Testimonials",
  "Speaking",
  "About",
  "Quick Links",
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    setIsMenuOpen(false);
  };

  const renderTab = (tab: string) => {
    if (tab === "AI Design Academy") {
      return (
        <a
          key={tab}
          href="https://www.theaidesignacademy.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Opens AI Design Academy in a new tab (separate site from this portfolio)"
          className={`py-4 px-2 text-sm md:text-base border-b-2 whitespace-nowrap transition-colors border-transparent text-muted-foreground hover:text-foreground flex-shrink-0`}
          onClick={() => setIsMenuOpen(false)}
        >
          {tab}
        </a>
      );
    }
    if (tab === "Publication") {
      return (
        <a
          key={tab}
          href="https://johnrodrigues.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={`py-4 px-2 text-sm md:text-base border-b-2 whitespace-nowrap transition-colors border-transparent text-muted-foreground hover:text-foreground flex-shrink-0`}
          onClick={() => setIsMenuOpen(false)}
        >
          {tab}
        </a>
      );
    }
  return (
            <button
              key={tab}
        onClick={() => handleTabClick(tab)}
        className={`py-4 px-2 text-sm md:text-base border-b-2 whitespace-nowrap transition-colors flex-shrink-0 ${
                activeTab === tab
                  ? "border-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
    );
  };

  const isQuickLinksPage = activeTab === "Quick Links";

  return (
    <nav className={isQuickLinksPage ? "border-t mt-12" : "border-b"}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navigation - Always show horizontal tabs */}
        <div className="hidden md:flex gap-4 md:gap-6 overflow-x-auto nav-tabs" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {tabs.map((tab) => renderTab(tab))}
        </div>

        {/* Mobile Navigation - Only show menu on Quick Links page */}
        {isQuickLinksPage ? (
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex items-center justify-end py-4 px-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            
            {isMenuOpen && (
              <div className="border-t bg-background">
                <div className="flex flex-col">
                  {tabs.map((tab) => {
                    if (tab === "AI Design Academy") {
                      return (
                        <a
                          key={tab}
                          href="https://www.theaidesignacademy.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Opens AI Design Academy in a new tab (separate site from this portfolio)"
                          className={`py-3 px-4 text-sm transition-colors border-l-4 ${
                            activeTab === tab
                              ? "border-foreground font-medium bg-muted/50"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {tab}
                        </a>
                      );
                    }
                    if (tab === "Publication") {
                      return (
                        <a
                          key={tab}
                          href="https://johnrodrigues.substack.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`py-3 px-4 text-sm transition-colors border-l-4 ${
                            activeTab === tab
                              ? "border-foreground font-medium bg-muted/50"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {tab}
                        </a>
                      );
                    }
                    return (
                      <button
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`py-3 px-4 text-sm text-left transition-colors border-l-4 ${
                          activeTab === tab
                            ? "border-foreground font-medium bg-muted/50"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Mobile Navigation - Show horizontal tabs for other pages */
          <div className="md:hidden flex gap-4 overflow-x-auto nav-tabs" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {tabs.map((tab) => renderTab(tab))}
          </div>
        )}
      </div>
    </nav>
  );
}
