# Orbi AI Current Case Study Backup

Saved before replacing the current `/v2/work/orbi-ai` case study with the Orbi website build.

## Current Page Direction

### Hero

**Label:** Case study  
**Status:** Shipped  
**Title:** Orbi AI Agentic Second Brain

**Intro copy:**
Orbi AI is an AI-native second brain for capturing thoughts, organizing notes, and building a knowledge base you own. It works like an agent-ready Obsidian, able to retrieve, reason, and act on your personal, project, and business context.

**Primary actions:**
- App Store
- Download Mac App

**Demo media:**
- Uses `OrbiDemo.mp4`
- Demo label above media
- Media should align to the same content rail as the rest of the case study
- Reduced corner radius

### Scope Cards

- Type: Personal project
- Type: 0 -> 1
- Status: Shipped
- Year: 2026

### Tools

- Claude Code
- Xcode
- Codex

## Problem Section

**Section intro:**
Your knowledge is everywhere. Your AI has none of it. Every time you switch models, agents, or tools, you start from zero.

### Problem Cards

#### Scattered Context

Context doesn't travel. When you switch between LLMs, agents, or projects, everything resets. AI builders feel this hardest, stitching together Obsidian, MCPs, and Claude Code just to give one agent enough context to be useful. The moment they switch models, it breaks.

#### Notes That Go Nowhere

47% of professionals spend 1-5 hours a day searching for information they already captured. The notes exist. The links exist. The ideas exist. They just don't connect, so nothing compounds.

#### No Knowledge Infrastructure

54% of organizations use more than five platforms to document and share information. There is no source of truth that agents, tools, or teammates can build on. The AI-powered knowledge base market is growing at 34% CAGR because every team building with AI eventually hits this wall.

#### The Momentum Problem

You're in flow. A thought hits mid-sentence. You stop to open an app, find the right folder, and decide where it goes. By the time you're back, the thread is gone. The cost is not just the 30 seconds. It is the idea that never made it. Knowledge workers capture just enough to feel organized, but not enough to actually build on.

## How Orbi Solves This

Direction: this section should not be cards. Each item should be a stacked section with a header, short text, and a full-width video placeholder underneath.

### Capture Without Breaking Flow

Speak from your phone the moment an idea appears. Orbi captures the thought before the context disappears.

**Video placeholder:** Drop demo clip here.

### Own the Knowledge Layer

Your notes live as local markdown files, organized into a workspace you control instead of another locked chat history.

**Video placeholder:** Drop demo clip here.

### Make It Agent-Ready

Orbi turns scattered notes into retrievable context that agents can reason over and use when you need action.

**Video placeholder:** Drop demo clip here.

## Case Study Deck

Current embedded deck:

`https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdeck%2FkmEskNJDRsWB58Pm89LvtZ%2FCaseStudyPresentation---Orbi-AI%3Fnode-id%3D1-306%26scaling%3Dmin-zoom%26content-scaling%3Dfixed`

## Longer Narrative Backup

### Overview

Orbi AI is an AI-native second brain. You speak your thoughts; it captures, connects, and organizes them into a knowledge graph that lives locally on your device in plain markdown files you own. The longer you use it, the more valuable it gets. Unlike a to-do list, it compounds.

You can chat with your own knowledge base, retrieve context from months ago, and connect it to any agent you want. It is not a note-taking app. It is an agent-ready second brain, designed for people who think faster than any tool they have tried.

### My Role

- Product Designer
- iOS + macOS Engineer
- Product Manager
- Primary User
- Timeline: 5 weeks concept to shipped app
- Rebuild: 2 weeks for the second brain pivot
- Platforms: iOS + macOS
- Status: Shipped on the App Store
- Pricing: $9.99/month

Solo. No handoffs. No PM. No dedicated engineer. Every design decision, every engineering decision, every product call, made by one person in sync from day one.

### The Problem

The pivot did not come from a research sprint. It came from running into two separate walls: one as a builder, one as a user of my own app.

#### Signal from users

Early Orbi users were capturing thoughts, not to-dos. The voice input was useful, but a thought that gets captured and then lost is no better than a sticky note. The real problem was context management.

#### Signal from myself

I was building my own second brain in Obsidian. To connect it to AI, I was learning systems engineering just to think better. Every person I brought into that workflow needed a tutorial. That is broken UX.

#### The collision

Voice capture already existed in Orbi. Local markdown files were the right storage layer: private, portable, no lock-in. A knowledge graph could surface the connections between thoughts automatically.

#### The commodity problem

A voice to-do list at $9.99 competes with Apple Reminders, Todoist, and paper. A second brain that holds years of your thinking and becomes more valuable over time has no obvious substitute.

### The Journey

#### The original build

I was losing track of tasks across multiple projects: building with AI, working at JPMorgan, and shipping side projects. Voice capture felt like the right input, so I designed the infrastructure, built it in Swift, and shipped it into people's hands.

