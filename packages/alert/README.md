# @mfp-design-system/alert

An alert banner using the status color tokens. Optional heading + dismiss button.

```html
<mfp-alert>Heads up, here's a message.</mfp-alert>
<mfp-alert variant="success">Saved successfully.</mfp-alert>
<mfp-alert variant="error" heading="Couldn't save" dismissible>Try again in a moment.</mfp-alert>
```

| Attribute     | Type                                          | Default  |
| ------------- | --------------------------------------------- | -------- |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| `heading`     | `string`                                      | `''`     |
| `dismissible` | `boolean`                                     | `false`  |

Message content goes in the default slot. Inner body has `role="alert"` so screen readers announce changes.

### Events

- `close` — fires when the dismiss button is clicked. The alert removes itself from the DOM.
