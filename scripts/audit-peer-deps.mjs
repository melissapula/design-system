#!/usr/bin/env node
/**
 * Audits @mfp-design-system/tokens peer-dependency ranges across all
 * component packages and verifies they're uniform. Run as `pnpm audit-peers`
 * locally; runs in CI on every push and PR.
 *
 * Why: when a new tokens version (e.g. 0.4.0) is published, component
 * packages need their peer range widened to ^0.4.0 too. Forgetting to
 * update one package causes ERESOLVE conflicts for consumers installing
 * a mix of old + new component packages alongside the new tokens. This
 * script catches that drift before it merges.
 *
 * If you need to legitimately diverge (e.g., a single component supports
 * older tokens), add it to ALLOWED_OVERRIDES below with a comment.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PACKAGES_DIR = join(__dirname, '..', 'packages');
const PEER_DEP_KEY = '@mfp-design-system/tokens';

/**
 * Packages allowed to declare a different peer range than the rest.
 * Empty by default. Add entries as `'@mfp-design-system/foo': 'reason'`
 * when there's a deliberate exception.
 */
const ALLOWED_OVERRIDES = {};

async function main() {
    const entries = await readdir(PACKAGES_DIR, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

    const observed = new Map(); // packageName → peerRange
    for (const dir of dirs) {
        const pkgPath = join(PACKAGES_DIR, dir, 'package.json');
        let pkg;
        try {
            pkg = JSON.parse(await readFile(pkgPath, 'utf-8'));
        } catch {
            continue;
        }
        if (pkg.name === PEER_DEP_KEY) continue; // tokens doesn't peer on itself
        const range = pkg.peerDependencies?.[PEER_DEP_KEY];
        if (!range) continue; // package doesn't depend on tokens — skip
        observed.set(pkg.name, range);
    }

    if (observed.size === 0) {
        console.log('No packages declare a peer dep on tokens — nothing to audit.');
        return;
    }

    // Find the most-common range; treat that as the reference.
    const tally = new Map();
    for (const range of observed.values()) {
        tally.set(range, (tally.get(range) ?? 0) + 1);
    }
    const reference = [...tally.entries()].sort((a, b) => b[1] - a[1])[0][0];

    const drift = [];
    for (const [name, range] of observed) {
        if (range === reference) continue;
        if (ALLOWED_OVERRIDES[name]) continue;
        drift.push({ name, range });
    }

    if (drift.length === 0) {
        console.log(
            `✓ All ${observed.size} component packages agree on tokens peer dep: ${reference}`,
        );
        return;
    }

    console.error('');
    console.error(
        `✗ Peer-dep drift detected on ${PEER_DEP_KEY}. ${observed.size - drift.length} of ${observed.size} packages use ${reference}; the rest:`,
    );
    console.error('');
    for (const { name, range } of drift) {
        console.error(`  ${name.padEnd(40)}  ${range}    (expected ${reference})`);
    }
    console.error('');
    console.error('Fix: update the peer range in each drifted package.json to match,');
    console.error(`then add a changeset describing the bump. Or, if the divergence is`);
    console.error('deliberate, add the package to ALLOWED_OVERRIDES in this script.');
    console.error('');
    process.exit(1);
}

main().catch((err) => {
    console.error(err);
    process.exit(2);
});
