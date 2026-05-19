import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  PROFILE_GITHUB_URL,
  PROFILE_LINKEDIN_URL,
  PROFILE_X_URL,
} from "@/config/profileLinks";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "@/assets/PP.jpg";
import chatAnswersRaw from "@/data/chatAnswers.md?raw";

type ChatEntry = { keywords: string[]; answer: string };
type ChatMessage = { role: "user" | "ai"; text: string };

const parseChatAnswers = (md: string): { entries: ChatEntry[]; fallback: string } => {
  const blocks = md.split(/\n###\s+/).slice(1);
  const entries: ChatEntry[] = [];
  let fallback =
    "I don't have an answer for that yet. Email me at rodriguesjohnbaptist@gmail.com.";
  for (const block of blocks) {
    const lines = block.split("\n");
    const heading = (lines.shift() || "").trim();
    let keywords: string[] = [];
    const answerLines: string[] = [];
    for (const line of lines) {
      if (/^keywords\s*:/i.test(line)) {
        keywords = line
          .slice(line.indexOf(":") + 1)
          .split(",")
          .map((k) => k.trim().toLowerCase())
          .filter(Boolean);
      } else if (line.trim().length > 0 && !line.startsWith("---")) {
        answerLines.push(line.trim());
      }
    }
    const answer = answerLines.join(" ").trim();
    if (!answer) continue;
    if (heading.toUpperCase() === "FALLBACK") {
      fallback = answer;
    } else {
      entries.push({ keywords, answer });
    }
  }
  return { entries, fallback };
};

const { entries: CHAT_ENTRIES, fallback: CHAT_FALLBACK } =
  parseChatAnswers(chatAnswersRaw);

const findChatAnswer = (input: string): string => {
  const text = input.toLowerCase();
  let bestScore = 0;
  let bestAnswer = CHAT_FALLBACK;
  for (const entry of CHAT_ENTRIES) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (kw.length > 0 && text.includes(kw)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }
  return bestAnswer;
};

const sans = {
  fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
};

const displayFont = "'Geist', ui-sans-serif, system-ui, sans-serif";

export const display = { fontFamily: displayFont };

const NARRATION_TEXT = `Hi, I'm John Rodrigues, a Design Engineer for zero to one AI-Native Products. I prototype AI-native products from scratch. I help teams turn ambiguous ideas into agentic, probabilistic, high-craft interfaces with design and code. I've worked across the spectrum: 25 million dollars raised at TOCA Football, 20 million users shipped at Citi, and B2B banking at JPMorgan Chase. Master's in Interaction Design, undergrad in Engineering, plus UX and AI at Stanford. If you're an AI-native team that wants a designer with technical ability who moves fast, let's build.`;

const SPEED_OPTIONS = [1, 1.25, 1.5, 2] as const;

type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: React.ReactNode;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: PROFILE_LINKEDIN_URL,
    handle: "/in/john-rodrigues4",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: PROFILE_X_URL,
    handle: "@john_rodrigues_",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "Substack",
    href: "https://johnrodrigues.substack.com",
    handle: "johnrodrigues.substack.com",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    label: "AI Design Academy",
    href: "https://www.theaidesignacademy.com/",
    handle: "theaidesignacademy.com",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: PROFILE_GITHUB_URL,
    handle: "RodriguesJohn",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.04c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.78-1.34-1.78-1.1-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.46-1.34-5.46-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.31 1.23a11.51 11.51 0 0 1 6.02 0c2.3-1.55 3.31-1.23 3.31-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.83.58A12 12 0 0 0 12 .3" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:rodriguesjohnbaptist@gmail.com",
    handle: "rodriguesjohnbaptist@gmail.com",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
];

const RESUME_URL = "/John-Rodrigues-Resume.pdf";

const Waveform = ({ playing }: { playing: boolean }) => {
  const bars = Array.from({ length: 56 });
  return (
    <div className="flex items-center justify-center gap-[3px] h-12 w-full">
      {bars.map((_, i) => {
        const base = 6 + 16 * Math.abs(Math.sin(i * 0.45 + 1.2));
        return (
          <div
            key={i}
            className="w-[2px] rounded-full bg-zinc-200"
            style={{
              height: `${base}px`,
              transformOrigin: "center",
              animation: playing
                ? `waveformBar 1.2s ease-in-out ${(i * 0.04) % 1.2}s infinite`
                : "none",
              opacity: playing ? 1 : 0.45,
              transition: "opacity 0.3s",
            }}
          />
        );
      })}
      <style>{`
        @keyframes waveformBar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.6); }
        }
      `}</style>
    </div>
  );
};

