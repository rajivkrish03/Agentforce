# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Architecture

Single-page React 19 app built with Vite 8 and Tailwind CSS 3. The entire UI lives in [src/App.jsx](src/App.jsx) as a monolithic component — no routing, no state management beyond React built-ins, no API integration.

**Entry flow**: `index.html` → `src/main.jsx` → `src/App.jsx`

### Design System

The app uses a Material Design 3 color token system defined in [tailwind.config.js](tailwind.config.js) (`primary`, `secondary`, `tertiary`, `surface-*`, `error`, etc.) with dark mode only (`darkMode: "class"`; the `dark` class is set on `<html>` in `index.html`).

Custom CSS utilities live in [src/index.css](src/index.css):
- `.periodic-grid` — 12-column CSS grid layout for capability cards
- `.neon-glow-primary/secondary/tertiary` — hover glow + lift animations
- `.glass-panel` — frosted glass via `backdrop-blur`

Typography uses "Plus Jakarta Sans" (Google Fonts, weights 200–800). Icons use Material Symbols Outlined (Google Fonts).

### What the App Does

"Salesforce Agentforce AI Observatory" — a periodic table-style interface showcasing Salesforce AI capabilities across three eras (Predictive, Generative, Agentic). It's a static prototype with hardcoded data; the modal component exists in JSX but is hidden (no toggle state wired up yet).

---

## Cloud Product Colors

Salesforce does not publish per-cloud colors officially — all products share the unified Salesforce blue system. Convention used in product switchers and third-party tooling:

| Cloud | Color | Hex |
|---|---|---|
| Sales Cloud | Salesforce Blue | `#0176D3` |
| Service Cloud | Teal/Cyan | `#06A59A` |
| Marketing Cloud | Orange | `#FE9339` |
| Agentforce | Violet/Purple | `#7B5EA7` |

### Official SLDS Tokens (use these, not arbitrary hex)

| Token | Hex | Role |
|---|---|---|
| Brand Blue | `#0176D3` | Primary actions, active states |
| Brand Vibrant | `#1B96FF` | Highlights, links |
| Brand Dark | `#032D60` | Deep navy backgrounds |
| Success | `#45C65A` | Positive states |
| Warning | `#FE9339` | Caution / Marketing Cloud accent |
| Error | `#EA001E` | Error states |

The app currently maps: `primary` → Sales/Service blue, `secondary` → yellow (`#FFDB3C`), `tertiary` → pink (`#E31754`). As multi-cloud support is added, introduce per-cloud accent tokens alongside these.

---

## Next Steps

### Step 1 — Wire up interactivity in src/App.jsx

Add the following React state to the existing monolithic component (no new packages):

- `activeFilter` (`"all" | "predictive" | "generative" | "agentic"`) — controlled by both the filter pills and the sidebar era nav items; both must stay in sync
- `selectedCapability` (object | null) — set on card click; drives modal open/close
- Move all hardcoded card data into a `capabilities` array at the top of the component with fields: `id`, `symbol`, `name`, `era`, `description`, `specs`, `colorClass`, `featured`
- Filter cards based on `activeFilter`; hide era section headers when all cards in that section are hidden
- Active pill: `bg-primary text-on-primary`; inactive: `bg-surface-container text-on-surface-variant`
- Modal: remove hardcoded `hidden` class, render conditionally on `selectedCapability !== null`; populate left panel color from `colorClass`; close on backdrop click or X button; use `useEffect` to toggle `overflow-hidden` on body
- Add `transition-all duration-300` to cards for smooth filter animations

### Step 2 — Restructure for multi-cloud + channel navigation

Evolve the app toward a "Salesforce AI Capabilities Explorer" with this architecture:

- **Top-level clouds**: Service | Sales | Marketing | Agentforce (nav tabs)
- **Left sidebar** has two independent filter sections:
  - **AI Era** (top): All | Predictive | Generative | Agentic — filters the feature grid regardless of channel
  - **Channel** (below): Cases, Messaging, Voice, Email, Field Service, Knowledge — narrows to a specific channel
