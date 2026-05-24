# @mfp-design-system/form-field

## 1.0.0

### Patch Changes

- Updated dependencies [a039a63]
    - @mfp-design-system/tokens@0.3.0

## 0.1.0

### Minor Changes

- aadc1bb: Initial release of `@mfp-design-system/form-field` — `<mfp-form-field>` wrapper that adds label, hint, error, and required indicator around any control.

    Best used with controls that don't ship their own labels (raw checkbox, radio group, native date input, third-party widgets). `<mfp-input>` and `<mfp-select>` already have built-in label/hint/error so you typically don't need a FormField around them.
    - Automatically wires `for`/`id` between its label and the first slotted control
    - Automatically sets `aria-describedby` on the control pointing at the hint or error
    - Automatically sets `aria-invalid` on the control when an error is present
    - `orientation="horizontal"` lays out the control on the left of the label (good for checkboxes and switches)
    - Shadow parts: `label`, `control`, `hint`, `error`
