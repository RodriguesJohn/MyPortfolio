---
title: "Design Systems: Build Product Infrastructure"
description: "Learn how to build design systems that connect tokens, components, governance, and code—then improve adoption, delivery, and consistency across products."
date: "2026-09-07"
author: "John Rodrigues"
tags: ["Design systems", "Tokens", "Governance"]
draft: false
---

Most teams treat design systems as a library. A Figma file. A Storybook. A Slack channel where someone answers which button to use.

That framing is why the work stalls. A library is something you browse. Product infrastructure is something the company runs on. When design systems are infrastructure, tokens, components, governance, and code are one system. Adoption stops being a campaign. Delivery gets faster because people stop reinventing the same UI. Consistency holds because the defaults are the system, not a slide in a kickoff deck.

I have spent the last few years building this layer and teaching it: connecting Figma to code so humans and agents retrieve the same rules. The file is never the product. The connections are.

## What product infrastructure actually means

Infrastructure is the stuff you do not renegotiate every sprint. Auth. CI. Environments. You can ship features without rebuilding those each time.

Design systems belong in that category. Color, type, space, interaction, and component contracts should not be invented per surface. If every squad picks its own padding scale, you do not have a product. You have a collage.

Calling design systems infrastructure changes the job. You are not decorating screens. You are encoding decisions so product, design, and engineering share one source of truth. The output is not a prettier Figma page. The output is faster delivery with less visual drift.

A gallery shows what exists. Infrastructure decides what is allowed, what is preferred, and what happens when someone needs an exception. That is the difference between a reference and a system the company can actually run.

## Tokens are the shared language

Tokens are named values: color, type, space, radius, motion, opacity. Primitive tokens hold raw values. Semantic tokens name the job. `color.red.500` is a swatch. `color.text.disabled` is a decision.

I keep seeing teams skip the semantic layer. They publish a palette and hope people pick the right red. They do not. Designers attach hex. Engineers hard-code rgba. Two months later you have four versions of disabled.

Design systems that work treat tokens as the contract between design and code. Change brand red in one place and every semantic token that points at it follows. If a value only lives on a layer, it is not a token. It is a one-off.

Name tokens by intent. Disabled, muted, scrim, overlay, primary. People remember jobs. They do not remember 0.48. When agents generate UI, a model that sees `opacity/disabled` can reuse it. A model that sees a random 48% on a layer will guess.

Tokens without a pipeline are documentation. The pipeline is what makes them infrastructure: Figma variables, CSS custom properties, or theme objects, kept in sync on purpose.

## Components are the product API

A component is not a drawing of a button. It is an API with variants, states, and constraints. If those are not encoded, every consumer invents a slightly different button.

I walk into codebases that have fifteen buttons and a design file that claims there are three. Nobody lied. The system was not the path of least resistance. Someone needed a quiet action on a dense table, could not find it, and shipped a new one.

Good design systems make the existing component easier than a new one. Props sit next to the component. Anatomy is visible. Tokens are bound, not painted on. Smaller primitives plus a few composed patterns scale better than one master button that tries to be everything.

When I built Florence, the point was not a prettier set of controls. It was a catalog people and agents could retrieve. If a designer cannot find the component in under a minute, they will draw a new one. If an engineer cannot import it, they will copy JSX from the last feature.

## Code is not a downstream export

A lot of design systems die between Figma and the repo. Design updates the library. Engineering never hears about it. Or engineering ships a prop the file does not show. Both sides are right about their own surface. The product is wrong.

Treat code as part of the system, not a render of it. The repo is where the product actually runs. If the Figma component and the React component disagree, the React component wins in production.

The setup is boring and it works. One canonical implementation per component. Tokens compiled into the same names design uses. A preview that renders the real component. Changes go through git. Figma stays the working file for visual work. It is not a second source of truth that silently diverges. If those two files disagree, you are maintaining two products and calling it a system.

If you use agents in the loop, this gap gets expensive. The agent reads the repo. If the law lives only in Figma, the agent invents. Put contracts next to components. That is still design systems work. It is just honest about who is consuming the system.

## Governance is how the system stays true

Governance is the part that fails first. Who can add a component. Who can change a token. What happens when a squad needs something the system does not have. How you deprecate.

Without that, design systems become a suggestion. People fork. They add `Button2`. They drop in a hex just for this campaign. Six months later you are maintaining folklore.

Keep it light enough that people will use it. A weekly intake. A documented exception path. New patterns as proposals, not merged one-offs. Slack is not a governance model. It is a trail of unanswered questions.

Ownership has to be real. A team that only polices Figma will lose. Review the component in code. If you cannot staff that, shrink the system until you can. A small, true set beats a large, fictional one. Exceptions should expire. Just this once without a date is how the system rots.

## Adoption is a product problem

Teams ask why nobody uses the library. Usually it is incomplete, hard to find, or slower than copying the last screen. Adoption is not a lunch-and-learn problem first. It is a product problem.

Make the system the fastest path. Search that works. Names that match how people talk. Copy-paste that produces the real component. If the only enforcement is a disappointed comment in Figma, you will lose to deadline pressure.

I have watched adoption jump when we stopped adding guidelines and started deleting duplicate components. Ten components everyone trusts outperform eighty that nobody is sure about. New hires are the test. If they cannot ship an on-brand screen in the first week without a live walkthrough, the infrastructure is not done.

## Delivery and consistency

Feature work is slow when every screen reopens color, type, and control choices. Design systems pull those debates forward, once, into the system. Then a checkout flow is a checkout flow. It is not a referendum on border radius.

The gains only show up if the system is in the path. A beautiful Figma library that is not in the repo does not speed delivery. It creates a translation tax. Measure it like other infrastructure: time from spec to UI, one-off components per quarter, defects that are wrong button instead of wrong logic. If those numbers do not move, you have a gallery.

Consistency is what people ask for. It is not what you build directly. You build shared tokens, a small component set, code that uses them, and governance that keeps them honest. You do not pixel-match every surface by hand. A modal that uses `color.surface.raised` and `radius.md` will sit with the rest of the product even if nobody compared it to settings.

Inconsistency is usually a missing token or a missing component, not a taste problem. Someone needed a state you did not name. They improvised. Name the state. Ship the component. The next person will not improvise.

## How the four layers connect

Think of it as one loop, not four workstreams.

Tokens name the raw decisions. Components apply those decisions with structure. Code is where both become real. Governance decides how the set changes. Skip a layer and the others compensate in ugly ways. Tokens without components are a palette. Components without code are a mock. Code without governance is a snapshot that ages.

I run this loop in the [Design Engineering Course](/design-engineering-course/) because teams usually have two of the four: a Figma library and a React kit that drifted, or tokens in code and no names in design. Connecting them is the work.

You probably do not need a greenfield system. You have an existing one that is half-true. Pick one surface. Map the tokens it actually uses. Find the components it should have used. Then make the smallest honest loop: one semantic token wired to code, one component with a contract, one rule for exceptions. Expand only when that loop is boring.

Design systems as product infrastructure is not a rebrand of the same Figma file. It is a decision to treat UI language like the rest of the stack: named, versioned, owned, and used by default. Tokens, components, governance, and code. Connected. That is the job.

If you want to make an existing system hold under real product pressure, the [Design Engineering Course](/design-engineering-course/) walks through it end to end.