const PageShell = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Listen state
  const [isListenOpen, setIsListenOpen] = useState(false);
  const [isListenClosing, setIsListenClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentChar, setCurrentChar] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startOffsetRef = useRef(0);

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatClosing, setIsChatClosing] = useState(false);

  // Related state
  const [isRelatedOpen, setIsRelatedOpen] = useState(false);
  const [isRelatedClosing, setIsRelatedClosing] = useState(false);
  const [copiedLinkLabel, setCopiedLinkLabel] = useState<string | null>(null);

  const dockListRef = useRef<HTMLUListElement>(null);
  const dockButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);
  const [dockIndicator, setDockIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [dockIndicatorMorph, setDockIndicatorMorph] = useState(false);

  const copyLinkValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLinkLabel(label);
      window.setTimeout(() => setCopiedLinkLabel(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const linkCopyText = (href: string) =>
    href.startsWith("mailto:") ? href.replace(/^mailto:/i, "") : href;

  const closeRelated = () => {
    if (isRelatedClosing) return;
    setIsRelatedClosing(true);
    window.setTimeout(() => {
      setIsRelatedOpen(false);
      setIsRelatedClosing(false);
    }, 380);
  };
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Hi, I'm John. Ask me anything about my work, my approach, or what I can build for you.",
    },
  ]);
  const [aiTyping, setAiTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const speak = (fromChar: number, rate: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const text = NARRATION_TEXT.slice(fromChar);
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1;
    startOffsetRef.current = fromChar;
    u.onboundary = (ev) => {
      if (ev.name === "word" || ev.charIndex !== undefined) {
        setCurrentChar(startOffsetRef.current + (ev.charIndex || 0));
      }
    };
    u.onend = () => {
      setIsPlaying(false);
      setCurrentChar(NARRATION_TEXT.length);
    };
    utteranceRef.current = u;
    synth.speak(u);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const startFrom = currentChar >= NARRATION_TEXT.length ? 0 : currentChar;
    if (currentChar >= NARRATION_TEXT.length) setCurrentChar(0);
    speak(startFrom, playbackRate);
  };

  const restartNarration = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentChar(0);
    setIsPlaying(false);
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying) speak(currentChar, rate);
  };

  const closeListen = () => {
    if (isListenClosing) return;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsListenClosing(true);
    window.setTimeout(() => {
      setIsListenOpen(false);
      setIsListenClosing(false);
    }, 380);
  };

  const closeChat = () => {
    if (isChatClosing) return;
    setIsChatClosing(true);
    window.setTimeout(() => {
      setIsChatOpen(false);
      setIsChatClosing(false);
    }, 380);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Lock body + html bg to black while a v2 page is mounted so no white
  // strip leaks through below the dock.
  useEffect(() => {
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = "#000";
    document.documentElement.style.backgroundColor = "#000";
    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
    };
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, aiTyping]);

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setChatInput("");
    setAiTyping(true);
    const reply = findChatAnswer(text);
    window.setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: "ai", text: reply }]);
      setAiTyping(false);
    }, 900);
  };

  const isWorkRoute = location.pathname.startsWith("/v2/work");

  const openTestimonials = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    navigate("/v2/testimonials");
  };

  const openToolStack = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    navigate("/v2/tool-stack");
  };

  const dockItems = [
    {
      label: "Home",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      ),
      onClick: () => navigate("/v2"),
      isActive: location.pathname === "/v2",
    },
    {
      label: "My work",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="7" height="7" rx="1.5" />
          <rect x="14" y="4" width="7" height="7" rx="1.5" />
          <rect x="3" y="15" width="7" height="6" rx="1.5" />
          <rect x="14" y="15" width="7" height="6" rx="1.5" />
        </svg>
      ),
      onClick: () => navigate("/v2/work"),
      isActive: isWorkRoute,
    },
    {
      label: "John.ai",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      onClick: () => setIsChatOpen(true),
      isActive: false,
    },
    {
      label: "My story",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 18 0" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
      onClick: () => setIsListenOpen(true),
      isActive: false,
    },
    {
      label: "More",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="19" cy="12" r="1.25" fill="currentColor" stroke="none" />
        </svg>
      ),
      onClick: () => setIsRelatedOpen(true),
      isActive: false,
    },
  ];

  const activeDockIndex = dockItems.findIndex((item) => item.isActive);
  const targetDockIndex =
    hoveredDockIndex ?? (activeDockIndex >= 0 ? activeDockIndex : null);

  const syncDockIndicator = useCallback(() => {
    if (targetDockIndex === null) {
      setDockIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const btn = dockButtonRefs.current[targetDockIndex];
    const list = dockListRef.current;
    if (!btn || !list) return;
    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setDockIndicator({
      left: btnRect.left - listRect.left,
      width: btnRect.width,
      opacity: 1,
    });
  }, [targetDockIndex]);

  useLayoutEffect(() => {
    syncDockIndicator();
  }, [syncDockIndicator, location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", syncDockIndicator);
    return () => window.removeEventListener("resize", syncDockIndicator);
  }, [syncDockIndicator]);

  useEffect(() => {
    if (targetDockIndex === null) return;
    setDockIndicatorMorph(true);
    const t = window.setTimeout(() => setDockIndicatorMorph(false), 560);
    return () => window.clearTimeout(t);
  }, [targetDockIndex]);

  return (
    <div
      className="min-h-screen antialiased text-zinc-50"
      style={{ backgroundColor: "#000000", fontSize: "17px", fontWeight: 500, ...sans }}
    >
      {children}

      {/* Floating bottom dock */}
      <nav
        className="fixed left-1/2 z-50 w-[min(calc(100vw-2rem),460px)] -translate-x-1/2"
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom, 1.25rem))",
          opacity: 0,
          animation: "navEntrance 900ms cubic-bezier(0.22, 1, 0.36, 1) 720ms forwards",
          ...sans,
        }}
      >
        <div
          className="box-border w-full overflow-visible rounded-full"
          style={{
            padding: "9px 18px",
            background:
              "linear-gradient(180deg, rgba(20,20,22,0.96) 0%, rgba(10,10,12,0.94) 100%)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.18)",
              "inset 0 -1px 1px rgba(0,0,0,0.55)",
              "0 1px 0 rgba(255,255,255,0.05)",
              "0 18px 44px -8px rgba(0,0,0,0.82)",
              "0 8px 18px -4px rgba(0,0,0,0.58)",
            ].join(", "),
          }}
        >
          <ul
            ref={dockListRef}
            className="relative m-0 flex w-full list-none items-center justify-between gap-1 p-0"
            onMouseLeave={() => setHoveredDockIndex(null)}
          >
          <div
            aria-hidden
            className={`dock-indicator-pill pointer-events-none absolute top-0 bottom-0 rounded-full bg-white/[0.10] ${
              dockIndicatorMorph ? "is-morphing" : ""
            }`}
            style={{
              left: dockIndicator.left,
              width: dockIndicator.width,
              opacity: dockIndicator.opacity,
            }}
          />
          {dockItems.map((item, index) => {
            const isHighlighted =
              item.isActive || hoveredDockIndex === index;
            return (
              <li key={item.label} className="shrink-0">
                <button
                  type="button"
                  ref={(el) => {
                    dockButtonRefs.current[index] = el;
                  }}
                  onClick={item.onClick}
                  onMouseEnter={() => setHoveredDockIndex(index)}
                  onFocus={() => setHoveredDockIndex(index)}
                  className={`relative z-[1] flex origin-center items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-colors motion-reduce:transform-none ${
                    isHighlighted
                      ? "scale-[1.05] text-white"
                      : "scale-100 text-zinc-400"
                  }`}
                >
                  <span
                    className={`shrink-0 transition-colors duration-300 ${
                      isHighlighted ? "text-white" : "text-zinc-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="shrink-0">{item.label}</span>
                </button>
              </li>
            );
          })}
          </ul>
        </div>
      </nav>

      {/* Listen backdrop */}
      {isListenOpen && (
        <div
          className="fixed inset-0 z-[80]"
          style={{
            backgroundColor: "rgba(0,0,0,0.30)",
            backdropFilter: "blur(6px) saturate(140%)",
            WebkitBackdropFilter: "blur(6px) saturate(140%)",
            animation: isListenClosing
              ? "popupFadeOut 380ms ease-out forwards"
              : "popupFade 380ms ease-out forwards",
          }}
          onClick={closeListen}
        />
      )}

      {/* Listen popup */}
      {isListenOpen && (
        <div
          className="fixed z-[90] left-1/2 w-[90%] max-w-[620px]"
          style={{
            bottom: "calc(max(1.25rem, env(safe-area-inset-bottom, 1.25rem)) + 64px)",
            transformOrigin: "bottom center",
            animation: isListenClosing
              ? "popupSink 380ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
              : "popupRise 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            ...sans,
          }}
        >
          <div
            className="rounded-2xl overflow-hidden text-zinc-50"
            style={{
              backgroundColor: "#0a0a0a",
              border: "1px solid #1f1f22",
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.85), 0 8px 20px -4px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="text-[12px] tracking-[0.18em] uppercase text-zinc-500">My story</span>
              <button
                onClick={closeListen}
                aria-label="Close"
                className="h-7 w-7 rounded-full hover:bg-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-5 pt-3 pb-4">
              <p className="text-[15px] leading-[1.55]">
                <span className="text-zinc-50">{NARRATION_TEXT.slice(0, currentChar)}</span>
                <span className="text-zinc-500">{NARRATION_TEXT.slice(currentChar)}</span>
              </p>
            </div>

            <div className="px-5">
              <Waveform playing={isPlaying} />
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-100 active:scale-95 transition-transform"
                >
                  {isPlaying ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={restartNarration}
                  aria-label="Restart"
                  className="h-9 w-9 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] flex items-center justify-center transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="11 17 6 12 11 7" />
                    <polyline points="18 17 13 12 18 7" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-1">
                {SPEED_OPTIONS.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => changeSpeed(rate)}
                    className={`text-[12px] font-medium px-2 py-1 rounded-md transition-colors ${
                      playbackRate === rate
                        ? "bg-white/[0.10] text-white"
                        : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat backdrop */}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-[80]"
          style={{
            backgroundColor: "rgba(0,0,0,0.30)",
            backdropFilter: "blur(6px) saturate(140%)",
            WebkitBackdropFilter: "blur(6px) saturate(140%)",
            animation: isChatClosing
              ? "popupFadeOut 380ms ease-out forwards"
              : "popupFade 380ms ease-out forwards",
          }}
          onClick={closeChat}
        />
      )}

      {/* Chat popup */}
      {isChatOpen && (
        <div
          className="fixed z-[90] left-1/2 w-[90%] max-w-[620px]"
          style={{
            bottom: "calc(max(1.25rem, env(safe-area-inset-bottom, 1.25rem)) + 64px)",
            transformOrigin: "bottom center",
            animation: isChatClosing
              ? "popupSink 380ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
              : "popupRise 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            ...sans,
          }}
        >
          <div
            className="rounded-2xl overflow-hidden flex flex-col text-zinc-50 h-[460px]"
            style={{
              backgroundColor: "#0a0a0a",
              border: "1px solid #1f1f22",
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.85), 0 8px 20px -4px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full overflow-hidden ring-1 ring-white/10">
                  <img src={profileImage} alt="John" className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold">John.ai</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
              <button
                onClick={closeChat}
                aria-label="Close"
                className="h-7 w-7 rounded-full hover:bg-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div ref={chatScrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-[15px] leading-[1.5] ${
                      m.role === "user"
                        ? "bg-white text-black rounded-br-md"
                        : "bg-white/[0.06] text-zinc-100 rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {aiTyping && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/[0.06]">
                    <div className="flex items-center gap-1">
                      {[0, 0.18, 0.36].map((d) => (
                        <span
                          key={d}
                          className="block h-1.5 w-1.5 rounded-full bg-zinc-400"
                          style={{
                            animation: "thinkingDot 1.3s ease-in-out infinite",
                            animationDelay: `${d}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={sendChat}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06]"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask John anything..."
                className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-2 text-[15px] text-zinc-50 placeholder:text-zinc-500 outline-none focus:border-white/20 transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                aria-label="Send"
                className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-100 active:scale-95 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Related backdrop */}
      {isRelatedOpen && (
        <div
          className="fixed inset-0 z-[80]"
          style={{
            backgroundColor: "rgba(0,0,0,0.30)",
            backdropFilter: "blur(6px) saturate(140%)",
            WebkitBackdropFilter: "blur(6px) saturate(140%)",
            animation: isRelatedClosing
              ? "popupFadeOut 380ms ease-out forwards"
              : "popupFade 380ms ease-out forwards",
          }}
          onClick={closeRelated}
        />
      )}

      {/* Related popup */}
      {isRelatedOpen && (
        <div
          className="fixed z-[90] left-1/2 w-[90%] max-w-[620px]"
          style={{
            bottom: "calc(max(1.25rem, env(safe-area-inset-bottom, 1.25rem)) + 64px)",
            transformOrigin: "bottom center",
            animation: isRelatedClosing
              ? "popupSink 380ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
              : "popupRise 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            ...sans,
          }}
        >
          <div
            className="rounded-2xl overflow-hidden text-zinc-50"
            style={{
              backgroundColor: "#0a0a0a",
              border: "1px solid #1f1f22",
              boxShadow:
                "0 20px 50px -10px rgba(0,0,0,0.85), 0 8px 20px -4px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <span className="text-[10px] tracking-[0.16em] uppercase text-zinc-500">
                More
              </span>
              <button
                onClick={closeRelated}
                aria-label="Close"
                className="h-6 w-6 rounded-full hover:bg-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Section 1: Social */}
            <div className="px-4 pt-1 pb-2">
              <p className="text-[10px] tracking-[0.16em] uppercase text-zinc-500 mb-1.5">
                Connect
              </p>
              <ul className="-mx-1.5">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label} className="flex items-center gap-0.5 pr-0.5">
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="group flex flex-1 min-w-0 items-center gap-2 px-1.5 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 group-hover:text-white group-hover:bg-white/[0.08] transition-colors [&_svg]:h-3.5 [&_svg]:w-3.5">
                        {link.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                          {link.label}
                        </span>
                        <span className="block text-[11px] leading-tight text-zinc-500 truncate">
                          {link.handle}
                        </span>
                      </span>
                      <svg
                        className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      onClick={() => copyLinkValue(link.label, linkCopyText(link.href))}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
                      aria-label={
                        copiedLinkLabel === link.label
                          ? `Copied ${link.label}`
                          : `Copy ${link.label} link`
                      }
                    >
                      {copiedLinkLabel === link.label ? (
                        <span className="text-[9px] font-medium uppercase tracking-wide text-emerald-400">
                          OK
                        </span>
                      ) : (
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/[0.06] px-4 py-1">
              <button
                type="button"
                onClick={openTestimonials}
                className="group flex w-full items-center gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-white/[0.05]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                    Testimonials
                  </span>
                  <span className="block text-[11px] leading-tight text-zinc-500">
                    What clients say
                  </span>
                </span>
                <svg
                  className="h-3 w-3 shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={openToolStack}
                className="group flex w-full items-center gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-white/[0.05]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                    My tool stack
                  </span>
                  <span className="block text-[11px] leading-tight text-zinc-500">
                    Design, AI, and code
                  </span>
                </span>
                <svg
                  className="h-3 w-3 shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Section 2: Resume */}
            <div className="px-4 pt-2 pb-3.5 border-t border-white/[0.06]">
              <p className="text-[10px] tracking-[0.16em] uppercase text-zinc-500 mb-1.5">
                Resume
              </p>
              <div className="flex items-center gap-1.5">
              <a
                href={RESUME_URL}
                download
                className="group flex flex-1 items-center justify-between gap-2 px-2.5 py-2 rounded-lg bg-white text-black hover:bg-zinc-100 active:scale-[0.99] transition-all"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[0.06]">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[13px] font-semibold leading-tight">Download my resume</span>
                    <span className="text-[11px] text-black/55 leading-tight">PDF · Updated 2026</span>
                  </span>
                </span>
                <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => {
                  const url =
                    typeof window !== "undefined"
                      ? `${window.location.origin}${RESUME_URL}`
                      : RESUME_URL;
                  void copyLinkValue("Resume", url);
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-400 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.1] hover:text-zinc-200"
                aria-label={
                  copiedLinkLabel === "Resume" ? "Copied resume link" : "Copy resume link"
                }
              >
                {copiedLinkLabel === "Resume" ? (
                  <span className="text-[9px] font-medium uppercase tracking-wide text-emerald-400">
                    OK
                  </span>
                ) : (
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes thinkingDot {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }
        @keyframes logoRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes logoTilt {
          0%, 100% { transform: rotate(-2deg); }
          50%      { transform: rotate(2deg); }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(0.96); }
          50%      { transform: scale(1.04); }
        }
        @keyframes entranceItem {
          from { opacity: 0; transform: translateY(12px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes entranceItemNoBlur {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes navEntrance {
          from { opacity: 0; transform: translate(-50%, 12px) scale(0.98); filter: blur(6px); }
          to   { opacity: 1; transform: translate(-50%, 0) scale(1); filter: blur(0); }
        }
        @keyframes popupRise {
          from { opacity: 0; transform: translate(-50%, 12px) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes popupSink {
          from { opacity: 1; transform: translate(-50%, 0) scale(1); }
          to   { opacity: 0; transform: translate(-50%, 10px) scale(0.97); }
        }
        @keyframes popupFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popupFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PageShell;
