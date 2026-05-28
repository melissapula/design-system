# @mfp-design-system/input

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

- f8c81dc: Initial release of `@mfp-design-system/input` — a Lit-based `<mfp-input>` web component.

    **Types**: `text`, `email`, `password`, `number`, `search`, `tel`, `url` (via the `type` attribute).
    **Sizes**: `sm`, `md` (default), `lg`.
    **States**: `disabled`, `readonly`, `required`, `invalid` (auto-derived from `error`).

    **Props**: `value`, `name`, `label`, `placeholder`, `hint`, `error`.

    **Events**: `input` and `change` are re-dispatched as `CustomEvent` from the host with `event.detail.value`.

    **Slots**: `prefix` and `suffix` for icons/units/buttons inside the input chrome.

    **Shadow parts** exposed for styling overrides: `label`, `control`, `input`, `hint`, `error`.

    **Styling**: built on `@mfp-design-system/tokens` CSS variables (`--color-*`, `--size-spacing-*`, `--font-*`, `--motion-*`) with fallbacks so the component looks reasonable without tokens loaded.

    **Accessibility**: proper `<label for>` wiring with auto-generated unique ids, `aria-invalid` and `aria-describedby` for hint/error association, `role="alert"` on error messages so screen readers announce them, focus ring uses `--color-status-info-solid`, respects `prefers-reduced-motion`.

    **Tokens** is declared as an optional peer dependency.

    **Known limitation** (shared with `@mfp-design-system/button`): does not yet participate in HTML form submission via `ElementInternals`. Listen for `input`/`change` events on the host instead. Both Button and Input will get form-association support together in a future release.
