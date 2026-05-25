---
'@mfp-design-system/tooltip': minor
---

`<mfp-tooltip>` now has explicit `max-width` and `min-width` attributes for sizing control.

**New defaults**: `min-width: 80px`, `max-width: 240px`. Short labels like "Save" no longer render as tiny pills; long content still wraps at 240px. Pass `min-width="0"` to opt out.

Both attributes accept a number (treated as px) or any CSS length string (`rem`, `em`, `%`, `ch`, etc.):

```html
<mfp-tooltip content="Save" min-width="0">
    <!-- shrink to fit -->
    <mfp-tooltip content="..." max-width="400">
        <!-- wider cap -->
        <mfp-tooltip content="..." min-width="200" max-width="200">
            <!-- fixed width -->
            <mfp-tooltip content="..." max-width="20rem">
                <!-- string units --></mfp-tooltip
            ></mfp-tooltip
        ></mfp-tooltip
    ></mfp-tooltip
>
```

Also fixes a bug where `max-width="400"` (digit-only string from HTML attribute) was being applied as the literal string `"400"` without the `px` unit, so the browser ignored it. Both attributes now correctly detect digit-only strings and append `px`.
