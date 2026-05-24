# @mfp-design-system/input

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
