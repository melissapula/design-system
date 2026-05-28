# @mfp-design-system/card

## 6.0.3

### Patch Changes

- 0be1bed: Three new composition stories that show components working together — Storybook becomes a richer dogfood preview of how real apps use the design system.
    - **`Card / WithDetailModal`** — A summary card whose "View details" button opens a `<mfp-modal>` with the full breakdown. Demonstrates the "card-summary → modal-detail" pattern that's everywhere in dashboards. Adds `@mfp-design-system/modal` as a devDep on the card package.
    - **`Button / FiresToast`** — Four buttons (primary / ghost / secondary / danger) each fire a matching toast variant on click via the `showToast({ ... })` API. The danger toast has an extended 6s duration to demonstrate the option. Adds `@mfp-design-system/toast` as a devDep on the button package.
    - **`Tooltip / OnIconButton`** — A 5-icon toolbar (Bold / Italic / Underline / Strikethrough / Delete) where each `<mfp-icon-button>` is wrapped in an `<mfp-tooltip>` showing the action name + keyboard shortcut. Demonstrates the canonical a11y pattern: icon-only buttons get a tooltip with the same text as the `label` attribute, so sighted users see a hover hint and screen readers announce the `aria-label`. Adds `@mfp-design-system/icon-button` as a devDep on the tooltip package.

    No production / API changes.

## 6.0.2

### Patch Changes

- 056cc43: Stories now dogfood `<mfp-button>` instead of raw `<button>` elements. When a story needs a trigger button (open a modal, fire a toast) or a button being wrapped/featured (tooltip anchor, card footer action), it uses the design system's own button component.

    This makes Storybook a more faithful preview of real usage and showcases compositional patterns between components. No production code or API surface changed — strictly story files plus the necessary devDep declaration of `@mfp-design-system/button`.

    Specific changes:
    - **modal stories** — Open-modal trigger, Cancel/Delete confirm actions, "I agree" footer button → `<mfp-button>` with semantic variants (`primary`, `danger`, `ghost`).
    - **toast stories** — Variant trigger buttons → `<mfp-button>` with `secondary` (or `danger` for error toast). Sticky-toast trigger → `<mfp-button variant="ghost">`.
    - **tooltip stories** — All 7 anchor buttons across Default/ShortLabel/CustomWidth/Placements → `<mfp-button variant="secondary">`.
    - **card stories** — Footer Cancel/Save/Delete actions → `<mfp-button>` with `ghost` + `primary`/`danger`.

    Skipped: form-field stories deliberately wrap native controls (it's the documented design purpose); swapping to mfp-\* there would defeat the demo. Other components (badge, alert, accordion, etc.) have no trigger-button patterns in their stories.

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
