# @mfp-design-system/tokens

## 0.9.0

### Minor Changes

- 3187544: New **`@mfp-design-system/tokens/themes/dark`** subpath export — a stackable dark-mode theme that flips text / background / border semantic vars, status colors, and shadow elevations to dark-appropriate values. Brand semantic vars are left alone so it composes with any of the existing brand themes:

    ```ts
    import '@mfp-design-system/tokens/css';
    import '@mfp-design-system/tokens/themes/terracotta';
    import '@mfp-design-system/tokens/themes/dark';
    ```

    Storybook also gets a new **Mode** toolbar toggle (light / dark) that's independent of the **Theme** toolbar, so any story can be inspected under either mode without leaving the canvas. Two new comparison stories under Themes — `LightVsDark` (every theme in both modes) and `StatusColorsLightVsDark` — make contrast issues easy to spot.

## 0.8.0

### Minor Changes

- 6f8aec7: Adds opacity tokens — the last pre-migration token gap. `opacity` was hardcoded 14 times across 13 components with three drifted values: `0.5` (most disabled states), `0.6` (input/select/textarea — unintentional drift), `0.7` (toast/alert dismiss buttons).

    | Token                | Value | Use                                                |
    | -------------------- | ----- | -------------------------------------------------- |
    | `--opacity-0`        | 0     | Reset / hidden but layout-preserving               |
    | `--opacity-disabled` | 0.5   | Disabled inputs, buttons, items                    |
    | `--opacity-muted`    | 0.7   | Secondary controls (dismiss buttons, muted labels) |
    | `--opacity-full`     | 1     | Reset / fully visible                              |

    The `0.5` vs `0.6` split was unintentional drift — standardizing on `--opacity-disabled` (0.5) during component migration will align all disabled states.

## 0.7.0

### Minor Changes

- 267cebf: Three foundational token families to round out the system before component migration:

    **Border widths** (primitive) — `--size-border-width-{0,thin,medium,thick}` (0/1/2/4px). Components were inlining `border: 1px solid …` 14 times across 13 files; now they can reach for the same hairline token.

    **Control heights** (primitive) — `--size-control-{xs,sm,md,lg,xl}` (24/32/40/48/56px). Buttons, inputs, selects, and icon-buttons had been hardcoding their heights independently, leading to off-by-2px misalignments in form rows. One scale to keep them aligned.

    **Icon sizes** (primitive) — `--size-icon-{xs,sm,md,lg,xl}` (12/16/20/24/32px). Same idea for the slotted/inline icons inside buttons, badges, alerts, etc.

    **Focus ring** (semantic) — `--focus-ring-{width,offset,color,style}`. Every interactive component had its own `outline: 2px solid var(--color-brand-primary); outline-offset: 2px` block (22 occurrences across 10 components). One source of truth — color automatically picks up the active theme's brand.

    ```css
    :focus-visible {
        outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color);
        outline-offset: var(--focus-ring-offset);
    }
    ```

    18 new CSS custom properties. README updated with usage tables. No breaking changes — existing primitives and semantics remain.

## 0.6.0

### Minor Changes

- 4c41382: Adds a **semantic token layer** on top of the existing primitives, so consumers can name things by intent instead of measurement.

    **Spacing** — `--space-component-{xs..xl}` (padding inside components), `--space-stack-{xs..xl}` (vertical gaps between block elements), `--space-inline-{xs..lg}` (horizontal gaps between inline/flex children), `--space-layout-{sm..xl}` (gaps between major page sections).

    **Typography (sizes only)** — `--text-caption`, `--text-body-{sm,md,lg}`, `--text-label`, `--text-button`, `--text-code`, `--text-heading-{xs..2xl}`, `--text-display`. Pair with `--font-weight-*` and `--font-line-height-*` primitives as needed.

    **Radius** — `--radius-control` (buttons, inputs), `--radius-surface` (cards, modals), `--radius-pill` (pills, avatars, badges).

    **Elevation** — `--elevation-subtle`, `--elevation-raised`, `--elevation-overlay`, `--elevation-float`, `--elevation-popover` — aliases for the underlying `--shadow-*` primitives, named by the relationship they imply.

    All semantic tokens resolve to existing primitives via `var()` references — no new values, just a vocabulary layer. Primitives still ship and remain valid to use directly when you need a specific value.

    35 new CSS custom properties. README updated with usage tables.

## 0.5.0

### Minor Changes

- 67b5fd0: Theme subpaths now follow a **color-name** convention so any app can pick any theme without the name implying a specific project:

    | Old subpath          | New subpath           |
    | -------------------- | --------------------- |
    | `./themes/warm`      | `./themes/terracotta` |
    | `./themes/earth`     | `./themes/sand`       |
    | `./themes/portfolio` | `./themes/navy`       |

    New: `./themes/emerald` — `#1d9e75` emerald-green palette derived from the Frula Homes brand color in `fsbo-platform`.

    If you imported the old subpaths in an app, update the import path. No theme content changed — same CSS variables, same values, just renamed files.

## 0.4.0

### Minor Changes

- d78d5ff: Two new tokens, both gaps surfaced while wiring lessonforge:
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
