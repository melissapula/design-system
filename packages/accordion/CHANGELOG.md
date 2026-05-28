# @mfp-design-system/accordion

## 5.0.0

### Patch Changes

- Updated dependencies [6f8aec7]
    - @mfp-design-system/tokens@0.8.0

## 4.0.0

### Patch Changes

- Updated dependencies [267cebf]
    - @mfp-design-system/tokens@0.7.0

## 3.0.0

### Patch Changes

- Updated dependencies [4c41382]
    - @mfp-design-system/tokens@0.6.0

## 2.0.0

### Major Changes

- a4a374c: **Breaking**: renamed the public toggle event from `toggle` → `mfp-toggle`.

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

## 1.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0

## 0.1.0

### Minor Changes

- 239a836: Initial release of `@mfp-design-system/accordion` — disclosure list for FAQs, settings sections, and expandable details.

    Two custom elements:
    - `<mfp-accordion>` wraps a list of items. Optional `exclusive` boolean: when set, opening one item auto-closes any sibling that's already open (FAQ-style behavior).
    - `<mfp-accordion-item>` is a single section. Provide a header via the `label` attribute or the `header` slot (slot wins). Body content goes in the default slot. Has `open` and `disabled` boolean props.

    Built on native `<details>` + `<summary>` under the hood, so keyboard support (Tab to focus, Enter/Space to toggle) and ARIA semantics come for free. The default browser disclosure marker is hidden; replaced with a custom chevron that rotates 180° on open.

    Events: `toggle` on each item fires when open state changes; `event.detail.open` is the new state.

    Shadow parts: `summary`, `chevron`, `content` for per-instance styling overrides.

    A11y: respects `prefers-reduced-motion`. Disabled items don't accept clicks and are visually de-emphasized.

    7 tests cover open/closed state, label rendering, toggle event, exclusive mode (opens close siblings; closes don't ripple), and the non-exclusive default.
