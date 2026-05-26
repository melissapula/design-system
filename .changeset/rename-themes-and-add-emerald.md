---
'@mfp-design-system/tokens': minor
---

Theme subpaths now follow a **color-name** convention so any app can pick any theme without the name implying a specific project:

| Old subpath          | New subpath           |
| -------------------- | --------------------- |
| `./themes/warm`      | `./themes/terracotta` |
| `./themes/earth`     | `./themes/sand`       |
| `./themes/portfolio` | `./themes/navy`       |

New: `./themes/emerald` — `#1d9e75` emerald-green palette derived from the Frula Homes brand color in `fsbo-platform`.

If you imported the old subpaths in an app, update the import path. No theme content changed — same CSS variables, same values, just renamed files.
