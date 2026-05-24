---
'@mfp-design-system/select': minor
---

Initial release of `@mfp-design-system/select` — `<mfp-select>` dropdown that wraps a native `<select>`.

Why native: full keyboard a11y, screen reader support, and mobile-native pickers come for free. The custom chrome (border, focus ring, chevron) is styled with design tokens.

- API mirrors `<mfp-input>`: `label`, `hint`, `error`, `placeholder`, `size`, `disabled`, `required`, `value`, `name`
- Slotted `<option>` and `<optgroup>` children are forwarded into the real `<select>`
- Sizes: `sm`, `md`, `lg`
- Shadow parts: `label`, `control`, `select`, `chevron`, `hint`, `error`
- Single-select only for v0.1. Multi-select will get its own component (`<mfp-multi-select>`) with a checkbox-list pattern when it's needed.
