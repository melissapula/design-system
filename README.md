# design-system

A Lit-based design system, organized as a pnpm monorepo.

## Layout

```
packages/
  tokens/          @mfp-design-system/tokens — design tokens (Style Dictionary)
apps/
  storybook/       Storybook for component development & docs
```

## Requirements

- Node.js >= 20.11 (see `.nvmrc`)
- pnpm >= 9 (`corepack enable` recommended)

## Getting started

```sh
pnpm install
pnpm build          # build all packages
pnpm storybook      # run Storybook at http://localhost:6006
```

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets).

```sh
pnpm changeset      # describe your change → creates a .changeset/*.md file
git commit -am "feat: ..."
git push
```

On merge to `main`, the **Release** workflow opens (or updates) a
"Version Packages" PR. Merging that PR publishes the bumped packages to npm.

## Scripts

| Script           | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `pnpm build`     | Build all workspace packages                     |
| `pnpm dev`       | Run `dev` in every package, in parallel          |
| `pnpm lint`      | Lint every package                               |
| `pnpm test`      | Run tests in every package                       |
| `pnpm typecheck` | Typecheck every package                          |
| `pnpm storybook` | Run Storybook locally                            |
| `pnpm changeset` | Create a new changeset                           |
| `pnpm release`   | Build and publish (used by the release workflow) |
