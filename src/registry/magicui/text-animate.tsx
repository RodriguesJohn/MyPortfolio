"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextAnimateProps {
  children: string;
  animation?: "blurInUp" | "fadeIn" | "slideInUp" | "blurIn";
  by?: "character" | "word";
  className?: string;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
}

const animationVariants: Record<string, Variants> = {
  blurInUp: {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  slideInUp: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  blurIn: {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
  },
};

export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "character",
  className,
  once = true,
  threshold = 0.1,
  rootMargin = "-50px",
  delay = 0.02,
  duration = 0.5,
}: TextAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, threshold, margin: rootMargin });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const splitText = () => {
    if (by === "character") {
      return children.split("").map((char, index) => ({
        char: char === " " ? "\u00A0" : char,
        index,
      }));
    } else {
      return children.split(" ").map((word, index) => ({
        char: word + (index < children.split(" ").length - 1 ? " " : ""),
        index,
      }));
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: animationVariants[animation].hidden,
    visible: {
      ...animationVariants[animation].visible,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        className="inline-block"
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
}
