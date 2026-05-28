# @mfp-design-system/accordion

## 6.0.0

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

## 5.0.1

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

## 5.0.0

### Patch Changes

- Updated dependencies [6f8aec7]
    - @mfp-design-system/tokens@0.8.0

## 4.0.0

### Patch Changes

- Updated dependencies [267cebf]
    - @mfp-design-system/tokens@0.7.0

## 3.0.0

### Patch Changes

- Updated dependencies [4c41382]
    - @mfp-design-system/tokens@0.6.0

## 2.0.0

### Major Changes

- a4a374c: **Breaking**: renamed the public toggle event from `toggle` → `mfp-toggle`.

    The previous name collided with the native `ToggleEvent` that browsers fire on `<details>` elements. TypeScript's `lib.dom.d.ts` maps `addEventListener('toggle', ...)` to that native type, which forced consumers to cast through `unknown` to reach `.detail.open` on our CustomEvent. The new name avoids the collision entirely and follows the `mfp-` prefix convention used by the rest of the design system.

    **Migration**:

    ```diff
    - el.addEventListener('toggle', (e) => {
    -     console.log((e as unknown as CustomEvent).detail.open);
    - });
    + el.addEventListener('mfp-toggle', (e) => {
    +     console.log((e as CustomEvent).detail.open);
    + });
    ```

    The internal `mfp-accordion-toggle` event (used by the parent `<mfp-accordion>` for exclusive mode) is unchanged.

## 1.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0

## 0.1.0

### Minor Changes

- 239a836: Initial release of `@mfp-design-system/accordion` — disclosure list for FAQs, settings sections, and expandable details.

    Two custom elements:
    - `<mfp-accordion>` wraps a list of items. Optional `exclusive` boolean: when set, opening one item auto-closes any sibling that's already open (FAQ-style behavior).
    - `<mfp-accordion-item>` is a single section. Provide a header via the `label` attribute or the `header` slot (slot wins). Body content goes in the default slot. Has `open` and `disabled` boolean props.

    Built on native `<details>` + `<summary>` under the hood, so keyboard support (Tab to focus, Enter/Space to toggle) and ARIA semantics come for free. The default browser disclosure marker is hidden; replaced with a custom chevron that rotates 180° on open.

    Events: `toggle` on each item fires when open state changes; `event.detail.open` is the new state.

    Shadow parts: `summary`, `chevron`, `content` for per-instance styling overrides.

    A11y: respects `prefers-reduced-motion`. Disabled items don't accept clicks and are visually de-emphasized.

    7 tests cover open/closed state, label rendering, toggle event, exclusive mode (opens close siblings; closes don't ripple), and the non-exclusive default.
