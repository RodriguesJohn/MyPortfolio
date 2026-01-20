import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: { opacity?: number; y?: number; x?: number; scale?: number; filter?: string };
  to?: { opacity?: number; y?: number; x?: number; scale?: number; filter?: string };
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

const SplitText = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold, margin: rootMargin });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [completedLetters, setCompletedLetters] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const splitText = () => {
    if (splitType === "chars") {
      return text.split("").map((char, index) => ({
        char: char === " " ? "\u00A0" : char,
        index,
      }));
    } else {
      return text.split(" ").map((word, index) => ({
        char: word + (index < text.split(" ").length - 1 ? " " : ""),
        index,
      }));
    }
  };

  const handleAnimationComplete = () => {
    setCompletedLetters((prev) => {
      const newCount = prev + 1;
      const total = splitText().length;
      if (newCount === total && onLetterAnimationComplete) {
        onLetterAnimationComplete();
      }
      return newCount;
    });
  };

  const getEaseFunction = (easeString: string) => {
    const easingMap: Record<string, number[]> = {
      "power3.out": [0.16, 1, 0.3, 1],
      "power2.out": [0.33, 1, 0.68, 1],
      "power1.out": [0.5, 1, 0.89, 1],
      "ease.out": [0.16, 1, 0.3, 1],
      "ease.in": [0.55, 0.055, 0.675, 0.19],
      "ease.inOut": [0.645, 0.045, 0.355, 1],
    };
    return easingMap[easeString] || [0.16, 1, 0.3, 1];
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: from.opacity ?? 0,
      y: from.y ?? 40,
      x: from.x ?? 0,
      scale: from.scale ?? 1,
      filter: from.filter ?? "blur(0px)",
    },
    visible: {
      opacity: to.opacity ?? 1,
      y: to.y ?? 0,
      x: to.x ?? 0,
      scale: to.scale ?? 1,
      filter: to.filter ?? "blur(0px)",
      transition: {
        duration,
        ease: getEaseFunction(ease),
        onComplete: handleAnimationComplete,
      },
    },
  };

  const textAlignClass =
    textAlign === "center"
      ? "justify-center"
      : textAlign === "right"
      ? "justify-end"
      : "justify-start";

  return (
    <div
      ref={ref}
      className={`flex flex-wrap ${textAlignClass} ${className}`}
      style={{ textAlign }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        className="flex flex-wrap"
        style={{ textAlign }}
      >
        {splitText().map(({ char, index }) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
            style={{ whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default SplitText;
