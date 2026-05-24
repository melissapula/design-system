# @mfp-design-system/checkbox

## 0.1.0

### Minor Changes

- e157249: Initial release of `@mfp-design-system/checkbox` — `<mfp-checkbox>` web component.
    - Standard checkbox states: `checked`, `indeterminate`, `disabled`, `required`
    - `name`/`value` for native form submission
    - Form-associated via `ElementInternals` — submits `value` when checked, reports `valueMissing` when required and unchecked
    - `checkValidity()` / `reportValidity()` public methods
    - Default slot for rich label content (use the `label` attribute for plain text)
    - Visible focus ring, `aria-checked` (incl. `"mixed"` for indeterminate), `prefers-reduced-motion`
    - Shadow parts: `box`, `label`
    - Ships with a 7-test suite covering toggle, form submission, validity, and indeterminate state
