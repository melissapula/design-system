# @mfp-design-system/date-picker

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
