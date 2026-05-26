# @mfp-design-system/nav

## 1.1.0

### Minor Changes

- 6f8500f: `<mfp-nav-bar>` is now **responsive**. Below the `breakpoint` attribute (default `768px`, configurable via `breakpoint="640"` etc.), the nav items and actions collapse into a hamburger-toggleable dropdown anchored to the bottom of the bar, and the items automatically flip to vertical orientation inside it.

    Close triggers: tapping the hamburger again, activating any nav item, pressing `Escape`, or clicking outside the bar.

    ```html
    <!-- Default: collapses below 768px -->
    <mfp-nav-bar>…</mfp-nav-bar>

    <!-- Collapse below 640px instead -->
    <mfp-nav-bar breakpoint="640">…</mfp-nav-bar>

    <!-- Disable responsive collapse entirely -->
    <mfp-nav-bar breakpoint="0">…</mfp-nav-bar>
    ```

    Breakpoint is measured against the **bar's own width** (via `ResizeObserver`), not the viewport — so a bar in a narrow column collapses independently. Two new shadow parts (`menu-toggle`, `menu`) expose the hamburger button and dropdown panel for custom styling. New `menu-open` attribute (reflected) gives programmatic open/close control.

    A11y: hamburger has `aria-expanded` / `aria-controls` / `aria-label` (toggles "Open menu" / "Close menu"), and `Escape` returns focus to the toggle when it closes.

    Additive — no breaking changes to the existing API.

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
