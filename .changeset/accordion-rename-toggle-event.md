---
'@mfp-design-system/accordion': major
---

**Breaking**: renamed the public toggle event from `toggle` → `mfp-toggle`.

The previous name collided with the native `ToggleEvent` that browsers fire on `<details>` elements. TypeScript's `lib.dom.d.ts` maps `addEventListener('toggle', ...)` to that native type, which forced consumers to cast through `unknown` to reach `.detail.open` on our CustomEvent. The new name avoids the collision entirely and follows the `mfp-` prefix convention used by the rest of the design system.

**Migration**:

```diff
- el.addEventListener('toggle', (e) => {
-     console.log((e as unknown as CustomEvent).detail.open);
- });
+ el.addEventListener('mfp-toggle', (e) => {
+     console.log((e as CustomEvent).detail.open);
+ });
```

The internal `mfp-accordion-toggle` event (used by the parent `<mfp-accordion>` for exclusive mode) is unchanged.
