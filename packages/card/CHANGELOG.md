# @mfp-design-system/card

## 0.1.0

### Minor Changes

- aadc1bb: Initial release of `@mfp-design-system/card` — `<mfp-card>` container with optional `header` and `footer` slots.
    - Variants: `default` (border + xs shadow), `flat`, `elevated`
    - Padding: `compact`, `default`, `roomy`, `none`
    - Header and footer slots auto-hide when empty (so an empty `header` slot doesn't render extra spacing)
    - Shadow parts: `surface`, `header`, `body`, `footer`
    - Tokens is an optional peer dependency
