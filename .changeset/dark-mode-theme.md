---
'@mfp-design-system/tokens': minor
---

New **`@mfp-design-system/tokens/themes/dark`** subpath export — a stackable dark-mode theme that flips text / background / border semantic vars, status colors, and shadow elevations to dark-appropriate values. Brand semantic vars are left alone so it composes with any of the existing brand themes:

```ts
import '@mfp-design-system/tokens/css';
import '@mfp-design-system/tokens/themes/terracotta';
import '@mfp-design-system/tokens/themes/dark';
```

Storybook also gets a new **Mode** toolbar toggle (light / dark) that's independent of the **Theme** toolbar, so any story can be inspected under either mode without leaving the canvas. Two new comparison stories under Themes — `LightVsDark` (every theme in both modes) and `StatusColorsLightVsDark` — make contrast issues easy to spot.
