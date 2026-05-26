# @mfp-design-system/footer

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
