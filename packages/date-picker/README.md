# @mfp-design-system/date-picker

A custom date picker. Trigger button + calendar popover, no third-party library, full keyboard navigation, and form-association so it submits in `<form>` like any other input.

## Install

```sh
npm install @mfp-design-system/date-picker @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/date-picker';
import '@mfp-design-system/tokens/css';
```

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

The selected date submits with the form as a `YYYY-MM-DD` string under the `name` attribute. Listen for `change` events to react to selection:

```ts
document.querySelector('mfp-date-picker').addEventListener('change', (e) => {
    console.log(e.detail.value); // "2024-03-15"
});
```

## API

| Attribute     | Type    | Default           | Description                                                            |
| ------------- | ------- | ----------------- | ---------------------------------------------------------------------- |
| `value`       | string  | `''`              | Selected date as `YYYY-MM-DD`. Empty = no selection.                   |
| `name`        | string  | `''`              | Submitted form name                                                    |
| `label`       | string  | `''`              | Field label                                                            |
| `placeholder` | string  | `'Select a date'` | Shown when `value` is empty                                            |
| `hint`        | string  | `''`              | Helper text below the trigger                                          |
| `error`       | string  | `''`              | Error message (red border, sets `customError` validity)                |
| `min`         | string  | `''`              | Earliest selectable date (`YYYY-MM-DD`). Earlier days render disabled. |
| `max`         | string  | `''`              | Latest selectable date (`YYYY-MM-DD`). Later days render disabled.     |
| `required`    | boolean | `false`           | Sets `valueMissing` validity when empty                                |
| `disabled`    | boolean | `false`           | Disables the trigger                                                   |
| `locale`      | string  | _browser default_ | BCP-47 locale for month / weekday / display formatting                 |

### Methods

- `show()` / `hide()` — open / close the calendar popover
- `checkValidity()` / `reportValidity()` — native HTML validation forwarders

### Events

- `change` — fires on date selection. `event.detail.value` is the new ISO string.

### Shadow parts

- `label`, `trigger`, `popup`, `hint`, `error`

## Keyboard navigation

When the popover is open:

| Key                   | Effect                                        |
| --------------------- | --------------------------------------------- |
| `←` / `→`             | Move focus one day (crosses month boundaries) |
| `↑` / `↓`             | Move focus one week                           |
| `PageUp` / `PageDown` | Previous / next month                         |
| `Shift+PageUp/Down`   | Previous / next year                          |
| `Home` / `End`        | Start / end of the focused week               |
| `Enter` / `Space`     | Select the focused date                       |
| `Escape`              | Close popover (focus returns to the trigger)  |

## A11y

- Trigger has `aria-haspopup="dialog"` and `aria-expanded` that tracks open/close state.
- Popover uses `role="dialog"` with a label of "Choose date".
- Grid uses `role="grid"`, cells use `role="gridcell"` with `aria-selected`.
- Each day cell has an `aria-label` of the full localized date (`"March 15, 2024"`) for screen readers.
- A single day cell is in the tab order at a time (the focused one) — arrow keys move focus within the grid.
- `error` becomes a custom validity message; consuming `<form>` validates correctly.

## Theming

Reads from the standard semantic tokens — no date-picker-specific tokens. Override these to retheme:

- `--color-brand-primary` / `--color-brand-primary-fg` — selected day background / text, today's outline
- `--color-background-default` — popover background
- `--color-border-default` — trigger and popover borders
- `--radius-control` / `--radius-surface` — trigger / popover corners
- `--size-control-md` — trigger height
- `--elevation-overlay` — popover shadow
- `--focus-ring-*` — focus state on month nav buttons

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`, React 19+ works natively.

## Notes & caveats (v0.1)

- Single-date only. Range selection is a future addition.
- No time input — date only.
- Week starts on Sunday regardless of locale. `Intl` doesn't expose week-start info; consistent Sun→Sat layout for now.
- Popover anchors below-left of the trigger with no collision detection. If the trigger sits near the bottom of the viewport, the popover may clip. (A real positioning library — Floating UI — is a future addition.)
