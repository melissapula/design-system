# mfp-design-system

A Lit-based design system, published to npm under the **`@mfp-design-system`** scope and organized as a pnpm monorepo. Every component is a custom element — works in any framework that supports them (Vue, Nuxt, Angular, React 19+, plain HTML).

23 component packages + design tokens. All themable, all tested, all form-associated where it applies.

Live Storybook: built from this repo's `apps/storybook/` workspace — run `pnpm storybook` or browse the published `storybook-static` output.

## What's inside

### Tokens

- **`@mfp-design-system/tokens`** — colors (brand, neutral, semantic, status), spacing, radius, typography, shadows, motion, z-index, breakpoints, letter-spacing, plus 6 named themes. Built with Style Dictionary into CSS variables, ES modules, TypeScript types, and JSON.

### Components (alphabetical)

| Package                          | Description                                                          |
| -------------------------------- | -------------------------------------------------------------------- |
| `@mfp-design-system/accordion`   | `<mfp-accordion>` + `<mfp-accordion-item>`; FAQ-style exclusive mode |
| `@mfp-design-system/alert`       | Banner with status icon + optional heading + dismiss                 |
| `@mfp-design-system/avatar`      | Image with initials fallback; sizes; status dot                      |
| `@mfp-design-system/badge`       | Pill / chip with 6 variants                                          |
| `@mfp-design-system/button`      | Primary / secondary / danger / ghost; form-associated                |
| `@mfp-design-system/card`        | Container with header / body / footer slots                          |
| `@mfp-design-system/checkbox`    | With indeterminate state; form-associated                            |
| `@mfp-design-system/divider`     | Horizontal/vertical separator with optional label                    |
| `@mfp-design-system/footer`      | App footer shell; `default` / `brand` / `dark` variants              |
| `@mfp-design-system/form-field`  | Labeled wrapper for arbitrary form controls                          |
| `@mfp-design-system/icon-button` | Icon-only button; ghost-by-default                                   |
| `@mfp-design-system/input`       | Text input with label/hint/error; form-associated                    |
| `@mfp-design-system/modal`       | Built on native `<dialog>` for free focus trap                       |
| `@mfp-design-system/nav`         | `<mfp-nav-bar>` + `<mfp-side-nav>` + `<mfp-nav-item>`; brand variant |
| `@mfp-design-system/radio`       | Single radio; siblings auto-deselect by name; form-associated        |
| `@mfp-design-system/select`      | Wraps native `<select>` for free a11y; form-associated               |
| `@mfp-design-system/spinner`     | Standalone loading indicator                                         |
| `@mfp-design-system/stepper`     | `<mfp-stepper>` + `<mfp-step>`; status colors (green/yellow/red)     |
| `@mfp-design-system/switch`      | Toggle, `role="switch"`; form-associated                             |
| `@mfp-design-system/tabs`        | `<mfp-tabs>` + `<mfp-tab>` + `<mfp-tab-panel>`; full keyboard nav    |
| `@mfp-design-system/textarea`    | Multi-line input; form-associated                                    |
| `@mfp-design-system/toast`       | `showToast({ message, variant, duration })` programmatic API         |
| `@mfp-design-system/tooltip`     | Hover/focus tooltip; 4 placements; min/max width                     |

### Themes

Theme names are the **color** — any app can pick any theme; the "intended for" column just notes where each color came from.

| Theme        | Intended for                              |
| ------------ | ----------------------------------------- |
| `blue`       | default                                   |
| `terracotta` | fourseasonsstudio (cream / terracotta)    |
| `orange`     | garage-sales                              |
| `sand`       | lessonforge (warm neutrals + blue accent) |
| `navy`       | portfolio (melissapula.io)                |
| `emerald`    | frula-homes (fsbo-platform)               |

## Using it in an app

```sh
npm install @mfp-design-system/tokens @mfp-design-system/button
```

```ts
// app entry
import '@mfp-design-system/tokens/css';
import '@mfp-design-system/tokens/themes/terracotta'; // pick one theme
import '@mfp-design-system/button';
```

```html
<mfp-button variant="primary">Save</mfp-button>
```

### Framework notes

- **Vue 3 / Nuxt** — `compilerOptions: { isCustomElement: (tag) => tag.startsWith('mfp-') }`
- **Angular** — add `CUSTOM_ELEMENTS_SCHEMA` to any module/standalone component
- **React 19+** — works natively
- **Plain HTML** — just use the tags

### Forms

Form-input components (`button[type="submit"]`, `input`, `textarea`, `select`, `checkbox`, `switch`, `radio`) participate in native HTML form submission via `ElementInternals`. `new FormData(form).get('email')` Just Works, `required` triggers native validation, `error` becomes a custom validity message.

### Theming

Components consume semantic CSS variables (`--color-brand-primary`, `--color-brand-primary-hover`, etc.). A theme file is a `:root { … }` block that overrides those vars. Apps pick a theme with one extra import — every component re-skins automatically.

Authoring new themes: drop a file in `packages/tokens/src/themes/<name>.css`, add a `./themes/<name>` subpath export to `packages/tokens/package.json`, rebuild.