- **View states** (driven by sidebar selections):
  - **Default — no era, no channel selected**: 3-column channel overview grid — each card shows channel icon, name, tagline, and three era badges (Predictive count / Generative count / Agentic count)
  - **Era selected, no channel**: full-width periodic-table grid of ALL features for that era across every channel, grouped by channel with a section header (channel icon + name). Era filter pills (All / Predictive / Generative / Agentic) above the grid stay in sync with the sidebar. "All" shows every feature with era-colored cards intermixed.
  - **Channel selected, no era filter**: two-column layout — Left 60% periodic-table grid of all features for that channel (cards colored by era); Right 40% Storyline / Use Case panel
  - **Both era + channel selected**: same two-column layout but grid is filtered to only that era's features within the channel
- Selecting an era in the sidebar while a channel is active updates the era pill filter in the channel detail view (and vice versa — they stay in sync)
- Each cloud gets its own accent color (see Cloud Product Colors table above)

## Service Cloud — Confirmed Feature List

These are the real capabilities to use as card data. Replace all placeholder cards with these.

### Channel × Era Feature Matrix

| Channel | 🔵 Predictive | 🟡 Generative | 🩷 Agentic |
|---|---|---|---|
| **Cases** | Einstein Case Classification, Einstein Case Routing, Einstein Case Wrap-Up, Einstein Article Recommendations, Einstein Conversation Mining | Einstein Work Summaries, Enhanced Summaries (Case), Einstein Knowledge Creation, Einstein Service Replies (Email), Einstein Search Answers | Agentforce Service Assistant, Agentforce Service Planner |
| **Messaging** | Einstein Bots, Einstein Article Recommendations | Einstein Service Replies (Messaging), Conversation Summaries, Conversation Catch-Up, Einstein Knowledge Creation | Agentforce Service Agent, Proactive Service for Self-Service |
| **Voice** | Einstein Conversation Mining, Einstein Article Recommendations, Conversation Intelligence Service (Pilot) | Conversation Summaries (Voice), Conversation Catch-Up (Voice), Einstein Work Summaries (Voice) | Agentforce Voice |
| **Email** | Einstein Classification Apps, Einstein Article Recommendations | Einstein Service Replies (Email), Email Summaries, Einstein Knowledge Creation, Einstein Email Templates | Agentforce Service Agent (Email channel) |
| **Field Service** | Einstein Next Best Action, Einstein Recommendation Builder | Pre-Work Brief (GenAI), Einstein Work Summaries (FSL) | Agentforce Field Service Agent, Agentforce Scheduling Agent |
| **Knowledge** | Einstein Article Recommendations | Einstein Knowledge Creation, Einstein Knowledge Edits, Einstein Search Answers | Agentforce Service Agent (Answer Questions with Knowledge Action) |

### Step 3 — Stitch UI mockup prompt

Use this prompt in Stitch to generate a visual mockup before coding Step 2:

