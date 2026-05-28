# @mfp-design-system/spinner

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