## Repo layout

```
packages/
  tokens/             design tokens (Style Dictionary) + 6 themes
  <component>/        one package per component
                      ├── src/<name>.ts         Lit element
                      ├── src/<name>.stories.ts Storybook stories
                      ├── src/<name>.test.ts    Web Test Runner tests
                      ├── package.json          public exports
                      └── README.md             per-component docs
apps/
  storybook/          Storybook for component development & docs
.changeset/           queued changesets for the next Version PR
```

Stories are discovered from both `apps/storybook/stories/**` and `packages/*/src/**/*.stories.ts`, so each component package ships its own stories next to its source.

## Local development

### Requirements

- Node.js >= 20.11 (`nvm use` reads `.nvmrc`)
- pnpm >= 9 (`corepack enable` gets you the version pinned in `package.json`)

### Getting started

```sh
pnpm install
pnpm build         # build all packages
pnpm storybook     # http://localhost:6006
```

### Scripts

| Script                 | What it does                                                               |
| ---------------------- | -------------------------------------------------------------------------- |
| `pnpm build`           | Build all workspace packages                                               |
| `pnpm dev`             | Run `dev` in every package, in parallel                                    |
| `pnpm lint`            | ESLint across the repo                                                     |
| `pnpm format`          | Prettier-format all files                                                  |
| `pnpm format:check`    | CI-style format check                                                      |
| `pnpm typecheck`       | TypeScript check on every package                                          |
| `pnpm test`            | Web Test Runner across all packages (Chromium via Playwright)              |
| `pnpm storybook`       | Run Storybook locally                                                      |
| `pnpm build-storybook` | Build static Storybook output                                              |
| `pnpm changeset`       | Create a new changeset                                                     |
| `pnpm validate`        | Run the full CI gate locally (audit, format, lint, typecheck, build, test) |
| `pnpm release`         | Build and publish (CI uses this; don't run manually)                       |

### Pre-commit / pre-push gates

- **Pre-commit** (husky): runs lint-staged — Prettier + ESLint on staged files only. Fast.
- **Pre-push** (husky): runs `pnpm validate` — the full CI gate (audit-peers, format:check, lint, typecheck, build, test). Slow but catches everything CI would catch before you wait on GitHub.

If you need to push WIP for backup, skip the pre-push hook with `git push --no-verify`. Don't skip on `main` — broken main blocks the release workflow.

### Testing

Tests live alongside source as `*.test.ts`. Run them via `pnpm test` — uses [Web Test Runner](https://modern-web.dev/docs/test-runner/) + [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/) in headless Chromium. CI installs Playwright's Chromium and runs the suite on every push and PR.

97 tests across all components today; numbers grow with every new component.

### Pre-commit hook

Husky 9 + lint-staged runs Prettier and ESLint on staged files. Configured at the workspace root.

## Releasing

Uses [Changesets](https://github.com/changesets/changesets).

```sh
# After making changes:
pnpm changeset      # describe the change interactively → creates a .changeset/*.md file
git commit -am "feat: …"
git push
```

On push to `main`, the **Release** workflow opens (or updates) a `chore(release): version packages` PR that bumps versions and updates changelogs. Merging that PR publishes the affected packages to npm.

Version strategy:

- New packages → minor bump (start at `0.1.0`)
- Backwards-compatible features → minor
- Bug fixes → patch
- Breaking changes (in `0.x`) → minor; (in `1.x+`) → major

## Architectural notes

### Tokens as an optional peer

Every component declares `@mfp-design-system/tokens` as an _optional_ peer dependency. Components have fallback values in their CSS (`var(--color-brand-primary, #2563eb)`), so they look reasonable even without tokens loaded. Loading the tokens stylesheet gives them the canonical (and themable) look.

### Status colors are universal

`--color-status-{success,warning,error,info}` don't change across themes. Success is green everywhere; error is red. This represents _meaning_, not brand identity. The brand semantic layer is separate (`--color-brand-primary`).

### Native elements wherever possible

`<mfp-modal>` wraps `<dialog>` (free focus trap, scroll lock, top-layer rendering). `<mfp-select>` wraps `<select>` (free keyboard a11y + mobile-native pickers). `<mfp-accordion-item>` wraps `<details>` (free Enter/Space toggle + ARIA). The pattern is to let the browser do the heavy lifting and only style on top.

### Storybook resolves package imports to source

`apps/storybook/.storybook/main.ts` aliases every `@mfp-design-system/<name>` import to its `src/index.ts`. Same module always wins, no risk of `customElements.define()` being called twice from two different module instances (which used to crash the Themes showcase story).

## Consumer apps

The design system is consumed by Melissa's five apps:

- `melissapula.github.io` (Vue 3 + Vite) — personal portfolio
- `chrissys-studio` (Nuxt + Sanity + Stripe) — fourseasonsstudio brand
- `fsbo-platform` (Nuxt, real estate) — Frula Homes
- `garage-sales` (Nuxt + Supabase + Mapbox + Sentry)
- `lessonforge/web` (Angular)

Bugs caught during real-app integration get regression tests + a memory note for future-me.

---

License: [MIT](./LICENSE)
