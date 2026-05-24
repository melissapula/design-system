# @mfp-design-system/form-field

A Lit-based `<mfp-form-field>` wrapper that provides label, hint, error, and required-indicator around an arbitrary form control.

## When to use this

Use `<mfp-form-field>` when the control inside **doesn't ship its own label** — most often:

- A bare `<input type="checkbox">` or `<input type="radio">`
- A `<textarea>`
- A native `<input type="date">` (or any other native input you want to pair with a label)
- A custom control or third-party widget

Components like `<mfp-input>` and `<mfp-select>` already have built-in `label`, `hint`, and `error` props, so you typically don't need a FormField around them. Use it if you want one consistent composition style across every row of a form.

## Install

```sh
npm install @mfp-design-system/form-field @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/form-field';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-form-field label="Subscribe" hint="We'll email twice a week." orientation="horizontal">
    <input type="checkbox" />
</mfp-form-field>

<mfp-form-field label="Birthday" required error="Please pick a date.">
    <input type="date" />
</mfp-form-field>

<mfp-form-field label="Notification preference" required>
    <div role="radiogroup">
        <label><input type="radio" name="notify" value="email" /> Email</label>
        <label><input type="radio" name="notify" value="sms" /> SMS</label>
    </div>
</mfp-form-field>
```

The wrapper automatically wires:

- `for`/`id` association between its label and the first slotted control (the control's `id` is set to a generated value if missing)
- `aria-describedby` on the control pointing at the hint or error
- `aria-invalid` on the control when an error is present

## API

| Attribute     | Type                         | Default      | Description                                                                                 |
| ------------- | ---------------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| `label`       | `string`                     | `''`         | Visible label                                                                               |
| `hint`        | `string`                     | `''`         | Helper text shown below                                                                     |
| `error`       | `string`                     | `''`         | Error message — also sets `aria-invalid` on the slotted control                             |
| `required`    | `boolean`                    | `false`      | Adds a red `*` to the label                                                                 |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | `horizontal` puts the control to the left of the label (useful for checkboxes and switches) |

### Shadow parts

`label`, `control`, `hint`, `error`.

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`.
