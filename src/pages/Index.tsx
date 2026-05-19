import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { QuickLinks } from "@/components/QuickLinks";
import { Testimonials } from "@/components/Testimonials";
import { Speaking } from "@/components/Speaking";
import { About } from "@/components/About";
import { Consulting } from "@/components/Consulting";
import { Books } from "@/components/Books";
import { Resume } from "@/components/Resume";
import { MessageCircle, Sparkles, Mic, Keyboard } from "lucide-react";
import profileImage from "@/assets/PP.jpg";

// Map URL paths to tab values
const pathToTabMap: Record<string, string> = {
  "/": "Work Highlights",
  "/explorations": "Explorations",
  "/all-projects": "All Projects",
  "/consulting": "Consulting",
  "/testimonials": "Testimonials",
  "/speaking": "Speaking",
  "/about": "About",
  "/links": "Quick Links",
  "/books": "Books",
  "/resume": "Resume",
};

const tabToPathMap: Record<string, string> = {
  "Work Highlights": "/",
  "Explorations": "/explorations",
  "All Projects": "/all-projects",
  "Consulting": "/consulting",
  "Testimonials": "/testimonials",
  "Speaking": "/speaking",
  "About": "/about",
  "Quick Links": "/links",
  "Books": "/books",
  "Resume": "/resume",
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Work Highlights");
  const [isDark, setIsDark] = useState(false);

  // Update activeTab based on URL path
  useEffect(() => {
    const tab = pathToTabMap[location.pathname] || "Work Highlights";
    setActiveTab(tab);
  }, [location.pathname]);

  // Check for dark mode
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Handle tab change with URL update
  const handleTabChange = (tab: string) => {
    const path = tabToPathMap[tab] || "/";
    navigate(path);
    setActiveTab(tab);
  };
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const handleChatClick = () => {
    setIsChatOpen(true);
  };
  
  // Force light mode for Delphi AI - always use light theme parameter
  const delphiUrl = "https://www.delphi.ai/john-rodrigues?theme=light";

  const renderContent = () => {
    switch (activeTab) {
      case "Work Highlights":
        return <WorkGrid showTabs={false} />;
      case "All Projects":
        return <WorkGrid showTabs={false} activeTab="all-projects" />;
      case "Explorations":
        return <WorkGrid showTabs={false} activeTab="explorations" />;
      case "Quick Links":
        return <QuickLinks activeTab={activeTab} onTabChange={handleTabChange} />;
      case "Consulting":
        return <Consulting />;
      case "Testimonials":
        return <Testimonials />;
      case "Speaking":
        return <Speaking />;
      case "About":
        return <About />;
      case "Books":
        return <Books />;
      case "Resume":
        return <Resume />;
      default:
        return <WorkGrid />;
    }
  };

  const isQuickLinksPage = activeTab === "Quick Links";
  const isTestimonialsPage = activeTab === "Testimonials";
  const isSpeakingPage = activeTab === "Speaking";
  const isBooksPage = activeTab === "Books";
  const isResumePage = activeTab === "Resume";

  return (
    <div className="min-h-screen pt-24">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      {!isQuickLinksPage && !isTestimonialsPage && !isSpeakingPage && !isBooksPage && !isResumePage && activeTab !== "All Projects" && activeTab !== "Explorations" && <Hero 
        activeTab={activeTab}
        onChatClick={handleChatClick}
        onWorkClick={() => {
          handleTabChange("Work Highlights");
          setTimeout(() => {
            const workSection = document.getElementById('work-section');
            if (workSection) {
              workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }} 
      />}
      <div className={activeTab === "All Projects" || activeTab === "Explorations" || activeTab === "Books" || activeTab === "Resume" ? "bg-[#FAFAFA] dark:bg-background min-h-screen" : "bg-white dark:bg-background"}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          {renderContent()}
        </div>
      </div>
      
      {/* Floating Chat Input */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] sm:w-auto px-4 sm:px-0" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (chatInput.trim()) {
              setIsChatOpen(true);
            }
          }}
          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full w-full sm:min-w-[300px] sm:max-w-[400px] md:min-w-[400px] md:max-w-[600px] transition-all focus-within:ring-2 focus-within:ring-foreground/20 focus-within:shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/70 flex-shrink-0 pointer-events-none" />
          <input
            type="text"
            placeholder="what would you like to learn more about?"
            value={chatInput}
            onChange={(e) => {
              setChatInput(e.target.value);
              if (!isChatOpen && e.target.value.trim()) {
                setIsChatOpen(true);
              }
            }}
            onFocus={() => {
              setIsChatOpen(true);
            }}
            className="flex-1 bg-transparent text-xs sm:text-sm md:text-base text-foreground placeholder:text-muted-foreground/70 outline-none border-none focus:outline-none focus:ring-0 cursor-text caret-foreground min-w-0"
            style={{ 
              caretColor: 'currentColor',
              WebkitAppearance: 'none',
              appearance: 'none',
            }}
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            className="flex items-center justify-center h-9 w-9 rounded-full text-white flex-shrink-0 transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            aria-label="Send message"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Chat Modal with Embedded Delphi AI */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => {
              setIsChatOpen(false);
              setChatInput('');
            }}
          />
          
          {/* Modal - Bottom Sheet on Mobile, Centered Modal on Desktop */}
          <div className="relative w-full h-[90vh] sm:h-[85vh] sm:max-w-4xl bg-background rounded-t-3xl sm:rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden animate-[slide-in-from-bottom_0.4s_cubic-bezier(0.16,1,0.3,1)] sm:animate-in sm:fade-in sm:zoom-in-95">
            {/* Drag Handle - Mobile Only */}
            <div className="flex justify-center pt-3 pb-2 sm:hidden">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-4 sm:pt-6 pb-4 border-b border-border/50 relative flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-border/50 flex-shrink-0">
                  <img 
                    src={profileImage} 
                    alt="John.ai" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">John.ai</h2>
                  <p className="text-xs text-muted-foreground">Powered by Delphi AI</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsChatOpen(false);
                  setChatInput('');
                }}
                className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              >
                <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Embedded Delphi AI iframe */}
            <div className="flex-1 overflow-hidden relative bg-white">
              <iframe
                src={delphiUrl}
                className="w-full h-full border-0"
                title="John.ai"
                allow="microphone; camera"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
