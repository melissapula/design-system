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

## Themes

Each app can pick a brand theme that overrides the design system's default brand colors. Components consume semantic tokens (`--color-brand-primary`, `--color-brand-primary-hover`, `--color-brand-primary-fg`, etc.) so a single import re-themes every primary button, focus ring, checked state, and switch.

```ts
import '@mfp-design-system/tokens/css'; // base + structural tokens
import '@mfp-design-system/tokens/themes/warm'; // brand overrides for this app
```

Themes ship with the package:

| Subpath              | Intended for    | Brand color                                     |
| -------------------- | --------------- | ----------------------------------------------- |
| `./themes/blue`      | (default)       | `#2563eb` blue                                  |
| `./themes/warm`      | chrissys-studio | `#c4622a` terracotta + warm cream/brown palette |
| `./themes/orange`    | garage-sales    | `#f97316` orange                                |
| `./themes/earth`     | lessonforge     | Blue accent on warm neutrals                    |
| `./themes/portfolio` | melissapula.io  | `#1a2744` navy                                  |

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

Themes can also override neutral semantic tokens (`--color-text-default`, `--color-background-default`, `--color-border-*`) for a fuller visual identity — see `themes/warm.css` for an example.

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
