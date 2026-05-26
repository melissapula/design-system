---
'@mfp-design-system/nav': patch
---

Two fixes to `<mfp-nav-bar>`'s responsive dropdown:

**Transparent dropdown panel** — `.menu` used `background: inherit`, which resolved through to the bar's container with no explicit background, computing to transparent. The collapsed dropdown panel looked see-through and let the page content show through underneath. Now uses explicit `var(--color-background-default)` (and `var(--color-brand-primary)` under `variant="brand"`).

**Invisible hamburger icon** — the `.menu-toggle` button used `color: inherit`, which the SVG's `currentColor` couldn't always resolve through the host → button chain (especially under brand variants). Switched to `var(--mfp-nav-item-fg-strong)` — the same surface token the nav items use, set by the host's variant selectors — so the hamburger glyph always contrasts with the bar background. Also moved the SVG stroke attributes to the root `<svg>` element so they're set once per render instead of per-path.

No API changes.
