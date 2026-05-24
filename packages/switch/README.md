# @mfp-design-system/switch

A Lit-based `<mfp-switch>` toggle component, fully form-associated. Visually a sliding pill; semantically `role="switch"`.

## Install

```sh
npm install @mfp-design-system/switch @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/switch';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-switch label="Dark mode"></mfp-switch>
<mfp-switch checked label="Notifications"></mfp-switch>
<mfp-switch disabled label="Premium feature"></mfp-switch>
```

## API

| Attribute  | Type      | Default | Description                                |
| ---------- | --------- | ------- | ------------------------------------------ |
| `checked`  | `boolean` | `false` | On/off state                               |
| `disabled` | `boolean` | `false` | Disables the switch                        |
| `required` | `boolean` | `false` | Marks as required (must be on to validate) |
| `name`     | `string`  | `''`    | Form field name                            |
| `value`    | `string`  | `'on'`  | Value submitted with the form when on      |
| `label`    | `string`  | `''`    | Label text (or use the default slot)       |

### Events

- `change` — fires when the switch toggles. `event.detail.checked` is the new state.

### Forms

Form-associated via `ElementInternals`. When on, submits `value` under `name`; when off, submits nothing.

### Shadow parts

`track`, `thumb`, `label`.

## Switch vs. Checkbox

Use **Switch** for binary settings that take effect immediately (dark mode, notifications, feature flags). Use **Checkbox** for choices that take effect on form submission (terms agreement, multi-select).
