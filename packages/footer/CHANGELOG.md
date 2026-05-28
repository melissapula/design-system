# @mfp-design-system/footer

## 4.0.1

### Patch Changes

- 69484c8: **Batch 4 (final): Navigation & structure — migrated to semantic tokens.** (nav, tabs, stepper, accordion, footer)

    Internal CSS only. No API or default-theme visual changes. This completes the four-batch component migration — every package now reads from the semantic vocabulary added in `@mfp-design-system/tokens@0.7.0–0.8.0`.

    Notable swaps unique to this batch:
    - **`nav`** — `border-radius: var(--size-radius-md)` → `var(--radius-control)` (3 sites), all `border: 1px solid` and `border-{top,right,bottom}: 1px solid` → `var(--size-border-width-thin) solid`, hamburger dropdown `box-shadow: var(--shadow-md)` → `var(--elevation-overlay)`, brand text `font-size: var(--font-size-lg)` → `var(--text-body-lg)`, all nav-item / side-nav-footer `font-size: var(--font-size-sm)` → `var(--text-button)`, all `opacity: 0.5` → `var(--opacity-disabled)`, all focus-ring outlines → focus-ring tokens
    - **`tabs`** — tab font/padding → `var(--text-button)` / `var(--space-component-{sm,lg})`, indicator `border-bottom: 2px` → `var(--size-border-width-medium)`, tab-panel padding → `var(--space-stack-md)`, focus-ring → tokens
    - **`stepper`** — step circle 32px → `var(--size-control-sm)`, connector 2px → `var(--size-border-width-medium)`, pill border-radius → `var(--radius-pill)`, label font-size → `var(--text-label)`, description font-size → `var(--text-caption)`, pulse animation `opacity: 0.5` → `var(--opacity-disabled)`, focus-ring → tokens
    - **`accordion`** — outer `border-radius: var(--size-radius-md)` → `var(--radius-control)`, all 1px borders → `var(--size-border-width-thin) solid`, summary/content font-size → `var(--text-body-md)`, summary padding/gap → `var(--space-component-*) / var(--space-inline-md)`, focus-ring → tokens, disabled opacity → token
    - **`footer`** — `border-top: 1px solid` → `var(--size-border-width-thin) solid`, `font-size: var(--font-size-sm)` → `var(--text-body-sm)`, gap/padding → `var(--space-inline-md)` / `var(--space-component-{md,lg})`

    23 of 23 components migrated. Migration complete.

## 4.0.0

### Patch Changes

- Updated dependencies [6f8aec7]
    - @mfp-design-system/tokens@0.8.0

## 3.0.0

### Patch Changes

- Updated dependencies [267cebf]
    - @mfp-design-system/tokens@0.7.0

## 2.0.0

### Patch Changes

- Updated dependencies [4c41382]
    - @mfp-design-system/tokens@0.6.0

## 1.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0

## 0.1.0

### Minor Changes

- ede2b9b: Two new app-chrome packages for navigation and layout.

    **`@mfp-design-system/nav`** — three custom elements that work together:
    - `<mfp-nav-bar>` — horizontal top bar with `brand`, default, and `actions` slots. `sticky` boolean pins to viewport.
    - `<mfp-side-nav>` — vertical side panel with `header`, default, `footer` slots; header/footer auto-hide when empty; default width 240px.
    - `<mfp-nav-item>` — link (when `href` is set) or button. `active` flag becomes `aria-current="page"`. `disabled` blocks clicks. `orientation` is set automatically by the parent.

    Both `<mfp-nav-bar>` and `<mfp-side-nav>` accept a `variant`: `'default'` (subtle/light surface) or `'brand'` (fills with `--color-brand-primary`). Brand variant re-skins nested `<mfp-nav-item>`s automatically via CSS custom properties that cascade into the items' shadow DOM. Under the portfolio theme, `variant="brand"` gives you a navy bar; under warm, terracotta; etc.

    **`@mfp-design-system/footer`** — `<mfp-footer>` shell with three variants: `'default'` (subtle background), `'brand'` (themed brand color), `'dark'` (neutral-900 with light text, GitHub-style). Slot is whatever content you want — copyright, links, sitemap grid. Slotted content inherits color from the surface via `::slotted(*) { color: inherit }`.

    Tests: 8 new for nav (item rendering, active state, click prevention, orientation propagation, empty-slot auto-hide), 4 for footer (slot rendering, all three variants).
