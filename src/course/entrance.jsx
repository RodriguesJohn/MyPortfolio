import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const entranceChild = {
  hidden: {
    opacity: 0,
    y: 16
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.7 },
      y: { type: "spring", duration: 1.4, bounce: 0 }
    }
  }
};

// Hero entrance shared by the homepage and the academy: each line rises out of a soft blur,
// one after another.
export const heroSequence = {
  hidden: {},
  visible: { transition: { delayChildren: 0.15, staggerChildren: 0.14 } }
};

export const heroItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
};

// List entrance (after nelson.co): each item sharpens out of a 6px blur and rises 12px on a
// no-bounce spring, 0.06s after the one before it.
export const listSequence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

export const listItem = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      opacity: { duration: 0.7 },
      filter: { duration: 0.7 },
      y: { type: "spring", duration: 0.8, bounce: 0 }
    }
  }
};

export const entranceViewport = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -10% 0px"
};

const scrollEntranceContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export function Entrance({ as = "div", className, children, animate, whileInView = "visible", ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={scrollEntranceContainer}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={animate}
      whileInView={animate ? undefined : whileInView}
      viewport={entranceViewport}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function EntranceItem({ as = "div", className, children, ...props }) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag className={className} variants={entranceChild} {...props}>
      {children}
    </MotionTag>
  );
}
