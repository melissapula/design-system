# @mfp-design-system/checkbox

A Lit-based `<mfp-checkbox>` web component, fully form-associated.

## Install

```sh
npm install @mfp-design-system/checkbox @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/checkbox';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-checkbox label="Subscribe"></mfp-checkbox>

<mfp-checkbox checked label="Pre-checked"></mfp-checkbox>

<mfp-checkbox indeterminate label="Select all"></mfp-checkbox>

<mfp-checkbox required> I agree to the <a href="#">terms</a> </mfp-checkbox>

<form>
    <mfp-checkbox name="agree" value="yes" required></mfp-checkbox>
    <button type="submit">Submit</button>
</form>
```

## API

| Attribute       | Type      | Default | Description                                                |
| --------------- | --------- | ------- | ---------------------------------------------------------- |
| `checked`       | `boolean` | `false` | Checked state                                              |
| `indeterminate` | `boolean` | `false` | Indeterminate state (overrides visual check)               |
| `disabled`      | `boolean` | `false` | Disables the checkbox                                      |
| `required`      | `boolean` | `false` | Marks as required for form validation                      |
| `name`          | `string`  | `''`    | Form field name                                            |
| `value`         | `string`  | `'on'`  | Value submitted with the form when checked                 |
| `label`         | `string`  | `''`    | Label text (use the default slot for rich content instead) |

### Events

- `change` — fires when the user toggles the checkbox. `event.detail.checked` is the new state.

### Forms

`<mfp-checkbox>` is form-associated via `ElementInternals`:

- When `checked`, its `value` is submitted under `name`; when unchecked, nothing is submitted
- `required` triggers `valueMissing` validation when unchecked
- `checkValidity()` and `reportValidity()` mirror native methods

### Slots

- _(default)_ — label content (used when the `label` attribute is empty; lets you include links/icons)

### Shadow parts

`box`, `label`.
