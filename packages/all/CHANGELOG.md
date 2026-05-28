# @mfp-design-system/all

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
- Updated dependencies [3187544]
    - @mfp-design-system/button@7.0.0
    - @mfp-design-system/icon-button@7.0.0
    - @mfp-design-system/input@7.0.0
    - @mfp-design-system/textarea@5.0.0
    - @mfp-design-system/select@7.0.0
    - @mfp-design-system/checkbox@7.0.0
    - @mfp-design-system/radio@5.0.0
    - @mfp-design-system/accordion@6.0.0
    - @mfp-design-system/date-picker@1.0.0
    - @mfp-design-system/stepper@5.0.0
    - @mfp-design-system/tokens@0.9.0
    - @mfp-design-system/card@7.0.0
    - @mfp-design-system/modal@7.0.0
    - @mfp-design-system/toast@5.0.0
    - @mfp-design-system/tooltip@5.0.0
    - @mfp-design-system/form-field@7.0.0
    - @mfp-design-system/alert@5.0.0
    - @mfp-design-system/avatar@5.0.0
    - @mfp-design-system/badge@5.0.0
    - @mfp-design-system/divider@5.0.0
    - @mfp-design-system/footer@5.0.0
    - @mfp-design-system/nav@5.0.0
    - @mfp-design-system/spinner@5.0.0
    - @mfp-design-system/switch@7.0.0
    - @mfp-design-system/tabs@5.0.0

## 4.1.0

### Minor Changes

