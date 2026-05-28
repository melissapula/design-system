---
'@mfp-design-system/badge': patch
'@mfp-design-system/alert': patch
'@mfp-design-system/card': patch
'@mfp-design-system/avatar': patch
'@mfp-design-system/divider': patch
'@mfp-design-system/spinner': patch
---

**Batch 3: Display — migrated to semantic tokens.** (badge, alert, card, avatar, divider, spinner)

Internal CSS only. No API or default-theme visual changes.

Notable swaps unique to this batch:

- **`badge`** — `border-radius: var(--size-radius-full)` → `var(--radius-pill)` (semantic fit)
- **`alert`** — `border-radius: var(--size-radius-md)` → `var(--radius-control)`, icon `width/height: 20px` → `var(--size-icon-md)`, `opacity: 0.7/1` (dismiss) → `var(--opacity-muted/full)`
- **`card`** — `border-radius: var(--size-radius-lg)` → `var(--radius-surface)`, `box-shadow: var(--shadow-xs/md)` → `var(--elevation-subtle/overlay)`, header `font-size: var(--font-size-lg)` → `var(--text-heading-xs)`, padding tiers (compact/default/roomy) → `var(--space-component-{md,lg,xl})`
- **`avatar`** — circle `border-radius: 50%` → `var(--radius-pill)`, square → `var(--radius-control)`, sm/md/lg sizes → `var(--size-control-{md,xl})` where they align, status indicator border → `var(--size-border-width-medium)`, font-sizes → text semantics
- **`divider`** — `border-top: 1px solid` → `var(--size-border-width-thin) solid`, label `font-size: var(--font-size-xs)` → `var(--text-caption)`
- **`spinner`** — size scale → `var(--size-icon-{sm,lg,xl})` (spinners are decorative icons)

XL avatar (80px) and XL spinner (48px) kept as literals — beyond what the standard `--size-control-*` / `--size-icon-*` scales cover.
