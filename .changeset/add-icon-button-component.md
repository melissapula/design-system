---
'@mfp-design-system/icon-button': minor
---

Initial release of `@mfp-design-system/icon-button` — `<mfp-icon-button>` for icon-only buttons.

- Same variants as `<mfp-button>`: `primary`, `secondary`, `danger`, `ghost`
- Same sizes: `sm` (32px), `md` (40px), `lg` (48px) — square aspect
- Requires a `label` attribute → becomes `aria-label`. Console warns if it's missing.
- The icon goes in the default slot. Mark it `aria-hidden="true"` so screen readers don't double-announce.
- Inner button exposed as `::part(button)` for things like circular icon buttons