- ef85efa: New **`@mfp-design-system/date-picker`** package — a custom date picker built from scratch (no third-party libraries). Trigger button + calendar popover, locale-aware month / weekday / display formatting via `Intl`, full keyboard navigation, and form-association so it submits as a `YYYY-MM-DD` string under `<form>` just like the other input components.

    ```html
    <mfp-date-picker
        name="dob"
        label="Date of birth"
        value="1990-01-15"
        min="1900-01-01"
        max="2025-12-31"
        required
    ></mfp-date-picker>
    ```

    API: `value` / `name` / `label` / `placeholder` / `hint` / `error` / `min` / `max` / `required` / `disabled` / `locale` attributes. `show()` / `hide()` / `checkValidity()` / `reportValidity()` methods. `change` event with `event.detail.value`. Shadow parts: `label`, `trigger`, `popup`, `hint`, `error`.

    Keyboard nav (when open): arrows for day, ↑/↓ for week, PageUp/Down for month, Shift+PageUp/Down for year, Home/End for week boundaries, Enter/Space to select, Escape to close.

    `@mfp-design-system/all` now re-exports it alongside the other 23 components.

    **Known caveats (v0.1):**
    - Single-date only (no range yet)
    - No time input (date only)
    - Week starts on Sunday regardless of locale (`Intl` doesn't expose week-start)
    - Popover anchors below-left of the trigger with no collision detection
    - Test suite is a smoke-only stub right now — the full draft (in git history) hangs the headless test runner; needs follow-up to debug

### Patch Changes

- Updated dependencies [ef85efa]
    - @mfp-design-system/date-picker@0.2.0

## 4.0.6

### Patch Changes

- Updated dependencies [87505eb]
    - @mfp-design-system/form-field@6.0.1
    - @mfp-design-system/stepper@4.0.2
    - @mfp-design-system/modal@6.0.3
    - @mfp-design-system/card@6.0.3

## 4.0.5

### Patch Changes

- Updated dependencies [0be1bed]
    - @mfp-design-system/card@6.0.3
    - @mfp-design-system/button@6.0.1
    - @mfp-design-system/tooltip@4.0.3
    - @mfp-design-system/modal@6.0.2
    - @mfp-design-system/toast@4.0.2

## 4.0.4

### Patch Changes

- Updated dependencies [056cc43]
    - @mfp-design-system/modal@6.0.2
    - @mfp-design-system/toast@4.0.2
    - @mfp-design-system/tooltip@4.0.2
    - @mfp-design-system/card@6.0.2

## 4.0.3

### Patch Changes

- Updated dependencies [69484c8]
    - @mfp-design-system/nav@4.0.1
    - @mfp-design-system/tabs@4.0.1
    - @mfp-design-system/stepper@4.0.1
    - @mfp-design-system/accordion@5.0.1
    - @mfp-design-system/footer@4.0.1

## 4.0.2

### Patch Changes

- Updated dependencies [8260bcb]
    - @mfp-design-system/badge@4.0.1
    - @mfp-design-system/alert@4.0.1
    - @mfp-design-system/card@6.0.1
    - @mfp-design-system/avatar@4.0.1
    - @mfp-design-system/divider@4.0.1
    - @mfp-design-system/spinner@4.0.1

## 4.0.1

### Patch Changes

- Updated dependencies [36c75b7]
    - @mfp-design-system/modal@6.0.1
    - @mfp-design-system/tooltip@4.0.1
    - @mfp-design-system/toast@4.0.1

## 4.0.0

### Patch Changes

- Updated dependencies [099729f]
- Updated dependencies [6f8aec7]
    - @mfp-design-system/button@6.0.0
    - @mfp-design-system/icon-button@6.0.0
    - @mfp-design-system/input@6.0.0
    - @mfp-design-system/textarea@4.0.0
    - @mfp-design-system/select@6.0.0
    - @mfp-design-system/checkbox@6.0.0
    - @mfp-design-system/radio@4.0.0
    - @mfp-design-system/switch@6.0.0
    - @mfp-design-system/form-field@6.0.0
    - @mfp-design-system/tokens@0.8.0
    - @mfp-design-system/accordion@5.0.0
    - @mfp-design-system/alert@4.0.0
    - @mfp-design-system/avatar@4.0.0
    - @mfp-design-system/badge@4.0.0
    - @mfp-design-system/card@6.0.0
    - @mfp-design-system/divider@4.0.0
    - @mfp-design-system/footer@4.0.0
    - @mfp-design-system/modal@6.0.0
    - @mfp-design-system/nav@4.0.0
    - @mfp-design-system/spinner@4.0.0
    - @mfp-design-system/stepper@4.0.0
    - @mfp-design-system/tabs@4.0.0
    - @mfp-design-system/toast@4.0.0
    - @mfp-design-system/tooltip@4.0.0

## 3.0.0

### Patch Changes

- Updated dependencies [267cebf]
    - @mfp-design-system/tokens@0.7.0
    - @mfp-design-system/accordion@4.0.0
    - @mfp-design-system/alert@3.0.0
    - @mfp-design-system/avatar@3.0.0
    - @mfp-design-system/badge@3.0.0
    - @mfp-design-system/button@5.0.0
    - @mfp-design-system/card@5.0.0
    - @mfp-design-system/checkbox@5.0.0
    - @mfp-design-system/divider@3.0.0
    - @mfp-design-system/footer@3.0.0
    - @mfp-design-system/form-field@5.0.0
    - @mfp-design-system/icon-button@5.0.0
    - @mfp-design-system/input@5.0.0
    - @mfp-design-system/modal@5.0.0
    - @mfp-design-system/nav@3.0.0
    - @mfp-design-system/radio@3.0.0
    - @mfp-design-system/select@5.0.0
    - @mfp-design-system/spinner@3.0.0
    - @mfp-design-system/stepper@3.0.0
    - @mfp-design-system/switch@5.0.0
    - @mfp-design-system/tabs@3.0.0
    - @mfp-design-system/textarea@3.0.0
    - @mfp-design-system/toast@3.0.0
    - @mfp-design-system/tooltip@3.0.0

## 2.0.0

### Patch Changes

- Updated dependencies [4c41382]
    - @mfp-design-system/tokens@0.6.0
    - @mfp-design-system/accordion@3.0.0
    - @mfp-design-system/alert@2.0.0
    - @mfp-design-system/avatar@2.0.0
    - @mfp-design-system/badge@2.0.0
    - @mfp-design-system/button@4.0.0
    - @mfp-design-system/card@4.0.0
    - @mfp-design-system/checkbox@4.0.0
    - @mfp-design-system/divider@2.0.0
    - @mfp-design-system/footer@2.0.0
    - @mfp-design-system/form-field@4.0.0
    - @mfp-design-system/icon-button@4.0.0
    - @mfp-design-system/input@4.0.0
    - @mfp-design-system/modal@4.0.0
    - @mfp-design-system/nav@2.0.0
    - @mfp-design-system/radio@2.0.0
    - @mfp-design-system/select@4.0.0
    - @mfp-design-system/spinner@2.0.0
    - @mfp-design-system/stepper@2.0.0
    - @mfp-design-system/switch@4.0.0
    - @mfp-design-system/tabs@2.0.0
    - @mfp-design-system/textarea@2.0.0
    - @mfp-design-system/toast@2.0.0
    - @mfp-design-system/tooltip@2.0.0

## 1.0.4

### Patch Changes

- Updated dependencies [c6a5e40]
    - @mfp-design-system/nav@1.1.3

## 1.0.3

### Patch Changes

- Updated dependencies [9b81136]
    - @mfp-design-system/nav@1.1.2

## 1.0.2

### Patch Changes

- Updated dependencies [9f7b5b4]
    - @mfp-design-system/nav@1.1.1

## 1.0.1

### Patch Changes

- Updated dependencies [a4a374c]
- Updated dependencies [6f8500f]
    - @mfp-design-system/accordion@2.0.0
    - @mfp-design-system/nav@1.1.0

## 1.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0
    - @mfp-design-system/accordion@1.0.0
    - @mfp-design-system/alert@1.0.0
    - @mfp-design-system/avatar@1.0.0
    - @mfp-design-system/badge@1.0.0
    - @mfp-design-system/button@3.0.0
    - @mfp-design-system/card@3.0.0
    - @mfp-design-system/checkbox@3.0.0
    - @mfp-design-system/divider@1.0.0
    - @mfp-design-system/footer@1.0.0
    - @mfp-design-system/form-field@3.0.0
    - @mfp-design-system/icon-button@3.0.0
    - @mfp-design-system/input@3.0.0
    - @mfp-design-system/modal@3.0.0
    - @mfp-design-system/nav@1.0.0
    - @mfp-design-system/radio@1.0.0
    - @mfp-design-system/select@3.0.0
    - @mfp-design-system/spinner@1.0.0
    - @mfp-design-system/stepper@1.0.0
    - @mfp-design-system/switch@3.0.0
    - @mfp-design-system/tabs@1.0.0
    - @mfp-design-system/textarea@1.0.0
    - @mfp-design-system/toast@1.0.0
    - @mfp-design-system/tooltip@1.0.0

## 0.1.0

### Minor Changes

- 1c1080a: Initial release of `@mfp-design-system/all` — a meta-package that re-exports every component in one shot.

    ```sh
    npm install @mfp-design-system/all @mfp-design-system/tokens
    ```

    ```ts
    import '@mfp-design-system/tokens/css';
    import '@mfp-design-system/tokens/themes/warm';
    import '@mfp-design-system/all'; // registers every <mfp-*> element
    ```

    Named imports also work: `import { MfpButton, showToast } from '@mfp-design-system/all'`.

    **Tradeoff**: convenience over bundle size. Tree-shaking can't strip unused components because each re-export has the side effect of registering its custom element. Production user-facing apps should still cherry-pick individual packages (`@mfp-design-system/button`, etc.). Use `all` for prototyping, internal tools, or apps that legitimately use most components.

    Also (no changeset for these — they're tooling, not package changes):
    - New `scripts/audit-peer-deps.mjs` walks all `packages/*/package.json` files and verifies they declare the same `@mfp-design-system/tokens` peer range. Caught manually as drift twice already (one Version PR forgetting to update peer ranges after a tokens bump).
    - New `pnpm audit-peers` script. Wired into CI right after install — drift now fails the build instead of slipping into a release.
    - `.changeset/README.md` updated to explain linked-versioning (how to opt in when needed; not enabled today) and how the peer-dep audit complements it.
