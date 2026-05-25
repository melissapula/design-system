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
| `max-width` | number (px) \| string (any CSS length)   | `'240px'`               |
| `min-width` | number (px) \| string (any CSS length)   | `'80px'`                |

Default sizing: the bubble grows with content from a min-width of 80px (so short labels like "Save" don't render as tiny pills) up to a max-width of 240px (after which text wraps to multiple lines). Override either to taste:

```html
<!-- Narrow tooltip for a tight space -->
<mfp-tooltip content="Saved" max-width="120" min-width="0"><button>Save</button></mfp-tooltip>

<!-- Wide tooltip for longer content -->
<mfp-tooltip content="A long explanation..." max-width="400"><button>?</button></mfp-tooltip>

<!-- Force a fixed width -->
<mfp-tooltip content="..." min-width="200" max-width="200"><button>?</button></mfp-tooltip>

<!-- Any CSS length unit -->
<mfp-tooltip content="..." max-width="20rem"><button>?</button></mfp-tooltip>
```

## Known limitation

Positioning is CSS-only relative to the anchor. It does **not** flip placement when the tooltip would overflow the viewport. If you need that, swap in `@floating-ui/dom` or similar later — the API would stay the same.
