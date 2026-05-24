---
'@mfp-design-system/tokens': minor
---

Add seven new token categories and extend three existing ones, based on a cross-repo audit of the four consumer apps (portfolio, chrissys-studio, garage-sales, lessonforge).

**New categories**

- `color.status.{success,warning,error,info}.{bg,fg,border,solid}` — semantic status colors with light bg + dark fg + mid-tone border + solid accent. Replaces ad-hoc Tailwind classes that consumer apps were hardcoding (e.g., garage-sales `pin.active`, lessonforge `--success`/`--danger`).
- `shadow.{xs,sm,md,lg,xl,inset,none}` — tiered elevation shadows.
- `motion.duration.{instant,fast,normal,slow,slower}` (0/150/200/300/500ms) and `motion.easing.{linear,standard,accelerate,decelerate,spring}` — the `spring` curve matches chrissys-studio's existing `cubic-bezier(0.16, 1, 0.3, 1)`.
- `z.{base,raised,dropdown,sticky,drawer,modal,popover,toast,tooltip,max}` — semantic z-index scale.
- `font.letterSpacing.{tighter,tight,normal,wide,wider,widest,ultra}` — em-based tracking for headings and uppercase labels.
- `breakpoint.{sm,md,lg,xl,2xl}` — aligned with Tailwind's defaults (640/768/1024/1280/1536) so apps using Tailwind don't need to reconcile two scales.

**Extended categories**

- `font.size`: added `2xs` (10px), `5xl` (48px), `6xl` (60px), `7xl` (72px).
- `font.weight`: added `light` (300).
- `font.family`: added `serif` (system serif stack).
- `font.lineHeight`: added `snug` (1.1) and `relaxed` (1.7).
- `size.spacing`: added steps `7` (28px), `9` (36px), `14` (56px), `18` (72px), `20` (80px), `24` (96px), `30` (120px).
- `size.radius`: added `xs` (2px).

**Not included (deferred)**

- Per-app brand color palettes — the cross-repo audit showed the current `color.brand.*` blue ramp matches almost no real consumer. That conversation deserves its own design pass.
- Gradient tokens, Tailwind preset export.

All additions are non-breaking — existing token names and values are unchanged.
