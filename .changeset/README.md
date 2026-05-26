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

## Linked versioning (when packages should bump together)

Each package versions independently today — a fix to `button` doesn't bump anything else. That's the right default for à la carte component packages.

When you want a group to share a version (e.g., a coordinated breaking-change wave, or keeping a parent + sub-element package in lockstep), add the group to the `linked` array in `config.json`:

```json
{
    "linked": [["@mfp-design-system/button", "@mfp-design-system/icon-button"]]
}
```

Now any bump to either package will bump both to the same new version. Multiple link groups are allowed; a package can only be in one group.

If you ever want **everything** to share a version (the monolithic-package-style behavior), drop every component into a single group. Trade-off: you lose the "a bug fix to one package doesn't churn everything" benefit. Don't reach for this lightly.

## Peer-dep audit

A separate guard: `pnpm audit-peers` (run automatically in CI) verifies all component packages declare the same `@mfp-design-system/tokens` peer range. If a Version PR bumps tokens but forgets to update some packages' peer ranges, the audit fails and the merge is blocked.
