import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  PROFILE_GITHUB_URL,
  PROFILE_LINKEDIN_URL,
  PROFILE_X_URL,
} from "@/config/profileLinks";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "@/assets/PP.jpg";

const DELPHI_CHAT_URL = "https://www.delphi.ai/john-rodrigues";

const sans = {
  fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
};

const displayFont = "'Geist', ui-sans-serif, system-ui, sans-serif";

export const display = { fontFamily: displayFont };

type V2ThemeContextValue = {
  theme: "dark" | "light";
  isLightPreview: boolean;
  toggleTheme: () => void;
};

export const V2ThemeContext = createContext<V2ThemeContextValue | null>(null);

export const useV2Theme = () => {
  const ctx = useContext(V2ThemeContext);
  if (!ctx) {
    throw new Error("useV2Theme must be used within PageShell");
  }
  return ctx;
};

/** Button size (28) + gap (2) — knob travels between sun and moon. */
const THEME_KNOB_TRAVEL = 30;

const themeToggleSpring = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.75,
};

const themeKnobJellySpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 18,
  mass: 0.9,
};

export const ThemeToggleIcons = ({ className = "" }: { className?: string }) => {
  const { isLightPreview, toggleTheme } = useV2Theme();
  const knobX = useMotionValue(isLightPreview ? 0 : THEME_KNOB_TRAVEL);
  const knobVelocity = useVelocity(knobX);
  const knobScaleX = useTransform(knobVelocity, [-900, 0, 900], [1.42, 1, 1.42]);
  const knobScaleY = useTransform(knobVelocity, [-900, 0, 900], [0.68, 1, 0.68]);
  const didMount = useRef(false);

  useEffect(() => {
    const target = isLightPreview ? 0 : THEME_KNOB_TRAVEL;
    if (!didMount.current) {
      didMount.current = true;
      knobX.set(target);
      return;
    }
    const controls = animate(knobX, target, themeKnobJellySpring);
    return () => controls.stop();
  }, [isLightPreview, knobX]);

  return (
    <div
      className={`v2-theme-toggle-icons relative inline-flex items-center gap-0.5 overflow-visible rounded-full p-1 ring-1 ${className}`}
      role="group"
      aria-label="Appearance"
    >
      <motion.span
        aria-hidden="true"
        className={`v2-theme-toggle-knob pointer-events-none absolute top-1 left-1 z-0 size-7 rounded-full ${
          isLightPreview
            ? "v2-theme-toggle-knob--dark"
            : "v2-theme-toggle-knob--light"
        }`}
        style={{
          x: knobX,
          scaleX: knobScaleX,
          scaleY: knobScaleY,
        }}
      />

      <button
        type="button"
        onClick={() => {
          if (!isLightPreview) toggleTheme();
        }}
        className={`relative z-[1] inline-flex size-7 items-center justify-center rounded-full ${
          isLightPreview
            ? "v2-theme-toggle-icon--on"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
        aria-label="Switch to light mode"
        aria-pressed={isLightPreview}
      >
        <motion.span
          className="relative z-[1] inline-flex"
          animate={
            isLightPreview
              ? { rotate: 0, scale: 1, opacity: 1 }
              : { rotate: -20, scale: 0.9, opacity: 0.65 }
          }
          whileTap={{ scale: 0.86, rotate: 12 }}
          transition={themeToggleSpring}
        >
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </motion.span>
      </button>

      <button
        type="button"
        onClick={() => {
          if (isLightPreview) toggleTheme();
        }}
        className={`relative z-[1] inline-flex size-7 items-center justify-center rounded-full ${
          !isLightPreview
            ? "v2-theme-toggle-icon--on-dark"
            : "text-zinc-500 hover:text-zinc-700"
        }`}
        aria-label="Switch to dark mode"
        aria-pressed={!isLightPreview}
      >
        <motion.span
          className="relative z-[1] inline-flex"
          animate={
            !isLightPreview
              ? { rotate: 0, scale: 1, opacity: 1 }
              : { rotate: 16, scale: 0.9, opacity: 0.65 }
          }
          whileTap={{ scale: 0.86, rotate: -12 }}
          transition={themeToggleSpring}
        >
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8z" />
          </svg>
        </motion.span>
      </button>
    </div>
  );
};

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
    label: "Academy",
    href: "https://www.humanaistudio.io/academy",
    handle: "humanaistudio.io/academy",
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

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const queryTheme = new URLSearchParams(window.location.search).get("theme");
    if (queryTheme === "light" || queryTheme === "dark") return queryTheme;
    return "dark";
  });
  const isLightPreview = theme === "light";

  useEffect(() => {
    window.localStorage.setItem("v2-theme", theme);
    const params = new URLSearchParams(location.search);
    if (theme === "light") {
      params.set("theme", "light");
    } else {
      params.delete("theme");
    }
    const nextSearch = params.toString();
    window.history.replaceState(
      null,
      "",
      `${location.pathname}${nextSearch ? `?${nextSearch}` : ""}`,
    );
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  // Lock body + html bg to the v2 page color while mounted so no strip leaks
  // through below the dock.
  useEffect(() => {
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    const pageColor = isLightPreview ? "#f7f7f7" : "#000";
    document.body.style.backgroundColor = pageColor;
    document.documentElement.style.backgroundColor = pageColor;
    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
    };
  }, [isLightPreview]);

  const isWorkRoute = location.pathname.startsWith("/work");
  const isHomeRoute = location.pathname === "/";

  const openHome = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    navigate("/");
  };

  const openWork = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    navigate("/work");
  };

  const openStory = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    setIsListenOpen(true);
  };

  const openTestimonials = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    navigate("/testimonials");
  };

  const openToolStack = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    navigate("/tool-stack");
  };

  const openCaseStudyPresentation = () => {
    setIsRelatedOpen(false);
    setIsRelatedClosing(false);
    navigate("/case-study-presentation");
  };

  return (
    <V2ThemeContext.Provider value={{ theme, isLightPreview, toggleTheme }}>
    <div
      className={`min-h-screen min-h-[100dvh] overflow-x-hidden antialiased text-zinc-50 text-[15px] sm:text-[17px] ${
        isLightPreview ? "v2-light" : "v2-dark"
      }`}
      style={{
        backgroundColor: isLightPreview ? "#f7f7f7" : "#000000",
        fontWeight: 500,
        ...sans,
      }}
    >
      {children}

      {/* Chat-style composer + More */}
      <nav
        className="fixed left-1/2 z-50 w-[min(calc(100vw-2rem),420px)] -translate-x-1/2"
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom, 1.25rem))",
          opacity: 0,
          animation: "navEntrance 900ms cubic-bezier(0.22, 1, 0.36, 1) 720ms forwards",
          ...sans,
        }}
      >
        <div
          className="v2-chat-dock flex items-center gap-1 rounded-[28px] px-2 py-1.5"
          style={{
            background: isLightPreview
              ? "rgba(255,255,255,0.92)"
              : "rgba(16,16,18,0.94)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "none",
            boxShadow: isLightPreview
              ? [
                  "inset 0 2px 4px rgba(24,24,27,0.10)",
                  "inset 0 1px 1px rgba(24,24,27,0.08)",
                  "inset 0 -1px 0 rgba(255,255,255,0.85)",
                  "0 14px 36px -18px rgba(24,24,27,0.22)",
                ].join(", ")
              : [
                  "inset 0 2px 5px rgba(0,0,0,0.55)",
                  "inset 0 1px 1px rgba(0,0,0,0.35)",
                  "inset 0 -1px 0 rgba(255,255,255,0.08)",
                  "0 16px 40px -14px rgba(0,0,0,0.75)",
                ].join(", "),
          }}
        >
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className={`group flex min-w-0 flex-1 items-center gap-2 rounded-full px-3.5 py-2.5 text-left transition ${
              isLightPreview
                ? "hover:bg-zinc-900/[0.04]"
                : "hover:bg-white/[0.05]"
            }`}
            aria-label="Ask John.ai"
          >
            <span
              className={`min-w-0 flex-1 truncate text-[14px] font-medium leading-tight ${
                isLightPreview ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              Ask John.ai…
            </span>
            <span
              className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full transition ${
                isLightPreview
                  ? "bg-zinc-900/[0.06] text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white"
                  : "bg-white/[0.08] text-zinc-200 group-hover:bg-white group-hover:text-zinc-950"
              }`}
              aria-hidden="true"
            >
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </button>

          <div
            className={`mx-0.5 h-7 w-px shrink-0 ${
              isLightPreview ? "bg-zinc-900/10" : "bg-white/10"
            }`}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={() => setIsRelatedOpen(true)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition ${
              isLightPreview
                ? "text-zinc-800 hover:bg-zinc-900/[0.06]"
                : "text-zinc-100 hover:bg-white/[0.06]"
            }`}
            aria-label="Open more menu"
            aria-expanded={isRelatedOpen}
          >
            More
            <svg
              className="size-3.5 opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
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
          className="fixed z-[90] left-1/2 w-[92%] max-w-[720px]"
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
            className="v2-popup-panel rounded-2xl overflow-hidden text-zinc-50"
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
            className="v2-popup-panel rounded-2xl overflow-hidden flex flex-col text-zinc-50 h-[min(78vh,760px)] min-h-[620px] max-sm:h-[calc(100dvh-8.5rem)] max-sm:min-h-0"
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

            <div className="flex-1 overflow-hidden bg-white">
              <iframe
                src={DELPHI_CHAT_URL}
                title="John Rodrigues Delphi AI"
                className="h-full w-full border-0"
                allow="microphone; camera"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                style={{ colorScheme: "light" }}
              />
            </div>
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
            className="v2-popup-panel v2-more-panel max-h-[calc(100dvh-7rem)] overflow-y-auto overflow-x-hidden rounded-2xl text-zinc-50"
            style={{
              backgroundColor: "#0a0a0a",
              border: "1px solid #1f1f22",
              boxShadow:
                "0 20px 50px -10px rgba(0,0,0,0.85), 0 8px 20px -4px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-2 sm:px-6">
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

            <div className="border-t border-white/[0.06] px-5 py-3 sm:px-6">
              <p className="text-[10px] tracking-[0.16em] uppercase text-zinc-500 mb-2.5">
                Explore
              </p>
              <button
                type="button"
                onClick={openHome}
                className={`v2-more-action group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/[0.05] ${
                  isHomeRoute ? "bg-white/[0.04]" : ""
                }`}
              >
                <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                    Home
                  </span>
                  <span className="block text-[11px] leading-tight text-zinc-500">
                    Feed and experiments
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={openWork}
                className={`v2-more-action group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/[0.05] ${
                  isWorkRoute ? "bg-white/[0.04]" : ""
                }`}
              >
                <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="7" height="7" rx="1.5" />
                    <rect x="14" y="4" width="7" height="7" rx="1.5" />
                    <rect x="3" y="15" width="7" height="6" rx="1.5" />
                    <rect x="14" y="15" width="7" height="6" rx="1.5" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                    My work
                  </span>
                  <span className="block text-[11px] leading-tight text-zinc-500">
                    Case studies and shipped work
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={openStory}
                className="v2-more-action group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/[0.05]"
              >
                <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 12a9 9 0 0 1 18 0" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                    My story
                  </span>
                  <span className="block text-[11px] leading-tight text-zinc-500">
                    Listen to my background
                  </span>
                </span>
              </button>
            </div>

            {/* Section 1: Social */}
            <div className="border-t border-white/[0.06] px-5 pt-4 pb-4 sm:px-6">
              <p className="text-[10px] tracking-[0.16em] uppercase text-zinc-500 mb-2.5">
                Connect
              </p>
              <ul className="space-y-1">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="v2-more-social-link group flex flex-1 min-w-0 items-center gap-3 px-1 py-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                      <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 group-hover:text-white group-hover:bg-white/[0.08] transition-colors [&_svg]:h-3.5 [&_svg]:w-3.5">
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
                      className="v2-more-copy flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
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

            <div className="border-t border-white/[0.06] px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={openTestimonials}
                className="v2-more-action group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/[0.05]"
              >
                <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
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
                className="v2-more-action group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/[0.05]"
              >
                <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
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
              <button
                type="button"
                onClick={openCaseStudyPresentation}
                className="v2-more-action group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/[0.05]"
              >
                <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
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
                    <rect x="3" y="4" width="18" height="13" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                    <path d="M8 9h5M8 12h8" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                    Case study presentation
                  </span>
                  <span className="block text-[11px] leading-tight text-zinc-500">
                    Custom slide deck
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

            <div className="border-t border-white/[0.06] px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={toggleTheme}
                className="v2-more-action group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/[0.05]"
                aria-label={isLightPreview ? "Switch to dark mode" : "Switch to light mode"}
              >
                <span className="v2-more-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.08] text-zinc-200 transition-colors group-hover:bg-white/[0.08] group-hover:text-white">
                  {isLightPreview ? (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8z" />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-tight text-zinc-100 group-hover:text-white">
                    Appearance
                  </span>
                  <span className="block text-[11px] leading-tight text-zinc-500">
                    {isLightPreview ? "Light mode" : "Dark mode"}
                  </span>
                </span>
                <span className="v2-theme-switch relative h-5 w-9 shrink-0 rounded-full bg-white/[0.08] ring-1 ring-white/[0.08]">
                  <span
                    className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-zinc-100 transition-transform ${
                      isLightPreview ? "translate-x-0.5" : "translate-x-[18px]"
                    }`}
                  />
                </span>
              </button>
            </div>

            {/* Section 2: Resume */}
            <div className="px-5 pt-4 pb-5 border-t border-white/[0.06] sm:px-6">
              <p className="text-[10px] tracking-[0.16em] uppercase text-zinc-500 mb-2.5">
                Resume
              </p>
              <div className="flex items-center gap-2.5">
              <a
                href={RESUME_URL}
                download
                className="v2-more-resume group flex flex-1 items-center justify-between gap-3 px-3 py-3 rounded-xl bg-white text-black hover:bg-zinc-100 active:scale-[0.99] transition-all"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.06]">
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
                className="v2-more-resume-copy flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-zinc-400 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.1] hover:text-zinc-200"
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
    </V2ThemeContext.Provider>
  );
};

export default PageShell;
