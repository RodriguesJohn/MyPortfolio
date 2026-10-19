---
title: "Figma opacity variables update"
description: "What Figma's Control opacity at scale release means for design systems: alias opacity, number variables, and how to structure translucent tokens for AI-ready workflows."
date: "2026-09-07"
author: "John Rodrigues"
tags: ["Figma", "Design systems", "Tokens"]
draft: false
---

<figure class="article__video">
  <video controls playsinline preload="metadata" src="/blog/figma-opacity-variables-update.mp4"></video>
  <figcaption>Walkthrough of Figma's Control opacity at scale update.</figcaption>
</figure>

On September 3, 2026, Figma shipped **[Control opacity at scale](https://www.figma.com/release-notes/?title=control-opacity-at-scale)**: a variables update that lets teams manage transparency the same way they manage color, spacing, and typography.

Before this, translucent tokens were fragile. You either detached a color to lower its opacity, duplicated hex values with alpha baked in, or applied layer opacity and hoped handoff stayed clean. Each path broke the link between the base palette and the translucent variant.

The update changes that.

## What the update actually does

Figma now supports three workflows that design system teams have been asking for:

1. **Alias opacity without detaching.** Keep a color variable linked to your library and apply opacity on top. The base color stays connected. When brand red changes, the translucent variant follows.

2. **Number variables for alpha.** Bind opacity to a number variable and scope it for use inside color variables. Disabled at 48%, scrim at 64%, overlay at 8%: each becomes a reusable token instead of a one-off layer tweak.

3. **Update opacity at scale.** Change a single variable in the modal and propagate it across disabled states, overlays, scrims, and any composed color that references it.

This is not a new visual effect. It is infrastructure. Opacity moves from a presentation hack into the token layer where it belongs.

## Why this matters for design systems

Opacity is one of the easiest parts of a system to get wrong. Teams hard-code values on layers, duplicate the same 64% scrim three different ways, and lose the connection between what designers see in Figma and what code or agents consume later.

Most mature systems already separate color, spacing, and typography into tokens. Opacity often stayed informal: a designer picks 0.48 for disabled text because it looks right on one screen, then another designer uses 0.5 on the next component.

That drift compounds when agents start building UI. If opacity is not named and structured, the model guesses. Hover states feel slightly off. Scrims do not match modal behavior. Disabled states vary by surface.

Opacity variables give you the same contract color tokens do: a shared vocabulary with predictable meaning.

## What to define first

Start with semantic roles, not raw percentages:

- **Disabled**: elements that cannot be interacted with
- **Muted**: secondary labels, helper text, metadata
- **Hover / pressed overlays**: subtle interaction feedback on surfaces
- **Scrim**: modal and drawer backdrops
- **Full**: default opaque surfaces

Map each role to a number variable for alpha, then compose color variables that reference your base palette plus the alpha token. Designers and agents should reach for the semantic name first, not a raw decimal.

## Connecting Figma to code and agents

The point of structuring opacity in Figma is not Figma alone. It is making the system legible everywhere else: CSS custom properties, component APIs, documentation, and agent instructions.

When opacity lives in variables with clear names, you can export it alongside color and spacing, reference it in component specs, and test whether agents apply the right transparency in generated UI.

That is the foundation of an AI-ready design system: not just pretty variables in Figma, but machine-readable intent your whole stack can follow.

If you want help structuring tokens for agents, the [Design Engineering Course](/design-engineering-course/) covers the full framework.

## FAQ

### What did Figma change about opacity variables?

Figma now lets teams alias opacity without detaching a color, bind opacity to number variables, and update translucent tokens at scale. Opacity moves from a layer hack into the same token layer as color and spacing.

### Why does this matter for an AI-ready design system?

If opacity is unnamed, agents guess. Disabled states, scrims, and overlays drift. Named opacity tokens are machine-readable intent: the same value in Figma, code, and agent instructions.

### Does this replace a Figma design system?

No. It is how a Figma library becomes usable by agents. Keep the library. Structure opacity with the rest of the tokens so Figma, code, and agents share one system.
