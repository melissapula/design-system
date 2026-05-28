# @mfp-design-system/tokens

Design tokens for the mfp-design-system. Authored as JSON, built with
[Style Dictionary](https://styledictionary.com/) into:

- `build/css/tokens.css` — CSS custom properties (`:root { --color-... }`)
- `build/js/tokens.js` — ES module exports
- `build/ts/tokens.d.ts` — TypeScript types
- `build/json/tokens.json` — flattened JSON for tooling

## Usage

```ts
// CSS variables (load once, e.g. in your app shell)
import '@mfp-design-system/tokens/css';

// JS/TS values
import { color, size } from '@mfp-design-system/tokens';
console.log(color.brand[500]);
```

## Semantic tokens

Two layers ship side-by-side:

- **Primitives** — raw values (`--size-spacing-3`, `--font-size-2xl`, `--shadow-md`). Use these when you genuinely need a specific value.
- **Semantic** — purpose-named aliases (`--space-stack-md`, `--text-heading-lg`, `--elevation-overlay`). Use these by default — they describe **intent**, not measurement, so the design system can re-tune values without breaking call sites.

### Spacing — by purpose

| Token                        | Resolves to                | Use for                                       |
| ---------------------------- | -------------------------- | --------------------------------------------- |
| `--space-component-{xs..xl}` | spacing 1 → 8 (4–32px)     | Padding **inside** a component                |
| `--space-stack-{xs..xl}`     | spacing 1 → 10 (4–40px)    | Vertical gap between block elements           |
| `--space-inline-{xs..lg}`    | spacing 1 → 6 (4–24px)     | Horizontal gap between inline / flex children |
| `--space-layout-{sm..xl}`    | spacing 10 → 30 (40–120px) | Gap between major page sections               |

```css
.card {
    padding: var(--space-component-md); /* inside the card */
}
.card + .card {
    margin-top: var(--space-stack-md); /* between cards */
}
.button-row {
    display: flex;
    gap: var(--space-inline-sm); /* between buttons */
}
section + section {
    margin-top: var(--space-layout-md); /* between sections */
}
```

### Typography — by role

| Token                      | Resolves to              | Use for                          |
| -------------------------- | ------------------------ | -------------------------------- |
| `--text-caption`           | `--font-size-xs` (12px)  | Captions, footnotes, small print |
| `--text-body-{sm,md,lg}`   | xs → lg (14 / 16 / 18px) | Paragraphs, default body text    |
| `--text-label`             | `--font-size-sm` (14px)  | Form labels                      |
| `--text-button`            | `--font-size-sm` (14px)  | Button labels                    |
| `--text-code`              | `--font-size-sm` (14px)  | Inline `<code>` and `<kbd>`      |
| `--text-heading-{xs..2xl}` | lg → 5xl (18 → 48px)     | h6 → h1 progression              |
| `--text-display`           | `--font-size-6xl` (60px) | Hero / landing page              |

Semantic tokens only cover **size**; pair with `--font-weight-*` and `--font-line-height-*` primitives as needed.

### Radius — by surface kind

| Token              | Resolves to                   | Use for                |
| ------------------ | ----------------------------- | ---------------------- |
| `--radius-control` | `--size-radius-md` (8px)      | Buttons, inputs, chips |
| `--radius-surface` | `--size-radius-lg` (12px)     | Cards, modals, sheets  |
| `--radius-pill`    | `--size-radius-full` (9999px) | Pills, avatars, badges |

### Elevation — by relationship

| Token                 | Resolves to   | Use for                        |
| --------------------- | ------------- | ------------------------------ |
| `--elevation-subtle`  | `--shadow-xs` | Barely-visible separation      |
| `--elevation-raised`  | `--shadow-sm` | Resting cards, hovered buttons |
| `--elevation-overlay` | `--shadow-md` | Dropdowns, menus               |
| `--elevation-float`   | `--shadow-lg` | Modals, sheets                 |
| `--elevation-popover` | `--shadow-xl` | Large floating panels          |

### Border widths

| Token                        | Value | Use for                                        |
| ---------------------------- | ----- | ---------------------------------------------- |
| `--size-border-width-0`      | 0px   | Reset / no border                              |
| `--size-border-width-thin`   | 1px   | Default — hairlines, dividers, control borders |
| `--size-border-width-medium` | 2px   | Emphasis borders, focus rings                  |
| `--size-border-width-thick`  | 4px   | Heavy emphasis, indicator bars                 |

### Focus ring

Use these together (or just `outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-ring-color); outline-offset: var(--focus-ring-offset);`) to render a consistent focus state across every interactive component. The color flips with the active theme automatically.

| Token                 | Default value                        |
| --------------------- | ------------------------------------ |
| `--focus-ring-width`  | 2px (= `--size-border-width-medium`) |
| `--focus-ring-offset` | 2px                                  |
| `--focus-ring-color`  | `--color-brand-primary`              |
| `--focus-ring-style`  | `solid`                              |

### Control heights

For form inputs, buttons, selects — anything you'd put in a row and want to line up.

| Token               | Value | Typical use                   |
| ------------------- | ----- | ----------------------------- |
| `--size-control-xs` | 24px  | Compact density tables, chips |
| `--size-control-sm` | 32px  | Compact form rows             |
| `--size-control-md` | 40px  | Default button / input height |
| `--size-control-lg` | 48px  | Hero CTAs, touch targets      |
| `--size-control-xl` | 56px  | Extra-large form rows         |

### Opacity

For state styling — disabled, muted secondary controls. Standardizes the 0.5/0.6/0.7 drift that had crept in across the components.

| Token                | Value | Typical use                                                |
| -------------------- | ----- | ---------------------------------------------------------- |
| `--opacity-0`        | 0     | Reset / hidden but layout-preserving                       |
| `--opacity-disabled` | 0.5   | Disabled inputs, buttons, items                            |
| `--opacity-muted`    | 0.7   | Secondary controls (dismiss buttons, less-emphasized text) |
| `--opacity-full`     | 1     | Reset / fully visible                                      |

### Icon sizes

For icon-only buttons, badges with icons, inline icons in text.

| Token            | Value | Typical use                             |
| ---------------- | ----- | --------------------------------------- |
| `--size-icon-xs` | 12px  | Inline-with-caption                     |
| `--size-icon-sm` | 16px  | Inline-with-body-text                   |
| `--size-icon-md` | 20px  | Default button icons                    |
| `--size-icon-lg` | 24px  | Standalone icon button                  |
| `--size-icon-xl` | 32px  | Large icon button, empty-state graphics |

## Themes

Each app can pick a brand theme that overrides the design system's default brand colors. Components consume semantic tokens (`--color-brand-primary`, `--color-brand-primary-hover`, `--color-brand-primary-fg`, etc.) so a single import re-themes every primary button, focus ring, checked state, and switch.

```ts
import '@mfp-design-system/tokens/css'; // base + structural tokens
import '@mfp-design-system/tokens/themes/terracotta'; // brand overrides for this app
```

Themes ship with the package:

Theme names are the **color** (not the project) so any app can pick any theme — `themes/navy` isn't locked to the portfolio.

| Subpath               | Intended for      | Brand color                                     |
| --------------------- | ----------------- | ----------------------------------------------- |
| `./themes/blue`       | default           | `#2563eb` blue                                  |
| `./themes/terracotta` | fourseasonsstudio | `#c4622a` terracotta + warm cream/brown palette |
| `./themes/orange`     | garage-sales      | `#f97316` orange                                |
| `./themes/sand`       | lessonforge       | Blue accent on warm sand neutrals               |
| `./themes/navy`       | portfolio         | `#1a2744` navy                                  |
| `./themes/emerald`    | frula-homes       | `#1d9e75` emerald                               |

### Authoring a new theme

Create `src/themes/<name>.css` and at minimum override the brand semantic tokens:

```css
:root {
    --color-brand-primary: #c4622a;
    --color-brand-primary-hover: #a3501f;
    --color-brand-primary-fg: #fcfaf7;
    --color-brand-primary-subtle: #f5e6d8;
    --color-brand-primary-emphasis: #8b6914;
}
```

Themes can also override neutral semantic tokens (`--color-text-default`, `--color-background-default`, `--color-border-*`) for a fuller visual identity — see `themes/terracotta.css` for an example.

Status colors (`--color-status-success-*`, `--color-status-error-*`, etc.) are universal across themes — success is green everywhere, regardless of brand.

Add a subpath export in `package.json` after creating the file, then rebuild.

## Authoring

Source files live in `src/` and follow the
[W3C design tokens](https://design-tokens.github.io/community-group/format/)
shape:

```json
{
    "color": {
        "brand": {
            "500": { "$value": "#3b82f6", "$type": "color" }
        }
    }
}
```

Rebuild after edits:

```sh
pnpm --filter @mfp-design-system/tokens build
```

Or watch during development:

```sh
pnpm --filter @mfp-design-system/tokens dev
```
