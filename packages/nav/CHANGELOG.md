# @mfp-design-system/nav

## 1.1.2

### Patch Changes

- 9b81136: Two visual fixes to `<mfp-nav-bar>`'s collapsed mode under `variant="brand"`:

    **Hamburger icon now always visible** — added an explicit `:host([variant='brand']) .menu-toggle { color }` rule that wins on specificity, instead of relying on the `--mfp-nav-item-fg-strong` cascade which proved unreliable in some consuming apps. Also switched the hamburger glyph from stroked paths to filled `<rect>` elements — strokes can render at sub-pixel widths on certain DPRs / browser combos and fail to paint; filled shapes are unambiguous. The close-state (X) icon also became filled rects rotated ±45°, so both icon states render identically.

    **Actions slot now right-aligned on its own row** — previously the `<div slot="actions">` content (theme picker, user menu, etc.) shared a row with the last nav item, making the layout look jumbled. Now `.actions` in the collapsed dropdown:
    - Sits on its own row below the nav items
    - Is separated by a 1px hairline border (subtle gray on default, low-opacity white on brand)
    - Right-aligns its content (`justify-content: flex-end`) — where users expect secondary chrome on mobile

    No API changes.

## 1.1.1

### Patch Changes

- 9f7b5b4: Two fixes to `<mfp-nav-bar>`'s responsive dropdown:

    **Transparent dropdown panel** — `.menu` used `background: inherit`, which resolved through to the bar's container with no explicit background, computing to transparent. The collapsed dropdown panel looked see-through and let the page content show through underneath. Now uses explicit `var(--color-background-default)` (and `var(--color-brand-primary)` under `variant="brand"`).

    **Invisible hamburger icon** — the `.menu-toggle` button used `color: inherit`, which the SVG's `currentColor` couldn't always resolve through the host → button chain (especially under brand variants). Switched to `var(--mfp-nav-item-fg-strong)` — the same surface token the nav items use, set by the host's variant selectors — so the hamburger glyph always contrasts with the bar background. Also moved the SVG stroke attributes to the root `<svg>` element so they're set once per render instead of per-path.

    No API changes.

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
