import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { display } from "@/components/v2/PageShell";

/**
 * Shared editorial case-study layout (after omnagarkar.com/GuessCaseStudy).
 * Symmetric 12-column grid: headings in the left half (cols 1–6), all copy in
 * the right half (cols 7–12), full-width hero. One text colour throughout.
 */

const grid = "grid grid-cols-1 gap-x-5 lg:grid-cols-12";
const overlineBase =
  "m-0 text-[12px] font-medium uppercase leading-[1.5] tracking-[0.05em] text-zinc-50";
const body =
  "text-[16px] leading-[1.65] tracking-[-0.01em] text-zinc-50 sm:text-[17px]";
const sectionTitle =
  "block text-[28px] font-medium leading-[1.15] tracking-[-0.035em] text-zinc-50 sm:text-[32px] lg:text-[36px]";

export const CaseStudyPage = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <article className="mx-auto w-full max-w-[1440px] px-6 pb-32 pt-20 sm:px-10 sm:pt-24 lg:px-20 xl:px-28">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="group mb-24 inline-flex items-center gap-2 text-[14px] font-medium text-zinc-50 transition-opacity hover:opacity-70 lg:mb-36"
      >
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to home
      </button>
      {children}
    </article>
  );
};

type Detail = { label: string; href?: string };

export const CaseStudySplash = ({
  titleLines,
  details,
}: {
  titleLines: string[];
  details: Detail[];
}) => (
  <header className="grid grid-cols-1 items-end gap-x-5 xl:grid-cols-12">
    <h1
      className="m-0 text-[32px] font-medium leading-[1.1] tracking-[-0.04em] sm:text-[40px] xl:col-span-6 xl:text-[48px]"
      style={display}
    >
      {titleLines.map((line) => (
        <span key={line} className="block text-zinc-50">
          {line}
        </span>
      ))}
    </h1>
    <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 whitespace-nowrap xl:col-span-6 xl:col-start-7 xl:mt-0 xl:pb-[0.35em]">
      {details.map((d) =>
        d.href ? (
          <a
            key={d.label}
            href={d.href}
            target="_blank"
            rel="noreferrer"
            className={`${overlineBase} underline decoration-zinc-500 underline-offset-[3px] transition-colors hover:decoration-zinc-50`}
          >
            {d.label} ↗
          </a>
        ) : (
          <p key={d.label} className={overlineBase}>
            {d.label}
          </p>
        ),
      )}
    </div>
  </header>
);

export const CaseStudyHero = ({ children }: { children: ReactNode }) => (
  <figure className="m-0 mt-6 overflow-hidden rounded-[16px] [transform:translateZ(0)]">
    {children}
  </figure>
);

export const CaseStudySection = ({
  titleLines,
  paragraphs = [],
  children,
}: {
  /** One or two lines; the heading sits in the left half. */
  titleLines: string[];
  paragraphs?: string[];
  /** Extra right-column content (lists, quotes, sub-points). */
  children?: ReactNode;
}) => (
  <section className={`${grid} mt-20 lg:mt-28`}>
    <h2 className="m-0 mb-10 lg:col-span-6 lg:mb-0" style={display}>
      {titleLines.map((line) => (
        <span key={line} className={sectionTitle}>
          {line}
        </span>
      ))}
    </h2>
    {paragraphs.length || children ? (
      <div className="lg:col-span-6 lg:col-start-7">
        {paragraphs.map((p, i) => (
          <p key={p} className={`m-0 ${i > 0 ? "mt-5" : ""} ${body}`}>
            {p}
          </p>
        ))}
        {children ? (
          <div className={paragraphs.length ? "mt-8" : ""}>{children}</div>
        ) : null}
      </div>
    ) : null}
  </section>
);

/** Small uppercase label for a group inside a section's right column. */
export const CaseStudyLabel = ({ children }: { children: ReactNode }) => (
  <p className={`${overlineBase} mb-3 opacity-70`}>{children}</p>
);

/** Ruled list, one colour, for takeaways, questions and responsibilities. */
export const CaseStudyList = ({ items }: { items: string[] }) => (
  <ul className="m-0 list-none p-0">
    {items.map((item) => (
      <li
        key={item}
        className={`[&+&]:mt-3 ${body}`}
      >
        {item}
      </li>
    ))}
  </ul>
);

export const CaseStudyQuote = ({ children }: { children: ReactNode }) => (
  <blockquote
    className="m-0 text-[20px] font-medium leading-[1.45] tracking-[-0.02em] text-zinc-50 sm:text-[22px]"
    style={display}
  >
    {children}
  </blockquote>
);

/** A sub-point inside a section: small heading + paragraph. */
export const CaseStudyPoint = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="[&+&]:mt-10">
    <h3
      className="m-0 text-[20px] font-medium leading-[1.35] tracking-[-0.02em] text-zinc-50"
      style={display}
    >
      {title}
    </h3>
    <p className={`m-0 mt-3 ${body}`}>{children}</p>
  </div>
);

/** Full-width image between sections. `confidential` blurs research imagery. */
export const CaseStudyFigure = ({
  src,
  alt,
  confidential = false,
}: {
  src: string;
  alt: string;
  confidential?: boolean;
}) => (
  <figure className="m-0 mt-12 lg:mt-16">
    <div className="overflow-hidden rounded-[16px] [transform:translateZ(0)]">
      <img
        src={src}
        alt={confidential ? "" : alt}
        aria-hidden={confidential || undefined}
        className={`block h-auto w-full ${
          confidential ? "scale-[1.12] blur-2xl motion-reduce:blur-md" : ""
        }`}
        loading="lazy"
      />
    </div>
    {confidential ? (
      <figcaption className={`${overlineBase} mt-3 opacity-70`}>
        Confidential · Sessions anonymized
      </figcaption>
    ) : null}
  </figure>
);

/** Full-width video between sections. */
export const CaseStudyVideo = ({ src, label }: { src: string; label: string }) => (
  <figure className="m-0 mt-12 overflow-hidden rounded-[16px] [transform:translateZ(0)] lg:mt-16">
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="block h-auto w-full"
      aria-label={label}
    />
  </figure>
);

/** Two-up row of figures. */
export const CaseStudyFigureRow = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 [&>figure]:mt-12 lg:[&>figure]:mt-16">
    {children}
  </div>
);

/** A quiet note in the right half, e.g. a confidentiality line. */
export const CaseStudyNote = ({ children }: { children: ReactNode }) => (
  <section className={`${grid} mt-20 lg:mt-28`}>
    <p
      className={`m-0 lg:col-span-6 lg:col-start-7 ${overlineBase} normal-case tracking-normal text-[14px] leading-[1.6] opacity-70`}
    >
      {children}
    </p>
  </section>
);
