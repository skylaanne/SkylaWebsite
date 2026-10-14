# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: small-business owners and individuals with an idea.** People starting or running a small business who need a website, or plain-language help with technology, and don't speak the jargon. They arrive unsure what they need and often unsure what to call it. Their job on this site: decide whether Skyla is someone they can trust with their idea, then start a conversation.

**Also served:**

- **Hiring managers and recruiters** evaluating Skyla's backend and monitoring background for a role. The professional credibility has to hold up for them.
- **Engineering teams** who might bring Skyla in for backend engineering or monitoring and observability work.
- **People learning AI**, individuals who want beginner-friendly lessons and honest takes on new tools.

## Product Purpose

The personal portfolio and front door for Skyla Urman, a software engineer and creative technologist. It shows real client work, explains what Skyla can help with, and turns a visitor's half-formed problem into a message. Success is a contact-form inquiry or email from someone with a real project or question.

## Positioning

A professional backend and observability engineer (B.S. Computer Science) who also designs and builds websites. The combination is the claim: a site built by someone who works on production systems day to day, explained by someone who can make it plain. "I build the parts you see and the parts you don't."

## Operating Context

- Unconfirmed (no analytics): visitors likely arrive from referrals, shared links, or LinkedIn/GitHub, often on phones. Treat mobile as a first-class path either way.
- They browse the work, try the client sites live inside the page, read the services, then reach out through the contact form (Formspree), email, LinkedIn or GitHub.
- Skyla replies personally, usually within a couple of days. There is no booking link.

## Capabilities and Constraints

- **Client work:** paid, and open to anyone who finds the site, not only people Skyla knows.
- **Tally:** Skyla's own product, a social TV and movie tracker for iPhone (iOS 17+), in its own site section. Its beta is coming soon on TestFlight, free. Until the TestFlight link exists, visitors ask to join through the contact form ("Joining the Tally beta"). Tally's colors and Caprasimo wordmark stay inside its panel, the same way client sites keep their own identity.
- **Services offered:** website design and development; AI and technology guidance; backend engineering; monitoring and observability.
- **Site:** a single page plus a privacy policy and a 404 page. It's plain HTML, CSS and JavaScript with no build step and no dependencies. It deploys to GitHub Pages from `main`, and there's a Cloudflare config (`wrangler.jsonc`) serving the same `site/` folder.
- **Contact form:** Formspree (form `myekbgde`) with in-page sending, success and error states. It works without JavaScript too.
- **Live previews:** client sites load in a sandboxed iframe only when the visitor asks, and only if the site allows embedding.
- **Privacy:** no analytics. `privacy.html` describes what's collected today and must be updated if analytics, a newsletter, or another visitor-data service is added.
- **Undecided:** pricing, packages, availability, service area, and turnaround aren't stated anywhere. Don't publish them until Skyla confirms them.

## Brand Commitments

- **Name:** Skyla Urman. The "S." monogram mark (`assets/favicon.svg`, the header logo).
- **Voice:** warm, plain-spoken, a little playful, and never condescending. Jargon gets explained or cut ("no jargon required · engineers welcome too"). Light engineering humor is part of the personality: `$ ping skyla`, "200 ok · all systems curious", the footer easter egg.
- **Dual identity:** the engineer and the creative technologist are both real and get equal standing. Neither is a side quest.

## Evidence on Hand

- **Two live client projects, both approved for feature by their owners:** Al's Curls & Coils, a curly-hair salon in Reno, Nevada (alscurlsandcoils.com), and Vasquez Pipeline & Fuel Construction (vasquezpfc.com). Screenshots are in `site/assets/img/` at 800 and 1440px.
- **Tally:** the app icon (`site/assets/img/tally-icon-192.png`, `-384.png`, exported from the `tally-ios` repo), the feature set from its README, and its stack (native SwiftUI, sharing one backend and account with the Tally website: Next.js, Prisma, Postgres). There are no screenshots, tester counts or launch date on hand.
- **Portrait:** `site/assets/img/skyla-400.jpg`, `skyla-720.jpg`.
- **Credentials:** B.S. Computer Science; professional backend, monitoring and observability work.
- **Not on hand, so never fabricate:** testimonials or quotes from clients, client counts, metrics or results, pricing, press, or employer names. Each project has a commented-out "to confirm" row (hosting and domain, timeline, what the client supplied) waiting for real facts. There's no `og:image` yet.

## Product Principles

1. **Lower the barrier to asking.** The visitor shouldn't need the vocabulary. Every path should make "I'm not sure what I need" a fine way to start.
2. **Show, don't claim.** Real, live client work does the persuading. Never invent proof the site doesn't have.
3. **Credible to engineers, readable to everyone.** Technical depth stays honest for hiring managers and teams, without becoming the barrier for a small-business owner.
4. **Personal, not agency.** One person who reads every message. The site should feel like meeting Skyla, not a firm.
5. **Honest to the facts on hand.** Unconfirmed details stay out until confirmed.

## Accessibility & Inclusion

The site already targets WCAG AA in practice. It has keyboard focus states, a skip link, labelled form fields with inline errors, live-region announcements, alt text that describes each screenshot, and a reduced-motion mode that keeps fades but drops movement. The primary visitor is non-technical and may well be on a phone, so plain language and comfortable touch targets matter as much as contrast.
