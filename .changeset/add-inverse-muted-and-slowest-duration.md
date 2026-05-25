---
'@mfp-design-system/tokens': minor
---

Two new tokens, both gaps surfaced while wiring lessonforge:

- **`color.text.inverse-muted`** — muted text color for use on dark surfaces. Pairs with the existing `color.text.inverse`. Defaults to `color.neutral.300` (#d1d5db). Themes that override neutral text colors (`earth`, `warm`) can optionally override this too for warmer/cooler inverse-muted tones.
- **`motion.duration.slowest`** = 1000ms. The existing scale topped out at `slower` (500ms), which is too short for ambient animations like pulse / breathing loops.

Both are additive — no breaking changes, no component updates required. Apps that need them just reference the new CSS vars.

Use cases:

```css
.dark-header-subtitle {
    color: var(--color-text-inverse-muted);
}

@keyframes pulse {
    50% {
        opacity: 0.5;
    }
}
.loading-block {
    animation: pulse var(--motion-duration-slowest) ease-in-out infinite;
}
```
