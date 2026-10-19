import React from "react";
import { track } from "@vercel/analytics";
import { Star } from "lucide-react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Entrance, EntranceItem, entranceViewport } from "../entrance.jsx";
import { CourseNav, SiteFooter } from "../CourseChrome.jsx";
import AcademyWorkspacePreview from "../AcademyWorkspacePreview.jsx";
import { DualQuoteMarquee, companyLogos, courseQuotes } from "../HomeTraining.jsx";
import { studentQuotes } from "../testimonials.js";
import profilePicture from "../assets/Profile Picture.jpg";
import heroButterflyVideo from "../assets/hero-cinematic-mobile.mp4";
import "../styles.css";
import "../design-systems.css";
import "../academy.css";
import "../workshop-type.css";
import "../ai-systems-home.css";
import "./design-engineering.css";

// Design Engineering course (/academy/design-engineering), linked from the Academy hub. Same layout as /course.

// Design Engineering is one of the AI Mastery courses, so the button goes to the same membership.
const COURSE_URL = "https://www.skool.com/ai-design-academy-6114";

// The shift, in numbers: half design engineering, half AI. Sources: Designer Fund and Foundation
// Capital's AI in Design Report 2026 (900+ designers), CollabSoft's 2025 survey of 500 designers,
// and the Stack Overflow Developer Survey 2025.
const marketStats = [
  { value: "50%", label: "Designers who have pushed AI-generated code to production", source: "Designer Fund, 2026" },
  { value: "68%", label: "Designers who say designers should know how to code", source: "CollabSoft, 2025" },
  { value: "21%", label: "Designers who say their work gets built pixel-perfect after handoff", source: "CollabSoft, 2025" },
  { value: "84%", label: "Developers who use or plan to use AI tools", source: "Stack Overflow, 2025" }
];

// The before/after in the "designer who ships" section. Source: Figma's 2026 AI report.
const prototypeShift = [
  { year: "2025", value: 10 },
  { year: "2026", value: 61 }
];

// What's included: every module in one grid, each card on an animated gradient.
// CSS gradients, not WebGL: the Training preview below creates enough WebGL canvases that
// Chrome drops the oldest ones, which made these cards blink out.
const modules = [
  {
    title: "Design engineering roadmap",
    body: "What design engineers do, and your path from designer to design engineer.",
    color1: "#3b82f6",
    color2: "#bae6fd"
  },
  {
    title: "UI craft",
    body: "Spacing, type, color, and states that make UI feel designed.",
    color1: "#7c3aed",
    color2: "#0ea5e9"
  },
  {
    title: "Agentic coding",
    body: "HTML, CSS, JS, and React, built with coding agents.",
    color1: "#0ea5e9",
    color2: "#a7f3d0"
  },
  {
    title: "Motion in code",
    body: "Transitions and micro-interactions, built in code.",
    color1: "#f97316",
    color2: "#fed7aa"
  },
  {
    title: "AI-ready design systems",
    body: "Tokens and components coding agents can build on.",
    color1: "#ec4899",
    color2: "#c4b5fd"
  },
  {
    title: "Cursor",
    body: "Build real projects in Cursor, from prompt to feature.",
    color1: "#14b8a6",
    color2: "#bae6fd"
  },
  {
    title: "Claude Code",
    body: "Ship real products with Claude Code.",
    color1: "#f59e0b",
    color2: "#fde68a"
  },
  {
    title: "Figma",
    body: "Components, variables, and Figma Make, ready for code.",
    color1: "#6366f1",
    color2: "#f0abfc"
  },
  {
    title: "AI agents",
    body: "Build AI agents and automations that do real work.",
    color1: "#0ea5e9",
    color2: "#c4b5fd"
  }
];

// Training preview: the course modules in the sidebar, opening on the AI-ready design systems
// lesson so the existing design systems video plays.
const trainingSidebar = [
  { id: "roadmap", label: "Roadmap", icon: "foundations" },
  { id: "ui-craft", label: "UI craft", icon: "existing" },
  { id: "agentic-coding", label: "Agentic coding", icon: "tooling" },
  { id: "motion", label: "Motion in code", icon: "animations" },
  { id: "design-systems", label: "AI-ready design systems", icon: "ready" },
  { id: "claude-code", label: "Cursor and Claude Code", icon: "workflows" },
  { id: "figma", label: "Figma to code", icon: "prototyping" },
  { id: "agents", label: "AI agents", icon: "evals" }
];

