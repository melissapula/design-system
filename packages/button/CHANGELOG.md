# @mfp-design-system/button

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

## 6.0.1

### Patch Changes

- 0be1bed: Three new composition stories that show components working together — Storybook becomes a richer dogfood preview of how real apps use the design system.
    - **`Card / WithDetailModal`** — A summary card whose "View details" button opens a `<mfp-modal>` with the full breakdown. Demonstrates the "card-summary → modal-detail" pattern that's everywhere in dashboards. Adds `@mfp-design-system/modal` as a devDep on the card package.
    - **`Button / FiresToast`** — Four buttons (primary / ghost / secondary / danger) each fire a matching toast variant on click via the `showToast({ ... })` API. The danger toast has an extended 6s duration to demonstrate the option. Adds `@mfp-design-system/toast` as a devDep on the button package.
    - **`Tooltip / OnIconButton`** — A 5-icon toolbar (Bold / Italic / Underline / Strikethrough / Delete) where each `<mfp-icon-button>` is wrapped in an `<mfp-tooltip>` showing the action name + keyboard shortcut. Demonstrates the canonical a11y pattern: icon-only buttons get a tooltip with the same text as the `label` attribute, so sighted users see a hover hint and screen readers announce the `aria-label`. Adds `@mfp-design-system/icon-button` as a devDep on the tooltip package.

    No production / API changes.

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

## 0.2.0

### Minor Changes

- d681ffc: Add form-association via `ElementInternals`. All three components now participate in native HTML form submission.

    **`<mfp-button>`**
    - `static formAssociated = true`
    - `type="submit"` clicks call `form.requestSubmit()` (full native flow including the `submit` event and constraint validation)
    - `type="reset"` clicks call `form.reset()`
    - New `form` getter returns the associated `<form>` element

    **`<mfp-input>` and `<mfp-select>`**
    - `static formAssociated = true`
    - `setFormValue()` is called whenever `value` changes — the value is submitted with the form under the configured `name`
    - `setValidity()` reflects:
        - explicit `error` prop → `customError` with the message
        - `required` + empty `value` → `valueMissing`
    - Public `checkValidity()` and `reportValidity()` methods mirror the native HTMLInputElement / HTMLSelectElement methods

    **Why this matters**: you can now drop these into a real `<form>` and submit it the way the browser expects — `formData.get('email')` works, native required-field validation works, the form's `submit` event fires correctly.

    The "Known limitations" form-submission paragraph has been removed from each README and replaced with a "Forms" section showing usage.

## 0.1.0

### Minor Changes

- 58b01c4: Initial release of `@mfp-design-system/button` — a Lit-based `<mfp-button>` web component.

    **Variants**: `primary` (default), `secondary`, `danger`, `ghost`.
    **Sizes**: `sm`, `md` (default), `lg`.
    **States**: `disabled`, `loading` (with built-in spinner).
    **Props**: also accepts `type` (`button` / `submit` / `reset`).

    **Styling**: uses `@mfp-design-system/tokens` CSS custom properties (`--color-status-*`, `--size-spacing-*`, `--font-*`, `--motion-*`, etc.) with safe fallback values for graceful degradation when tokens aren't loaded. The inner native button is exposed as `::part(button)` for custom styling.

    **Accessibility**: visible focus ring via `:focus-visible`, `aria-busy` while loading, respects `prefers-reduced-motion`.

    **Framework notes**: works in any framework supporting custom elements. Vue/Nuxt and Angular need a small bit of config — see the package README.

    **Tokens** is declared as an optional peer dependency (the component degrades gracefully without it).
