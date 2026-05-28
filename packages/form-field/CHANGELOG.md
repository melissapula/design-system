# @mfp-design-system/form-field

## 6.0.0

### Patch Changes

- 099729f: **Batch 1: Forms & actions — migrated to semantic tokens.**

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

- aadc1bb: Initial release of `@mfp-design-system/form-field` — `<mfp-form-field>` wrapper that adds label, hint, error, and required indicator around any control.

    Best used with controls that don't ship their own labels (raw checkbox, radio group, native date input, third-party widgets). `<mfp-input>` and `<mfp-select>` already have built-in label/hint/error so you typically don't need a FormField around them.
    - Automatically wires `for`/`id` between its label and the first slotted control
    - Automatically sets `aria-describedby` on the control pointing at the hint or error
    - Automatically sets `aria-invalid` on the control when an error is present
    - `orientation="horizontal"` lays out the control on the left of the label (good for checkboxes and switches)
    - Shadow parts: `label`, `control`, `hint`, `error`
