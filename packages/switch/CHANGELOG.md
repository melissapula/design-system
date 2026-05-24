# @mfp-design-system/switch

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

- e157249: Initial release of `@mfp-design-system/switch` — `<mfp-switch>` toggle component.
    - Visually a sliding pill with track + thumb; semantically `role="switch"`
    - API mirrors `<mfp-checkbox>`: `checked`, `disabled`, `required`, `name`, `value`, `label`
    - Form-associated via `ElementInternals`
    - `checkValidity()` / `reportValidity()` public methods
    - Shadow parts: `track`, `thumb`, `label`
    - 5-test suite covering toggle, role, form submission

    Use Switch for binary settings that take effect immediately (dark mode, notifications, feature flags); use Checkbox for choices that apply on form submission (terms agreement, multi-select).
