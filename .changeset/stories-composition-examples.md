---
'@mfp-design-system/card': patch
'@mfp-design-system/button': patch
'@mfp-design-system/tooltip': patch
---

Three new composition stories that show components working together — Storybook becomes a richer dogfood preview of how real apps use the design system.

- **`Card / WithDetailModal`** — A summary card whose "View details" button opens a `<mfp-modal>` with the full breakdown. Demonstrates the "card-summary → modal-detail" pattern that's everywhere in dashboards. Adds `@mfp-design-system/modal` as a devDep on the card package.

- **`Button / FiresToast`** — Four buttons (primary / ghost / secondary / danger) each fire a matching toast variant on click via the `showToast({ ... })` API. The danger toast has an extended 6s duration to demonstrate the option. Adds `@mfp-design-system/toast` as a devDep on the button package.

- **`Tooltip / OnIconButton`** — A 5-icon toolbar (Bold / Italic / Underline / Strikethrough / Delete) where each `<mfp-icon-button>` is wrapped in an `<mfp-tooltip>` showing the action name + keyboard shortcut. Demonstrates the canonical a11y pattern: icon-only buttons get a tooltip with the same text as the `label` attribute, so sighted users see a hover hint and screen readers announce the `aria-label`. Adds `@mfp-design-system/icon-button` as a devDep on the tooltip package.

No production / API changes.
