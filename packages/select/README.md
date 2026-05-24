# @mfp-design-system/select

A Lit-based `<mfp-select>` web component that wraps a native `<select>` element.

## Why a native wrapper?

Native `<select>` gets you full keyboard a11y, screen reader support, and mobile-native pickers (iOS wheel, Android sheet) for free. Only the visual chrome (border, focus ring, chevron) is custom. A full custom-combobox implementation is on the roadmap if/when you need things like search-as-you-type or custom option rendering.

## Install

```sh
npm install @mfp-design-system/select @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/select';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-select label="Color" placeholder="Pick one…">
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
</mfp-select>

<mfp-select label="Fruit" placeholder="Choose…">
    <optgroup label="Citrus">
        <option value="orange">Orange</option>
        <option value="lemon">Lemon</option>
    </optgroup>
    <optgroup label="Berries">
        <option value="strawberry">Strawberry</option>
    </optgroup>
</mfp-select>
```

Children projected into the default slot (`<option>` and `<optgroup>` elements) are forwarded into the real `<select>` inside shadow DOM. The slot itself is hidden.

## API

| Attribute     | Type                   | Default | Description                                                  |
| ------------- | ---------------------- | ------- | ------------------------------------------------------------ |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`  | Sizing                                                       |
| `value`       | `string`               | `''`    | Current value (controlled)                                   |
| `name`        | `string`               | `''`    | Native form `name`                                           |
| `label`       | `string`               | `''`    | Visible label (auto-wired with `for`/`id`)                   |
| `placeholder` | `string`               | `''`    | Renders a disabled, hidden first option as the initial value |
| `hint`        | `string`               | `''`    | Helper text shown below the select                           |
| `error`       | `string`               | `''`    | Error message — also triggers invalid styles                 |
| `disabled`    | `boolean`              | `false` | Disables the select                                          |
| `required`    | `boolean`              | `false` | Marks as required (adds \* to label)                         |

### Events

- `change` — fires when the value changes. `event.detail.value` carries the new value.

### Shadow parts

For custom styling: `label`, `control`, `select`, `chevron`, `hint`, `error`.

```css
mfp-select::part(chevron) {
    color: var(--color-status-info-solid);
}
```

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`.

## Forms

`<mfp-select>` is form-associated via `ElementInternals`:

- Its `value` is submitted with the form under the configured `name`
- `required` triggers native `valueMissing` validation
- `error` (when set) becomes a custom validity message
- `checkValidity()` and `reportValidity()` mirror the native HTMLSelectElement methods

## Known limitations

- Single-select only. Multi-select via the native `<select multiple>` UI is uglier than most teams want — multi-select is on the roadmap as a separate component (`<mfp-multi-select>`) with a checkbox-list pattern.
