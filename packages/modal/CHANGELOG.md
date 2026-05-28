# @mfp-design-system/modal

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

## 2.0.1

### Patch Changes

- 9ccdf28: Fix: `<mfp-modal>` rendered visible in normal flow at mount instead of staying hidden until `show()` was called.

    The dialog's `display: flex` was on the bare `dialog` selector, which beat the user-agent rule `dialog:not([open]) { display: none }` (author styles always win over UA). The result: an empty modal showing in your page layout on every mount, regardless of the `open` prop.

    Fix: all layout rules (display, sizing, padding, the fade-in animation) are now scoped to `dialog[open]`, so the UA's hidden-when-closed rule applies as designed. No API change; existing usage just behaves correctly.

    Caught while wiring lessonforge — exactly the kind of bug you only find by dogfooding your own design system.

    Regression test added: `getComputedStyle(dialog).display === 'none'` when closed.

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

- e157249: Initial release of `@mfp-design-system/modal` — `<mfp-modal>` dialog component, built on the native `<dialog>` element.

    Using `<dialog>` means focus trap, scroll lock, top-layer rendering, and Escape-to-close come from the browser. We add styling, backdrop click-to-close, header/footer slots, animations, and a Lit-friendly `open` property.
    - `open` (reflected boolean) for controlled state; `show()` and `close()` methods for imperative use
    - `size`: `sm` (360px), `md` (480px, default), `lg` (720px)
    - `dismissible` (default true): backdrop click closes the modal
    - `no-close-button`: hides the built-in × button in the header
    - Slots: `header`, default body, `footer` (each auto-hides when empty)
    - Events: `close` (any reason), `cancel` (Escape — preventable via `preventDefault`)
    - A11y: native `aria-modal="true"`, focus trap, scroll lock, `aria-label="Close"` on the × button, respects `prefers-reduced-motion`
    - Shadow parts: `dialog`, `header`, `body`, `footer`
    - 6-test suite covering open/close lifecycle, events, and conditional close button
