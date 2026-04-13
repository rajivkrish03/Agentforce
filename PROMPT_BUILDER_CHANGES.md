# Prompt Builder Restructuring — Changes Summary

## What Changed

### 1. **Fixed Icon** ✅
- **Old**: `icon: 'prompt'` (doesn't render properly in Material Symbols)
- **New**: `icon: 'edit_note'` (clean, simple Material Symbol that represents prompt editing)

### 2. **Restructured Hierarchy** ✅

**New 3-Level Structure**:

```
Level 1: Prompt Builder (parent tile)
├── Level 2: Web Grounding (child)
│   └── Level 3: 7 web features with timeline (releases array)
├── Level 2: General Features (child)
│   └── Level 3: Core prompt authoring (coming preview)
└── Level 2: Limits & Guardrails (child)
    └── Level 3: Safety controls (future roadmap)
```

### 3. **Web Grounding Timeline** — 7 Features (May 2025 → April 2026)

| Date | Release | Feature | Icon |
|---|---|---|---|
| May 2025 | Spring '25 | Web Search Data Library | 📚 library_add |
| July 2025 | Summer '25 | Web Retriever for Prompts | 🌐 public |
| October 2025 | Winter '26 | General Web Search Topic & Action | 📝 summarize |
| December 2025 | Winter '26 | OpenAI Search Provider (Beta) | 🧩 extension |
| February 17, 2026 | Spring '26 | Allowed Domains | ✅ verified |
| April 6, 2026 | Spring '26 | Web Actions (Live Data) | ⚡ bolt |
| April 7, 2026 | Spring '26 | Additional Search Providers | 🎛️ tune |

---

## Best Way to Visualize This Timeline

### Recommended Approach: **Vertical Timeline with Feature Cards**

#### Why This Works Best:

1. **Chronological Story** — Shows the evolution from "basic web search" → "advanced multi-provider with domain controls"
2. **Progressive Disclosure** — Each feature builds on previous ones (Data Library → Retriever → Actions → Providers)
3. **Clear Milestones** — Release labels (Spring '25, Winter '26, etc.) act as chapter markers
4. **Scannable** — Users can quickly see "where we are now" vs "what's coming"

#### Visual Layout:

```
┌─────────────────────────────────────────────────────────────┐
│  Web Grounding Timeline (May 2025 → April 2026)             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ●━━━ May 2025 · Spring '25                                 │
│  │   📚 Web Search Data Library                             │
│  │   Add web search as a data source in Data Library        │
│  │                                                           │
│  ●━━━ July 2025 · Summer '25                                │
│  │   🌐 Ground Prompts with Web Sites                       │
│  │   Connect prompts to external websites for grounding     │
│  │                                                           │
│  ●━━━ October 2025 · Winter '26                             │
│  │   📝 General Web Search Topic & Action                   │
│  │   Summarized answers from the web in conversations       │
│  │                                                           │
│  ●━━━ December 2025 · Winter '26                            │
│  │   🧩 OpenAI Search Provider (Beta)                       │
│  │   Route queries through OpenAI's search engine           │
│  │                                                           │
│  ●━━━ February 17, 2026 · Spring '26                        │
│  │   ✅ Allowed Domains                                     │
│  │   Restrict search to trusted domains                     │
│  │                                                           │
│  ●━━━ April 6, 2026 · Spring '26                            │
│  │   ⚡ Web Actions (Live Data)                             │
│  │   Fetch live web data at runtime                         │
│  │                                                           │
│  ●━━━ April 7, 2026 · Spring '26                            │
│      🎛️ Additional Search Provider Options                  │
│      Flexibility to choose search engines                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Alternative Visualizations (and why timeline is better)

### ❌ **Table View**
**Pros**: Compact, sortable
**Cons**: Doesn't show progression, feels static, hard to see the narrative arc

### ❌ **Grouped by Release**
**Pros**: Shows release cadence
**Cons**: Loses the feature-to-feature evolution story (Web Search → Retriever → Actions)

### ❌ **Card Grid (like Capabilities)**
**Pros**: Familiar pattern from other sections
**Cons**: No temporal context — users can't tell what's available now vs what's coming

### ✅ **Vertical Timeline (Recommended)**
**Pros**: 
- Shows chronological evolution
- Clear "now" vs "future" divider
- Reveals feature dependencies (Actions require Retriever)
- Mobile-friendly (scrollable)
- Matches storytelling pattern: "First we added search, then we grounded prompts, then we added live data"

**Cons**: Takes more vertical space (but that's fine — this is a deep-dive view)

---

## Implementation Notes

### Current UI State
The existing app uses:
- **Level 1 tiles**: Large cards in grid layout (like "Agentforce Grid", "Agentforce Development")
- **Level 2 children**: Activated on L1 click, shows child cards (like "Agent Script", "Legacy Builder")
- **Level 3 drill-down**: Shows channel support boxes + feature boxes + timeline

### For Prompt Builder → Web Grounding
When user clicks:
1. **Prompt Builder (L1)** → Shows 3 child tiles: Web Grounding, General Features, Limits
2. **Web Grounding (L2)** → Shows:
   - **Channel Support Boxes**: None (not applicable to Prompt Builder)
   - **Feature Boxes**: 4 features (Web Search, Domain Restrictions, Multi-Provider, Web Actions)
   - **Timeline Section**: Vertical timeline with 7 releases (May 2025 → April 2026)

### Timeline Component Recommendation

```jsx
{/* Vertical Timeline for Web Grounding */}
<div className="releases-timeline">
  <div className="timeline-header">
    <h3>Web Grounding Evolution</h3>
    <span className="timeline-range">May 2025 → April 2026</span>
  </div>
  
  {webGroundingReleases.map((release, index) => (
    <div className="timeline-item" key={release.id}>
      <div className="timeline-marker" style={{ backgroundColor: release.accent }} />
      <div className="timeline-content">
        <div className="timeline-date">
          {release.dateLabel}
        </div>
        <div className="timeline-title">
          <span className="material-symbols-outlined">{release.icon}</span>
          {release.title}
        </div>
        <p className="timeline-summary">{release.summary}</p>
        <a href={release.url} target="_blank" className="timeline-link">
          View Release Notes →
        </a>
      </div>
    </div>
  ))}
</div>
```

---

## User Learning Benefits

### With Timeline (Recommended):
✅ **Narrative Arc**: "First Salesforce added web search, then they let you ground prompts, then they added domain controls for security, and now you can fetch live data"
✅ **Current State Visibility**: User can see exactly what's GA vs Beta vs Coming Soon
✅ **Feature Dependencies**: Understands that Web Actions build on the Web Retriever foundation

### Without Timeline:
❌ Users see a flat list of features with no context on:
- Which features are prerequisites for others
- How the capability evolved over time
- What's available today vs what's on the roadmap

---

## Recommendation: **Use Vertical Timeline**

The web grounding features tell a clear evolution story that's best shown chronologically. Use the timeline view for Level 3 (inside Web Grounding child), and keep the card grid for features that don't have temporal dependencies.
