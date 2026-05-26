---
'@mfp-design-system/nav': patch
---

Two visual fixes to `<mfp-nav-bar>`'s collapsed mode under `variant="brand"`:

**Hamburger icon now always visible** — added an explicit `:host([variant='brand']) .menu-toggle { color }` rule that wins on specificity, instead of relying on the `--mfp-nav-item-fg-strong` cascade which proved unreliable in some consuming apps. Also switched the hamburger glyph from stroked paths to filled `<rect>` elements — strokes can render at sub-pixel widths on certain DPRs / browser combos and fail to paint; filled shapes are unambiguous. The close-state (X) icon also became filled rects rotated ±45°, so both icon states render identically.

**Actions slot now right-aligned on its own row** — previously the `<div slot="actions">` content (theme picker, user menu, etc.) shared a row with the last nav item, making the layout look jumbled. Now `.actions` in the collapsed dropdown:

- Sits on its own row below the nav items
- Is separated by a 1px hairline border (subtle gray on default, low-opacity white on brand)
- Right-aligns its content (`justify-content: flex-end`) — where users expect secondary chrome on mobile

No API changes.
