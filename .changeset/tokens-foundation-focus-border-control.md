---
'@mfp-design-system/tokens': minor
---

Three foundational token families to round out the system before component migration:

**Border widths** (primitive) — `--size-border-width-{0,thin,medium,thick}` (0/1/2/4px). Components were inlining `border: 1px solid …` 14 times across 13 files; now they can reach for the same hairline token.

**Control heights** (primitive) — `--size-control-{xs,sm,md,lg,xl}` (24/32/40/48/56px). Buttons, inputs, selects, and icon-buttons had been hardcoding their heights independently, leading to off-by-2px misalignments in form rows. One scale to keep them aligned.

**Icon sizes** (primitive) — `--size-icon-{xs,sm,md,lg,xl}` (12/16/20/24/32px). Same idea for the slotted/inline icons inside buttons, badges, alerts, etc.

**Focus ring** (semantic) — `--focus-ring-{width,offset,color,style}`. Every interactive component had its own `outline: 2px solid var(--color-brand-primary); outline-offset: 2px` block (22 occurrences across 10 components). One source of truth — color automatically picks up the active theme's brand.

```css
:focus-visible {
    outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
}
```

18 new CSS custom properties. README updated with usage tables. No breaking changes — existing primitives and semantics remain.
