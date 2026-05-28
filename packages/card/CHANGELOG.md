# @mfp-design-system/card

## 6.0.1

### Patch Changes

- 8260bcb: **Batch 3: Display — migrated to semantic tokens.** (badge, alert, card, avatar, divider, spinner)

    Internal CSS only. No API or default-theme visual changes.

    Notable swaps unique to this batch:
    - **`badge`** — `border-radius: var(--size-radius-full)` → `var(--radius-pill)` (semantic fit)
    - **`alert`** — `border-radius: var(--size-radius-md)` → `var(--radius-control)`, icon `width/height: 20px` → `var(--size-icon-md)`, `opacity: 0.7/1` (dismiss) → `var(--opacity-muted/full)`
    - **`card`** — `border-radius: var(--size-radius-lg)` → `var(--radius-surface)`, `box-shadow: var(--shadow-xs/md)` → `var(--elevation-subtle/overlay)`, header `font-size: var(--font-size-lg)` → `var(--text-heading-xs)`, padding tiers (compact/default/roomy) → `var(--space-component-{md,lg,xl})`
    - **`avatar`** — circle `border-radius: 50%` → `var(--radius-pill)`, square → `var(--radius-control)`, sm/md/lg sizes → `var(--size-control-{md,xl})` where they align, status indicator border → `var(--size-border-width-medium)`, font-sizes → text semantics
    - **`divider`** — `border-top: 1px solid` → `var(--size-border-width-thin) solid`, label `font-size: var(--font-size-xs)` → `var(--text-caption)`
    - **`spinner`** — size scale → `var(--size-icon-{sm,lg,xl})` (spinners are decorative icons)

    XL avatar (80px) and XL spinner (48px) kept as literals — beyond what the standard `--size-control-*` / `--size-icon-*` scales cover.

## 6.0.0

### Patch Changes

- Updated dependencies [6f8aec7]
    - @mfp-design-system/tokens@0.8.0

## 5.0.0

### Patch Changes

- Updated dependencies [267cebf]
    - @mfp-design-system/tokens@0.7.0

## 4.0.0

### Patch Changes

- Updated dependencies [4c41382]
    - @mfp-design-system/tokens@0.6.0

## 3.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0

## 2.0.0

### Patch Changes

- Updated dependencies [d78d5ff]
    - @mfp-design-system/tokens@0.4.0

## 1.0.0

### Patch Changes

- Updated dependencies [a039a63]
    - @mfp-design-system/tokens@0.3.0

## 0.1.0

### Minor Changes

- aadc1bb: Initial release of `@mfp-design-system/card` — `<mfp-card>` container with optional `header` and `footer` slots.
    - Variants: `default` (border + xs shadow), `flat`, `elevated`
    - Padding: `compact`, `default`, `roomy`, `none`
    - Header and footer slots auto-hide when empty (so an empty `header` slot doesn't render extra spacing)
    - Shadow parts: `surface`, `header`, `body`, `footer`
    - Tokens is an optional peer dependency
