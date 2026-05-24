# @mfp-design-system/avatar

User avatar with image, initials fallback, and optional status dot.

```html
<mfp-avatar src="/me.jpg" name="Melissa Pula"></mfp-avatar>
<mfp-avatar name="Melissa Pula"></mfp-avatar>
<!-- shows "MP" -->
<mfp-avatar size="lg" name="MP" status="online"></mfp-avatar>
<mfp-avatar shape="square" src="/team.jpg" alt="Team photo"></mfp-avatar>
```

If `src` fails to load, falls back to initials. If `name` is empty too, falls back to a generic person icon.

| Attribute            | Type                                        | Default                       |
| -------------------- | ------------------------------------------- | ----------------------------- |
| `src`, `name`, `alt` | string                                      | `''`                          |
| `size`               | `'sm' \| 'md' \| 'lg' \| 'xl'`              | `'md'` (28 / 40 / 56 / 80 px) |
| `shape`              | `'circle' \| 'square'`                      | `'circle'`                    |
| `status`             | `'online' \| 'busy' \| 'away' \| 'offline'` | _none_                        |
