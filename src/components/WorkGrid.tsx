import { useState, useRef, useEffect } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { KPICardsWithHoverEffects } from "@/components/ui/kpi-cards-with-hover-effects";
import { Progress } from "@/components/ui/progress";
import p1Image from "@/assets/P1.png";
import p2Image from "@/assets/P2.png";
import p3Image from "@/assets/P3.png";
import p4Image from "@/assets/P4.png";
import p5Image from "@/assets/P5.png";
import threeDImage from "@/assets/3D.png";
import aiVoiceVideo from "@/assets/EvaAIV2.mov";
import aiInsightsVideo from "@/assets/AI Insights App.mp4";
import aiSummaryVideo from "@/assets/AISummary.mp4";
import aiMentorVideo from "@/assets/AIMentor.mp4";
import multiModalVideo from "@/assets/MultiModal.mp4";
import aiDataVisionVideo from "@/assets/AIDataVision.mp4";
import cardVideo from "@/assets/Card.mp4";
import balanceTransferVideo from "@/assets/BT.mp4";
import myTokaVideo from "@/assets/MyTocaApp.mp4";
import pamVideo from "@/assets/PAM.mp4";
import faceIDVideo from "@/assets/FaceID.mp4";
import watchOSVideo from "@/assets/MediatationApp/watchOS.mp4";
import uxAgentVideo from "@/assets/V2UXAgent.mp4";
import zozoGif from "@/assets/Zozo.gif";
import noScrollAppImage from "@/assets/NoScrollApp.png";
import googleLogo from "@/assets/GoogleLogog.png";
import stanfordLogo from "@/assets/Standford.png";
import chaseLogoLight from "@/assets/ChaseLightMOde.png";
import citiLogo from "@/assets/Citi.svg.png";
import tocaLogoDark from "@/assets/Toca.png";
import appleLogo from "@/assets/Apple-Logo.png";
import dcbImage from "@/assets/DCB.png";
import uxAgentPGImage from "@/assets/UXAgent.png";
import outfixVideo from "@/assets/OutfixV2.mp4";
import ollieAIImage from "@/assets/OllieAIV1.png";
import ollieAIVideo from "@/assets/OllieAIDemo.mp4";

