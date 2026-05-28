# @mfp-design-system/tooltip

## 5.0.0

### Patch Changes

- Updated dependencies [3187544]
    - @mfp-design-system/tokens@0.9.0

## 4.0.3

### Patch Changes

- 0be1bed: Three new composition stories that show components working together — Storybook becomes a richer dogfood preview of how real apps use the design system.
    - **`Card / WithDetailModal`** — A summary card whose "View details" button opens a `<mfp-modal>` with the full breakdown. Demonstrates the "card-summary → modal-detail" pattern that's everywhere in dashboards. Adds `@mfp-design-system/modal` as a devDep on the card package.
    - **`Button / FiresToast`** — Four buttons (primary / ghost / secondary / danger) each fire a matching toast variant on click via the `showToast({ ... })` API. The danger toast has an extended 6s duration to demonstrate the option. Adds `@mfp-design-system/toast` as a devDep on the button package.
    - **`Tooltip / OnIconButton`** — A 5-icon toolbar (Bold / Italic / Underline / Strikethrough / Delete) where each `<mfp-icon-button>` is wrapped in an `<mfp-tooltip>` showing the action name + keyboard shortcut. Demonstrates the canonical a11y pattern: icon-only buttons get a tooltip with the same text as the `label` attribute, so sighted users see a hover hint and screen readers announce the `aria-label`. Adds `@mfp-design-system/icon-button` as a devDep on the tooltip package.

    No production / API changes.

## 4.0.2

### Patch Changes

