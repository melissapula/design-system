---
'@mfp-design-system/modal': patch
---

Fix: `<mfp-modal>` rendered visible in normal flow at mount instead of staying hidden until `show()` was called.

The dialog's `display: flex` was on the bare `dialog` selector, which beat the user-agent rule `dialog:not([open]) { display: none }` (author styles always win over UA). The result: an empty modal showing in your page layout on every mount, regardless of the `open` prop.

Fix: all layout rules (display, sizing, padding, the fade-in animation) are now scoped to `dialog[open]`, so the UA's hidden-when-closed rule applies as designed. No API change; existing usage just behaves correctly.

Caught while wiring lessonforge — exactly the kind of bug you only find by dogfooding your own design system.

Regression test added: `getComputedStyle(dialog).display === 'none'` when closed.
