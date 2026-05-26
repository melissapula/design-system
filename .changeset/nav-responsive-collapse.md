---
'@mfp-design-system/nav': minor
---

`<mfp-nav-bar>` is now **responsive**. Below the `breakpoint` attribute (default `768px`, configurable via `breakpoint="640"` etc.), the nav items and actions collapse into a hamburger-toggleable dropdown anchored to the bottom of the bar, and the items automatically flip to vertical orientation inside it.

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
