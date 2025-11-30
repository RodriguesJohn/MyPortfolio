import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import profileImage from "@/assets/PP2.jpg";
import p1Image from "@/assets/P1.png";
import p2Image from "@/assets/P2.png";

export function PhotoJourney() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cards = [
    {
      id: 1,
      image: profileImage,
      title: "San Francisco",
      rotation: 5,
      position: { x: 0, y: 0 },
      mobilePosition: { x: 0, y: 0 },
    },
    {
      id: 2,
      image: p1Image,
      title: "UX/UI Design",
      rotation: -8,
      position: { x: 280, y: -120 },
      mobilePosition: { x: 140, y: -100 },
    },
    {
      id: 3,
      image: p2Image,
      title: "Product Design",
      rotation: 6,
      position: { x: 560, y: -240 },
      mobilePosition: { x: 280, y: -200 },
    },
  ];

  const cardVariants = {
    initial: (index: number) => ({ 
      opacity: 0, 
      y: 40, 
      scale: 0.85,
      rotate: index % 2 === 0 ? -15 : 15,
    }),
    animate: (index: number) => ({
      opacity: 1,
      y: [0, -12, 0],
      scale: 1,
      rotate: cards[index].rotation,
      transition: {
        delay: index * 0.25,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)" as any,
        y: {
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1 + index * 0.25,
        },
      },
    }),
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)" as any,
      },
    },
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 0.3,
      transition: {
        pathLength: { duration: 1.5, delay: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" as any },
        opacity: { duration: 0.5, delay: 0.5 },
      },
    },
  };

  const markerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1 + index * 0.2,
        duration: 0.4,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)" as any,
      },
    }),
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden mt-8">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* SVG for connecting line - Desktop */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full hidden md:block"
        style={{ overflow: 'visible' }}
      >
        <motion.path
          d={`M 60 400 Q 200 320, 340 280 Q 480 240, 620 160`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 8"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          className="text-foreground/20"
        />
        
        {/* Markers */}
        {cards.map((card, index) => {
          const baseX = 60;
          const baseY = 400;
          const x = baseX + card.position.x;
          const y = baseY + card.position.y;
          return (
            <motion.rect
              key={`marker-${card.id}`}
              x={x - 4}
              y={y - 4}
              width="8"
              height="8"
              fill="currentColor"
              variants={markerVariants}
              initial="initial"
              animate="animate"
              custom={index}
              className="text-primary"
            />
          );
        })}
      </svg>

      {/* SVG for connecting line - Mobile */}
      <svg
        className="absolute inset-0 w-full h-full md:hidden"
        style={{ overflow: 'visible' }}
      >
        <motion.path
          d={`M 40 300 Q 100 240, 180 200 Q 260 160, 320 100`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 8"
          variants={lineVariants}
          initial="initial"
          animate="animate"
          className="text-foreground/20"
        />
        
        {/* Markers - Mobile */}
        {cards.map((card, index) => {
          const baseX = 40;
          const baseY = 300;
          const x = baseX + card.mobilePosition.x;
          const y = baseY + card.mobilePosition.y;
          return (
            <motion.rect
              key={`marker-mobile-${card.id}`}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              fill="currentColor"
              variants={markerVariants}
              initial="initial"
              animate="animate"
              custom={index}
              className="text-primary"
            />
          );
        })}
      </svg>

      {/* Photo cards */}
      <div className="relative w-full h-full">
        {cards.map((card, index) => {
          // Desktop positions
          const baseX = 60;
          const baseY = 400;
          const desktopX = baseX + card.position.x;
          const desktopY = baseY + card.position.y;
          
          // Mobile positions
          const mobileBaseX = 40;
          const mobileBaseY = 300;
          const mobileX = mobileBaseX + card.mobilePosition.x;
          const mobileY = mobileBaseY + card.mobilePosition.y;
          
          const x = isMobile ? mobileX : desktopX;
          const y = isMobile ? mobileY : desktopY;
          
          return (
            <motion.div
              key={card.id}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%)`,
              }}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={index}
            >
              <div className="w-32 h-44 sm:w-36 sm:h-52 md:w-56 md:h-72 rounded-lg overflow-hidden bg-background border border-border/50 shadow-lg relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover relative z-0"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

