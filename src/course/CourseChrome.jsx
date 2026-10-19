import React from "react";
import "./studio-nav.css";

export function CourseNav() {
  return (
    <nav className="studio-nav" aria-label="Primary">
      <a className="studio-nav-brand" href="/" aria-label="John Rodrigues portfolio home">
        <span className="studio-nav-brand-mark" aria-hidden="true">
          <span />
          <span />
        </span>
        <span className="studio-nav-brand-name">John Rodrigues</span>
      </a>
      <div className="studio-nav-tabs">
        <a className="studio-nav-tab" href="/">
          Portfolio
        </a>
        <a className="studio-nav-tab is-active" href="/design-engineering-course/" aria-current="page">
          Course
        </a>
      </div>
    </nav>
  );
}

export function SiteFooter({ note }) {
  return (
    <footer className="ash-footer ash-rail">
      <div>
        <p className="ash-footer-brand">Human AI Studio</p>
        <p className="ash-footer-tag">Applied AI. Better Systems. Human Potential.</p>
      </div>
      <address className="ash-footer-address">
        455 Market St Ste 1940, PMB 769150
        <br />
        San Francisco, California 94105-2448 US
      </address>
      {note ? <p className="ash-footer-note">{note}</p> : null}
    </footer>
  );
}
