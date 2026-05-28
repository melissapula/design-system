---
'@mfp-design-system/nav': patch
'@mfp-design-system/tabs': patch
'@mfp-design-system/stepper': patch
'@mfp-design-system/accordion': patch
'@mfp-design-system/footer': patch
---

**Batch 4 (final): Navigation & structure — migrated to semantic tokens.** (nav, tabs, stepper, accordion, footer)

Internal CSS only. No API or default-theme visual changes. This completes the four-batch component migration — every package now reads from the semantic vocabulary added in `@mfp-design-system/tokens@0.7.0–0.8.0`.

Notable swaps unique to this batch:

- **`nav`** — `border-radius: var(--size-radius-md)` → `var(--radius-control)` (3 sites), all `border: 1px solid` and `border-{top,right,bottom}: 1px solid` → `var(--size-border-width-thin) solid`, hamburger dropdown `box-shadow: var(--shadow-md)` → `var(--elevation-overlay)`, brand text `font-size: var(--font-size-lg)` → `var(--text-body-lg)`, all nav-item / side-nav-footer `font-size: var(--font-size-sm)` → `var(--text-button)`, all `opacity: 0.5` → `var(--opacity-disabled)`, all focus-ring outlines → focus-ring tokens
- **`tabs`** — tab font/padding → `var(--text-button)` / `var(--space-component-{sm,lg})`, indicator `border-bottom: 2px` → `var(--size-border-width-medium)`, tab-panel padding → `var(--space-stack-md)`, focus-ring → tokens
- **`stepper`** — step circle 32px → `var(--size-control-sm)`, connector 2px → `var(--size-border-width-medium)`, pill border-radius → `var(--radius-pill)`, label font-size → `var(--text-label)`, description font-size → `var(--text-caption)`, pulse animation `opacity: 0.5` → `var(--opacity-disabled)`, focus-ring → tokens
- **`accordion`** — outer `border-radius: var(--size-radius-md)` → `var(--radius-control)`, all 1px borders → `var(--size-border-width-thin) solid`, summary/content font-size → `var(--text-body-md)`, summary padding/gap → `var(--space-component-*) / var(--space-inline-md)`, focus-ring → tokens, disabled opacity → token
- **`footer`** — `border-top: 1px solid` → `var(--size-border-width-thin) solid`, `font-size: var(--font-size-sm)` → `var(--text-body-sm)`, gap/padding → `var(--space-inline-md)` / `var(--space-component-{md,lg})`

23 of 23 components migrated. Migration complete.
