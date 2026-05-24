# @mfp-design-system/input

A Lit-based `<mfp-input>` web component. Works in any framework that supports custom elements.

## Install

```sh
npm install @mfp-design-system/input @mfp-design-system/tokens
```

`@mfp-design-system/tokens` is an optional peer — the component has fallback values, but loading the tokens gives it the canonical look.

## Usage

```ts
import '@mfp-design-system/input';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-input label="Email" type="email" placeholder="you@example.com"></mfp-input>

<mfp-input label="Password" type="password" required></mfp-input>

<mfp-input label="Search" type="search">
    <span slot="prefix">🔍</span>
</mfp-input>

<mfp-input label="Name" hint="Your full legal name"></mfp-input>

<mfp-input label="Email" type="email" error="Please enter a valid email address"></mfp-input>

<mfp-input size="sm" placeholder="Small"></mfp-input>
<mfp-input size="md" placeholder="Medium"></mfp-input>
<mfp-input size="lg" placeholder="Large"></mfp-input>

<mfp-input disabled value="Can't touch this"></mfp-input>
<mfp-input readonly value="Look but don't touch"></mfp-input>
```

## API

| Attribute     | Type                                                                        | Default  | Description                                  |
| ------------- | --------------------------------------------------------------------------- | -------- | -------------------------------------------- |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` | Native input type                            |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`   | Sizing                                       |
| `value`       | `string`                                                                    | `''`     | Current value (controlled)                   |
| `name`        | `string`                                                                    | `''`     | Native form `name`                           |
| `label`       | `string`                                                                    | `''`     | Visible label (also wires `for`/`id`)        |
| `placeholder` | `string`                                                                    | `''`     | Placeholder text                             |
| `hint`        | `string`                                                                    | `''`     | Helper text shown below the input            |
| `error`       | `string`                                                                    | `''`     | Error message — also triggers invalid styles |
| `disabled`    | `boolean`                                                                   | `false`  | Disables the input                           |
| `readonly`    | `boolean`                                                                   | `false`  | Makes the input read-only                    |
| `required`    | `boolean`                                                                   | `false`  | Marks as required (adds \* to label)         |

### Events

- `input` — fires on every keystroke. `event.detail.value` carries the current value.
- `change` — fires on commit (blur or Enter), per native `<input>` semantics.

### Slots

- `prefix` — content before the input (icons, currency symbols, etc.)
- `suffix` — content after the input (clear button, units, etc.)

### Shadow parts

For custom styling: `label`, `control`, `input`, `hint`, `error`.

```css
mfp-input::part(input) {
    border-radius: 0;
}
mfp-input::part(label) {
    text-transform: uppercase;
}
```

## Framework notes

- **Vue 3 / Nuxt**: set `compilerOptions.isCustomElement: (tag) => tag.startsWith('mfp-')`
- **Angular**: add `CUSTOM_ELEMENTS_SCHEMA` to modules using the component
- **React 19+**: works natively

## Known limitations

- Does not yet participate in HTML form submission (no `ElementInternals` form-association). Listen for `input`/`change` events instead. On the roadmap, will land at the same time as Button gets it.
