---
'@mfp-design-system/button': minor
---

Initial release of `@mfp-design-system/button` — a Lit-based `<mfp-button>` web component.

**Variants**: `primary` (default), `secondary`, `danger`, `ghost`.
**Sizes**: `sm`, `md` (default), `lg`.
**States**: `disabled`, `loading` (with built-in spinner).
**Props**: also accepts `type` (`button` / `submit` / `reset`).

**Styling**: uses `@mfp-design-system/tokens` CSS custom properties (`--color-status-*`, `--size-spacing-*`, `--font-*`, `--motion-*`, etc.) with safe fallback values for graceful degradation when tokens aren't loaded. The inner native button is exposed as `::part(button)` for custom styling.

**Accessibility**: visible focus ring via `:focus-visible`, `aria-busy` while loading, respects `prefers-reduced-motion`.

**Framework notes**: works in any framework supporting custom elements. Vue/Nuxt and Angular need a small bit of config — see the package README.

**Tokens** is declared as an optional peer dependency (the component degrades gracefully without it).
