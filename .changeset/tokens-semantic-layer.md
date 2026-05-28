---
'@mfp-design-system/tokens': minor
---

Adds a **semantic token layer** on top of the existing primitives, so consumers can name things by intent instead of measurement.

**Spacing** — `--space-component-{xs..xl}` (padding inside components), `--space-stack-{xs..xl}` (vertical gaps between block elements), `--space-inline-{xs..lg}` (horizontal gaps between inline/flex children), `--space-layout-{sm..xl}` (gaps between major page sections).

**Typography (sizes only)** — `--text-caption`, `--text-body-{sm,md,lg}`, `--text-label`, `--text-button`, `--text-code`, `--text-heading-{xs..2xl}`, `--text-display`. Pair with `--font-weight-*` and `--font-line-height-*` primitives as needed.

**Radius** — `--radius-control` (buttons, inputs), `--radius-surface` (cards, modals), `--radius-pill` (pills, avatars, badges).

**Elevation** — `--elevation-subtle`, `--elevation-raised`, `--elevation-overlay`, `--elevation-float`, `--elevation-popover` — aliases for the underlying `--shadow-*` primitives, named by the relationship they imply.

All semantic tokens resolve to existing primitives via `var()` references — no new values, just a vocabulary layer. Primitives still ship and remain valid to use directly when you need a specific value.

35 new CSS custom properties. README updated with usage tables.
