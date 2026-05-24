# @mfp-design-system/modal

A Lit-based `<mfp-modal>` dialog component, built on the native `<dialog>` element. Focus trap, scroll lock, top-layer rendering, and escape-to-close come from the browser; styling, backdrop click-to-close, and slots come from us.

## Install

```sh
npm install @mfp-design-system/modal @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/modal';
import '@mfp-design-system/tokens/css';
```

```html
<button onclick="document.getElementById('confirm').show()">Delete account</button>

<mfp-modal id="confirm">
    <span slot="header">Delete account?</span>
    <p>This action is permanent. All your data will be lost.</p>
    <div slot="footer">
        <button onclick="this.closest('mfp-modal').close()">Cancel</button>
        <button class="danger" onclick="this.closest('mfp-modal').close()">Delete</button>
    </div>
</mfp-modal>
```

Or controlled via `open`:

```html
<mfp-modal ?open="${isOpen}" @close="${()" =""> isOpen = false}>...</mfp-modal>
```

## API

| Attribute         | Type                   | Default | Description                                              |
| ----------------- | ---------------------- | ------- | -------------------------------------------------------- |
| `open`            | `boolean`              | `false` | Controlled open state                                    |
| `size`            | `'sm' \| 'md' \| 'lg'` | `'md'`  | Max width: 360px / 480px / 720px                         |
| `dismissible`     | `boolean`              | `true`  | If false, clicking the backdrop does not close the modal |
| `no-close-button` | `boolean`              | `false` | If true, hides the built-in `×` button in the header     |

### Methods

- `show()` — open the modal
- `close()` — close the modal

### Events

- `close` — fires when the modal closes (any reason: backdrop click, Escape, `close()`, close button)
- `cancel` — fires on Escape; call `preventDefault()` on the event to keep the modal open

### Slots

- `header` — title content (auto-hidden if empty)
- _(default)_ — main body content
- `footer` — actions (auto-hidden if empty; has a top border and subtle background)

### Shadow parts

`dialog`, `header`, `body`, `footer`.

## A11y

- Built on `<dialog>` → automatic focus trap, `aria-modal="true"`, scroll lock, and Escape-to-close
- The close button has `aria-label="Close"`
- Respect `prefers-reduced-motion`: animations disabled for users who request reduced motion

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`.
