import React from "react";
import { useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { Entrance, EntranceItem } from "./entrance.jsx";
import OfferingShader from "./OfferingShader.jsx";
import { studentQuotes, workshopQuotes, teamQuotes } from "./testimonials.js";
import "./home-training.css";

export { companyLogos } from "./companyLogos.js";

const WORKSHOP_PAGE = "/course";

const quoteRows = [
  studentQuotes.slice(0, 5),
  [...studentQuotes.slice(5), ...workshopQuotes],
  teamQuotes.slice(0, 4),
  teamQuotes.slice(4)
];

export const allHomeQuotes = [...studentQuotes, ...workshopQuotes, ...teamQuotes];
// Students and workshop attendees only, for pages about the courses.
export const courseQuotes = [...studentQuotes, ...workshopQuotes];

// `rows` splits the quotes evenly; rows alternate direction.
export function DualQuoteMarquee({ quotes = allHomeQuotes, rows = 2 } = {}) {
  const perRow = Math.ceil(quotes.length / rows);
  const quoteRows = Array.from({ length: rows }, (_, index) => quotes.slice(index * perRow, (index + 1) * perRow));

  return (
    <div className="home-proof-marquees" aria-label="Testimonials">
      {quoteRows.map((row, index) => (
        <QuoteRow quotes={row.length ? row : quotes} reverse={index % 2 === 1} key={index} />
      ))}
    </div>
  );
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function trackHomeClick(href, label, location) {
  track("Workshop CTA Click", {
    route: "/course",
    label,
    location,
    href
  });
}

function QuoteCard({ quote, name, role, img }) {
  return (
    <figure className="home-quote-card">
      <div className="home-quote-stars" aria-label="5 out of 5">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} aria-hidden="true">
            ★
          </span>
        ))}
      </div>
      <blockquote>“{quote}”</blockquote>
      <figcaption>
        {img ? (
          <img src={img} alt="" loading="lazy" />
        ) : (
          <span className="home-quote-initials" aria-hidden="true">
            {initials(name)}
          </span>
        )}
        <span>
          <strong>{name}</strong>
          <small>{role}</small>
        </span>
      </figcaption>
    </figure>
  );
}

function QuoteRow({ quotes, reverse = false }) {
  const items = [...quotes, ...quotes];

  return (
    <div className={`home-quotes-row${reverse ? " is-reverse" : ""}`}>
      <div className="home-quotes-track">
        {items.map((quote, index) => (
          <QuoteCard {...quote} key={`${quote.name}-${index}`} />
        ))}
      </div>
    </div>
  );
}

function ProductCardShader({ color1, color2, seed }) {
  const reduceMotion = useReducedMotion();

  return (
    <OfferingShader
      color1={color1}
      color2={color2}
      seed={seed}
      speed={reduceMotion ? 0 : 0.32}
      className="home-product-shader"
    />
  );
}

export function HomeTraining() {
  return (
    <>
      <section className="home-trust" aria-label="Proof points">
        <div className="home-trust-stats">
          <div>
            <strong>3,000+</strong>
            <span>Industry professionals in masterclasses</span>
          </div>
          <div>
            <strong>4.8</strong>
            <span>Rating on Maven</span>
          </div>
          <div>
            <strong>47+</strong>
            <span>Organizations represented</span>
          </div>
        </div>
      </section>

      <section className="home-products" aria-labelledby="home-courses-title">
        <h2 id="home-courses-title" className="home-courses-title">
          Courses
        </h2>
        <Entrance
          as="article"
          className="home-product-card"
          id="workshop-entry"
          aria-labelledby="home-workshop-title"
          style={{
            "--card-color-1": "#3b82f6",
            "--card-color-2": "#bae6fd"
          }}
        >
          <ProductCardShader color1="#3b82f6" color2="#bae6fd" seed={2.1} />
          <EntranceItem className="home-product-copy">
            <h2 id="home-workshop-title">
              Design systems course
            </h2>
            <p>
              Four hours on the framework, evals, and architecture your system needs.
            </p>
            <div className="home-entry-actions">
              <a
                className="home-entry-cta"
                href={WORKSHOP_PAGE}
                onClick={() => trackHomeClick(WORKSHOP_PAGE, "Join the course", "home_workshop")}
              >
                Join the course
              </a>
            </div>
          </EntranceItem>
          <EntranceItem className="home-product-media home-product-media--workshop">
            <video
              src="/workshop/workshop.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Course highlight"
            />
          </EntranceItem>
        </Entrance>
      </section>

      <section
        className="home-quotes"
        aria-labelledby="home-quotes-title"
        data-nav-theme="dark"
      >
        <div className="home-quotes-inner">
          <h2 id="home-quotes-title">What people say</h2>
          <div className="home-quotes-rows" aria-label="Testimonials">
            {quoteRows.map((quotes, index) => (
              <QuoteRow quotes={quotes} reverse={index % 2 === 1} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
