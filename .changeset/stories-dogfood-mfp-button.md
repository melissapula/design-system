---
'@mfp-design-system/modal': patch
'@mfp-design-system/toast': patch
'@mfp-design-system/tooltip': patch
'@mfp-design-system/card': patch
---

Stories now dogfood `<mfp-button>` instead of raw `<button>` elements. When a story needs a trigger button (open a modal, fire a toast) or a button being wrapped/featured (tooltip anchor, card footer action), it uses the design system's own button component.

This makes Storybook a more faithful preview of real usage and showcases compositional patterns between components. No production code or API surface changed — strictly story files plus the necessary devDep declaration of `@mfp-design-system/button`.

Specific changes:

- **modal stories** — Open-modal trigger, Cancel/Delete confirm actions, "I agree" footer button → `<mfp-button>` with semantic variants (`primary`, `danger`, `ghost`).
- **toast stories** — Variant trigger buttons → `<mfp-button>` with `secondary` (or `danger` for error toast). Sticky-toast trigger → `<mfp-button variant="ghost">`.
- **tooltip stories** — All 7 anchor buttons across Default/ShortLabel/CustomWidth/Placements → `<mfp-button variant="secondary">`.
- **card stories** — Footer Cancel/Save/Delete actions → `<mfp-button>` with `ghost` + `primary`/`danger`.

Skipped: form-field stories deliberately wrap native controls (it's the documented design purpose); swapping to mfp-\* there would defeat the demo. Other components (badge, alert, accordion, etc.) have no trigger-button patterns in their stories.
