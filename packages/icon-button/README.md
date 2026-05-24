# @mfp-design-system/icon-button

A Lit-based `<mfp-icon-button>` — icon-only button companion to `<mfp-button>`. Square aspect, same variants and sizes as Button.

## Install

```sh
npm install @mfp-design-system/icon-button @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/icon-button';
import '@mfp-design-system/tokens/css';
```

```html
<!-- The icon goes in the default slot; the visible label goes in the `label` attribute -->
<mfp-icon-button label="Search" variant="primary">
    <span aria-hidden="true">🔍</span>
</mfp-icon-button>

<mfp-icon-button label="More options" variant="ghost">
    <svg aria-hidden="true" width="20" height="20"><!-- icon svg --></svg>
</mfp-icon-button>
```

The `label` attribute becomes the button's `aria-label` — required because there's no visible text for screen readers to announce. Mark the slotted icon with `aria-hidden="true"`.

## API

| Attribute  | Type                                              | Default     | Description                                                                             |
| ---------- | ------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `label`    | `string`                                          | `''`        | **Required** — becomes the button's `aria-label`. A warning fires in dev if it's empty. |
| `variant`  | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style (same palette as `<mfp-button>`)                                           |
| `size`     | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Square: 32px / 40px / 48px                                                              |
| `disabled` | `boolean`                                         | `false`     | Disables the button                                                                     |
| `type`     | `'button' \| 'submit' \| 'reset'`                 | `'button'`  | Native button `type`                                                                    |

### Shadow parts

`button` — the inner `<button>`. Use `::part(button)` for custom styling (e.g., make it circular: `border-radius: 999px`).

## Framework notes

Same as `<mfp-button>` — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`.
