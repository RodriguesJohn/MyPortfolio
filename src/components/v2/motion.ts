import type { Transition, Variants } from "framer-motion";

export const v2Spring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.85,
};

export const v2SpringSoft: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.95,
};

export const v2SpringSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

/** Soft lift for feed / gallery card hover */
export const v2CardHover: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 28,
  mass: 0.85,
};

/** nelson.co homepage: critically damped rise */
export const v2NelsonY: Transition = {
  type: "spring",
  duration: 1.4,
  bounce: 0,
};

export const v2NelsonFade: Transition = {
  duration: 0.7,
};

export const v2NelsonExit: Transition = {
  duration: 0.24,
  ease: [0.4, 0, 1, 1],
};

/** Outer layout stagger — no filter here (filter clips profile-card shadows). */
export const v2NelsonShell: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Parent: dissolve blur, then stagger children 80ms. Use on text/tab blocks only. */
export const v2NelsonContainer: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.08,
      opacity: v2NelsonFade,
      filter: v2NelsonFade,
    },
  },
};

/** Nested stagger without a second blur layer (keeps video cards sharp). */
export const v2NelsonStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    filter: "blur(6px)",
    transition: v2NelsonExit,
  },
};

/** Child: 16px rise. Opacity is inherited from the blurring parent. */
export const v2NelsonChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      y: v2NelsonY,
      opacity: v2NelsonFade,
    },
  },
};

/** Tab / page swap — nelson.co exploration enter. */
export const v2NelsonPage: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.08,
      opacity: v2NelsonFade,
      filter: v2NelsonFade,
      y: { type: "spring", duration: 0.8, bounce: 0 },
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(6px)",
    transition: v2NelsonExit,
  },
};

export const v2FadeUp: Variants = v2NelsonChild;

export const v2ProfileStack: Variants = {
  rest: {},
  hover: {},
  open: {},
};

export const v2ProfileFloat: Variants = {
  rest: { y: 0 },
  float: {
    y: [0, -5, 0],
    transition: {
      duration: 4.6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const v2ProfileBack: Variants = {
  rest: {
    rotate: -4,
    x: 0,
    y: 4,
    scale: 0.97,
    opacity: 0.55,
  },
  hover: {
    rotate: -6,
    x: -2,
    y: 7,
    scale: 0.97,
    opacity: 0.6,
  },
  open: {
    rotate: -14,
    x: -28,
    y: 18,
    scale: 0.9,
    opacity: 0.3,
  },
};

export const v2ProfileMid: Variants = {
  rest: {
    rotate: 3,
    x: 3,
    y: 2,
    scale: 0.985,
    opacity: 0.7,
  },
  hover: {
    rotate: 5,
    x: 6,
    y: 4,
    scale: 0.985,
    opacity: 0.75,
  },
  open: {
    rotate: 12,
    x: 26,
    y: 14,
    scale: 0.92,
    opacity: 0.35,
  },
};

export const v2ProfileFront: Variants = {
  rest: {
    rotate: -3,
    y: 0,
  },
  hover: {
    rotate: -1.5,
    y: -4,
  },
  open: {
    rotate: 0,
    y: 0,
  },
};

export const v2PinWiggle: Variants = {
  rest: { rotate: 0, y: 0 },
  hover: {
    rotate: [0, -4, 3, 0],
    y: -1,
    transition: { duration: 0.45, ease: "easeInOut" },
  },
};
