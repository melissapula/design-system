# @mfp-design-system/all

Meta-package that re-exports every component in one shot. Convenience for apps that want the whole design system without picking individual packages.

## When to use this

- **Prototyping / spike apps** — fastest way to drop the design system into something new.
- **Internal tools** where bundle size doesn't matter much.
- **Apps that genuinely use most components** anyway.

## When NOT to use this

- **Production user-facing apps** — install only the component packages you need so unused components aren't shipped to clients. Each component is its own npm package (`@mfp-design-system/button`, `@mfp-design-system/input`, etc.) for exactly this reason.

Tree-shaking can't strip the unused components from this meta-package because each re-export has the side effect of registering its custom element. That's the unavoidable tradeoff.

## Usage

```sh
npm install @mfp-design-system/all @mfp-design-system/tokens
```

```ts
// One side-effect import registers every <mfp-*> element
import '@mfp-design-system/tokens/css';
import '@mfp-design-system/tokens/themes/terracotta'; // pick a theme
import '@mfp-design-system/all';
```

```html
<mfp-button>Save</mfp-button>
<mfp-input label="Email" type="email"></mfp-input>
<mfp-modal>…</mfp-modal>
<!-- All 23 components are now available -->
```

Named imports work too:

```ts
import { MfpButton, MfpInput, showToast } from '@mfp-design-system/all';
```

## What's included

All 23 component packages — see the [root README](../../README.md) for the full list.

## Framework notes

Same as the individual packages — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`, React 19+ works natively.

## Version notes

This package's version doesn't track any individual component's version. When any component bumps, this package republishes (with the latest dep ranges) so the meta-import always pulls the newest of everything.