#### The honest failure

Usage dropped. I found myself taking to-dos on paper because it was faster and lower friction. The product was not broken, but it had no moat. Charging $9.99 for a voice to-do list felt like the wrong value exchange.

#### The signal hits

I was struggling with Obsidian while watching Orbi users capture thoughts into the voice input. Two problems, same solution space. That is when the direction became clear.

#### The rebuild

Once I had clarity, I moved fast. I ran parallel Codex sessions to design and build iOS and macOS simultaneously. Voice capture fed local markdown files, the knowledge graph generated from the file structure, and AI chat layered on top of the user's notes.

### Design Decisions and Tradeoffs

- Local markdown over a cloud database: less storage control and observability, but users own portable files that can connect to any future agent.
- iCloud sync over a custom backend: less flexibility, but zero infrastructure cost, Apple reliability, and trust from day one.
- Build first, research second: I gave up a validated upfront problem statement and gained real signal from actual usage.
- Solo over a team: every decision happened in minutes, with no translation loss between design and engineering intent.
- AI-generated knowledge graph over a designed one: less visual control, but emergent structure that reflects how the user actually thinks.

### The Agentic System

#### Input: Voice -> Text

User speaks. OpenAI Whisper API transcribes. Apple Speech was tried first, but latency and robotic response broke the trust signal. Whisper solved it.

#### Process: Intent -> Confidence

GPT-4 classifies intent against a system prompt with strict rules. The prompt is what makes a probabilistic model deterministic enough to trust.

#### Output: Categorize -> Summarize -> Clarify

The agent categorizes the input, summarizes it into the knowledge base, and surfaces clarifying questions when intent is unclear.

#### Feedback loop: State -> Continuity

Orbi carries state across three layers: heard, thinking, ready. In a probabilistic system, silence reads as failure. The orb tells the user what is happening.

The system prompt is not just an engineering decision. It is the product's core design constraint. Voice -> Intent -> Trust -> Loop.

### Design Thesis

For Orbi's knowledge graph, I defined the context: the folder structure, the markdown files, and the connection rules. Then I let the agent generate the visual. The graph builds itself from the user's actual thinking.

I call this probabilistic UX: you set the constraints, and the AI produces the interface. The designer's role shifts from crafting pixels to crafting rules that generate the experience.

> This actually looks like your brain. A lot of things going around, connected together.

### The Build

I started in Figma and quickly hit the ceiling of static prototyping for multimodal voice UI. You cannot prototype latency, probabilistic state, or an agent loop in a design tool. The real design moved into Claude, Codex, and Xcode.

#### Full stack/tools from old narrative

- Figma
- Claude
- Codex
- Xcode
- SwiftUI
- OpenAI Whisper API
- GPT-4
- Anthropic API
- iCloud
- Markdown
- Apple Pay
- App Store

#### Process

- Concept in Figma
- Multimodal testing hit the ceiling
- Moved to Claude + Xcode pair coding
- Voice latency solved with Whisper API
- Parallel Codex sessions for iOS + macOS rebuild
- App Store shipped

### User Signal

I did not run a research sprint before building. I shipped, watched, and let real usage define what the product needed to become. The feedback came through the community, and it was more honest than any interview I could have scheduled.

- "Long task lists feel like homework." Design response: three cards for today, showing only what matters now.
- "Default UI feels boxed in." Design response: six personalization themes so Orbi feels like yours.
- "I don't think there's anything like this yet."

### What I Learned

- The real differentiator in AI is not the UI. It is how much cognitive work the agent does for the user.
- Build first, research second. Two weeks with real users taught me more than a discovery sprint could have.
- When the product beats itself, that is the signal. Paper beat my app, and that honesty forced the pivot.
- Being the most constrained person in the room is a velocity advantage.
- Static design tools have a ceiling with AI-native products.
- Parallel agents change the velocity equation entirely.

### What's Next

- Now: App Store live. Real users. The loop is working.
- Next: polish the first-time user experience and expand the macOS workflow.
- The bigger bet: a proactive accountability partner that follows up, nudges, and keeps the loop going without you asking.
- MCP support: connecting Orbi to everyday tools so context gets stored automatically, not just manually captured.

### Closing

I am not a traditional designer. I do not wireframe, prototype, design, and hand off to an engineer. I work in sync with the build from day one, and increasingly, I am the build.

Orbi went from concept to shipped app in 5 weeks. The second brain rebuild took two. That velocity is not a shortcut. It is what becomes possible when design and engineering stop being separate roles and start being the same thought.

Designer + Engineer · Solo · 5 Weeks · Figma -> Claude -> Xcode -> App Store

### Image Placement Notes

The deck embedded above carries the slide-based visuals for the hero, insight, themes, AI system, orb feedback loop, build process, evolution, user signal, agentic loop, learnings, and roadmap.

The knowledge graph screenshot should be added separately when the final asset is exported from the Figma canvas.

