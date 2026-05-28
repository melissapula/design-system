# @mfp-design-system/icon-button

## 7.0.0

### Patch Changes

- 3187544: Components that previously rendered their surface background using the **primitive** `--color-neutral-0` token (hard-coded to `#ffffff`) now use the **semantic** `--color-background-default` instead. This means they correctly follow the active theme/mode — in particular, they no longer stay stark white when the new `dark` theme is applied.

    Affected surfaces:
    - Button / icon-button — `secondary` variant background
    - Input / textarea / select / date-picker — control field background
    - Checkbox / radio — unchecked box background
    - Accordion — item background
    - Stepper — pending and current step circle backgrounds

    Visible effect: in light mode, these components look identical (since `--color-background-default` resolves to `#ffffff` in the default light tokens). In dark mode, they now correctly flip to the dark surface color instead of staying white. Apps that explicitly relied on the `var(--color-neutral-0)` value internally are unaffected — the primitive token is still `#ffffff`; only the components' consumption changed.

    Color-on-colored-background uses of `--color-neutral-0` (e.g. the white text on the danger button, on the toast solid background, on the completed/error stepper circles) are intentionally unchanged — those should stay white in both modes.

    Also: `<mfp-select>`, `<mfp-input>`, and `<mfp-textarea>` now declare `color-scheme: light dark` on their internal native form element. This makes browser-rendered chrome (the native `<select>` option-list popup, autofill background, spell-check underlines, scrollbars on textarea) follow the page's color-scheme. Previously the select's dropdown stayed OS-default light even when the page was in dark mode, because color-scheme inherited from `<html>` doesn't always reach native form controls inside a shadow DOM.

- Updated dependencies [3187544]
    - @mfp-design-system/tokens@0.9.0

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

## 2.1.0

### Minor Changes

- 05472c5: Two changes to `<mfp-icon-button>` based on real-app feedback:

    **1. Default variant flipped from `primary` to `ghost`.** Icon buttons should default to a transparent button with a faint hover background — that matches Material, Shoelace, Radix, and Ant. Filled variants (`primary`, `secondary`, `danger`) are still available as opt-in for FAB-style or prominent toolbar buttons. **Breaking visual change** for consumers that rendered `<mfp-icon-button>` without an explicit `variant=`: they'll switch from filled brand background to transparent. If you want the old behavior, add `variant="primary"`.

    **2. Icon centering.** Slotted icons (SVGs, emojis, spans) now get `display: inline-flex` + `align-items: center` + `justify-content: center` + `line-height: 1`, so they sit dead-center in the button. Previously, emoji glyphs sat on the text baseline (visually low) and SVGs without explicit vertical-align inherited `text-bottom` and ended up bottom-aligned.

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

- aadc1bb: Initial release of `@mfp-design-system/icon-button` — `<mfp-icon-button>` for icon-only buttons.
    - Same variants as `<mfp-button>`: `primary`, `secondary`, `danger`, `ghost`
    - Same sizes: `sm` (32px), `md` (40px), `lg` (48px) — square aspect
    - Requires a `label` attribute → becomes `aria-label`. Console warns if it's missing.
    - The icon goes in the default slot. Mark it `aria-hidden="true"` so screen readers don't double-announce.
    - Inner button exposed as `::part(button)` for things like circular icon buttons
