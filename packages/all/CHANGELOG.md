# @mfp-design-system/all

## 1.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0
    - @mfp-design-system/accordion@1.0.0
    - @mfp-design-system/alert@1.0.0
    - @mfp-design-system/avatar@1.0.0
    - @mfp-design-system/badge@1.0.0
    - @mfp-design-system/button@3.0.0
    - @mfp-design-system/card@3.0.0
    - @mfp-design-system/checkbox@3.0.0
    - @mfp-design-system/divider@1.0.0
    - @mfp-design-system/footer@1.0.0
    - @mfp-design-system/form-field@3.0.0
    - @mfp-design-system/icon-button@3.0.0
    - @mfp-design-system/input@3.0.0
    - @mfp-design-system/modal@3.0.0
    - @mfp-design-system/nav@1.0.0
    - @mfp-design-system/radio@1.0.0
    - @mfp-design-system/select@3.0.0
    - @mfp-design-system/spinner@1.0.0
    - @mfp-design-system/stepper@1.0.0
    - @mfp-design-system/switch@3.0.0
    - @mfp-design-system/tabs@1.0.0
    - @mfp-design-system/textarea@1.0.0
    - @mfp-design-system/toast@1.0.0
    - @mfp-design-system/tooltip@1.0.0

## 0.1.0

### Minor Changes

- 1c1080a: Initial release of `@mfp-design-system/all` — a meta-package that re-exports every component in one shot.

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
