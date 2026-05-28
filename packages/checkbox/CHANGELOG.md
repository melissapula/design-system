# @mfp-design-system/checkbox

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

- a039a63: Add theme system — apps can override brand colors with a single import.

    **Tokens (minor)**
    - New semantic brand layer: `--color-brand-primary`, `--color-brand-primary-hover`, `--color-brand-primary-fg`, `--color-brand-primary-subtle`, `--color-brand-primary-emphasis`. Defaults reference the existing blue ramp so the default look is unchanged.
    - Five named themes ship as subpath exports — each is a small CSS file:
        - `@mfp-design-system/tokens/themes/blue` — explicit default
        - `@mfp-design-system/tokens/themes/warm` — terracotta + cream/brown palette (chrissys-studio)
        - `@mfp-design-system/tokens/themes/orange` — Tailwind orange-500 (garage-sales)
        - `@mfp-design-system/tokens/themes/earth` — warm neutrals + blue accent (lessonforge)
        - `@mfp-design-system/tokens/themes/portfolio` — navy primary (melissapula.io)
    - Status colors (`--color-status-success-*`, `--color-status-error-*`, etc.) stay universal — green-for-success and red-for-error don't change per brand.
    - README adds a Themes section with the full usage / authoring guide.

    **Components (patch)**

    Button, IconButton, Input, Select, Checkbox, Switch, Modal now consume the brand semantic layer instead of `--color-status-info-solid`:
    - Primary button background → `var(--color-brand-primary)`
    - Focus rings → `var(--color-brand-primary)`
    - Checkbox/Switch checked state → `var(--color-brand-primary)`
    - Switch thumb + checkbox glyph → `var(--color-brand-primary-fg)`

    The defaults still resolve to blue, so apps that don't load a theme see no visual change. Apps that DO load a theme automatically get re-themed components — no per-app component overrides needed.

    **Adopting a theme in your app**

    ```ts
    import '@mfp-design-system/tokens/css';
    import '@mfp-design-system/tokens/themes/warm';
    ```

    That's it — every primary button, focus ring, and checked state across the app now uses the warm palette.

- Updated dependencies [a039a63]
    - @mfp-design-system/tokens@0.3.0

## 0.1.0

### Minor Changes

- e157249: Initial release of `@mfp-design-system/checkbox` — `<mfp-checkbox>` web component.
    - Standard checkbox states: `checked`, `indeterminate`, `disabled`, `required`
    - `name`/`value` for native form submission
    - Form-associated via `ElementInternals` — submits `value` when checked, reports `valueMissing` when required and unchecked
    - `checkValidity()` / `reportValidity()` public methods
    - Default slot for rich label content (use the `label` attribute for plain text)
    - Visible focus ring, `aria-checked` (incl. `"mixed"` for indeterminate), `prefers-reduced-motion`
    - Shadow parts: `box`, `label`
    - Ships with a 7-test suite covering toggle, form submission, validity, and indeterminate state
