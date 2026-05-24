# @mfp-design-system/badge

A small pill/chip used to label status or counts.

```html
<mfp-badge>New</mfp-badge>
<mfp-badge variant="success">Active</mfp-badge>
<mfp-badge variant="warning">Ends Soon</mfp-badge>
<mfp-badge variant="error" outlined>Cancelled</mfp-badge>
```

| Attribute  | Type                                                                  | Default     |
| ---------- | --------------------------------------------------------------------- | ----------- |
| `variant`  | `'neutral' \| 'brand' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'neutral'` |
| `size`     | `'sm' \| 'md'`                                                        | `'sm'`      |
| `outlined` | `boolean`                                                             | `false`     |

Content goes in the default slot. The brand variant uses the active theme's primary color; status variants use universal status tokens.
