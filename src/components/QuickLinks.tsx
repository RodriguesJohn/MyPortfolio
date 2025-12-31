import { useEffect, useState, useRef } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/PP.jpg";
import chaseLogoDark from "@/assets/Chase.png";
import chaseLogoLight from "@/assets/ChaseLightMOde.png";
import citiLogo from "@/assets/Citi.svg.png";
import tocaLogoWhite from "@/assets/toca White.png";
import tocaLogoDark from "@/assets/Toca.png";
import googleLogo from "@/assets/GoogleLogog.png";
import stanfordLogo from "@/assets/Standford.png";
import { Linkedin, Twitter, Github } from "lucide-react";

interface QuickLinksProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
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

  const chaseLogo = isDark ? chaseLogoDark : chaseLogoLight;

  return (
    <>
      <style>{`
        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0);
          }
        }
      `}</style>
      <Card 
        ref={ref}
        className={`group overflow-visible border-[0.5px] border-border/30 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/60 hover:to-muted/40 transition-all duration-500 mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-border/20 dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] min-h-[300px] sm:min-h-[400px] flex items-center transition-all duration-500 ${
          isInView ? 'blur-0' : 'blur-lg'
        }`}
      >
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 w-full">
        {/* 3D Book */}
        <div className="relative flex items-center justify-center md:-ml-8">
          <div className="relative perspective-1000" style={{ transform: 'rotateY(-15deg)' }}>
            {/* Book Pages Stack - On the right side, tucked inside */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-white dark:bg-gray-100 rounded-r-sm shadow-lg" style={{ transform: 'translateX(8px)', zIndex: 0 }} />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gray-50 dark:bg-gray-200 rounded-r-sm" style={{ transform: 'translateX(6px)', zIndex: 1 }} />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white dark:bg-gray-100 rounded-r-sm" style={{ transform: 'translateX(4px)', zIndex: 2 }} />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-50 dark:bg-gray-200 rounded-r-sm" style={{ transform: 'translateX(2px)', zIndex: 3 }} />
            
            {/* Front Cover */}
            <div className="relative aspect-[3/4] w-40 sm:w-48 bg-black rounded-lg overflow-hidden" style={{ 
              transform: 'translateZ(0px)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 15px 40px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)',
              zIndex: 10
            }}>
              <div className="p-3 sm:p-4 md:p-6 h-full flex flex-col justify-between text-white relative">
                <div className="flex-1 flex flex-col">
                  {/* Logo */}
                  <div className="mb-1.5 sm:mb-2 md:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      {/* Substack Logo */}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs opacity-80 mb-0.5 sm:mb-1">AI Design</div>
                  <h2 className="text-sm sm:text-2xl md:text-3xl font-medium leading-[1.1]">Playbook</h2>
                </div>
              </div>
              {/* Book spine effect */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/40 to-transparent rounded-l-lg pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Book Details */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center md:items-start text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-foreground">AI Design Playbook</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 leading-tight text-sm sm:text-base opacity-60 max-w-md">
              Writing about AI & design for leaders. Sharing behind-the-scenes AI explorations, industry trends, guides, and resources. Join 1,600+ AI enthusiasts.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6 justify-center md:justify-start flex-wrap">
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
            className="rounded-full w-fit group/btn hover:gap-3 transition-all duration-300 hover:animate-none" 
            style={{
              animation: 'gentle-pulse 2s ease-in-out infinite'
            }}
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
    </>
  );
}

export function QuickLinks({ activeTab, onTabChange }: QuickLinksProps) {
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

  const tocaLogo = isDark ? tocaLogoWhite : tocaLogoDark;
  const chaseLogo = isDark ? chaseLogoDark : chaseLogoLight;

  const mainLinks = [
    {
      id: 3,
      title: "My Portfolio",
      url: "https://john-rodrigues.com/",
      description: "Looking for a design partner on mobile apps? Get in touch.",
    },
  ];

  const socialLinks = [
    {
      id: 1,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/john-rodrigues4/",
      icon: Linkedin,
    },
    {
      id: 2,
      name: "X (Twitter)",
      url: "https://x.com/john_rodrigues_",
      icon: Twitter,
    },
    {
      id: 3,
      name: "GitHub",
      url: "https://github.com/RodriguesJohn",
      icon: Github,
    },
    {
      id: 4,
      name: "Threads",
      url: "https://www.threads.com/@johnrodriguesb?hl=en",
      icon: null,
      imageUrl: "https://cdn.inspireuplift.com/uploads/images/seller_products/1688676356_Untitled-1.png",
    },
    {
      id: 5,
      name: "Substack",
      url: "https://johnrodrigues.substack.com/?utm_campaign=profile_chips",
      icon: null,
      svg: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="pt-4 pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-muted overflow-hidden flex-shrink-0 mb-6">
              <img
                src={profileImage}
                alt="John Rodrigues"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold mb-2 sm:mb-3 text-black dark:text-white tracking-[-0.02em] leading-[1.1] px-4">John Rodrigues</h2>
            
            <div className="text-sm sm:text-base lg:text-lg text-foreground font-medium leading-relaxed flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 mb-4 sm:mb-6 px-4">
              <span>AI-Native Product Designer</span>
              <span className="text-muted-foreground/40 hidden sm:inline">•</span>
              <span className="text-muted-foreground/60 block sm:inline w-full sm:w-auto font-medium">Based in San Francisco Bay Area</span>
            </div>
            
            <p className="text-sm sm:text-sm lg:text-base text-muted-foreground/40 leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12 px-4">
              I help forward-thinking teams design, prototype and ship agentic products grounded in high-craft & human-centered UX.
            </p>
          </div>

          {/* AI Design Playbook Card */}
          <PlaybookCard />

          <div className="flex flex-col gap-4 mb-12">
            {mainLinks.map((link) => {
              const isInternal = link.url === "https://john-rodrigues.com/";
              
              if (isInternal) {
                return (
                  <button
                    key={link.id}
                    onClick={() => onTabChange("Work Highlights")}
                    className="group w-full flex items-center justify-between p-6 rounded-lg bg-background hover:bg-muted transition-all shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border-[0.5px] border-border/30 text-left"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1 text-black dark:text-white group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-black/60 dark:text-muted-foreground opacity-60 dark:opacity-60">{link.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-black/60 dark:text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-4 opacity-60 dark:opacity-60" />
                  </button>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-6 rounded-lg bg-background hover:bg-muted transition-all shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border-[0.5px] border-border/30"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1 text-black dark:text-white group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-black/60 dark:text-muted-foreground opacity-60 dark:opacity-60">{link.description}</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-black/60 dark:text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-4 opacity-60 dark:opacity-60" />
                </a>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.name}
              >
                {link.icon && <link.icon className="h-6 w-6" />}
                {link.imageUrl && (
                  <img
                    src={link.imageUrl}
                    alt={link.name}
                    className="h-6 w-6"
                  />
                )}
                {link.svg && link.svg}
              </a>
          ))}
        </div>
      </div>
    </section>
  );
}

