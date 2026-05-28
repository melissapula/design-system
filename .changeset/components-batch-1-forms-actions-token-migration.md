---
'@mfp-design-system/button': patch
'@mfp-design-system/icon-button': patch
'@mfp-design-system/input': patch
'@mfp-design-system/textarea': patch
'@mfp-design-system/select': patch
'@mfp-design-system/checkbox': patch
'@mfp-design-system/radio': patch
'@mfp-design-system/switch': patch
'@mfp-design-system/form-field': patch
---

**Batch 1: Forms & actions — migrated to semantic tokens.**

Internal CSS changes only. No public API surface changed, no visual change at default theme values, just a switch from primitive tokens (or hardcoded values) to the semantic vocabulary added in `@mfp-design-system/tokens@0.7.0`. Consumers re-themeing via CSS custom properties get richer override hooks.

Specifically across these 9 packages:

- `outline: 2px solid var(--color-brand-primary); outline-offset: 2px` → `var(--focus-ring-*)` tokens (eliminates 11 inlined focus rings)
- `border: 1px solid …` → `border: var(--size-border-width-thin) solid …`
- `border-radius: var(--size-radius-md)` → `var(--radius-control)`
- `min-height: 40/32/48px` → `var(--size-control-{md,sm,lg})`
- `width/height: 40/32/48px` (icon-button) → `var(--size-control-{md,sm,lg})`
- `font-size: 20/16/24px` (icon-button) → `var(--size-icon-{md,sm,lg})`
- `opacity: 0.5` and `opacity: 0.6` → `var(--opacity-disabled)` (standardized — was 0.5 for most, 0.6 for input/select/textarea drift)
- `gap: var(--size-spacing-2)` → `var(--space-inline-sm)` etc.
- `padding: var(--size-spacing-N)` → `var(--space-component-{xs,sm,md,lg})` where intent is component padding
- label `font-size: var(--font-size-sm)` → `var(--text-label)`
- hint/error `font-size: var(--font-size-sm)` → `var(--text-body-sm)`
- button label `font-size: var(--font-size-sm)` → `var(--text-button)` / `var(--text-body-lg)`
- switch thumb `box-shadow: var(--shadow-sm)` → `var(--elevation-raised)`

All fallback values preserved so apps still loading older `@mfp-design-system/tokens` versions render correctly.
