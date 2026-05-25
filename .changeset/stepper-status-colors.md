---
'@mfp-design-system/stepper': minor
---

`<mfp-stepper>` status colors now map to **meaning**, not brand: green for success, yellow for in-progress, red for error.

| Status      | Before                | After                                                       |
| ----------- | --------------------- | ----------------------------------------------------------- |
| `completed` | brand-primary (blue)  | `--color-status-success-solid` (green)                      |
| `current`   | brand-primary outline | `--color-status-warning-solid` outline + yellow pulsing dot |
| `error`     | unchanged (red)       | unchanged                                                   |
| `pending`   | unchanged (muted)     | unchanged                                                   |

Connecting line between completed steps also picks up the success green. Focus rings on clickable steps still use the brand primary (focus ≠ status).

No API change — purely visual. Themes that re-skin brand colors no longer affect the stepper's status colors, which is the intended behavior (success = green regardless of theme).