const projects = [
  {
    id: 0,
    title: "AI Productivity OS.",
    description: "AI Productivity OS",
    image: p5Image,
    category: "commercial",
    isComingSoon: true,
  },
  {
    id: 15,
    title: "Eva AI | iOS Mobile App | Powered by Google Gemini",
    description: "voice-based all-in-one productivity system to improve efficiency, focus, and workflow.",
    image: p5Image,
    thumbnailVideo: aiVoiceVideo,
    category: "commercial",
    businessCategory: "B2C",
    secondaryTag: "Soon to be launched",
  },
  {
    id: 13,
    title: "UX AI Agent",
    description: "AI-powered UX design agent",
    image: uxAgentPGImage,
    category: "commercial",
    isHackathonWinner: true,
    hackathonText: "Winner of the hackathon conducted by OpenAI, Loveable, and AGI.",
  },
  {
    id: 14,
    title: "AI productivity OS",
    description: "Currently building",
    image: p5Image,
    category: "commercial",
    isComingSoon: true,
  },
  {
    id: 1,
    title: "AI Insights App for Citibank",
    description: "AI Insights app for Citibank",
    image: p5Image,
    video: aiVoiceVideo,
    thumbnailVideo: aiInsightsVideo,
    companyLogo: citiLogo,
    category: "commercial",
    businessCategory: "B2C",
    secondaryTag: "AI Integration Project",
  },
  {
    id: 2,
    title: "No-Scroll App, iOS App",
    description: "No-scroll app, iOS app • 4.6 ⭐ App Store • 50K+ downloads",
    image: noScrollAppImage,
    video: aiSummaryVideo,
    link: "https://apps.apple.com/us/app/no-scroll-limit-screen-time/id6474079216?ppid=26858afa-d233-49c4-b4d3-4e2daaf8ce3f",
    category: "commercial",
    businessCategory: "B2C",
    secondaryTag: "Shipped",
  },
  {
    id: 3,
    title: "Balance Transfer for Citibank",
    description: "Balance transfer for Citibank",
    image: p5Image,
    video: aiMentorVideo,
    thumbnailVideo: balanceTransferVideo,
    companyLogo: citiLogo,
    category: "commercial",
    businessCategory: "B2C",
    secondaryTag: "Shipped",
  },
  {
    id: 5,
    title: "My Toca App",
    description: "Toca",
    image: p5Image,
    video: cardVideo,
    thumbnailVideo: myTokaVideo,
    companyLogo: tocaLogoDark,
    category: "commercial",
  },
  {
    id: 6,
    title: "Face ID Verification",
    description: "Citibank project",
    image: p5Image,
    thumbnailVideo: faceIDVideo,
    companyLogo: citiLogo,
    category: "commercial",
  },
  {
    id: 4,
    title: "AI Data Vision",
    description: "JPMorgan Chase Project",
    image: p5Image,
    video: multiModalVideo,
    thumbnailVideo: multiModalVideo,
    companyLogo: chaseLogoLight,
    category: "commercial",
  },
  {
    id: 7,
    title: "3D Printing Management App",
    description: "For Jefferson",
    image: threeDImage,
    category: "all-projects-only",
  },
  {
    id: 10,
    title: "Meditation WatchOS App",
    description: "Concept Project",
    image: p2Image,
    thumbnailVideo: watchOSVideo,
    category: "commercial",
  },
  {
    id: 11,
    title: "Digital Commercial Banking Platform",
    description: "For JPMorgan Chase (Currently Working)",
    image: p5Image,
    companyLogo: chaseLogoLight,
    category: "commercial",
    isComingSoon: true,
    blurThumbnail: true,
  },
  {
    id: 12,
    title: "VR Learning Platform",
    description: "For Jefferson Health",
    image: zozoGif,
    category: "commercial",
  },
  {
    id: 8,
    title: "Voice Thoughts AI",
    description: "Voice-to-thoughts app",
    image: p5Image,
    category: "past-projects",
    isComingSoon: true,
  },
  {
    id: 9,
    title: "Smart Home Dashboard",
    description: "Smart home control center",
    image: p5Image,
    category: "past-projects",
    isComingSoon: true,
  },
  {
    id: 10,
    title: "Fitness Tracker Pro",
    description: "AI fitness tracking",
    image: p5Image,
    category: "past-projects",
  },
  {
    id: 11,
    title: "E-commerce AI",
    description: "Shopping assistant",
    image: p5Image,
    category: "past-projects",
  },
  {
    id: 12,
    title: "Travel Planner AI",
    description: "Travel itinerary optimization",
    image: p5Image,
    category: "past-projects",
  },
  {
    id: 16,
    title: "Digital Commercial Banking Platform",
    description: "For JPMorgan Chase",
    image: dcbImage,
    companyLogo: chaseLogoLight,
    category: "commercial",
    businessCategory: "B2B",
    secondaryTag: "Shipped",
  },
  {
    id: 17,
    title: "Vendo AI",
    description: "Vendo AI",
    image: p5Image,
    category: "commercial",
    showBlankThumbnail: true,
  },
  {
    id: 18,
    title: "UX Agent",
    description: "UX Agent P&G",
    image: uxAgentPGImage,
    category: "commercial",
  },
  {
    id: 19,
    title: "Budgeting AI Agent",
    description: "Budgeting Tool for JPMC Analysts and CFOs",
    image: p5Image,
    thumbnailVideo: aiDataVisionVideo,
    companyLogo: chaseLogoLight,
    category: "commercial",
    businessCategory: "B2B",
    secondaryTag: "Innovation Initiative",
  },
  {
    id: 20,
    title: "Outfix AI",
    description: "Fast 0→1, end-to-end, AI, consumer",
    image: p5Image,
    thumbnailVideo: outfixVideo,
    category: "commercial",
    businessCategory: "B2C",
    showRequestModal: true,
  },
  {
    id: 21,
    title: "Ollie AI",
    description: "Figma plugin that lets designers use AI directly on the canvas",
    image: ollieAIImage,
    thumbnailVideo: ollieAIVideo,
    category: "commercial",
  },
];

interface WorkGridProps {
  showTabs?: boolean;
  activeTab?: string;
}

