# @mfp-design-system/button

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
