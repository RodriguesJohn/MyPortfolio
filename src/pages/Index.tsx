import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { QuickLinks } from "@/components/QuickLinks";
import { Testimonials } from "@/components/Testimonials";
import { Speaking } from "@/components/Speaking";
import { About } from "@/components/About";
import { Consulting } from "@/components/Consulting";
import { MessageCircle, Sparkles, Mic, Keyboard } from "lucide-react";
import profileImage from "@/assets/PP.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Work Highlights");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Work Highlights":
        return <WorkGrid showTabs={false} />;
      case "All Projects":
        return <WorkGrid showTabs={false} activeTab="all-projects" />;
      case "Explorations":
        return <WorkGrid showTabs={false} activeTab="explorations" />;
      case "Quick Links":
        return <QuickLinks activeTab={activeTab} onTabChange={setActiveTab} />;
      case "Consulting":
        return <Consulting />;
      case "Testimonials":
        return <Testimonials />;
      case "Speaking":
        return <Speaking />;
      case "About":
        return <About />;
      default:
        return <WorkGrid />;
    }
  };

  const isQuickLinksPage = activeTab === "Quick Links";
  const isTestimonialsPage = activeTab === "Testimonials";
  const isSpeakingPage = activeTab === "Speaking";

  return (
    <div className="min-h-screen pt-24">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {!isQuickLinksPage && !isTestimonialsPage && !isSpeakingPage && activeTab !== "All Projects" && activeTab !== "Explorations" && <Hero 
        activeTab={activeTab}
        onChatClick={() => setIsChatOpen(true)}  
        onWorkClick={() => {
          setActiveTab("Work Highlights");
          setTimeout(() => {
            const workSection = document.getElementById('work-section');
            if (workSection) {
              workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }} 
      />}
      <div className={activeTab === "All Projects" || activeTab === "Explorations" ? "bg-[#FAFAFA] min-h-screen" : "bg-white"}>
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
            placeholder="Chat with John.ai"
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
            className="flex items-center justify-center h-9 w-9 rounded-full bg-foreground text-background flex-shrink-0 hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95"
            aria-label="Send message"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Chat Modal */}
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
          <div className="relative w-full h-[85vh] sm:h-[600px] sm:max-w-2xl bg-background rounded-t-3xl sm:rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden animate-[slide-in-from-bottom_0.4s_cubic-bezier(0.16,1,0.3,1)] sm:animate-in sm:fade-in sm:zoom-in-95">
            {/* Drag Handle - Mobile Only */}
            <div className="flex justify-center pt-3 pb-2 sm:hidden">
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-4 sm:pt-10 pb-6 border-b border-border/50 relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-muted/80 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full text-muted-foreground/70 pointer-events-none animate-shake">
                Coming Soon
              </div>
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
                  <p className="text-xs text-muted-foreground">Ask me about my work, experience, or anything else</p>
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
            
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Welcome Message */}
              <div className="flex gap-3 items-start">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-border/50 flex-shrink-0 mt-1">
                  <img 
                    src={profileImage} 
                    alt="John.ai" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Hi! I'm John's AI assistant. I can help you learn about his work, experience, skills, and projects. What would you like to know?
                  </p>
                </div>
              </div>
              
              {/* Suggested Questions */}
              <div className="flex flex-wrap gap-2 pl-11">
                <button className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                  What projects has John worked on?
                </button>
                <button className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                  Tell me about his AI experience
                </button>
                <button className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                  What's his design philosophy?
                </button>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border/50 pb-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              {isVoiceMode ? (
                <div className="flex flex-col items-center justify-center py-6 gap-4">
                  {isListening ? (
                    <div 
                      className="flex items-center gap-1 h-12 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setIsListening(false)}
                      title="Tap to stop listening"
                    >
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-foreground rounded-full animate-wave"
                          style={{
                            height: '20%',
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsListening(true)}
                      className="h-16 w-16 rounded-full bg-foreground flex items-center justify-center hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg"
                      title="Tap to speak"
                    >
                      <Mic className="h-8 w-8 text-background" />
                    </button>
                  )}
                  <p className="text-sm text-muted-foreground font-medium animate-pulse">{isListening ? 'Listening...' : 'Tap to speak'}</p>
                  <button 
                    onClick={() => {
                      setIsVoiceMode(false);
                      setIsListening(false);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full hover:bg-muted transition-colors"
                  >
                    <Keyboard className="h-3 w-3" />
                    Switch to keyboard
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && chatInput.trim()) {
                        setChatInput('');
                      }
                    }}
                    autoFocus
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70 text-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsVoiceMode(true)}
                      className="h-8 w-8 rounded-full hover:bg-background/50 flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                      title="Switch to voice"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if (chatInput.trim()) {
                          setChatInput('');
                        }
                      }}
                      className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
