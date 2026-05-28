---
'@mfp-design-system/modal': patch
'@mfp-design-system/tooltip': patch
'@mfp-design-system/toast': patch
---

**Batch 2: Overlays — migrated to semantic tokens.** (modal, tooltip, toast)

Internal CSS only. No API or default-theme visual changes.

Key swaps unique to overlays (in addition to the universal focus-ring / opacity / spacing swaps from batch 1):

- `border-radius: var(--size-radius-lg)` (modal) → `var(--radius-surface)` (proper "surface" semantic for a sheet-like overlay)
- `border-radius: var(--size-radius-md)` (toast) → `var(--radius-control)` (matches buttons it sits alongside)
- `box-shadow: var(--shadow-xl)` (modal) → `var(--elevation-popover)`
- `box-shadow: var(--shadow-md)` (tooltip) → `var(--elevation-overlay)`
- `box-shadow: var(--shadow-lg)` (toast) → `var(--elevation-float)`
- `font-size: var(--font-size-lg)` (modal header) → `var(--text-heading-xs)` (h6-equivalent)
- `font-size: var(--font-size-xs)` (tooltip bubble) → `var(--text-caption)`
- `font-size: var(--font-size-sm)` (toast body) → `var(--text-body-sm)`
- `opacity: 0.7` (toast dismiss) → `var(--opacity-muted)` (standardized — matches alert dismiss in batch 3)

Tooltip placement offsets (`calc(100% + 8px)`) now use `var(--space-inline-sm)` so they scale with theme spacing.
