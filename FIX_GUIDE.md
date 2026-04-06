# UI Fix Guide — Two Issues

## Fix 1: "All" in AI Frameworks sidebar shows channels instead of all features

**Root cause:** `src/App.jsx` line 609 uses `(!activeChannel && activeFilter === 'all')` as the condition for showing the channel overview grid. Clicking "All" in the sidebar also satisfies this condition, so it always shows channels instead of the full feature grid.

**Fix:** Add a new `isOverview` boolean state to distinguish "default landing" from "user explicitly selected All".

### Step-by-step changes in `src/App.jsx`

**1. Add state after line 431 (after the existing useState hooks):**
```js
const [isOverview, setIsOverview] = useState(true);
```

**2. Cloud nav button onClick (around line 477) — add `setIsOverview(true)`:**
```jsx
onClick={() => {
  setActiveCloud(cloud.id);
  setActiveChannel(null);
  setActiveFilter('all');
  setIsOverview(true);   // ADD THIS LINE
}}
```

**3. Era filter sidebar button onClick (around line 535) — set overview to false:**
```jsx
onClick={() => { setActiveFilter(era.id); setIsOverview(false); }}
```

**4. Channel sidebar button onClick (around line 560) — set overview to false:**
```jsx
onClick={() => { setActiveChannel(channel.id); setIsOverview(false); }}
```

**5. Channel overview card onClick (around line 621) — set overview to false:**
```jsx
onClick={() => { setActiveChannel(channel.id); setIsOverview(false); }}
```

**6. "Back to Overview" button onClick (around line 647) — reset to true:**
```jsx
onClick={() => { setActiveChannel(null); setActiveFilter('all'); setHoveredCapability(null); setIsOverview(true); }}
```

**7. Change the view condition at line 609 from:**
```jsx
} : (!activeChannel && activeFilter === 'all') ? (
```
**To:**
```jsx
} : isOverview ? (
```

---

## Fix 2: Light mode looks broken — dark text/backgrounds persist

**Root cause:** `tailwind.config.js` has all colors hardcoded as dark hex values (e.g. `"background": "#0B0B0F"`, `"surface-container-low": "#1b1b1f"`). These never change when theme switches to light. The CSS variables in `src/index.css` correctly define light tokens under the `.light` class, but Tailwind utility classes ignore CSS variables — they always use the hardcoded dark values.

Additionally, many JSX elements use hardcoded `text-white`, `bg-white/5`, `border-white/10` which are invisible or ugly in light mode.

### Changes in `tailwind.config.js`

Replace the hardcoded values for semantic color tokens with CSS variable references so they respond to theme switching:

```js
// In the colors object, change these entries:
"background":           "var(--background)",
"surface":              "var(--surface)",
"surface-container":    "var(--surface-container)",
"surface-container-low":"var(--surface-container-low)",   // see index.css note below
"on-surface":           "var(--on-surface)",
"on-surface-variant":   "var(--on-surface-variant)",
```

Leave all other color entries (`primary`, `tertiary`, `secondary`, `error`, etc.) as-is — those are era/brand colors, not theme-dependent.

### Changes in `src/index.css`

The file already has `:root` (dark) and `.light` tokens. Add two missing variables and fix the background gradient for light mode:

**In `:root` block, add:**
```css
--surface-container-low: #001E50;
```

**In `.light` block, add:**
```css
--surface-container-low: #FFFFFF;
```

**Also in `.light`, add overrides for elements that can't use CSS vars directly:**
```css
.light body {
  background-image: 
    radial-gradient(at 0% 0%, rgba(1, 118, 211, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(227, 23, 84, 0.03) 0px, transparent 50%);
}
```

### Changes in `src/App.jsx` — fix hardcoded light-incompatible classes

**Around line 659** (era/channel header title) — change `text-white` to `text-on-surface`:
```jsx
// BEFORE:
<h2 className="text-4xl font-black tracking-tighter text-white capitalize leading-none">
// AFTER:
<h2 className="text-4xl font-black tracking-tighter text-on-surface capitalize leading-none">
```

**Around line 672–673** (era filter pills, inactive state) — replace `bg-white/5` and `border-white/5`:
```jsx
// BEFORE:
'bg-white/5 text-on-surface-variant hover:text-white border border-white/5'
// AFTER:
'bg-on-surface/5 text-on-surface-variant hover:text-on-surface border border-[var(--border)]'
```

**Around line 697** (feature card border color in JS style prop) — replace hardcoded rgba:
```jsx
// BEFORE:
borderColor: hoveredCapability?.id === cap.id ? (...) : 'rgba(255,255,255,0.05)',
// AFTER:
borderColor: hoveredCapability?.id === cap.id ? (...) : 'var(--border)',
```

**Around line 564** (sidebar channel buttons) — change `text-slate-500` to a theme-aware class:
```jsx
// BEFORE:
'text-slate-500 hover:bg-white/5 border-l-4 border-transparent'
// AFTER:
'text-on-surface-variant hover:bg-on-surface/5 border-l-4 border-transparent'
```

**Around line 840** (modal description title) — change `text-white` to `text-on-surface`:
```jsx
// BEFORE:
<h5 className="text-3xl font-bold text-white mb-6 leading-tight">
// AFTER:
<h5 className="text-3xl font-bold text-on-surface mb-6 leading-tight">
```

---

## Summary of files to change

| File | Changes |
|---|---|
| `src/App.jsx` | Add `isOverview` state; update 6 onClick handlers; change view condition; fix 4 hardcoded color classes |
| `tailwind.config.js` | Change 6 color entries to use `var()` |
| `src/index.css` | Add `--surface-container-low` to both `:root` and `.light`; add light mode body gradient override |
