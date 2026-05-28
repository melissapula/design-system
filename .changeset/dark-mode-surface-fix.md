---
'@mfp-design-system/button': patch
'@mfp-design-system/icon-button': patch
'@mfp-design-system/input': patch
'@mfp-design-system/textarea': patch
'@mfp-design-system/select': patch
'@mfp-design-system/checkbox': patch
'@mfp-design-system/radio': patch
'@mfp-design-system/accordion': patch
'@mfp-design-system/date-picker': patch
'@mfp-design-system/stepper': patch
'@mfp-design-system/all': patch
---

Components that previously rendered their surface background using the **primitive** `--color-neutral-0` token (hard-coded to `#ffffff`) now use the **semantic** `--color-background-default` instead. This means they correctly follow the active theme/mode — in particular, they no longer stay stark white when the new `dark` theme is applied.

Affected surfaces:

- Button / icon-button — `secondary` variant background
- Input / textarea / select / date-picker — control field background
- Checkbox / radio — unchecked box background
- Accordion — item background
- Stepper — pending and current step circle backgrounds

Visible effect: in light mode, these components look identical (since `--color-background-default` resolves to `#ffffff` in the default light tokens). In dark mode, they now correctly flip to the dark surface color instead of staying white. Apps that explicitly relied on the `var(--color-neutral-0)` value internally are unaffected — the primitive token is still `#ffffff`; only the components' consumption changed.

Color-on-colored-background uses of `--color-neutral-0` (e.g. the white text on the danger button, on the toast solid background, on the completed/error stepper circles) are intentionally unchanged — those should stay white in both modes.

Also: `<mfp-select>`, `<mfp-input>`, and `<mfp-textarea>` now declare `color-scheme: light dark` on their internal native form element. This makes browser-rendered chrome (the native `<select>` option-list popup, autofill background, spell-check underlines, scrollbars on textarea) follow the page's color-scheme. Previously the select's dropdown stayed OS-default light even when the page was in dark mode, because color-scheme inherited from `<html>` doesn't always reach native form controls inside a shadow DOM.
