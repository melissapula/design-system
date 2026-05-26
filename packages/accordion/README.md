# @mfp-design-system/accordion

Disclosure list for FAQs, settings sections, expandable details. Two custom elements: `<mfp-accordion>` (wrapper) and `<mfp-accordion-item>` (each section). Built on native `<details>` + `<summary>` for free keyboard/ARIA support.

## Install

```sh
npm install @mfp-design-system/accordion @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/accordion';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-accordion>
    <mfp-accordion-item label="What is X?">Answer here.</mfp-accordion-item>
    <mfp-accordion-item label="What is Y?">Another answer.</mfp-accordion-item>
    <mfp-accordion-item label="What is Z?" open>Starts expanded.</mfp-accordion-item>
</mfp-accordion>
```

### Exclusive mode (FAQ-style, only one open at a time)

```html
<mfp-accordion exclusive>
    <mfp-accordion-item label="Section A">…</mfp-accordion-item>
    <mfp-accordion-item label="Section B">…</mfp-accordion-item>
</mfp-accordion>
```

### Custom header content

```html
<mfp-accordion-item>
    <span slot="header" style="display: flex; align-items: center; gap: 8px;">
        <span aria-hidden="true">🎨</span>
        <strong>Rich header</strong>
        <mfp-badge variant="success">New</mfp-badge>
    </span>
    Body content here.
</mfp-accordion-item>
```

## API

### `<mfp-accordion>`

| Attribute   | Type    | Default |
| ----------- | ------- | ------- |
| `exclusive` | boolean | `false` |

### `<mfp-accordion-item>`

| Attribute  | Type    | Default |
| ---------- | ------- | ------- |
| `label`    | string  | `''`    |
| `open`     | boolean | `false` |
| `disabled` | boolean | `false` |

### Events

- `mfp-toggle` on `<mfp-accordion-item>` — fires when open state changes. `event.detail.open` is the new state. (Named `mfp-toggle` instead of `toggle` to avoid TypeScript's `ToggleEvent` type collision on the native `<details>` toggle event.)

### Slots (on item)

- `header` — overrides `label` with rich content
- _(default)_ — body content

### Shadow parts (on item)

`summary`, `chevron`, `content`.

## A11y

Native `<summary>` is exposed as a button with `aria-expanded` tracking the open state. Tab focuses it; Enter and Space toggle. The chevron rotates 180° when open (CSS only). Respects `prefers-reduced-motion`.

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`, React 19+ works natively.
