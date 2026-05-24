# @mfp-design-system/tooltip

Anchored tooltip. Wraps any element; shows on hover/focus, hides on blur/mouseleave/Escape. Sets `aria-describedby` on the first slotted child for screen readers.

```html
<mfp-tooltip content="Delete this file" placement="top">
    <mfp-icon-button label="Delete">
        <span aria-hidden="true">🗑</span>
    </mfp-icon-button>
</mfp-tooltip>
```

| Attribute   | Type                                     | Default                 |
| ----------- | ---------------------------------------- | ----------------------- |
| `content`   | string                                   | `''` (the tooltip text) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`                 |

## Known limitation

Positioning is CSS-only relative to the anchor. It does **not** flip placement when the tooltip would overflow the viewport. If you need that, swap in `@floating-ui/dom` or similar later — the API would stay the same.
