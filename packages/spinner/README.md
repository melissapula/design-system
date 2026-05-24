# @mfp-design-system/spinner

A standalone loading spinner. Inherits `color` from its container, so override via `color: ...` if you want a non-brand spinner.

```html
<mfp-spinner></mfp-spinner>
<mfp-spinner size="lg" label="Saving changes"></mfp-spinner>
<mfp-spinner style="color: #6b7280;"></mfp-spinner>
```

| Attribute | Type                           | Default                                |
| --------- | ------------------------------ | -------------------------------------- |
| `size`    | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`                                 |
| `label`   | `string`                       | `'Loading'` (becomes the `aria-label`) |

The inner element has `role="status"` for screen-reader announcement.
