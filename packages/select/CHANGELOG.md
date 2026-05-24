# @mfp-design-system/select

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
