# @mfp-design-system/select

## 2.0.1

### Patch Changes

- 4f74e2b: Fix: `<mfp-select>` crashed on re-render after a slot change (e.g., when a consumer's framework updated the `value` via Angular's ControlValueAccessor or Vue's v-model).

    Root cause: `_onSlotChange` used `select.textContent = ''` to clear the inner `<select>` before re-appending cloned options. That wiped Lit's invisible ChildPart marker comment nodes for the conditional placeholder template (`${this.placeholder ? html`...` : nothing}`). The next Lit re-render then crashed trying to find its markers.

    Fix: tag cloned options with `data-mfp-cloned` on insertion. On subsequent slot changes, remove only the tagged ones — leaving Lit's marker comments and the placeholder option untouched.

    No API change; existing consumers automatically pick up the fix.

    Regression test added that re-renders after a slot change (the exact path that was crashing in lessonforge).

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

- aadc1bb: Initial release of `@mfp-design-system/select` — `<mfp-select>` dropdown that wraps a native `<select>`.

    Why native: full keyboard a11y, screen reader support, and mobile-native pickers come for free. The custom chrome (border, focus ring, chevron) is styled with design tokens.
    - API mirrors `<mfp-input>`: `label`, `hint`, `error`, `placeholder`, `size`, `disabled`, `required`, `value`, `name`
    - Slotted `<option>` and `<optgroup>` children are forwarded into the real `<select>`
    - Sizes: `sm`, `md`, `lg`
    - Shadow parts: `label`, `control`, `select`, `chevron`, `hint`, `error`
    - Single-select only for v0.1. Multi-select will get its own component (`<mfp-multi-select>`) with a checkbox-list pattern when it's needed.
