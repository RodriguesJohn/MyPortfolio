import { useEffect, useState, useRef } from "react";
import profileImage from "@/assets/PP.jpg";
import chaseLogoDark from "@/assets/Chase.png";
import chaseLogoLight from "@/assets/ChaseLightMOde.png";
import citiLogo from "@/assets/Citi.svg.png";
import tocaLogoWhite from "@/assets/toca White.png";
import tocaLogoDark from "@/assets/Toca.png";
import googleLogo from "@/assets/GoogleLogog.png";
import metaLogo from "@/assets/Meta-Emblem.png";
import appleLogo from "@/assets/Apple-Logo.png";
import intercomLogo from "@/assets/intercom-2.svg";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, GraduationCap, Briefcase } from "lucide-react";
import { KPICardsWithHoverEffects } from "@/components/ui/kpi-cards-with-hover-effects";
import { Card } from "@/components/ui/card";
import { useInView } from "framer-motion";
import {
  IconCalendar,
  IconUsers,
} from "@tabler/icons-react";

interface HeroProps {
  onChatClick: () => void;
  onWorkClick: () => void;
  activeTab?: string;
}

function ConsultingKPICard({
  value,
  suffix,
  label,
  icon,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 3000;
    const steps = 120;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(Math.floor(increment * currentStep), value);
      setDisplayValue(nextValue);

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="h-full">
      <Card className="flex flex-col h-full py-8 md:py-10 relative group/kpi transition-shadow duration-300 border-[0.5px] border-border/30 dark:border-border/20 bg-card shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
        <div className="opacity-0 group-hover/kpi:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none rounded-lg" />
        <div className="mb-4 relative z-10 px-6 md:px-10 text-neutral-600 dark:text-neutral-400 opacity-60">
          {icon}
        </div>
        <div className="text-4xl font-semibold mb-2 relative z-10 px-6 md:px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/kpi:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/kpi:bg-blue-500 transition-all duration-200 origin-center" />
          <span className="group-hover/kpi:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 opacity-100">
            {displayValue}{suffix}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-6 md:px-10 opacity-60 flex-1">
          {label}
        </p>
      </Card>
    </div>
  );
}

