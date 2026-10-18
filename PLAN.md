# Portfolio Plan — Jitin Kumar Sengar (devxjitin)

> Static personal portfolio. Positioning: **Agentic AI engineer & creator of the Autourgos framework.**
> Source data: GitHub profile `devxjitin` (26 public repos + private ones), LinkedIn `devxjitin` (details pending — see Open Questions).

---

## 1. Positioning & tone

- **Headline:** "I build AI agents that think, see, listen and act."
- **Sub-line:** Creator of **Autourgos** — an open-source, zero-dependency Python framework for LLM agents, computer-use, memory, voice and human-in-the-loop control.
- **Tone:** developer-first, precise, no fluff. Feels like a well-made dev tool / docs site, not a template.
- **Primary CTA:** "View Autourgos on GitHub" · **Secondary:** "Contact / Hire me", LinkedIn, Resume PDF.

## 2. Tech stack (static)

| Choice | Why |
|---|---|
| **Astro** (static output) | Ships zero JS by default, fast, Markdown/MDX content collections for projects. Output = plain HTML/CSS. |
| Tailwind CSS | Quick consistent design tokens, dark mode. |
| Content in `src/content/projects/*.md` | Add/update projects without touching layout. |
| Optional: GitHub API at **build time** | Pull stars / last-updated / languages into the site on each build — still fully static. |
| Hosting: **GitHub Pages** (repo `devxjitin.github.io`) or Vercel/Netlify | Free, custom domain possible. |

Alternative if you want zero build tools: plain `index.html` + CSS + small vanilla JS. (Astro recommended — easier to maintain as projects grow.)

## 3. Visual design — "professional developer"

- **Theme:** dark by default (near-black `#0B0D10`), light mode toggle. One accent color — electric cyan/teal (agent/"signal" feel), used sparingly.
- **Type:** `Inter` / `Geist` for text, `JetBrains Mono` for code, labels, tags and section numbers.
- **Motifs (subtle, not gimmicky):**
  - Hero with a **live-looking agent trace** — animated `Thought → Action → Observation → Final Answer` lines in a terminal card (mirrors how autourgos-agent actually works).
  - Thin grid / dot background, monospace section labels like `01 // about`.
  - Code snippet cards (real `pip install autourgos-agent` + 6-line usage example).
- **Motion:** small fade/slide-in on scroll, respects `prefers-reduced-motion`.
- **Quality bar:** Lighthouse 95+, mobile-first, accessible contrast, OG image + SEO meta.

## 4. Site structure (single long page + project detail pages)

```
/                    Home (all sections below)
/projects/<slug>     Detail page per featured project (case study)
/autourgos           Ecosystem page (all autourgos-* packages)
/resume.pdf          Downloadable resume
```

### Home sections
1. **Hero** — name, headline, agent-trace terminal animation, CTAs, socials (GitHub, LinkedIn, email `devxjitin@gmail.com`).
2. **About** — short bio: BCA graduate, Agentic AI focus, what you build (agents, computer-use, voice AI, RAG). Photo/avatar.
3. **Flagship: Autourgos framework** — big feature block:
   - What it is, design principles (zero third-party deps, any OpenAI-compatible LLM, async-first, middleware hooks).
   - **Architecture diagram** of the ecosystem (layers below).
   - Install snippet + PyPI badge (`autourgos-agent` v3.11.0 on PyPI).
4. **Featured projects** (6 cards, grid) — see section 5.
5. **Skills / stack** — grouped, not a logo wall:
   - *Agentic AI:* ReAct agents, tool calling, middleware, memory, RAG, human-in-the-loop, computer-use agents
   - *LLM / Realtime:* OpenAI Responses & Chat APIs, Gemini Live, Gemini Vision, Whisper, realtime WebSocket audio/video
   - *Backend:* Python, FastAPI, PostgreSQL, Docker
   - *Frontend / Mobile:* TypeScript, React, Next.js, Tailwind, Kotlin + Jetpack Compose
6. **Experience / Education timeline** — from LinkedIn (pending).
7. **Open-source stats** — repo count, PyPI packages count, languages (build-time from GitHub API).
8. **Contact** — email, LinkedIn, GitHub; simple `mailto:` or Formspree form (static-friendly).

