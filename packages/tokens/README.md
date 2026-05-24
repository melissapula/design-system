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