function ConsultingKPIs() {
  const kpis = [
    {
      value: 10,
      suffix: "+",
      label: "Years of experience",
      icon: <IconCalendar className="w-6 h-6" />,
    },
    {
      value: 300,
      suffix: "+",
      label: "Number of designers mentored",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      value: 100,
      suffix: "M+",
      label: "Number of users impacted",
      icon: <IconUsers className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 py-10 w-full items-stretch">
      {kpis.map((kpi) => (
        <ConsultingKPICard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}

export function Hero({ onChatClick, onWorkClick, activeTab }: HeroProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Check initial theme
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const tocaLogo = tocaLogoWhite; // Always use white logo for black background
  const chaseLogo = chaseLogoLight; // Always use light logo for black background

  const isConsulting = activeTab === "Consulting";
  const isExplorations = activeTab === "All Projects";

  if (isExplorations) {
    return null;
  }

  return (
    <section className={`-mt-24 sm:-mt-20 md:-mt-16 lg:-mt-12 pt-32 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-8 sm:pb-12 md:pb-16 lg:pb-24 xl:pb-32 w-full ${isConsulting ? 'bg-gray-50 min-h-screen' : 'bg-gray-50'}`}>
      <div className={`${isConsulting ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24`}>
        {/* White Card Container */}
        <div 
          className={`bg-white dark:bg-gray-900/50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-16 relative overflow-hidden ${isConsulting ? '' : 'transition-transform duration-500 ease-out cursor-pointer group'} border border-gray-200/50`}
          style={isConsulting ? {
            boxShadow: '0 4px 60px rgba(0, 0, 0, 0.03), 0 2px 40px rgba(0, 0, 0, 0.015)'
          } : {
            boxShadow: '0 4px 60px rgba(0, 0, 0, 0.03), 0 2px 40px rgba(0, 0, 0, 0.015)',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
          onMouseMove={isConsulting ? undefined : (e) => {
            // Only apply hover effects on non-touch devices
            if (window.matchMedia('(hover: hover)').matches) {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 60;
              const rotateY = (centerX - x) / 60;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              
              // Parallax effect for profile picture - press in effect (move away from mouse)
              const pictureContainer = card.querySelector('.profile-picture-container') as HTMLElement;
              if (pictureContainer) {
                const pictureRect = pictureContainer.getBoundingClientRect();
                const pictureCenterX = pictureRect.left + pictureRect.width / 2 - rect.left;
                const pictureCenterY = pictureRect.top + pictureRect.height / 2 - rect.top;
                
                // When pressing on right side, picture moves left (right side goes in)
                // When pressing on left side, picture moves right (left side goes in)
                const deltaX = x - pictureCenterX;
                const deltaY = y - pictureCenterY;
                const parallaxX = -deltaX / 20; // Move opposite to create press-in effect
                const parallaxY = -deltaY / 20; // Move opposite to create press-in effect
                
                pictureContainer.style.transform = `translate(${parallaxX}px, ${parallaxY}px) rotateX(${-rotateX * 0.5}deg) rotateY(${-rotateY * 0.5}deg)`;
              }
            }
          }}
          onMouseLeave={isConsulting ? undefined : (e) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
              const pictureContainer = e.currentTarget.querySelector('.profile-picture-container') as HTMLElement;
              if (pictureContainer) {
                pictureContainer.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
              }
            }
          }}
        >
          {isConsulting ? (
            /* Consulting Layout - Full Width */
            <div className="w-full">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-8">
                {/* Content - First */}
                <div className="flex-1 w-full lg:order-1 order-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 text-foreground leading-tight tracking-tight">
                    Get 1:1 Consulting and Work Directly with John Rodrigues
                  </h1>
                  
                  <p className="text-base text-muted-foreground/70 mb-4">
                    Trusted by designers and teams at leading companies
                  </p>
                  
                  {/* Company Logos */}
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    {/* Google Logo */}
                    <div className="h-6 w-auto">
                      <img 
                        src={googleLogo} 
                        alt="Google" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    {/* Meta Logo */}
                    <div className="h-6 w-auto">
                      <img 
                        src={metaLogo} 
                        alt="Meta" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    {/* Apple Logo */}
                    <div className="h-6 w-auto">
                      <img 
                        src={appleLogo} 
                        alt="Apple" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    {/* Intercom Logo */}
                    <div className="h-6 w-auto">
                      <img 
                        src={intercomLogo} 
                        alt="Intercom" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    {/* Citi Logo */}
                    <div className="h-6 w-auto">
                      <img 
                        src={citiLogo} 
                        alt="Citi" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    {/* Chase Logo */}
                    <div className="h-6 w-auto">
                      <img 
                        src={chaseLogoLight} 
                        alt="Chase" 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Profile Picture - Full Width on Mobile, Fixed on Desktop */}
                <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end lg:order-2 order-1 mb-6 sm:mb-8 lg:mb-0">
                  <div 
                    className="profile-picture-container w-full h-64 sm:h-80 md:h-96 lg:w-80 lg:h-80 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden"
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <img 
                      src={profileImage} 
                      alt="John Rodrigues" 
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl"
                      style={{ objectPosition: 'center 30%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Divider */}
              <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-12" />
                  
              <div className="space-y-4 sm:space-y-6 w-full mb-8 sm:mb-12">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">What I can help you with</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">AI Product Strategy</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">AI Agent Integration</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">Design Engineering</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">Mobile App Design</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">Career Guidance</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">Direction and Feedback</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">Functional prototyping</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground/70">Advising</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA at Bottom - Aligned with Content */}
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Individual Card */}
                    <Card className="p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border-[0.5px] border-border/30 flex flex-col justify-between h-full transition-all duration-300">
                      <div className="flex flex-col gap-4 sm:gap-6 h-full">
                        <div className="flex flex-col flex-grow">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Individual</h3>
                          </div>
                          <p className="text-sm sm:text-base text-muted-foreground/70 mb-3 sm:mb-4 flex-grow">
                            Ideal for solo founders, designers, and creators who want expert guidance on their product, portfolio, or personal AI project.
                          </p>
                          <div className="flex items-baseline gap-1 mt-auto pt-3 sm:pt-4">
                            <span className="text-xl sm:text-2xl font-semibold text-foreground">$250</span>
                            <span className="text-sm sm:text-base text-muted-foreground/70">/hr</span>
                          </div>
                        </div>
                        
                        <Button
                          size="lg"
                          className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-md hover:shadow-lg"
                        asChild
                      >
                        <a
                          href="https://calendly.com/john-john-rodrigues/30min" 
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Calendar className="h-5 w-5 mr-2" />
                          Book a Call
                        </a>
                      </Button>
                    </div>
                  </Card>

                  {/* Business Card */}
                  <Card className="p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border-[0.5px] border-border/30 flex flex-col justify-between h-full transition-all duration-300">
                    <div className="flex flex-col gap-4 sm:gap-6 h-full">
                      <div className="flex flex-col flex-grow">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Business</h3>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground/70 mb-3 sm:mb-4 flex-grow">
                          Ideal for startups and product teams looking to integrate AI into their mobile experience. Get expert guidance on AI product strategy, prototyping, and design engineering.
                        </p>
                        <div className="flex items-baseline gap-1 mt-auto pt-3 sm:pt-4">
                          <span className="text-xl sm:text-2xl font-semibold text-foreground">$500</span>
                          <span className="text-sm sm:text-base text-muted-foreground/70">/hr</span>
                        </div>
                      </div>
                      
                      <Button
                        size="lg"
                        className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-md hover:shadow-lg"
                        asChild
                      >
                        <a
                          href="https://calendly.com/john-john-rodrigues/for-businesses" 
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Calendar className="h-5 w-5 mr-2" />
                          Book a Call
                        </a>
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Contract Note */}
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground">
                    If you'd like to work in a full-time contract, feel free to <a href="mailto:john@example.com" className="underline hover:text-foreground transition-colors">reach out to me</a>.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Layout */
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8 lg:gap-12 relative z-10 w-full">
              {/* Content - Left Side */}
              <div className="flex-1 text-left w-full order-2 lg:order-1">
                {/* Name */}
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-medium mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-foreground leading-tight tracking-tight">
                  John Rodrigues
                </h1>
                
                {/* Title */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-10">
                  <div className="text-sm sm:text-sm md:text-base lg:text-lg text-foreground font-medium leading-relaxed flex flex-wrap items-center justify-start gap-x-1.5 gap-y-0.5">
                    <span>AI-Native Product Designer & Design Engineer</span>
                    <span className="text-muted-foreground/60 block sm:inline w-full sm:w-auto font-normal text-sm sm:text-sm md:text-base lg:text-lg">Based in San Francisco Bay Area</span>
                  </div>
                <p className="text-sm sm:text-sm md:text-base lg:text-lg text-muted-foreground/60 leading-relaxed max-w-lg">
                  I help startups and innovation teams design and build AI-native mobile experiences combining product design, agentic systems, and functional prototyping.
                </p>
                </div>
                
                {/* Company Logos - Small with Subtle Scroll */}
                <div className="overflow-hidden w-full sm:w-3/4 lg:w-2/3 opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                    style={{
                      animation: 'scroll 20s linear infinite'
                    }}
                  >
                    {/* First set of logos */}
                    <div className="h-3 sm:h-4 lg:h-5 flex items-center flex-shrink-0">
                      <img 
                        src={citiLogo} 
                        alt="Citi" 
                        className="h-full w-auto transition-all object-contain opacity-100"
                      />
                    </div>
                    <div className="h-3 sm:h-4 lg:h-5 flex items-center flex-shrink-0">
                      <img 
                        src={chaseLogoLight} 
                        alt="Chase" 
                        className="h-full w-auto transition-all object-contain opacity-100"
                      />
                    </div>
                    <div className="h-3 sm:h-4 lg:h-5 flex items-center flex-shrink-0">
                      <img 
                        src={tocaLogoDark} 
                        alt="TOCA" 
                        className="h-full w-auto transition-all object-contain opacity-100"
                      />
                    </div>
                    {/* Duplicate set for seamless loop */}
                    <div className="h-3 sm:h-4 lg:h-5 flex items-center flex-shrink-0">
                      <img 
                        src={citiLogo} 
                        alt="Citi" 
                        className="h-full w-auto transition-all object-contain opacity-100"
                      />
                    </div>
                    <div className="h-3 sm:h-4 lg:h-5 flex items-center flex-shrink-0">
                      <img 
                        src={chaseLogoLight} 
                        alt="Chase" 
                        className="h-full w-auto transition-all object-contain opacity-100"
                      />
                    </div>
                    <div className="h-3 sm:h-4 lg:h-5 flex items-center flex-shrink-0">
                      <img 
                        src={tocaLogoDark} 
                        alt="TOCA" 
                        className="h-full w-auto transition-all object-contain opacity-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Picture - Full Width on Mobile, Right Side on Desktop */}
              <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start order-1 lg:order-2">
                <div 
                  className="profile-picture-container w-full lg:w-64 lg:h-64 h-64 sm:h-72 md:h-80 lg:h-64 rounded-xl sm:rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden transition-transform duration-300 ease-out"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0, 0, 0, 0.04)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img 
                    src={profileImage} 
                    alt="John Rodrigues" 
                    className="w-full h-full object-cover rounded-xl sm:rounded-xl lg:rounded-2xl xl:rounded-3xl"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* KPIs and Testimonials - Outside Card (Only for Consulting) */}
        {isConsulting && (
          <>
            {/* KPIs Section - Custom for Consulting */}
            <div className="mt-12">
              <ConsultingKPIs />
            </div>
            
            {/* Testimonials Section */}
            <div className="mt-12 pt-8">
              <h2 className="text-2xl font-semibold mb-8 text-foreground">What clients say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    text: "Had an amazing chat with John 😊 We exchanged some interesting resources and talked about the importance to understand the value of a designer.",
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
                ].map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white dark:bg-gray-900/50 rounded-lg p-6 border border-gray-200/50 shadow-sm"
                  >
                    <p className="text-base leading-relaxed mb-4 text-muted-foreground/80">
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
          </>
        )}
      </div>
      
      {/* Call-to-Action Buttons Group */}
      <div className="flex items-center gap-4 flex-wrap hidden mt-8">
        <Button
          variant="default"
          className="rounded-full"
          onClick={onWorkClick}
        >
          Explore my Work
        </Button>
        <Button
          variant="outline"
          className="rounded-full border border-foreground/40 dark:border-white/40"
          onClick={onChatClick}
        >
          Chat with John.ai
        </Button>
      </div>
    </section>
  );
}
