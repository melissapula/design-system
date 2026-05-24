# @mfp-design-system/switch

## 0.1.0

### Minor Changes

- e157249: Initial release of `@mfp-design-system/switch` — `<mfp-switch>` toggle component.
    - Visually a sliding pill with track + thumb; semantically `role="switch"`
    - API mirrors `<mfp-checkbox>`: `checked`, `disabled`, `required`, `name`, `value`, `label`
    - Form-associated via `ElementInternals`
    - `checkValidity()` / `reportValidity()` public methods
    - Shadow parts: `track`, `thumb`, `label`
    - 5-test suite covering toggle, role, form submission

    Use Switch for binary settings that take effect immediately (dark mode, notifications, feature flags); use Checkbox for choices that apply on form submission (terms agreement, multi-select).
