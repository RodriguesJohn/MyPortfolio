import React from "react";
import agentDemo from "./assets/OrbiAgentDemo.web.mp4";
import demoVideo from "./assets/OrbiDemo.web.mp4";
import mobileDemo from "./assets/MobileDemo.web.mp4";
import orbiLogo from "./assets/orbi-logo.png";
import heroImage from "./assets/rbai-hero.png";

export default function App() {
  const problemCards = [
    {
      icon: "01",
      label: "Scattered Context",
      title: "Context doesn't travel.",
      meta: "Agent reset",
      status: "Live pain",
      tags: ["LLMs", "Agents", "Context"],
      hasPersistentHover: true,
      copy:
        "Switch models or projects and everything resets. Agents lose the context that made them useful.",
    },
    {
      icon: "02",
      label: "Notes That Go Nowhere",
      title: "Captured doesn't mean connected.",
      meta: "Lost recall",
      status: "Daily",
      tags: ["Notes", "Search"],
      copy:
        "Notes, links, and ideas exist. They just do not compound into working knowledge.",
    },
    {
      icon: "03",
      label: "No Knowledge Infrastructure",
      title: "Your team has tools. Not a source of truth.",
      meta: "5+ tools",
      status: "Scaling",
      tags: ["Teams", "Memory"],
      copy:
        "Agents and teammates need one memory layer they can retrieve from and build on.",
    },
    {
      icon: "04",
      label: "The Momentum Problem",
      title: "The best ideas arrive mid-flow.",
      meta: "Flow cost",
      status: "Hidden",
      tags: ["Capture", "Focus"],
      copy:
        "A thought hits mid-flow. Opening the wrong tool costs the thread.",
    },
  ];

  const roadmapItems = [
    {
      status: "Available now",
      title: "Mac app download",
      copy:
        "Capture notes, organize project context, and build a local knowledge base from your desktop.",
    },
    {
      status: "Coming next",
      title: "iPhone capture",
      copy:
        "Save thoughts, voice notes, links, and quick context the moment they happen.",
    },
    {
      status: "Coming soon",
      title: "Agent-ready retrieval",
      copy:
        "Give models and coding agents access to the right personal, project, and business context.",
    },
    {
      status: "Planned",
      title: "Multi-tool connections",
      copy:
        "Bring the same Orbi memory into the apps, agents, and workflows where you already build.",
    },
  ];

  return (
    <main className="site-shell">
      <nav className="nav entrance entrance-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Orbi AI home">
          <span className="brand-mark">
            <img src={orbiLogo} alt="" />
          </span>
          <span>Orbi AI</span>
        </a>
        <div className="nav-links">
          <a href="#problem">Problem</a>
          <a href="#platforms">Apps</a>
          <a href="#mcp">MCP</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#download">Download</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-reveal" aria-hidden="true" />
        <div className="hero-copy">
          <a className="back-link entrance entrance-1" href="/v2/work" target="_parent">
            <span aria-hidden="true">←</span>
            Back to portfolio
          </a>
          <div className="hero-kicker entrance entrance-1">
            <p className="eyebrow">Orbi AI Agentic Second Brain</p>
          </div>
          <h1 className="entrance entrance-2">One second brain for every AI agent.</h1>
          <p className="hero-subtitle entrance entrance-3">
            Capture thoughts, organize context, and give your AI the knowledge base you own.
          </p>
          <div className="hero-actions entrance entrance-5">
            <a className="button primary" href="#download">
              Download for Mac
            </a>
          </div>
        </div>

        <div className="hero-visual entrance entrance-6" aria-label="Orbi AI running on Mac and iPhone">
          <video
            aria-label="Orbi AI demo video"
            autoPlay
            loop
            muted
            playsInline
            poster={heroImage}
          >
            <source src={demoVideo} type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="platform-strip entrance entrance-7" id="platforms" aria-label="Platforms">
        <div>
          <span>Mac</span>
          <strong>Desktop app</strong>
          <em>Available now</em>
        </div>
        <div>
          <span>iPhone</span>
          <strong>Capture on the go</strong>
          <em>Next</em>
        </div>
        <div>
          <span>Agents</span>
          <strong>Bring your context</strong>
          <em>Private beta</em>
        </div>
        <div id="mcp">
          <span>Orbi MCP</span>
          <strong>Connect agents</strong>
          <em>Soon</em>
        </div>
      </section>

      <section className="statement">
        <p>
          Agent-ready notes for your personal, project, and business context.
        </p>
      </section>

      <section className="agent-demo" aria-label="Orbi AI agent workflow demo">
        <div className="agent-demo-copy">
          <p className="eyebrow">Agent Workflow</p>
          <h2>Context your agents can actually use.</h2>
          <p>
            Orbi turns captured thoughts into a working knowledge base your AI
            can retrieve from, reason over, and carry into the next task.
          </p>
        </div>
        <div className="agent-demo-visual">
          <video
            aria-label="Orbi AI agent workflow video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={agentDemo} type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="mobile-demo" aria-label="Orbi AI mobile capture demo">
        <div className="mobile-demo-copy">
          <p className="eyebrow">iPhone Capture</p>
          <h2>Save context the moment it appears.</h2>
          <p>
            Capture quick thoughts, links, and working notes on the go, then let
            Orbi turn them into memory your agents can actually retrieve.
          </p>
        </div>
        <div className="mobile-demo-visual">
          <video
            aria-label="Orbi AI mobile demo"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={mobileDemo} type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="problem-section" id="problem">
        <div className="section-heading">
          <p className="eyebrow">The Problem</p>
          <h2>Your knowledge is everywhere. Your AI starts from zero.</h2>
          <p>
            Switch tools, models, or projects and your context disappears.
          </p>
        </div>

        <div className="problem-grid">
          {problemCards.map((card) => (
            <article
              className={[
                "bento-card",
                card.colSpan === 2 ? "bento-card-wide" : "",
                card.hasPersistentHover ? "bento-card-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={card.label}
            >
              <div className="bento-pattern" aria-hidden="true" />
              <div className="bento-content">
                <div className="bento-topline">
                  <div className="bento-icon">{card.icon}</div>
                  <span className="bento-status">{card.status}</span>
                </div>
                <div className="bento-copy">
                  <p>{card.label}</p>
                  <h3>
                    {card.title}
                    <span>{card.meta}</span>
                  </h3>
                  <strong>{card.copy}</strong>
                </div>
                <div className="bento-footer">
                  <div>
                    {card.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                  <em>Explore -&gt;</em>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="knowledge-layer">
        <div>
          <p className="eyebrow">Knowledge Infrastructure</p>
          <h2>One owned memory layer for notes, projects, teams, and agents.</h2>
        </div>
        <div className="metrics">
          <article>
            <strong>47%</strong>
            <span>
              spend 1-5 hours a day searching for already-captured information.
            </span>
          </article>
          <article>
            <strong>54%</strong>
            <span>
              use more than five platforms to document and share information.
            </span>
          </article>
          <article>
            <strong>34%</strong>
            <span>
              CAGR for AI knowledge bases as teams hit the context wall.
            </span>
          </article>
        </div>
      </section>

      <section className="roadmap" id="roadmap">
        <div className="section-heading">
          <p className="eyebrow">Shipping Roadmap</p>
          <h2>Shipping toward a connected AI memory layer.</h2>
          <p>
            Starting with Mac, then mobile capture, agent retrieval, and multi-tool context.
          </p>
        </div>

        <div className="roadmap-list">
          {roadmapItems.map((item, index) => (
            <article className="roadmap-item" key={item.title}>
              <div className="roadmap-topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <em>{item.status}</em>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="download" id="download">
        <p className="eyebrow">Mac App</p>
        <h2>Start building the brain your agents can actually use.</h2>
        <p>
          Orbi AI is currently in private beta. Capture ideas without losing
          flow, organize context once, and carry it across the tools you use.
        </p>
        <a className="button primary" href="#" aria-label="Download Orbi AI for Mac">
          Download for Mac
        </a>
      </section>

      <footer>
        <span>Orbi AI</span>
        <span>Orbi AI, an agentic second brain.</span>
      </footer>
    </main>
  );
}