function ProjectCard({ project, showTabs }: { project: typeof projects[0]; showTabs?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  
  // For exploration view, use video and different title/description
  const displayVideo = showTabs && project.video;
  // For home page, use thumbnailVideo if available, otherwise use image
  const displayThumbnailVideo = !showTabs && project.thumbnailVideo;
  const displayTitle = showTabs 
    ? (project.id === 1 ? "Voice Interaction Exploration" : project.id === 2 ? "AI summary interaction" : project.id === 3 ? "AI mentor concept" : project.id === 4 ? "Multimodal interaction" : project.id === 5 ? "Card interaction" : project.title)
    : project.title;
  const displayDescription = showTabs 
    ? (project.id === 1 ? "Voice Interaction Exploration" : project.id === 2 ? "AI summary interaction" : project.id === 3 ? "AI mentor concept" : project.id === 4 ? "Multimodal interaction" : project.id === 5 ? "Card interaction" : project.description)
    : project.description;
  
  // Use Chase light mode logo for all Chase projects
  // Projects 4, 16, and 19 use Chase logo
  const isChaseProject = project.id === 4 || project.id === 16 || project.id === 19;
  const displayLogo = isChaseProject 
    ? chaseLogoLight
    : project.companyLogo;

  if (!showTabs) {
    return (
      <Card
        ref={ref}
        className={`group overflow-hidden border-0 bg-white transition-all duration-500 cursor-pointer rounded-2xl relative ${
          isInView ? 'blur-0' : 'blur-lg'
        }`}
        style={{
          boxShadow: '0 2px 40px rgba(0, 0, 0, 0.03), 0 1px 20px rgba(0, 0, 0, 0.015)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 40px rgba(0, 0, 0, 0.06), 0 2px 20px rgba(0, 0, 0, 0.03)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.04), 0 1px 15px rgba(0, 0, 0, 0.02)';
        }}
        onClick={() => {
          if ((project as any).showRequestModal) {
            setShowModal(true);
          } else if (project.link) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
          } else {
            navigate(`/case-study?project=${project.id}`);
          }
        }}
      >
        {/* Request Snackbar - Center of card */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-[50] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm rounded-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8
                }}
                className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-2xl border border-border/50 w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Case study available upon request.
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(false);
                    }}
                    className="flex-shrink-0 h-7 w-7 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-3">
                  <a
                    href="mailto:john@john-rodrigues.com"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Request Access
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Responsive aspect ratio: tall on mobile, rectangular on desktop */}
        <div className={`aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden relative ${
          project.id === 19 ? 'bg-white' : 'bg-gradient-to-b from-gray-50 to-gray-100'
        }`}>
          {displayThumbnailVideo ? (
            <video
              src={project.thumbnailVideo}
              className={`w-full h-full ${
                project.id === 19 ? 'object-contain object-center' : 'object-cover object-top'
              }`}
              style={{
                objectPosition: project.id === 15 ? '0% center' : project.id === 19 ? 'center center' : 'center top',
                transform: project.id === 15 ? 'translateX(-20%)' : 'none'
              }}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : project.id === 2 ? (
            <img
              src={project.image}
              alt={displayTitle}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img
              src={project.image}
              alt={displayTitle}
              className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                project.id === 4 ? 'opacity-0' : 'group-hover:scale-105'
              }`}
            />
          )}
          {project.id === 4 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-lg px-4 py-2 bg-black/60 rounded-lg backdrop-blur-sm">
                Coming Soon
              </span>
            </div>
          )}
        </div>
        {/* Minimal text at bottom */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate flex-1">{displayTitle}</h3>
            </div>
            {displayLogo && (
              <img 
                src={displayLogo} 
                alt="Company logo" 
                className="h-4 w-auto object-contain flex-shrink-0"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground/70 truncate flex-1">{displayDescription}</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {(project as any).businessCategory && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100/40 text-gray-700/40 dark:bg-gray-800/30 dark:text-gray-300/40">
                  {(project as any).businessCategory}
                </span>
              )}
              {(project as any).secondaryTag && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100/40 text-gray-600/40 dark:bg-gray-800/20 dark:text-gray-400/40">
                  {(project as any).secondaryTag}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      ref={ref}
      className={`group overflow-hidden border-0 bg-white transition-all duration-500 cursor-pointer rounded-2xl relative ${
        isInView ? 'blur-0' : 'blur-lg'
      }`}
      style={{
        boxShadow: '0 2px 40px rgba(0, 0, 0, 0.03), 0 1px 20px rgba(0, 0, 0, 0.015)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 40px rgba(0, 0, 0, 0.06), 0 2px 20px rgba(0, 0, 0, 0.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.04), 0 1px 15px rgba(0, 0, 0, 0.02)';
      }}
      onClick={() => {
        if ((project as any).showRequestModal) {
          setShowModal(true);
        } else if (project.link) {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        } else {
          navigate(`/case-study?project=${project.id}`);
        }
      }}
    >
      {/* Request Snackbar - Center of card */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[50] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm rounded-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-2xl border border-border/50 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Case study available upon request.
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(false);
                  }}
                  className="flex-shrink-0 h-7 w-7 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3">
                <a
                  href="mailto:john@john-rodrigues.com"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Request Access
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Video/Image Container - Rectangular shape */}
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 relative">
        {displayVideo ? (
          <video
            src={project.video}
            className="w-full h-full object-cover object-top"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : displayThumbnailVideo ? (
          <video
            src={project.thumbnailVideo}
            className="w-full h-full object-cover object-top"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : project.id === 2 ? (
          <img
            src={project.image}
            alt={displayTitle}
            className={`w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ${(project as any).blurThumbnail ? 'blur-[3px]' : ''}`}
          />
        ) : (
          <img
            src={project.image}
            alt={displayTitle}
            className={`w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ${(project as any).blurThumbnail ? 'blur-[3px]' : ''}`}
          />
        )}
      </div>

      {/* Text at bottom */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-medium text-foreground truncate">{displayTitle}</h3>
      </div>
    </Card>
  );
}

function PastProjectListItem({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className={`flex gap-4 py-3 sm:py-4 cursor-pointer hover:bg-muted/30 rounded-lg transition-colors px-2 -mx-2 ${
        isInView ? 'blur-0' : 'blur-lg'
      }`}
      onClick={() => {
        if (project.link) {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        } else {
          navigate(`/case-study?project=${project.id}`);
        }
      }}
    >
      {/* Small Thumbnail */}
      <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-background">
        {project.thumbnailVideo ? (
          <video
            src={project.thumbnailVideo}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : project.id === 2 ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover ${(project as any).blurThumbnail ? 'blur-[3px]' : ''}`}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
}

function PlaybookCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [isDark, setIsDark] = useState(false);

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

  const chaseLogo = chaseLogoLight;

  return (
    <Card 
      ref={ref}
      className={`group overflow-visible border-[0.5px] border-border/30 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/60 hover:to-muted/40 transition-all duration-500 mt-8 mb-8 mx-4 sm:mt-12 sm:mb-12 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-border/20 dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] min-h-[300px] flex items-center transition-all duration-500 ${
        isInView ? 'blur-0' : 'blur-lg'
      }`}
    >
      <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-6 md:p-8 w-full justify-items-center md:justify-items-start my-4 mx-4 sm:my-6 sm:mx-6 md:my-12 md:mx-12 lg:my-16 lg:mx-16 xl:my-20 xl:mx-20">
        {/* 3D Book */}
        <div className="relative flex items-center justify-center ml-0 md:-ml-8 w-full md:w-auto">
          <div className="relative perspective-1000" style={{ transform: 'rotateY(-15deg)' }}>
            {/* Book Pages Stack - On the right side, tucked inside */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-white dark:bg-gray-100 rounded-r-sm shadow-lg" style={{ transform: 'translateX(8px)', zIndex: 0 }} />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gray-50 dark:bg-gray-200 rounded-r-sm" style={{ transform: 'translateX(6px)', zIndex: 1 }} />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white dark:bg-gray-100 rounded-r-sm" style={{ transform: 'translateX(4px)', zIndex: 2 }} />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-50 dark:bg-gray-200 rounded-r-sm" style={{ transform: 'translateX(2px)', zIndex: 3 }} />
            
            {/* Front Cover */}
            <div className="relative aspect-[3/4] w-36 sm:w-40 md:w-48 bg-black rounded-lg overflow-hidden" style={{ 
              transform: 'translateZ(0px)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 15px 40px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)',
              zIndex: 10
            }}>
              <div className="p-6 h-full flex flex-col justify-between text-white relative">
                <div>
                  {/* Logo */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      {/* Substack Logo */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs opacity-80 mb-1">AI Design</div>
                  <h2 className="text-3xl font-medium mb-2 leading-tight">Playbook</h2>
                </div>
              </div>
              {/* Book spine effect */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/40 to-transparent rounded-l-lg pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Book Details */}
        <div className="flex flex-col gap-4 text-center md:text-left w-full md:w-auto">
          <div className="w-full">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground">AI Design Playbook</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 leading-tight text-sm sm:text-base opacity-90 max-w-md mx-auto md:mx-0">
              A comprehensive guide to integrating AI as a foundational layer in your products through strategy, design, and prototyping.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="h-6 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <img 
                  src="https://cdn.simpleicons.org/apple/000000" 
                  alt="Apple" 
                  className="h-6 w-6 transition-all object-contain object-center dark:invert"
                  style={{ display: 'block' }}
                />
              </div>
              <div className="h-6 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <img 
                  src={googleLogo} 
                  alt="Google" 
                  className="h-6 w-auto transition-all object-contain object-center"
                />
              </div>
              <div className="h-6 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <img 
                  src={stanfordLogo} 
                  alt="Stanford" 
                  className="h-6 w-auto transition-all object-contain object-center"
                />
              </div>
              <div className="h-6 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <img 
                  src={chaseLogo} 
                  alt="Chase" 
                  className="h-6 w-auto transition-all object-contain object-center"
                />
              </div>
            </div>
          </div>
          <Button 
            className="rounded-full w-fit mx-auto md:mx-0 group/btn hover:gap-3 transition-all duration-300" 
            size="lg"
            asChild
          >
            <a 
              href="https://johnrodrigues.substack.com/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get the Playbook
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}


function AllProjectsCard({ project, reducedHeight, slightlyReducedHeight, square }: { project: typeof projects[0]; reducedHeight?: boolean; slightlyReducedHeight?: boolean; square?: boolean }) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card
        ref={ref}
        className={`group overflow-hidden border-0 bg-white transition-all duration-700 cursor-pointer rounded-2xl h-full flex flex-col relative ${
          isInView ? 'blur-0 opacity-100 scale-100' : 'blur-sm opacity-50 scale-95'
        }`}
        style={{
          boxShadow: '0 2px 40px rgba(0, 0, 0, 0.03), 0 1px 20px rgba(0, 0, 0, 0.015)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 40px rgba(0, 0, 0, 0.06), 0 2px 20px rgba(0, 0, 0, 0.03)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.04), 0 1px 15px rgba(0, 0, 0, 0.02)';
        }}
        onClick={() => {
          if ((project as any).showRequestModal) {
            setShowModal(true);
          } else if (project.link) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
          } else {
            navigate(`/case-study?project=${project.id}`);
          }
        }}
      >
        {/* Request Snackbar - Center of card */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-[50] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm rounded-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8
                }}
                className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-2xl border border-border/50 w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Case study available upon request.
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(false);
                    }}
                    className="flex-shrink-0 h-7 w-7 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-3">
                  <a
                    href="mailto:john@john-rodrigues.com"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Request Access
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
      {/* Responsive aspect ratio: tall on mobile, shorter on desktop */}
      <div className={`${
        square ? 'aspect-square' :
        reducedHeight ? 'aspect-[16/9] md:aspect-[16/9] lg:aspect-[16/9]' : 
        slightlyReducedHeight ? 'aspect-[4/5] md:aspect-[5/6] lg:aspect-[3/4]' :
        'aspect-[3/4] md:aspect-[4/5] lg:aspect-[5/6]'
      } overflow-hidden relative ${
        project.id === 7 ? 'bg-gray-100' :
        project.id === 19 ? 'bg-white' :
        project.id === 20 ? 'bg-gradient-to-b from-gray-50 to-gray-100' :
        'bg-gradient-to-b from-gray-50 to-gray-100'
      } ${project.id === 20 ? 'pb-4' : ''}`}>
        {(project as any).showBlankThumbnail ? (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800/50" />
        ) : (project as any).isComingSoon ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200/50 gap-3">
            {project.companyLogo && (
              <img
                src={project.companyLogo}
                alt="Company logo"
                className="h-8 w-auto object-contain opacity-60"
              />
            )}
            <span className="text-muted-foreground text-sm font-medium">Coming Soon</span>
          </div>
        ) : project.thumbnailVideo ? (
          <video
            src={project.thumbnailVideo}
            className={`w-full h-full ${
              project.id === 1
                ? 'object-contain object-center scale-150'
                : project.id === 19
                ? 'object-contain object-center'
                : project.id === 20
                ? 'object-contain object-top'
                : 'object-cover object-top'
            }`}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : project.id === 2 ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : project.id === 7 ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain object-center"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover object-top transition-transform duration-500 ${
              project.id === 4 ? 'opacity-0' : 'group-hover:scale-105'
            } ${(project as any).blurThumbnail ? 'blur-[3px]' : ''}`}
          />
        )}
      </div>
      {/* Text Content */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate flex-1 flex items-center gap-1.5">{project.title}{(project as any).blurThumbnail && <Lock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}</h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {(project as any).businessCategory && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300">
                  {(project as any).businessCategory}
                </span>
              )}
              {(project as any).secondaryTag && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400">
                  {(project as any).secondaryTag}
                </span>
              )}
            </div>
          </div>
          {project.companyLogo && (
            <img
              src={project.companyLogo}
              alt="Company logo"
              className="h-4 w-auto object-contain flex-shrink-0"
            />
          )}
        </div>
        {!(project as any).isHackathonWinner ? (
          <p className="text-xs text-muted-foreground/70 truncate">{project.description}</p>
        ) : (
          <div>
            <p className="text-xs text-muted-foreground/70 leading-tight mb-1.5">
              {(project as any).hackathonText}
            </p>
            <div className="flex items-center gap-1.5">
              {(project as any).hackathonLogos && (project as any).hackathonLogos.map((logo: any, idx: number) => (
                <img
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-3 w-auto object-contain opacity-60"
                />
              ))}
              {!(project as any).hackathonLogos && (
                <>
                  <span className="text-[8px] text-muted-foreground/50 font-medium">OpenAI</span>
                  <span className="text-[8px] text-muted-foreground/50 font-medium">•</span>
                  <span className="text-[8px] text-muted-foreground/50 font-medium">Lovable</span>
                  <span className="text-[8px] text-muted-foreground/50 font-medium">•</span>
                  <span className="text-[8px] text-muted-foreground/50 font-medium">AGI Inc.</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
    </>
  );
}

function ListProjectCard({ project }: { project: typeof projects[0] }) {
  const navigate = useNavigate();
  
  return (
    <div
      className="group flex items-center gap-6 py-4 cursor-pointer transition-opacity hover:opacity-80"
      onClick={() => {
        if (project.link) {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        } else {
          navigate(`/case-study?project=${project.id}`);
        }
      }}
    >
      {/* Thumbnail - Square and Larger */}
      <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
        {(project as any).isComingSoon ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200/50">
            {project.companyLogo && (
              <img
                src={project.companyLogo}
                alt="Company logo"
                className="h-10 w-auto object-contain opacity-60"
              />
            )}
          </div>
        ) : project.thumbnailVideo ? (
          <video
            src={project.thumbnailVideo}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (project as any).showBlankThumbnail ? (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800/50" />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover ${(project as any).blurThumbnail ? 'blur-[3px]' : ''}`}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-lg font-medium text-foreground truncate flex items-center gap-1.5">{project.title}{(project as any).blurThumbnail && <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />}</h3>
          {project.companyLogo && (
            <img
              src={project.companyLogo}
              alt="Company logo"
              className="h-5 w-auto object-contain flex-shrink-0"
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground/70 truncate">{project.description}</p>
      </div>
    </div>
  );
}

