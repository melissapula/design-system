---
'@mfp-design-system/modal': minor
---

Initial release of `@mfp-design-system/modal` — `<mfp-modal>` dialog component, built on the native `<dialog>` element.

Using `<dialog>` means focus trap, scroll lock, top-layer rendering, and Escape-to-close come from the browser. We add styling, backdrop click-to-close, header/footer slots, animations, and a Lit-friendly `open` property.

- `open` (reflected boolean) for controlled state; `show()` and `close()` methods for imperative use
- `size`: `sm` (360px), `md` (480px, default), `lg` (720px)
- `dismissible` (default true): backdrop click closes the modal
- `no-close-button`: hides the built-in × button in the header
- Slots: `header`, default body, `footer` (each auto-hides when empty)
- Events: `close` (any reason), `cancel` (Escape — preventable via `preventDefault`)
- A11y: native `aria-modal="true"`, focus trap, scroll lock, `aria-label="Close"` on the × button, respects `prefers-reduced-motion`
- Shadow parts: `dialog`, `header`, `body`, `footer`
- 6-test suite covering open/close lifecycle, events, and conditional close button
