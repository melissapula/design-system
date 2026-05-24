# @mfp-design-system/tokens

## 0.3.0

### Minor Changes

- a039a63: Add theme system — apps can override brand colors with a single import.

    **Tokens (minor)**
    - New semantic brand layer: `--color-brand-primary`, `--color-brand-primary-hover`, `--color-brand-primary-fg`, `--color-brand-primary-subtle`, `--color-brand-primary-emphasis`. Defaults reference the existing blue ramp so the default look is unchanged.
    - Five named themes ship as subpath exports — each is a small CSS file:
        - `@mfp-design-system/tokens/themes/blue` — explicit default
        - `@mfp-design-system/tokens/themes/warm` — terracotta + cream/brown palette (chrissys-studio)
        - `@mfp-design-system/tokens/themes/orange` — Tailwind orange-500 (garage-sales)
        - `@mfp-design-system/tokens/themes/earth` — warm neutrals + blue accent (lessonforge)
        - `@mfp-design-system/tokens/themes/portfolio` — navy primary (melissapula.io)
    - Status colors (`--color-status-success-*`, `--color-status-error-*`, etc.) stay universal — green-for-success and red-for-error don't change per brand.
    - README adds a Themes section with the full usage / authoring guide.

    **Components (patch)**

    Button, IconButton, Input, Select, Checkbox, Switch, Modal now consume the brand semantic layer instead of `--color-status-info-solid`:
    - Primary button background → `var(--color-brand-primary)`
    - Focus rings → `var(--color-brand-primary)`
    - Checkbox/Switch checked state → `var(--color-brand-primary)`
    - Switch thumb + checkbox glyph → `var(--color-brand-primary-fg)`

    The defaults still resolve to blue, so apps that don't load a theme see no visual change. Apps that DO load a theme automatically get re-themed components — no per-app component overrides needed.

    **Adopting a theme in your app**

    ```ts
    import '@mfp-design-system/tokens/css';
    import '@mfp-design-system/tokens/themes/warm';
    ```

    That's it — every primary button, focus ring, and checked state across the app now uses the warm palette.

## 0.2.0

### Minor Changes

- 5bafb28: Add seven new token categories and extend three existing ones, based on a cross-repo audit of the four consumer apps (portfolio, chrissys-studio, garage-sales, lessonforge).

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

## 0.1.0

### Minor Changes

- 3dd5d84: Initial release of `@mfp-design-system/tokens`.

    Design tokens for color (brand 50–900, neutral 0–1000, semantic text/background/border), spacing (0–16 step scale), radius (none/sm/md/lg/full), and typography (font families, weights, sizes, line heights). Authored as W3C-format JSON and built with Style Dictionary 4 to:
    - `@mfp-design-system/tokens/css` — CSS custom properties
    - `@mfp-design-system/tokens` — ES module exports
    - `@mfp-design-system/tokens/json` — flattened JSON for tooling

    Ships TypeScript types.