## 5. Project content (from your GitHub)

### Autourgos ecosystem (grouped on `/autourgos`)
| Layer | Packages |
|---|---|
| Core | `autourgos-core`, `autourgos-agent`, `autourgos-starter` |
| LLM clients | `autourgos-openaichat`, `autourgos-openaichat-js`, `autourgos-responses`, `autourgos-live` |
| Agent middleware | `autourgos-memory`, `autourgos-skills`, `autourgos-hcix` (human interrupt) |
| Computer-use tools | `autourgos-cua-coordinate-tool`, `-mouse-click-tool`, `-scroll-tool`, `-screenshot-understanding-tool` |
| Voice & I/O | `autourgos-whisperstt`, `autourgos-windowstt`, `autourgos-micinput`, `autourgos-textinput`, `autourgos-textoutput` |

### Featured projects (proposed top 6)
| # | Project | Pitch | Stack | Public? |
|---|---|---|---|---|
| 1 | **Autourgos Agent** | Zero-dependency ReAct agent framework, any LLM, async, 11 lifecycle hooks | Python | Public |
| 2 | **CampusGrade** | GitHub-native grading platform with code-similarity detection and privacy-safe AI evaluation | FastAPI, PostgreSQL, Next.js, Docker | Public |
| 3 | **Sanchar** | Multi-tenant voice assistant SaaS on Gemini Live | FastAPI, TypeScript | Private |
| 4 | **ULTRON** | Voice-controlled Windows desktop assistant with vision + automation | Python, CV, STT | Public |
| 5 | **Drishti** | Voice assistant kiosk grounded in your own knowledge (RAG) | Kotlin, Compose, Gemini | Private |
| 6 | **RAG Dataset Studio** | Turn docs/websites into traceable RAG datasets | FastAPI, React, Vite | Private |

**Also listed (smaller cards / "more projects"):** Project-loop (AI customer-feedback intelligence), Nirman Lab Voice Assistant, AirCursor (finger-tracking cursor), ExamGuard (AI proctoring), TrustID (licensing/auth system).

**Excluded by default:** Examina / Examina-Pro / examina-website (answers on-screen exam questions — may not read well to recruiters), StarkMind (team site). Your call.

### Each project card / case study contains
Problem → What I built → Architecture (small diagram) → Key technical decisions → Stack tags → Links (GitHub / demo / PyPI) → 1-2 screenshots (CampusGrade already has screenshots in `docs/screenshots/`).
Private repos: show case study without source link ("Private — demo on request").

## 6. Folder structure

```
Portfolio/
  src/
    components/   Hero, AgentTrace, ProjectCard, Timeline, SkillGroup, Footer
    content/projects/*.md
    layouts/Base.astro
    pages/index.astro, autourgos.astro, projects/[slug].astro
  public/         avatar, og-image, screenshots, resume.pdf
  track.md
```

## 7. Build phases

1. **Content collection** — confirm LinkedIn data, featured list, bio, resume PDF, photo.
2. **Scaffold** — Astro + Tailwind, design tokens, base layout, dark/light.
3. **Home sections** — hero (agent trace animation), about, Autourgos block, projects grid, skills, timeline, contact.
4. **Project & Autourgos pages** — markdown-driven case studies + ecosystem diagram.
5. **Polish** — responsive, a11y, SEO/OG image, Lighthouse check.
6. **Deploy** — GitHub repo + GitHub Pages (only after your approval).

## 8. Open questions (need from you)

1. **LinkedIn details** — LinkedIn login ke bina page read nahi hota. Please paste (ya LinkedIn "Save to PDF" do): headline, about, experience, education (BCA college + year), certifications, location.
2. **Private repos** — Sanchar, Drishti, RAG Dataset Studio, ExamGuard, TrustID ko case study ki tarah dikhana hai (bina code link)?
3. **Examina** — include karna hai ya hide?
4. **Hosting** — GitHub Pages (`devxjitin.github.io`) theek hai? Custom domain hai?
5. **Extras** — resume PDF, profile photo, Autourgos maintainers (Sonia, Vishwanil Suman) ko credit dena hai?