- 056cc43: Stories now dogfood `<mfp-button>` instead of raw `<button>` elements. When a story needs a trigger button (open a modal, fire a toast) or a button being wrapped/featured (tooltip anchor, card footer action), it uses the design system's own button component.

    This makes Storybook a more faithful preview of real usage and showcases compositional patterns between components. No production code or API surface changed — strictly story files plus the necessary devDep declaration of `@mfp-design-system/button`.

    Specific changes:
    - **modal stories** — Open-modal trigger, Cancel/Delete confirm actions, "I agree" footer button → `<mfp-button>` with semantic variants (`primary`, `danger`, `ghost`).
    - **toast stories** — Variant trigger buttons → `<mfp-button>` with `secondary` (or `danger` for error toast). Sticky-toast trigger → `<mfp-button variant="ghost">`.
    - **tooltip stories** — All 7 anchor buttons across Default/ShortLabel/CustomWidth/Placements → `<mfp-button variant="secondary">`.
    - **card stories** — Footer Cancel/Save/Delete actions → `<mfp-button>` with `ghost` + `primary`/`danger`.

    Skipped: form-field stories deliberately wrap native controls (it's the documented design purpose); swapping to mfp-\* there would defeat the demo. Other components (badge, alert, accordion, etc.) have no trigger-button patterns in their stories.

## 4.0.1

### Patch Changes

- 36c75b7: **Batch 2: Overlays — migrated to semantic tokens.** (modal, tooltip, toast)

    Internal CSS only. No API or default-theme visual changes.

    Key swaps unique to overlays (in addition to the universal focus-ring / opacity / spacing swaps from batch 1):
    - `border-radius: var(--size-radius-lg)` (modal) → `var(--radius-surface)` (proper "surface" semantic for a sheet-like overlay)
    - `border-radius: var(--size-radius-md)` (toast) → `var(--radius-control)` (matches buttons it sits alongside)
    - `box-shadow: var(--shadow-xl)` (modal) → `var(--elevation-popover)`
    - `box-shadow: var(--shadow-md)` (tooltip) → `var(--elevation-overlay)`
    - `box-shadow: var(--shadow-lg)` (toast) → `var(--elevation-float)`
    - `font-size: var(--font-size-lg)` (modal header) → `var(--text-heading-xs)` (h6-equivalent)
    - `font-size: var(--font-size-xs)` (tooltip bubble) → `var(--text-caption)`
    - `font-size: var(--font-size-sm)` (toast body) → `var(--text-body-sm)`
    - `opacity: 0.7` (toast dismiss) → `var(--opacity-muted)` (standardized — matches alert dismiss in batch 3)

    Tooltip placement offsets (`calc(100% + 8px)`) now use `var(--space-inline-sm)` so they scale with theme spacing.

## 4.0.0

### Patch Changes

- Updated dependencies [6f8aec7]
    - @mfp-design-system/tokens@0.8.0

## 3.0.0

### Patch Changes

- Updated dependencies [267cebf]
    - @mfp-design-system/tokens@0.7.0

## 2.0.0

### Patch Changes

- Updated dependencies [4c41382]
    - @mfp-design-system/tokens@0.6.0

## 1.0.0

### Patch Changes

- Updated dependencies [67b5fd0]
    - @mfp-design-system/tokens@0.5.0

## 0.2.0

### Minor Changes

- a6ea65e: `<mfp-tooltip>` now has explicit `max-width` and `min-width` attributes for sizing control.

    **New defaults**: `min-width: 80px`, `max-width: 240px`. Short labels like "Save" no longer render as tiny pills; long content still wraps at 240px. Pass `min-width="0"` to opt out.

    Both attributes accept a number (treated as px) or any CSS length string (`rem`, `em`, `%`, `ch`, etc.):

    ```html
    <mfp-tooltip content="Save" min-width="0">
        <!-- shrink to fit -->
        <mfp-tooltip content="..." max-width="400">
            <!-- wider cap -->
            <mfp-tooltip content="..." min-width="200" max-width="200">
                <!-- fixed width -->
                <mfp-tooltip content="..." max-width="20rem">
                    <!-- string units --></mfp-tooltip
                ></mfp-tooltip
            ></mfp-tooltip
        ></mfp-tooltip
    >
    ```

    Also fixes a bug where `max-width="400"` (digit-only string from HTML attribute) was being applied as the literal string `"400"` without the `px` unit, so the browser ignored it. Both attributes now correctly detect digit-only strings and append `px`.

## 0.1.1

### Patch Changes

- 3de0a25: Widen `@mfp-design-system/tokens` peer-dependency range to `^0.4.0` to match the rest of the package family. Ten packages had drifted on `^0.2.0`, preventing installation alongside other DS components in apps consuming the current `tokens@0.4.x`.

    No behavior change — pure metadata fix.

## 0.1.0

### Minor Changes

- 21fcdaf: Add 10 new components, rounding out the set needed across all five consumer apps. Each follows the established patterns: Lit element, design tokens with fallbacks, themeable, Storybook stories, test suite, README, optional tokens peer dep.
    - **`@mfp-design-system/textarea`** — multi-line text input mirroring `<mfp-input>`'s API; form-associated; label / hint / error / sizes / resize control.
    - **`@mfp-design-system/radio`** — single radio button; form-associated; group multiple by sharing a `name` (mutual exclusion handled internally).
    - **`@mfp-design-system/badge`** — pill/chip with `neutral` / `brand` / `success` / `warning` / `error` / `info` variants; outlined option.
    - **`@mfp-design-system/alert`** — banner with status icon + optional heading + optional dismiss button. Dispatches `close` event on dismiss.
    - **`@mfp-design-system/spinner`** — standalone loading indicator. Inherits `color` from container for trivial recoloring. `aria-label` for screen readers.
    - **`@mfp-design-system/divider`** — horizontal/vertical separator; optional centered label.
    - **`@mfp-design-system/avatar`** — image with initials fallback; sizes; circle/square shape; optional status dot (online/busy/away/offline).
    - **`@mfp-design-system/tooltip`** — anchor-based hover/focus tooltip with four placements. Auto-wires `aria-describedby` on first slotted child. Escape dismisses. CSS-only positioning (no flip).
    - **`@mfp-design-system/toast`** — programmatic `showToast({ message, variant, duration })` API. Auto-creates a fixed-position container in `document.body` on first call. Auto-dismiss with `duration: 0` for sticky.
    - **`@mfp-design-system/tabs`** — three elements: `<mfp-tabs>` orchestrator, `<mfp-tab>` triggers (slot=tab), `<mfp-tab-panel>` panels. Full keyboard navigation (arrows wrap, Home/End jump). ARIA tablist with selection-follows-focus.

    34 new tests pass alongside the existing 25 — total of 59 tests across all components.

    Storybook gets 10 new entries under Components/\* and they're all browsable under any of the 5 themes via the toolbar.
