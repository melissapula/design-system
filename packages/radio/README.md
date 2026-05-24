# @mfp-design-system/radio

A single radio button. Group multiple together by giving them the same `name`.

```ts
import '@mfp-design-system/radio';
```

```html
<fieldset>
    <legend>Notification preference</legend>
    <mfp-radio name="notify" value="email" label="Email"></mfp-radio>
    <mfp-radio name="notify" value="sms" label="SMS"></mfp-radio>
    <mfp-radio name="notify" value="push" label="Push"></mfp-radio>
</fieldset>
```

Selecting one automatically unchecks the others in the same `name` group. The checked radio's `value` is submitted under `name`. Use `<fieldset>` + `<legend>` for the accessible label of the whole group.

| Attribute                         | Type    | Default              |
| --------------------------------- | ------- | -------------------- |
| `name`, `value`, `label`          | string  | `''` / `'on'` / `''` |
| `checked`, `disabled`, `required` | boolean | `false`              |

Form-associated; fires `change` CustomEvents with `detail.checked` and `detail.value`.
