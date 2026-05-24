---
'@mfp-design-system/input': minor
---

Initial release of `@mfp-design-system/input` — a Lit-based `<mfp-input>` web component.

**Types**: `text`, `email`, `password`, `number`, `search`, `tel`, `url` (via the `type` attribute).
**Sizes**: `sm`, `md` (default), `lg`.
**States**: `disabled`, `readonly`, `required`, `invalid` (auto-derived from `error`).

**Props**: `value`, `name`, `label`, `placeholder`, `hint`, `error`.

**Events**: `input` and `change` are re-dispatched as `CustomEvent` from the host with `event.detail.value`.

**Slots**: `prefix` and `suffix` for icons/units/buttons inside the input chrome.

**Shadow parts** exposed for styling overrides: `label`, `control`, `input`, `hint`, `error`.

**Styling**: built on `@mfp-design-system/tokens` CSS variables (`--color-*`, `--size-spacing-*`, `--font-*`, `--motion-*`) with fallbacks so the component looks reasonable without tokens loaded.

**Accessibility**: proper `<label for>` wiring with auto-generated unique ids, `aria-invalid` and `aria-describedby` for hint/error association, `role="alert"` on error messages so screen readers announce them, focus ring uses `--color-status-info-solid`, respects `prefers-reduced-motion`.

**Tokens** is declared as an optional peer dependency.

**Known limitation** (shared with `@mfp-design-system/button`): does not yet participate in HTML form submission via `ElementInternals`. Listen for `input`/`change` events on the host instead. Both Button and Input will get form-association support together in a future release.
