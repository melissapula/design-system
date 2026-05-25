---
'@mfp-design-system/accordion': minor
---

Initial release of `@mfp-design-system/accordion` — disclosure list for FAQs, settings sections, and expandable details.

Two custom elements:

- `<mfp-accordion>` wraps a list of items. Optional `exclusive` boolean: when set, opening one item auto-closes any sibling that's already open (FAQ-style behavior).
- `<mfp-accordion-item>` is a single section. Provide a header via the `label` attribute or the `header` slot (slot wins). Body content goes in the default slot. Has `open` and `disabled` boolean props.

Built on native `<details>` + `<summary>` under the hood, so keyboard support (Tab to focus, Enter/Space to toggle) and ARIA semantics come for free. The default browser disclosure marker is hidden; replaced with a custom chevron that rotates 180° on open.

Events: `toggle` on each item fires when open state changes; `event.detail.open` is the new state.

Shadow parts: `summary`, `chevron`, `content` for per-instance styling overrides.

A11y: respects `prefers-reduced-motion`. Disabled items don't accept clicks and are visually de-emphasized.

7 tests cover open/closed state, label rendering, toggle event, exclusive mode (opens close siblings; closes don't ripple), and the non-exclusive default.
