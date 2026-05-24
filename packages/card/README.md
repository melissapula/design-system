# @mfp-design-system/card

A Lit-based `<mfp-card>` container component with optional header/footer slots.

## Install

```sh
npm install @mfp-design-system/card @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/card';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-card>
    <span slot="header">Title</span>
    <p>Body content goes here as the default slot.</p>
    <div slot="footer">Footer actions / metadata</div>
</mfp-card>

<mfp-card variant="elevated" padding="roomy">
    <p>An elevated card with extra breathing room and no header/footer.</p>
</mfp-card>
```

## API

| Attribute | Type                                          | Default     | Description                                                |
| --------- | --------------------------------------------- | ----------- | ---------------------------------------------------------- |
| `variant` | `'default' \| 'flat' \| 'elevated'`           | `'default'` | Border + shadow style                                      |
| `padding` | `'compact' \| 'default' \| 'roomy' \| 'none'` | `'default'` | Internal padding tier; use `'none'` to control it yourself |

### Slots

- `header` — title or header content (auto-hidden if empty)
- _(default)_ — main body content
- `footer` — actions or metadata (auto-hidden if empty; has top border)

### Shadow parts

`surface`, `header`, `body`, `footer`.

## Framework notes

- **Vue 3 / Nuxt**: set `compilerOptions.isCustomElement: (tag) => tag.startsWith('mfp-')`
- **Angular**: add `CUSTOM_ELEMENTS_SCHEMA`
