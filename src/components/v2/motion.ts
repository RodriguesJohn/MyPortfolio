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

export const v2FadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...v2SpringSoft, delay },
  }),
};

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
