# @mfp-design-system/date-picker

## 1.0.0

### Patch Changes

- 3187544: Components that previously rendered their surface background using the **primitive** `--color-neutral-0` token (hard-coded to `#ffffff`) now use the **semantic** `--color-background-default` instead. This means they correctly follow the active theme/mode — in particular, they no longer stay stark white when the new `dark` theme is applied.

    Affected surfaces:
    - Button / icon-button — `secondary` variant background
    - Input / textarea / select / date-picker — control field background
    - Checkbox / radio — unchecked box background
    - Accordion — item background
    - Stepper — pending and current step circle backgrounds

    Visible effect: in light mode, these components look identical (since `--color-background-default` resolves to `#ffffff` in the default light tokens). In dark mode, they now correctly flip to the dark surface color instead of staying white. Apps that explicitly relied on the `var(--color-neutral-0)` value internally are unaffected — the primitive token is still `#ffffff`; only the components' consumption changed.

    Color-on-colored-background uses of `--color-neutral-0` (e.g. the white text on the danger button, on the toast solid background, on the completed/error stepper circles) are intentionally unchanged — those should stay white in both modes.

    Also: `<mfp-select>`, `<mfp-input>`, and `<mfp-textarea>` now declare `color-scheme: light dark` on their internal native form element. This makes browser-rendered chrome (the native `<select>` option-list popup, autofill background, spell-check underlines, scrollbars on textarea) follow the page's color-scheme. Previously the select's dropdown stayed OS-default light even when the page was in dark mode, because color-scheme inherited from `<html>` doesn't always reach native form controls inside a shadow DOM.

- Updated dependencies [3187544]
    - @mfp-design-system/tokens@0.9.0

## 0.2.0

### Minor Changes

- ef85efa: New **`@mfp-design-system/date-picker`** package — a custom date picker built from scratch (no third-party libraries). Trigger button + calendar popover, locale-aware month / weekday / display formatting via `Intl`, full keyboard navigation, and form-association so it submits as a `YYYY-MM-DD` string under `<form>` just like the other input components.

    ```html
    <mfp-date-picker
        name="dob"
        label="Date of birth"
        value="1990-01-15"
        min="1900-01-01"
        max="2025-12-31"
        required
    ></mfp-date-picker>
    ```

    API: `value` / `name` / `label` / `placeholder` / `hint` / `error` / `min` / `max` / `required` / `disabled` / `locale` attributes. `show()` / `hide()` / `checkValidity()` / `reportValidity()` methods. `change` event with `event.detail.value`. Shadow parts: `label`, `trigger`, `popup`, `hint`, `error`.

    Keyboard nav (when open): arrows for day, ↑/↓ for week, PageUp/Down for month, Shift+PageUp/Down for year, Home/End for week boundaries, Enter/Space to select, Escape to close.

    `@mfp-design-system/all` now re-exports it alongside the other 23 components.

    **Known caveats (v0.1):**
    - Single-date only (no range yet)
    - No time input (date only)
    - Week starts on Sunday regardless of locale (`Intl` doesn't expose week-start)
    - Popover anchors below-left of the trigger with no collision detection
    - Test suite is a smoke-only stub right now — the full draft (in git history) hangs the headless test runner; needs follow-up to debug
