# @mfp-design-system/radio

## 5.0.0

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

## 4.0.0

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

## 3.0.0

### Patch Changes

- Updated dependencies [267cebf]
    - @mfp-design-system/tokens@0.7.0

## 2.0.0

### Patch Changes

- Updated dependencies [4c41382]
    - @mfp-design-system/tokens@0.6.0

## 1.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0

## 0.1.1

### Patch Changes

- 3de0a25: Widen `@mfp-design-system/tokens` peer-dependency range to `^0.4.0` to match the rest of the package family. Ten packages had drifted on `^0.2.0`, preventing installation alongside other DS components in apps consuming the current `tokens@0.4.x`.

    No behavior change — pure metadata fix.

## 0.1.0

### Minor Changes

- 21fcdaf: Add 10 new components, rounding out the set needed across all five consumer apps. Each follows the established patterns: Lit element, design tokens with fallbacks, themeable, Storybook stories, test suite, README, optional tokens peer dep.
    - **`@mfp-design-system/textarea`** — multi-line text input mirroring `<mfp-input>`'s API; form-associated; label / hint / error / sizes / resize control.
    - **`@mfp-design-system/radio`** — single radio button; form-associated; group multiple by sharing a `name` (mutual exclusion handled internally).
    - **`@mfp-design-system/badge`** — pill/chip with `neutral` / `brand` / `success` / `warning` / `error` / `info` variants; outlined option.
    - **`@mfp-design-system/alert`** — banner with status icon + optional heading + optional dismiss button. Dispatches `close` event on dismiss.
    - **`@mfp-design-system/spinner`** — standalone loading indicator. Inherits `color` from container for trivial recoloring. `aria-label` for screen readers.
    - **`@mfp-design-system/divider`** — horizontal/vertical separator; optional centered label.
    - **`@mfp-design-system/avatar`** — image with initials fallback; sizes; circle/square shape; optional status dot (online/busy/away/offline).
    - **`@mfp-design-system/tooltip`** — anchor-based hover/focus tooltip with four placements. Auto-wires `aria-describedby` on first slotted child. Escape dismisses. CSS-only positioning (no flip).
    - **`@mfp-design-system/toast`** — programmatic `showToast({ message, variant, duration })` API. Auto-creates a fixed-position container in `document.body` on first call. Auto-dismiss with `duration: 0` for sticky.
    - **`@mfp-design-system/tabs`** — three elements: `<mfp-tabs>` orchestrator, `<mfp-tab>` triggers (slot=tab), `<mfp-tab-panel>` panels. Full keyboard navigation (arrows wrap, Home/End jump). ARIA tablist with selection-follows-focus.

    34 new tests pass alongside the existing 25 — total of 59 tests across all components.

    Storybook gets 10 new entries under Components/\* and they're all browsable under any of the 5 themes via the toolbar.