const trainingLessons = [
  "What is an AI-ready design system",
  "What design engineers do",
  "Spacing, type, and states",
  "React with coding agents",
  "Micro-interactions in code",
  "Build a feature in Cursor",
  "Ship with Claude Code",
  "Figma variables, ready for code",
  "Agents that do real work"
].map((title, index) => ({ id: `de-lesson-${index}`, title, color1: "#38bdf8", color2: "#0284c7" }));

const trainingFeaturedLesson = {
  title: "What is an AI-ready design system?",
  body: [
    "Design engineers build on a system agents can read: tokens, components, and rules that Claude Code and Cursor follow, so what they build matches what you designed.",
    "This module sits between UI craft and agentic coding. You set up the system once, then every screen you build with AI starts from it."
  ]
};

const included = [
  "All 9 design engineering modules, self-paced",
  "Every other AI Mastery course: Claude Code, Cursor, Codex, and more",
  "Recordings from John’s paid live workshops",
  "Community of designers building with AI"
];

// One learner quote beside the price, in place of a block of copy.
const offerQuote = studentQuotes[0];

const instructorStats = [
  { value: "10+", label: "Years in product and design" },
  { value: "10+", label: "Cohorts taught on Maven" },
  { value: "4.6/5", label: "Maven rating" },
  { value: "3,195", label: "Masterclass attendees" }
];

// Who this is for, and who it isn't for, side by side.
const audience = [
  {
    title: "This is for you if",
    fit: true,
    items: [
      "You're a product or UX designer who wants to build what you design",
      "You want to grow your value as a designer, in the role you have or the next one",
      "You're tired of your designs changing in the handoff",
      "You want to ship real products, not just mockups"
    ]
  },
  {
    title: "This isn't for you if",
    items: [
      "You don't want to adapt as the industry moves toward designers who build",
      "You don't believe designers need to be technical, or able to talk to engineers in their language",
      "You don't want to build what you design",
      "You want AI to build for you without learning the craft"
    ]
  }
];

const faqs = [
  {
    q: "What is design engineering?",
    a: "Design engineering sits between design and front-end development. Design engineers design an interface and build it in code, so the product ships the way it was designed."
  },
  {
    q: "Do I need to know how to code?",
    a: "No. The course starts with the fundamentals and uses AI coding tools like Claude Code and Cursor, so you can build real interfaces while you learn how the code works."
  },
  {
    q: "What tools do I need?",
    a: "Figma, a code editor, and Claude Code or Cursor. A paid plan for one AI coding tool is enough to follow along."
  },
  {
    q: "Is this course part of AI Mastery for Designers?",
    a: "Yes. Design Engineering is one of the courses in AI Mastery for Designers. One membership, $149 a month, includes this course, every other course, and the community. It's self-paced."
  },
  {
    q: "Can I get a refund?",
    a: "You get instant access to the content, so this month isn’t refundable. Cancel anytime to stop billing for the next month."
  }
];