```
Design a dark-themed web app called "Salesforce AI Capabilities Explorer" — a reference tool for Salesforce customers and partners to explore AI capabilities by cloud, channel, and AI era.

## Overall Vision
Four top-level clouds in the nav: Service, Sales, Marketing, Agentforce. Service Cloud is the active/default view. Each cloud has its own channels and capabilities.

## Layout

**Top Nav (fixed, full width)**
- Left: Logo — "Salesforce AI Explorer" in bold white, "AI" in Salesforce blue (#0176D3)
- Center: Tab navigation — Service | Sales | Marketing | Agentforce (Service active, underlined in blue)
- Right: User avatar circle, settings icon

**Left Sidebar (fixed, 256px)**
- Section label: "AI Era" in small caps, muted
- Four filter items with active state (blue left border + filled bg): All (grid_view icon) | Predictive (analytics icon) | Generative (auto_awesome icon) | Agentic (memory icon)
- Second section label: "Channel" in small caps, muted
- Channel items for Service Cloud: Cases (description icon) | Messaging (chat icon) | Voice (phone icon) | Email (mail icon) | Field Service (build icon) | Knowledge (book icon)
- Both sections are independent filters — selecting an era shows all features for that era across all channels; selecting a channel narrows to that channel; selecting both filters by era within the channel
- Bottom: blue "Explore Use Cases" CTA button

**Main Content — View A: Default (no era, no channel)**
Six large channel cards in a 3-column grid (~280px tall each, dark glass panel):
- Large 48px channel icon in Salesforce blue
- Channel name in bold white + tagline subtitle
- Bottom row: three colored era badges — Blue "N Predictive", Yellow "N Generative", Pink "N Agentic"
- Hover: blue neon glow + card lift

**Main Content — View B: Era selected, no channel (e.g. "Agentic" active in sidebar)**
- Header: era icon + era name (e.g. "Agentic AI") + total feature count badge
- Era filter pills (All | Predictive | Generative | Agentic) in sync with sidebar selection
- Full-width periodic-table grid of ALL features for that era, grouped by channel:
  - Channel section header: channel icon + channel name in small caps, muted divider line
  - Feature cards below: same card style (2-letter symbol in era color, feature name, channel sub-label)
  - Grid: 4–5 columns, cards ~140px tall
- Example for Agentic view: grouped sections for Cases (Agentforce Service Assistant, Agentforce Service Planner), Messaging (Agentforce Service Agent, Proactive Service for Self-Service), Voice (Agentforce Voice), Email (Agentforce Service Agent), Field Service (Agentforce Field Service Agent, Agentforce Scheduling Agent), Knowledge (Agentforce Service Agent)

**Main Content — View C: Channel selected (e.g. "Cases"), optionally filtered by era**
- Breadcrumb: back arrow + "Service Cloud > Cases"
- Channel H2 + short description
- AI era filter pills: All | Predictive AI | Generative AI | Agentic AI (in sync with sidebar era selection)

Two-column layout:
LEFT (60%) — Feature Periodic Grid (4 columns):
  Each card ~140px tall: 2-letter symbol (era color, large bold), feature name (white bold), sub-label (muted small caps), faint icon watermark
  Filtered by active era pill. Example for Cases / All:
  Predictive (blue): Einstein Case Classification | Einstein Case Routing | Einstein Case Wrap-Up | Einstein Article Recommendations | Einstein Conversation Mining
  Generative (yellow): Einstein Work Summaries | Enhanced Summaries | Einstein Knowledge Creation | Einstein Service Replies | Einstein Search Answers
  Agentic (pink): Agentforce Service Assistant (col-span-2 featured) | Agentforce Service Planner

RIGHT (40%) — Storyline Panel:
  Default: dashed border placeholder "Click a feature card to explore use cases"
  After click: large symbol in era color, feature name + era badge, "What it does" description,
  "Storyline" numbered steps, "Use Cases" bullets, related feature chips, See Demo / Read Docs buttons

**Feature Detail Modal (full overlay on card click)**
- Left 1/3: era-colored background, large symbol, feature name, era badge
- Right 2/3: full description, 2-col specs grid, Configure + View Logs + See Docs buttons
- Close button top-right, backdrop click to dismiss

## Color System (dark theme only)
Background: #0B0B0F | Surface cards: #1B1B1F | Primary/Predictive: #0176D3 | Secondary/Generative: #FFDB3C | Tertiary/Agentic: #E31754
Service Cloud accent: #06A59A | Sales Cloud: #0176D3 | Marketing Cloud: #FE9339 | Agentforce: #7B5EA7
Text primary: #FFFFFF | Text secondary: #C0C7D4 | Borders: rgba(255,255,255,0.07)

## Typography
Font: Plus Jakarta Sans (Google Fonts) | Headings: Bold/Black, tight tracking | Labels: all-caps, wide spacing | Icons: Material Symbols Outlined
```