function CompactProjectCard({ project }: { project: typeof projects[0] }) {
  const navigate = useNavigate();
  
  return (
    <Card
      className="group overflow-hidden border-0 bg-white transition-all duration-500 cursor-pointer rounded-xl flex-shrink-0"
      style={{
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.03), 0 1px 10px rgba(0, 0, 0, 0.015)',
        width: '280px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.06), 0 2px 15px rgba(0, 0, 0, 0.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.03), 0 1px 10px rgba(0, 0, 0, 0.015)';
      }}
      onClick={() => {
        if (project.link) {
          window.open(project.link, '_blank', 'noopener,noreferrer');
        } else {
          navigate(`/case-study?project=${project.id}`);
        }
      }}
    >
      {/* Compact aspect ratio */}
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 relative">
        {(project as any).isComingSoon ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 text-muted-foreground text-xs font-medium">
            Coming Soon
          </div>
        ) : project.thumbnailVideo ? (
          <video
            src={project.thumbnailVideo}
            className="w-full h-full object-cover object-top"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : project.id === 2 ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover object-top transition-transform duration-500 ${
              project.id === 4 ? 'opacity-0' : 'group-hover:scale-105'
            } ${(project as any).blurThumbnail ? 'blur-[3px]' : ''}`}
          />
        )}
      </div>
      {/* Text Content - Compact */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-xs font-medium text-foreground truncate flex-1 flex items-center gap-1">{project.title}{(project as any).blurThumbnail && <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />}</h3>
          {project.companyLogo && (
            <img
              src={project.companyLogo}
              alt="Company logo"
              className="h-3 w-auto object-contain flex-shrink-0"
            />
          )}
        </div>
        <p className="text-[10px] text-muted-foreground/70 truncate">{project.description}</p>
      </div>
    </Card>
  );
}

export function WorkGrid({ showTabs = false, activeTab: externalActiveTab }: WorkGridProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(externalActiveTab || "explorations");
  const [categoryTab, setCategoryTab] = useState("Mobile");
  
  // Use external tab if provided, otherwise use internal state
  const activeTab = externalActiveTab || internalActiveTab;

  // Function to play click sound - realistic button click
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Create a quick pop sound with two frequencies (low + high)
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Low frequency for the "thud" of button press
      oscillator1.frequency.setValueAtTime(150, now);
      oscillator1.type = 'sine';
      
      // High frequency for the "click" sound
      oscillator2.frequency.setValueAtTime(800, now);
      oscillator2.type = 'sine';
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Quick attack and decay for button-like sound
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.001);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
      
      oscillator1.start(now);
      oscillator1.stop(now + 0.03);
      oscillator2.start(now);
      oscillator2.stop(now + 0.03);
    } catch (error) {
      // Silently fail if audio context is not available
      console.debug('Audio context not available');
    }
  };

  const handleCategoryTabChange = (tab: string) => {
    playClickSound();
    setCategoryTab(tab);
  };

  const tabItems = [
    { id: "explorations", label: "Prototypes & Experiments" },
    { id: "all-projects", label: "All Projects" },
  ];

  // Determine which projects to show based on the active tab
  let displayProjects: typeof projects;
  
  // Check if this is the home page (no tabs, no external tab specified)
  const isHomePage = !showTabs && !externalActiveTab;
  
  if (isHomePage) {
    // Custom order for home page: Digital Commercial Banking Platform, Outfix, Balance Transfer (full width), Eva AI, Ollie AI, UX AI Agent (full width), AI Insights App, No-Scroll App, Budgeting AI Agent, My Toca App
    const digitalCommercialBanking = projects.find(p => p.id === 16); // Digital Commercial Banking Platform
    const outfix = projects.find(p => p.id === 20); // Outfix
    const balanceTransfer = projects.find(p => p.id === 3); // Balance transfer for Citibank
    const aiProductivityOS = projects.find(p => p.id === 15); // Eva AI
    const ollieAI = projects.find(p => p.id === 21); // Ollie AI
    const uxAIAgent = projects.find(p => p.id === 13); // UX AI Agent
    const aiInsights = projects.find(p => p.id === 1); // AI Insights app for Citibank
    const noScrollApp = projects.find(p => p.id === 2); // No-scroll app, iOS app
    const budgetingAIAgent = projects.find(p => p.id === 19); // Budgeting AI Agent
    const tocaApp = projects.find(p => p.id === 5); // My Toca App

    // Return in specified order, filtering out undefined
    // First row: digitalCommercialBanking (full width)
    // Second row: outfix (full width)
    // Third row: balanceTransfer (full width)
    // Fourth row: aiProductivityOS (full width)
    // Fifth row: ollieAI (full width)
    // Sixth row: aiInsights, budgetingAIAgent
    // Seventh row: uxAIAgent (full width)
    // Eighth row: noScrollApp, tocaApp
    displayProjects = [digitalCommercialBanking, outfix, balanceTransfer, aiProductivityOS, ollieAI, aiInsights, budgetingAIAgent, uxAIAgent, noScrollApp, tocaApp].filter(Boolean) as typeof projects;
  } else if (activeTab === "explorations") {
    // Show only first 5 cards for explorations, exclude project 0, 4 and 10
    displayProjects = projects.filter((project) => project.id <= 5 && project.id !== 0 && project.id !== 4 && project.id !== 10);
  } else if (activeTab === "all-projects") {
    // Show ALL projects - explicitly include all commercial, all-projects-only, and past-projects
    // Expected projects to show:
    // - All commercial: IDs 1, 2, 3, 4, 5, 6, 10 (WatchOS), 11, 12 (VR), 13 (UX AI Agent), 14
    // - All-projects-only: ID 7 (3D Printing)
    // - Past-projects (without duplicates): IDs 8, 9
    // Total: 14 projects
    
    const seenIds = new Set<number>();
    const allProjects: typeof projects = [];
    
    // First: Add all commercial and all-projects-only projects, exclude project 0
    projects.forEach((project) => {
      if ((project.category === "commercial" || project.category === "all-projects-only") && !seenIds.has(project.id) && project.id !== 0) {
        allProjects.push(project);
        seenIds.add(project.id);
      }
    });
    
    // Second: Add past-projects that don't have duplicate IDs (IDs 8, 9 only, as 10, 11, 12 are duplicates)
    projects.forEach((project) => {
      if (project.category === "past-projects" && !seenIds.has(project.id)) {
        allProjects.push(project);
        seenIds.add(project.id);
      }
    });
    
    // Sort by ID
    allProjects.sort((a, b) => a.id - b.id);
    
    // Find WatchOS project (id: 10) - Meditation WatchOS App
    const watchOS = allProjects.find(p => p.id === 10 && p.title === "Meditation WatchOS App");
    
    // Get all other projects (excluding WatchOS)
    const otherProjects = allProjects.filter(p => !(p.id === 10 && p.title === "Meditation WatchOS App"));
    
    // Insert WatchOS at position 5 (second row, middle position in 3-column grid)
    if (watchOS && otherProjects.length >= 4) {
      displayProjects = [...otherProjects.slice(0, 4), watchOS, ...otherProjects.slice(4)];
    } else if (watchOS) {
      displayProjects = [...otherProjects, watchOS];
    } else {
      displayProjects = allProjects;
    }
  } else {
    // Default: empty array
    displayProjects = [];
  }

  // Move all "Coming Soon" projects to the bottom
  displayProjects.sort((a, b) => {
    const aIsComingSoon = (a as any).isComingSoon ? 1 : 0;
    const bIsComingSoon = (b as any).isComingSoon ? 1 : 0;
    return aIsComingSoon - bIsComingSoon;
  });

  return (
    <section id="work-section" className={`pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 ${showTabs || externalActiveTab ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className={`${showTabs || externalActiveTab ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16`}>
        {showTabs ? (
          <>
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center p-1 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setInternalActiveTab(tab.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-gray-800 text-foreground shadow-sm scale-100"
                        : "text-muted-foreground hover:text-foreground hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "explorations" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20 xl:gap-x-20 xl:gap-y-24">
                {displayProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} showTabs={showTabs} />
                ))}
              </div>
            ) : activeTab === "all-projects" ? (
              <>
                {/* 3 columns Grid with square cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  {displayProjects.map((project) => (
                    <AllProjectsCard key={project.id} project={project} square={true} />
                  ))}
                </div>
              </>
            ) : null}
          </>
        ) : externalActiveTab ? (
          // Direct navigation to All Projects or Explorations (no tabs)
          activeTab === "explorations" ? (
            <>
              {/* Header Section */}
              <div className="mb-12 text-left">
                <h1 className="text-xl lg:text-2xl font-semibold text-foreground tracking-tight mb-4">
                  Prototypes & Experiments
                </h1>
                <p className="text-sm lg:text-base text-muted-foreground/80 max-w-2xl">
                  I explore interactions, new interactions for AI, and sometimes simplify interactions to combine in design and code.
                </p>
              </div>
              {/* Projects Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20 xl:gap-x-20 xl:gap-y-24">
                {displayProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} showTabs={true} />
                ))}
              </div>
            </>
          ) : activeTab === "all-projects" ? (
            <>
              {/* 3 columns Grid with square cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {displayProjects.map((project) => (
                  <AllProjectsCard key={project.id} project={project} square={true} />
                ))}
              </div>
            </>
          ) : null
        ) : (
          <>
            {/* Category Tabs - Hidden for now */}
            <div className="hidden justify-start mb-12">
              <div className="inline-flex items-center p-1 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
                {["Mobile", "Web"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleCategoryTabChange(tab)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      categoryTab === tab
                        ? "bg-white dark:bg-gray-800 text-foreground shadow-sm scale-100"
                        : "text-muted-foreground hover:text-foreground hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content Container */}
            <div className="relative min-h-[400px]">
              {/* Mobile Tab - 2x2 Grid - All mobile projects */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  categoryTab === "Mobile"
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 translate-y-4 invisible absolute inset-0"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 mb-12 items-stretch">
                  {displayProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`h-full ${project.id === 16 || project.id === 20 || project.id === 3 || project.id === 15 || project.id === 21 || project.id === 13 ? 'sm:col-span-2' : ''}`}
                    >
                      <AllProjectsCard
                        project={project}
                        {...(project.id === 16 || project.id === 20 || project.id === 3 || project.id === 15 || project.id === 21 || project.id === 13 ? { reducedHeight: true } : { slightlyReducedHeight: true })}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Web Tab - Two cards, full width */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  categoryTab === "Web"
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 translate-y-4 invisible absolute inset-0"
                }`}
              >
                {(() => {
                  const uxAgentProject = projects.find(p => p.id === 13); // UX AI Agent (V2UXAgent)
                  const webProject = projects.find(p => p.id === 16); // Digital Commercial Banking Platform
                  const webProjects = [uxAgentProject, webProject].filter(Boolean) as typeof projects;
                  return (
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 mb-12 items-stretch">
                      {webProjects.map((project) => (
                        <div key={project.id} className="h-full">
                          <AllProjectsCard project={project} reducedHeight={true} />
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>


          </>
        )}
      </div>

      {/* Get the Guide Card - Full Width Gray Background */}
      {!showTabs && !externalActiveTab && (
        <div className="bg-gray-50 dark:bg-gray-900/50 w-screen mt-12 py-12 lg:py-16" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <PlaybookCard />
          </div>
        </div>
      )}

      {/* Testimonials Section - Horizontal Scrolling Marquee */}
      {!showTabs && !externalActiveTab && (
        <div className="w-full py-16 bg-white" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
          <div className="relative overflow-hidden">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <div 
              className="flex gap-6 animate-scroll-testimonials pl-6"
              style={{
                width: 'max-content',
              }}
            >
              {/* First set of testimonials */}
              {[
                {
                  id: 0,
                  text: "Yay!!! Thank you John! You literally explained auto layout today so effortlessly. I understand it more now than ever before. I'm considering taking your course, so I can take my Figma skills up a notch.",
                  author: "Yariela B",
                  role: "UX Designer",
                  companyLogo: googleLogo,
                },
                {
                  id: 1,
                  text: "Had an amazing chat with John. We exchanged some interesting resources and talked about the importance to understand the value of a designer.",
                  author: "Lucas W",
                  role: "Product Designer",
                  companyLogo: appleLogo,
                },
                {
                  id: 2,
                  text: "John has shown tremendous value as a UX designer. This year, he has answered every challenge in taking on additional responsibility in project management, client relationship building and increased design ownership and delivery.",
                  author: "Zachary E",
                  role: "Creative Director, VP",
                  companyLogo: citiLogo,
                },
                {
                  id: 3,
                  text: "His thoughtful ideas and entrepreneurship have enhanced our team's collaboration. His design works have significantly boosted visibility and impact across all product areas. His keen eye for UX heuristics and resourcefulness with new technologies are impressive.",
                  author: "Kristian K",
                  role: "Product Designer, VP",
                  companyLogo: chaseLogoLight,
                },
                {
                  id: 4,
                  text: "Thank you for the great communication, collaboration and execution! Working with John has been a real pleasure. The new design makes No Scroll feel like a brand new app. If you're considering working with John, don't hesitate.",
                  author: "Andrew",
                  role: "Founder of No Scroll App",
                },
                {
                  id: 5,
                  text: "Collaborating with John was both easy and productive. John provided valuable insights into product development and user experience that truly enhanced our project to move to the next level. I highly recommend John.",
                  author: "Edward Petkovicz",
                  role: "faxion.ai",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-[350px] bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200/50 shadow-sm"
                >
                  <p className="text-base leading-relaxed mb-4 text-muted-foreground/80 line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  <div className="pt-4 border-t border-border/30">
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">{testimonial.role}</p>
                    {testimonial.companyLogo && (
                      <div className="mt-4 flex items-center">
                        <img 
                          src={testimonial.companyLogo} 
                          alt="Company logo" 
                          className="h-5 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                {
                  id: 0,
                  text: "Yay!!! Thank you John! You literally explained auto layout today so effortlessly. I understand it more now than ever before. I'm considering taking your course, so I can take my Figma skills up a notch.",
                  author: "Yariela B",
                  role: "UX Designer",
                  companyLogo: googleLogo,
                },
                {
                  id: 1,
                  text: "Had an amazing chat with John. We exchanged some interesting resources and talked about the importance to understand the value of a designer.",
                  author: "Lucas W",
                  role: "Product Designer",
                  companyLogo: appleLogo,
                },
                {
                  id: 2,
                  text: "John has shown tremendous value as a UX designer. This year, he has answered every challenge in taking on additional responsibility in project management, client relationship building and increased design ownership and delivery.",
                  author: "Zachary E",
                  role: "Creative Director, VP",
                  companyLogo: citiLogo,
                },
                {
                  id: 3,
                  text: "His thoughtful ideas and entrepreneurship have enhanced our team's collaboration. His design works have significantly boosted visibility and impact across all product areas. His keen eye for UX heuristics and resourcefulness with new technologies are impressive.",
                  author: "Kristian K",
                  role: "Product Designer, VP",
                  companyLogo: chaseLogoLight,
                },
                {
                  id: 4,
                  text: "Thank you for the great communication, collaboration and execution! Working with John has been a real pleasure. The new design makes No Scroll feel like a brand new app. If you're considering working with John, don't hesitate.",
                  author: "Andrew",
                  role: "Founder of No Scroll App",
                },
                {
                  id: 5,
                  text: "Collaborating with John was both easy and productive. John provided valuable insights into product development and user experience that truly enhanced our project to move to the next level. I highly recommend John.",
                  author: "Edward Petkovicz",
                  role: "faxion.ai",
                },
              ].map((testimonial) => (
                <div
                  key={`dup-${testimonial.id}`}
                  className="flex-shrink-0 w-[350px] bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200/50 shadow-sm"
                >
                  <p className="text-base leading-relaxed mb-4 text-muted-foreground/80 line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  <div className="pt-4 border-t border-border/30">
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">{testimonial.role}</p>
                    {testimonial.companyLogo && (
                      <div className="mt-4 flex items-center">
                        <img 
                          src={testimonial.companyLogo} 
                          alt="Company logo" 
                          className="h-5 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      {!showTabs && !externalActiveTab && (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-8">
          <KPICardsWithHoverEffects />
        </div>
      )}
    </section>
  );
}