// Counts a stat like "50%" up from zero as it rises in, the first time it scrolls into view.
// The count runs on a motion value, so it updates the text without re-rendering React.
function CountUp({ value, delay = 0 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, entranceViewport);
  const reduceMotion = useReducedMotion();
  const target = parseFloat(value);
  const suffix = value.replace(/^[\d.]+/, "");
  const count = useMotionValue(reduceMotion ? target : 0);
  const display = useTransform(count, (latest) => Math.round(latest));

  React.useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const controls = animate(count, target, { duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, target, delay, count]);

  return (
    <motion.span
      ref={ref}
      className="de-count"
      aria-label={value}
      initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

// Horizontal bars that grow to their value once the card scrolls into view.
function ShiftBars() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="de-shift-bars" role="img" aria-label="10% in 2025, 61% in 2026">
      {prototypeShift.map((bar, index) => (
        <div className="de-shift-row" key={bar.year}>
          <span className="de-shift-year">{bar.year}</span>
          <span className="de-shift-track">
            <motion.span
              className="de-shift-fill"
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: `${bar.value}%` }}
              viewport={entranceViewport}
              transition={{ duration: 1.1, delay: 0.25 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={reduceMotion ? { width: `${bar.value}%` } : undefined}
            />
          </span>
          <span className="de-shift-value">{bar.value}%</span>
        </div>
      ))}
    </div>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function CheckIcon() {
  return <span className="ds-check" aria-hidden="true">✓</span>;
}

function CtaLink({ href, children, variant = "primary", className = "", showArrow = true, location }) {
  const isExternal = /^https?:/i.test(href);
  return (
    <a
      className={`ds-conversion-cta is-${variant} ${className}`.trim()}
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      onClick={() =>
        track("Course CTA Click", { route: window.location.pathname, label: String(children), location, href })
      }
    >
      <span>{children}</span>
      {showArrow ? <ArrowIcon /> : null}
    </a>
  );
}

function HeroRating({ score = 4.6 }) {
  return (
    <EntranceItem className="ds-hero-rating" aria-label={`${score} out of 5 average rating across Maven courses`}>
      <span className="ds-hero-stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index + 1 <= Math.floor(score);
          const half = !filled && index < score;
          return (
            <span
              key={index}
              className={`ds-hero-star${filled ? " is-on" : ""}${half ? " is-half" : ""}`}
              style={{ "--i": index }}
            >
              <Star />
              {half ? <Star className="ds-hero-star-clip" /> : null}
            </span>
          );
        })}
      </span>
      <span className="ds-hero-rating-score">{score}/5 across Maven courses</span>
    </EntranceItem>
  );
}

