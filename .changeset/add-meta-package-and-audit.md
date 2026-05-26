---
'@mfp-design-system/all': minor
---

Initial release of `@mfp-design-system/all` — a meta-package that re-exports every component in one shot.

```sh
npm install @mfp-design-system/all @mfp-design-system/tokens
```

```ts
import '@mfp-design-system/tokens/css';
import '@mfp-design-system/tokens/themes/warm';
import '@mfp-design-system/all'; // registers every <mfp-*> element
```

Named imports also work: `import { MfpButton, showToast } from '@mfp-design-system/all'`.

**Tradeoff**: convenience over bundle size. Tree-shaking can't strip unused components because each re-export has the side effect of registering its custom element. Production user-facing apps should still cherry-pick individual packages (`@mfp-design-system/button`, etc.). Use `all` for prototyping, internal tools, or apps that legitimately use most components.

Also (no changeset for these — they're tooling, not package changes):

- New `scripts/audit-peer-deps.mjs` walks all `packages/*/package.json` files and verifies they declare the same `@mfp-design-system/tokens` peer range. Caught manually as drift twice already (one Version PR forgetting to update peer ranges after a tokens bump).
- New `pnpm audit-peers` script. Wired into CI right after install — drift now fails the build instead of slipping into a release.
- `.changeset/README.md` updated to explain linked-versioning (how to opt in when needed; not enabled today) and how the peer-dep audit complements it.
