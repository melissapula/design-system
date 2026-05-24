# Changesets

This directory contains "changesets" — small markdown files describing the
intent of a change (patch/minor/major + summary). Changesets are consumed by
the [Changesets](https://github.com/changesets/changesets) CLI to bump
package versions and publish to npm.

## Adding a changeset

```sh
pnpm changeset
```

Pick the packages that changed, the bump type for each, and write a short
summary. Commit the generated file alongside your change.

## Releasing

On merge to `main`, the **Release** GitHub Action opens (or updates) a
"Version Packages" PR. Merging that PR:

1. Consumes all pending changesets
2. Bumps versions and updates changelogs
3. Publishes the affected packages to npm

The `@mfp-design-system/storybook` app is in `ignore` — it is never published.
