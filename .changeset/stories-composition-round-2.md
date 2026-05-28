---
'@mfp-design-system/form-field': patch
'@mfp-design-system/stepper': patch
'@mfp-design-system/modal': patch
---

Three more composition stories that show how multiple design system components fit together:

- **`FormField / WithMfpComponents`** — form-field's primary purpose is wrapping native controls, but you can wrap `mfp-input` / `mfp-select` / `mfp-checkbox` too. Shows the pattern with a callout about double-labeling. (Adds input/select/checkbox as devDeps on form-field.)

- **`Stepper / WithFormFlow`** — a 3-step signup wizard (Personal → Account → Review) with real working state, `mfp-input` / `mfp-select` fields per step, Back / Continue / Finish buttons, and a clickable stepper that jumps to any step. Implemented as a tiny stateful Lit element registered inside the story file so transitions actually work in Storybook. (Adds button/input/select as devDeps on stepper.)

- **`Modal / WithFormSubmit`** — feedback dialog with `mfp-input` + `mfp-textarea`, a `Cancel` ghost button, and a `Send` primary button that triggers form submission via the standard `<form>.requestSubmit()` API. Demonstrates that form-association works across the dialog boundary. (Adds input/textarea as devDeps on modal.)

No production / API changes.
