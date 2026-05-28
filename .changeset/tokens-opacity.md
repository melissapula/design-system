---
'@mfp-design-system/tokens': minor
---

Adds opacity tokens — the last pre-migration token gap. `opacity` was hardcoded 14 times across 13 components with three drifted values: `0.5` (most disabled states), `0.6` (input/select/textarea — unintentional drift), `0.7` (toast/alert dismiss buttons).

| Token                | Value | Use                                                |
| -------------------- | ----- | -------------------------------------------------- |
| `--opacity-0`        | 0     | Reset / hidden but layout-preserving               |
| `--opacity-disabled` | 0.5   | Disabled inputs, buttons, items                    |
| `--opacity-muted`    | 0.7   | Secondary controls (dismiss buttons, muted labels) |
| `--opacity-full`     | 1     | Reset / fully visible                              |

The `0.5` vs `0.6` split was unintentional drift — standardizing on `--opacity-disabled` (0.5) during component migration will align all disabled states.
