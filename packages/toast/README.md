# @mfp-design-system/toast

Programmatic toast notifications. Lazily creates a fixed-position container in `document.body` the first time you call `showToast()`.

```ts
import { showToast } from '@mfp-design-system/toast';

showToast({ message: 'Saved!', variant: 'success' });
showToast({ message: 'Could not save', variant: 'error', duration: 8000 });

// Sticky — does not auto-dismiss
const persistent = showToast({ message: 'Reconnecting…', variant: 'info', duration: 0 });
// Later:
persistent.remove();
```

## `showToast(options)`

| Option     | Type                                          | Default    | Description                                           |
| ---------- | --------------------------------------------- | ---------- | ----------------------------------------------------- |
| `message`  | string                                        | (required) | Toast text                                            |
| `variant`  | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'`   | Background color                                      |
| `duration` | number (ms)                                   | `4000`     | Auto-dismiss after this many ms. Pass `0` for sticky. |

Returns the created `<mfp-toast>` element so you can dismiss it manually via `.remove()`.

## Inline `<mfp-toast>` usage

For layout preview or controlled rendering, you can place `<mfp-toast>` directly in markup:

```html
<mfp-toast variant="success" message="Saved!" duration="0"></mfp-toast>
```

## A11y

- Inner message has `role="status"` so screen readers announce new toasts
- Container has `aria-live="polite"` so announcements don't interrupt the user
- Built-in dismiss button has `aria-label="Dismiss"`
