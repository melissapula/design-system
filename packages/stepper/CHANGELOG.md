# @mfp-design-system/stepper

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

## 4.0.2

### Patch Changes

- 87505eb: Three more composition stories that show how multiple design system components fit together:
    - **`FormField / WithMfpComponents`** — form-field's primary purpose is wrapping native controls, but you can wrap `mfp-input` / `mfp-select` / `mfp-checkbox` too. Shows the pattern with a callout about double-labeling. (Adds input/select/checkbox as devDeps on form-field.)
    - **`Stepper / WithFormFlow`** — a 3-step signup wizard (Personal → Account → Review) with real working state, `mfp-input` / `mfp-select` fields per step, Back / Continue / Finish buttons, and a clickable stepper that jumps to any step. Implemented as a tiny stateful Lit element registered inside the story file so transitions actually work in Storybook. (Adds button/input/select as devDeps on stepper.)
    - **`Modal / WithFormSubmit`** — feedback dialog with `mfp-input` + `mfp-textarea`, a `Cancel` ghost button, and a `Send` primary button that triggers form submission via the standard `<form>.requestSubmit()` API. Demonstrates that form-association works across the dialog boundary. (Adds input/textarea as devDeps on modal.)

    No production / API changes.

## 4.0.1

### Patch Changes

- 69484c8: **Batch 4 (final): Navigation & structure — migrated to semantic tokens.** (nav, tabs, stepper, accordion, footer)

    Internal CSS only. No API or default-theme visual changes. This completes the four-batch component migration — every package now reads from the semantic vocabulary added in `@mfp-design-system/tokens@0.7.0–0.8.0`.

    Notable swaps unique to this batch:
    - **`nav`** — `border-radius: var(--size-radius-md)` → `var(--radius-control)` (3 sites), all `border: 1px solid` and `border-{top,right,bottom}: 1px solid` → `var(--size-border-width-thin) solid`, hamburger dropdown `box-shadow: var(--shadow-md)` → `var(--elevation-overlay)`, brand text `font-size: var(--font-size-lg)` → `var(--text-body-lg)`, all nav-item / side-nav-footer `font-size: var(--font-size-sm)` → `var(--text-button)`, all `opacity: 0.5` → `var(--opacity-disabled)`, all focus-ring outlines → focus-ring tokens
    - **`tabs`** — tab font/padding → `var(--text-button)` / `var(--space-component-{sm,lg})`, indicator `border-bottom: 2px` → `var(--size-border-width-medium)`, tab-panel padding → `var(--space-stack-md)`, focus-ring → tokens
    - **`stepper`** — step circle 32px → `var(--size-control-sm)`, connector 2px → `var(--size-border-width-medium)`, pill border-radius → `var(--radius-pill)`, label font-size → `var(--text-label)`, description font-size → `var(--text-caption)`, pulse animation `opacity: 0.5` → `var(--opacity-disabled)`, focus-ring → tokens
    - **`accordion`** — outer `border-radius: var(--size-radius-md)` → `var(--radius-control)`, all 1px borders → `var(--size-border-width-thin) solid`, summary/content font-size → `var(--text-body-md)`, summary padding/gap → `var(--space-component-*) / var(--space-inline-md)`, focus-ring → tokens, disabled opacity → token
    - **`footer`** — `border-top: 1px solid` → `var(--size-border-width-thin) solid`, `font-size: var(--font-size-sm)` → `var(--text-body-sm)`, gap/padding → `var(--space-inline-md)` / `var(--space-component-{md,lg})`

    23 of 23 components migrated. Migration complete.

## 4.0.0

### Patch Changes

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

## 0.2.0

### Minor Changes

- 175bf2e: `<mfp-stepper>` status colors now map to **meaning**, not brand: green for success, yellow for in-progress, red for error.

    | Status      | Before                | After                                                       |
    | ----------- | --------------------- | ----------------------------------------------------------- |
    | `completed` | brand-primary (blue)  | `--color-status-success-solid` (green)                      |
    | `current`   | brand-primary outline | `--color-status-warning-solid` outline + yellow pulsing dot |
    | `error`     | unchanged (red)       | unchanged                                                   |
    | `pending`   | unchanged (muted)     | unchanged                                                   |

    Connecting line between completed steps also picks up the success green. Focus rings on clickable steps still use the brand primary (focus ≠ status).

    No API change — purely visual. Themes that re-skin brand colors no longer affect the stepper's status colors, which is the intended behavior (success = green regardless of theme).

## 0.1.0

### Minor Changes

- 5a6672e: Initial release of `@mfp-design-system/stepper` — a stepper for multi-step flows (onboarding, checkout, multi-page forms, lesson progress).

    Two custom elements:
    - `<mfp-stepper>` orchestrates the list; props are `current` (active step index), `orientation` (`'horizontal' | 'vertical'`), and `clickable` (boolean).
    - `<mfp-step>` represents each step; props are `label`, `description`, and `error` (boolean override).

    Status is derived automatically from each step's index vs `current`:
    - index < current → **completed** (checkmark, brand color)
    - index === current → **current** (pulsing dot using `--motion-duration-slowest`, brand color outline)
    - index > current → **pending** (step number, muted)
    - any step with `[error]` → **error** (X mark, error color) — overrides the derived status

    Connecting lines pick up the brand color for completed steps. The last step's connector is auto-hidden via a `data-last` attribute.

    Events: `step-click` fires (only when `clickable`) with `event.detail.index`. Consumer decides whether to honor it — useful for "free navigation" flows (settings wizards), undesirable for strict onboarding.

    A11y: current step gets `aria-current="step"`; each step gets a descriptive `aria-label` including status ("Profile — in progress"); clickable steps are exposed as `role="button"` and accept Enter / Space; the pulse animation respects `prefers-reduced-motion`.

    8 tests cover status derivation, status updates on `current` change, error override, last-step marker, click events (with and without `clickable`), orientation propagation, and `aria-current`.

    Lessonforge's hand-rolled progress component (checkmark circles, pulsing dot, numbered steps) was the inspiration — and the use case ports directly: replace it with `<mfp-stepper>`.
