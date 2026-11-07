import { useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

/** power2.out */
const EASE = [0.33, 1, 0.68, 1] as const;
// Longer than any single glyph outline at heading sizes, so each letter draws fully.
const DASH = 240;

type StrokeTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  strokeColor?: string;
  strokeWidth?: number;
  /** Seconds for each letter's outline to draw. */
  drawDuration?: number;
  /** Seconds between letters starting to draw. */
  stagger?: number;
  /** Seconds after the last letter finishes before the fill wipes in. */
  fillDelay?: number;
  fillDuration?: number;
  /** Seconds before this line starts (to chain several lines). */
  delay?: number;
  /** Replays the draw when this changes (e.g. on hover). */
  replayKey?: number;
};

type Layout = { xs: number[]; width: number; ascent: number; height: number };

/**
 * One line of SVG text whose letters draw their outline in turn, then fill
 * with a left-to-right wipe. Fill uses `currentColor`, so colour it with CSS.
 * Falls back to plain text until fonts are measured, and skips the animation
 * for reduced motion.
 */
const StrokeText = ({
  text,
  className,
  style,
  strokeColor = "#A78BFA",
  strokeWidth = 0.8,
  drawDuration = 1.6,
  stagger = 0.05,
  fillDelay = 0.2,
  fillDuration = 0.7,
  delay = 0,
  replayKey = 0,
}: StrokeTextProps) => {
  const clipId = useId();
  const measureRef = useRef<SVGTextElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Measure each glyph's x once the web font is in, so per-letter <text>s line up.
  useLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      const el = measureRef.current;
      if (!el || cancelled) return;
      const box = el.getBBox();
      // Re-origin to the text's own box: x from its left edge, baseline from its top.
      const xs = Array.from(text, (_, i) => el.getStartPositionOfChar(i).x - box.x);
      const baseline = el.getStartPositionOfChar(0).y - box.y;
      setLayout({ xs, width: Math.ceil(box.width + 2), ascent: baseline, height: Math.ceil(box.height) });
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => {
      cancelled = true;
    };
  }, [text]);

  const chars = Array.from(text);
  const fillStart = delay + (chars.length - 1) * stagger + drawDuration + fillDelay;

  return (
    <span className={`relative block ${className ?? ""}`} style={style}>
      {/* Accessible, selectable copy; the SVG is decorative. */}
      <span className="sr-only">{text}</span>

      {!layout ? (
        <svg className="block overflow-visible" height="1.18em" width="100%" aria-hidden="true">
          <text
            ref={measureRef}
            y="0.95em"
            fill={reduceMotion ? "currentColor" : "transparent"}
            style={{ font: "inherit", letterSpacing: "inherit" }}
          >
            {text}
          </text>
        </svg>
      ) : (
        <svg
          key={replayKey}
          className="block overflow-visible"
          width={layout.width}
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          aria-hidden="true"
        >
          <defs>
            <clipPath id={clipId}>
              <motion.rect
                x={0}
                y={-4}
                height={layout.height + 8}
                initial={{ width: reduceMotion ? layout.width : 0 }}
                animate={{ width: layout.width }}
                transition={{ duration: fillDuration, delay: fillStart, ease: EASE }}
              />
            </clipPath>
          </defs>

          {/* Fill, wiped in from the left */}
          <g clipPath={`url(#${clipId})`} fill="currentColor">
            {chars.map((ch, i) => (
              <text key={i} x={layout.xs[i]} y={layout.ascent} style={{ font: "inherit" }}>
                {ch}
              </text>
            ))}
          </g>

          {/* Outline, drawn letter by letter, then fades once the fill lands */}
          {!reduceMotion && (
            <motion.g
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: fillStart + fillDuration * 0.6 }}
            >
              {chars.map((ch, i) => (
                <motion.text
                  key={i}
                  x={layout.xs[i]}
                  y={layout.ascent}
                  style={{ font: "inherit" }}
                  strokeDasharray={DASH}
                  initial={{ strokeDashoffset: DASH }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: drawDuration, delay: delay + i * stagger, ease: EASE }}
                >
                  {ch}
                </motion.text>
              ))}
            </motion.g>
          )}
        </svg>
      )}
    </span>
  );
};

export default StrokeText;