export default function DesignEngineeringCoursePage() {
  React.useEffect(() => {
    document.title = "Design Engineering Course | John Rodrigues";
  }, []);

  return (
    <main className="page-shell current-home ds-audit-page de-page" id="main-content">
      <a className="ds-skip-link" href="#course-offer">
        Skip to course offer
      </a>

      <div className="ds-sticky-chrome">
        <CourseNav />
      </div>

      <section className="ds-audit-hero ds-audit-hero--butterfly" aria-labelledby="de-title">
        <div className="ds-audit-hero-bg" aria-hidden="true">
          <video
            src={heroButterflyVideo}
            poster="/home/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
          />
        </div>
        <Entrance className="ds-audit-hero-inner" animate="visible">
          <div className="ds-audit-hero-copy">
            <div className="ds-hero-main">
              <HeroRating />
              <EntranceItem as="h1" id="de-title">
                Become a Design Engineer
              </EntranceItem>
              <EntranceItem as="p" className="ds-audit-intro">
                Increase your value as a designer with the most valued skill in the age of AI.
              </EntranceItem>
              <EntranceItem className="ds-audit-actions">
                <span className="de-hero-join">
                  <CtaLink href={COURSE_URL} location="de_hero">
                    Start the Course Today
                  </CtaLink>
                  <span className="de-hero-price">$149/month · Cancel anytime</span>
                </span>
              </EntranceItem>
              <EntranceItem
                as="section"
                className="ds-trust-strip ds-trust-strip--hero"
                aria-label="Companies represented"
              >
                {/* The logos are where learners of earlier courses and resources work, not this course yet. */}
                <p>Our resources have been trusted by designers from</p>
                <div className="ds-trust-logos">
                  {companyLogos.map((logo) => (
                    <span className="ds-trust-logo" key={logo.alt}>
                      {logo.src ? (
                        <img src={logo.src} alt={logo.alt} />
                      ) : (
                        <span className="ds-trust-logo-text">{logo.label}</span>
                      )}
                    </span>
                  ))}
                </div>
              </EntranceItem>
            </div>
          </div>

          <div className="ds-audit-hero-media">
            <video
              className="ds-audit-hero-video"
              src="/course/work.mp4?v=1"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              aria-label="Course highlight"
              onCanPlay={(event) => {
                event.currentTarget.muted = true;
                event.currentTarget.play().catch(() => {});
              }}
            />
          </div>
        </Entrance>
      </section>

      {/* Every student and workshop quote, with photos, scrolling in two rows. */}
      <section className="de-quotes" aria-label="What learners say">
        <DualQuoteMarquee quotes={courseQuotes} rows={2} />
      </section>

      <section className="de-modules" id="modules" aria-labelledby="de-modules-title">
        <Entrance className="ds-audit-rail">
          <EntranceItem as="h2" id="de-modules-title">
            What&apos;s Included.
          </EntranceItem>
          <div className="de-module-grid">
            {modules.map((module, index) => (
              <Entrance
                as="article"
                className="de-module-card"
                key={index}
                style={{ "--card-color-1": module.color1, "--card-color-2": module.color2 }}
              >
                <span className="de-module-shader" aria-hidden="true" />
                <span className="de-module-number">Module {index + 1}</span>
                <h3>{module.title}</h3>
                <p>{module.body}</p>
              </Entrance>
            ))}
          </div>
          <EntranceItem as="p" className="de-modules-note">
            <strong>Plus community access.</strong> Join the async chat with designers building with
            AI. Each month, the top learner on the leaderboard gets a free 30-minute 1:1 mentorship
            call with John.
          </EntranceItem>
        </Entrance>
      </section>

      <section className="ds-audit-problem" aria-labelledby="de-outcomes-title">
        <Entrance className="ds-audit-rail">
          <EntranceItem as="h2" id="de-outcomes-title">
            Design It. Build It. Ship It.
          </EntranceItem>
          <EntranceItem as="p" className="de-stats-intro">
            Designers are already shipping code with AI, and most of the rest say they should be.
            Meanwhile, most designs still lose something in the handoff.
          </EntranceItem>
          <div className="ds-outcome-grid de-stat-grid">
            {marketStats.map((stat, index) => (
              <Entrance as="article" className="ds-outcome-card de-stat-card" key={stat.label}>
                <strong>
                  <CountUp value={stat.value} delay={0.2 + index * 0.12} />
                </strong>
                <p>{stat.label}</p>
                <small>{stat.source}</small>
              </Entrance>
            ))}
          </div>
        </Entrance>
      </section>

      {/* Two columns: the argument on the left, the numbers on the right. */}
      <section className="ds-why-section" aria-labelledby="de-why-title">
        <Entrance className="ds-audit-rail de-why-grid">
          <div className="de-why-text">
            <EntranceItem as="h2" id="de-why-title">
              From Designer Who Designs to Designer Who Ships.
            </EntranceItem>
            <EntranceItem as="p">
              AI coding tools changed who can build. The designers teams value most now take an
              idea all the way to a working product, and own what ships.
            </EntranceItem>
          </div>

          <EntranceItem as="figure" className="de-shift-chart">
            <figcaption>Product builders making interactive prototypes</figcaption>
            <ShiftBars />
            <div className="de-shift-stat">
              <strong>
                <CountUp value="19%" delay={0.3} />
              </strong>
              <span>faster to a working prototype when designers build with AI</span>
            </div>
            <small>Source: Figma AI Report, 2026</small>
          </EntranceItem>
        </Entrance>
      </section>

      <div className="academy-page ds-training-hero">
        <section className="academy-hero-wrap academy-hero-wrap--product" aria-labelledby="de-training-title">
          <div className="academy-hero-rays" aria-hidden="true" />
          <div className="academy-hero-glow" aria-hidden="true" />
          <div className="academy-hero">
            <Entrance className="academy-hero-copy" animate="visible">
              <EntranceItem as="h2" id="de-training-title">
                Learn Directly From an Industry Professional With 10+ Years of Experience.
              </EntranceItem>
            </Entrance>
          </div>

          <Entrance className="academy-hero-shot" animate="visible">
            <EntranceItem>
              <div className="academy-hero-shot-glow" aria-hidden="true" />
              <div className="academy-hero-shot-stage">
                <div className="academy-hero-shot-frame">
                  <figure className="academy-hero-app">
                    <div className="academy-hero-app-scaler">
                      <div className="academy-hero-chrome">
                        <span className="academy-hero-chrome-lights" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="academy-hero-chrome-title">Training</span>
                      </div>
                      <div className="academy-hero-app-frame">
                        <AcademyWorkspacePreview
                          subtitle="Design engineering"
                          sidebarItems={trainingSidebar}
                          activeId="design-systems"
                          previewLessons={trainingLessons}
                          featuredLesson={trainingFeaturedLesson}
                        />
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </EntranceItem>
          </Entrance>
        </section>
      </div>

      <section className="ds-offer de-offer" id="pricing" aria-labelledby="de-offer-title">
        <Entrance className="ds-offer-card">
          <div className="ds-offer-copy">
            <EntranceItem as="h2" id="de-offer-title">
              Become a Design Engineer, Starting Today.
            </EntranceItem>
            <EntranceItem as="p">
              This course plus every AI Mastery course, for one monthly price.
            </EntranceItem>
            <EntranceItem as="figure" className="de-offer-quote">
              <blockquote>“{offerQuote.quote}”</blockquote>
              <figcaption>
                <img src={offerQuote.img} alt="" />
                <span>
                  <strong>{offerQuote.name}</strong>
                  {offerQuote.role}
                </span>
              </figcaption>
            </EntranceItem>
            <EntranceItem as="p" className="de-offer-rating">
              <strong>4.6/5</strong> across Maven courses
            </EntranceItem>
          </div>

          <div className="ds-price-grid is-single">
            <EntranceItem className="ds-price-cell">
              <article id="course-offer" className="ds-price-card is-featured">
                <header className="ds-price-head">
                  <p className="ds-price-label">Design Engineering Course</p>
                  <span className="ds-price-badge de-price-hike">
                    <span className="de-price-hike-dot" aria-hidden="true" />
                    Going up to $249 soon
                  </span>
                </header>
                <p className="ds-price">
                  $149
                  <small className="ds-price-term">/ month</small>
                </p>
                <p className="ds-seat-note">Instant access · Cancel anytime</p>
                <ul>
                  {included.map((item) => (
                    <li key={item}>
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
                <div className="ds-price-cta">
                  <CtaLink href={COURSE_URL} className="ds-offer-cta" location="de_pricing">
                    Start the Course Today
                  </CtaLink>
                </div>
                <div className="ds-price-extra">
                  <p className="ds-discount-note">
                    <span>You get instant access, so this month isn’t refundable.</span>
                    <span>Cancel anytime to stop the next month.</span>
                  </p>
                </div>
              </article>
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-instructor de-instructor" aria-labelledby="de-instructor-title">
        <Entrance className="ds-instructor-inner">
          <EntranceItem className="ds-instructor-portrait">
            <img src={profilePicture} alt="John Rodrigues" />
          </EntranceItem>
          <div>
            <EntranceItem as="h2" id="de-instructor-title">John Rodrigues</EntranceItem>
            <EntranceItem as="p">
              John is a design engineer with 10+ years of product and design experience at teams
              including JPMorgan, Citi, and TOCA. He designs interfaces and builds them in code, the
              exact workflow this course teaches.
            </EntranceItem>
            <EntranceItem as="p">
              He founded Human AI Studio and Orbi AI, and builds both with Claude Code and Cursor.
              He has taught more than 10 cohorts on Maven, rated 4.6/5, and his masterclasses have
              reached 3,195 designers.
            </EntranceItem>
            <EntranceItem as="dl" className="de-instructor-stats">
              {instructorStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </EntranceItem>
            <EntranceItem className="de-instructor-cta">
              <CtaLink href={COURSE_URL} location="de_instructor">
                Start the Course Today
              </CtaLink>
            </EntranceItem>
          </div>
        </Entrance>
      </section>

      <section className="ds-fit" aria-labelledby="de-fit-title">
        <Entrance className="ds-audit-rail ds-fit-grid">
          <div>
            <EntranceItem as="h2" id="de-fit-title">
              <span>Who This Course</span> <span>Is For.</span>
            </EntranceItem>
          </div>
          <div className="de-fit-columns">
            {audience.map((group) => (
              <EntranceItem key={group.title} className={group.fit ? "is-fit" : "is-not-fit"}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      {group.fit ? <CheckIcon /> : <span className="ds-check de-cross" aria-hidden="true">✕</span>}{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </EntranceItem>
            ))}
          </div>
        </Entrance>
      </section>

      <section className="ds-faq" aria-labelledby="de-faq-title">
        <Entrance className="ds-faq-inner">
          <EntranceItem>
            <h2 id="de-faq-title">Before You Enroll.</h2>
          </EntranceItem>
          <div>
            {faqs.map((item) => (
              <EntranceItem as="details" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </EntranceItem>
            ))}
          </div>
        </Entrance>
      </section>

      {/* The homepage footer. It reads its colors and rail from .ash, so it gets its own wrapper. */}
      <div className="ash de-footer">
        <SiteFooter />
      </div>
    </main>
  );
}
