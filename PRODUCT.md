# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences weigh the same:

- **Recruiters and hiring companies**, in Colombia and abroad (remote, often reading in English), evaluating whether to bring David on as a full stack developer.
- **Businesses that need custom software built**, as clients for freelance work today and for David's own software company in the long term.

Both arrive mostly from LinkedIn, GitHub or a shared link, decide quickly, and need proof that he ships real software.

## Product Purpose

Personal portfolio of David Garzón (Juan David Garzón), full stack developer based in Yumbo, Valle del Cauca, Colombia. It exists to turn a visit into a conversation.

Success: the visitor **writes to him** (LinkedIn or email) for an interview or a project. Downloading the CV and browsing projects support that goal; they are not the goal.

## Positioning

He builds complete software that runs in production every day for real businesses, end to end: from requirements to architecture, code, deployment and the servers it runs on. The engineering discipline is the differentiator: Clean Architecture, DDD, OOP and SOLID, strict TDD and an SDD workflow (proposal, spec, design, tasks), with AI agents (Claude Code) used under review and quality gates.

He does not position himself as an ISP or telecom specialist, even though his current employer is an internet provider. Describe the work as business platforms in general.

## Operating Context

- Visitors land on the home page or a deep link (`/about`, `/projects`) on davidgarzon.dev.
- Contact happens off-site, through LinkedIn and email. There is no contact form; a contact page was removed on purpose and the owner does not want one.
- The CV is a downloadable PDF (`public/Cv/HvAc.pdf`).
- Hosted on Vercel; `main` deploys to production and other branches get preview URLs.

## Capabilities and Constraints

- Pages: home (hero + tech carousel), About (bio, experience, education), Projects.
- Content lives in `src/constants/index.ts` and interface copy in `src/i18n/ui.ts`; every visible string has `es` and `en` versions and tests fail if one is missing.
- Stack in place: React 19, TypeScript (strict), Vite, Tailwind CSS v4, Framer Motion, React Router, Vitest, ESLint with typescript-eslint.
- Must respect `prefers-reduced-motion`.
- Never publish client data, internal URLs, IPs, credentials or screenshots with real customer information. Do not state Conéctate's customer count, its specific network vendors (e.g. SmartOLT) or HR/biometric details.
- Do not use copyrighted characters or film stills as site imagery.

## Brand Commitments

- Black and white, professional. Project screenshots, company logos and the profile photo keep their original colors.
- The white pixel-art mascot stays (walks in the hero, jumps between sections and pages, looks at the cursor, says hello on first visit).
- Bilingual Spanish / English with a visible ES/EN switch.
- His profile photo stays on the About page.
- Name shown as "David Garzón"; role "Desarrollador Fullstack / Fullstack Developer".
- Voice: direct, plain, not boastful. Achievements are stated as facts ("Reconocido como mejor graduando del programa").

## Evidence on Hand

- **Conectate OSS**: operations platform built from scratch and used daily in production at Conéctate Telecomunicaciones; private (no link). Cover: `src/assets/conectate.jpg`.
- **Sitio web de Conéctate** (conectate.com.co): full redesign with a WebGL fiber-optic concept, Chatwoot real-time chat, coverage lookup; SEO score 67 → 93. Cover: `src/assets/conectate-web.jpg`.
- **Gessat** (gessat.com.co): SG-SST platform for a consultancy and its client companies, with training, roles, permissions, access control and Wompi payments. Cover: `src/assets/gessat.jpg`.
- **Pizzatelo** (pizzatelo-menu.vercel.app, public repo): interactive web menu with WhatsApp ordering. Cover: `src/assets/pizzatelo.jpg`.
- Experience: Conéctate Telecomunicaciones (Jun 2026 – present, Full Stack Developer); Siesa (Sep 2025 – Mar 2026, internship then hired; support and development).
- Education: Tecnología en Desarrollo de Software, Universidad del Valle (2022 – 2026), recognized as the program's top graduate.
- Confirmed figures usable in copy: 24 backend modules, more than 1,000 test files, about 7,700 frontend tests and more than 1,400 PRs in Conectate OSS.
- Logos: `src/assets/conectate-logo.png`, `src/assets/siesa.png`, `src/assets/Univalle.svg.png`. Photo: `src/assets/mi-foto.jpg`.
- No testimonials, client quotes, case-study pages or press exist. Do not invent them.

## Product Principles

1. Proof over promises: real projects running in production lead, and every claim can be checked.
2. Every page should make it easy to write to David; contact is never more than one step away.
3. Speak to recruiters and clients at once: show engineering rigor and business results together.
4. Honest and precise: exact roles, dates and scope; nothing inflated, nothing confidential.
5. Bilingual by default: nothing ships in only one language.

## Accessibility & Inclusion

Keyboard access and screen-reader labels in both languages; reduced-motion alternative for every animation.
