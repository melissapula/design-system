# @mfp-design-system/stepper

A stepper for multi-step flows — onboarding, checkout, multi-page forms, lesson progress. Two custom elements: `<mfp-stepper>` (orchestrator) and `<mfp-step>` (each step).

## Install

```sh
npm install @mfp-design-system/stepper @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/stepper';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-stepper current="1">
    <mfp-step label="Account"></mfp-step>
    <mfp-step label="Profile"></mfp-step>
    <mfp-step label="Preferences"></mfp-step>
    <mfp-step label="Done"></mfp-step>
</mfp-stepper>
```

Each step's status is derived automatically:

- `index < current` → **completed** (checkmark, brand color)
- `index === current` → **current** (pulsing dot, brand color outline)
- `index > current` → **pending** (step number, muted)
- any step with `[error]` → **error** (X mark, error color) — overrides the derived status

## API

### `<mfp-stepper>`

| Attribute     | Type                         | Default        |
| ------------- | ---------------------------- | -------------- |
| `current`     | number                       | `0`            |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `clickable`   | boolean                      | `false`        |

Events:

- `step-click` (only when `clickable`) — `event.detail.index` is the clicked step's index.

### `<mfp-step>`

| Attribute     | Type    | Default | Description                                  |
| ------------- | ------- | ------- | -------------------------------------------- |
| `label`       | string  | `''`    | Visible label                                |
| `description` | string  | `''`    | Optional sub-label (shown beneath the label) |
| `error`       | boolean | `false` | Overrides status to error                    |

Most state is set by the parent stepper during its sync pass. You don't typically read or write `index`, `status`, `orientation`, `clickable`, or `total` directly — though they're available as attributes if you want to style around them with `::part(...)` or your own CSS.

## Variants

### Vertical

```html
<mfp-stepper orientation="vertical" current="2">
    <mfp-step label="Account" description="Pick a username and password"></mfp-step>
    <mfp-step label="Profile" description="A photo and short bio"></mfp-step>
    <mfp-step label="Preferences" description="What updates do you want?"></mfp-step>
    <mfp-step label="Done" description="You're ready to go"></mfp-step>
</mfp-stepper>
```

### With an error step

```html
<mfp-stepper current="2">
    <mfp-step label="Choose plan"></mfp-step>
    <mfp-step label="Payment" error description="Card was declined"></mfp-step>
    <mfp-step label="Confirm"></mfp-step>
</mfp-stepper>
```

### Clickable (for "free navigation" flows like settings wizards)

```html
<mfp-stepper current="1" clickable @step-click="onJump">
    <mfp-step label="Profile"></mfp-step>
    <mfp-step label="Security"></mfp-step>
    <mfp-step label="Notifications"></mfp-step>
</mfp-stepper>
```

```ts
function onJump(e) {
    console.log('Jumped to step', e.detail.index);
}
```

## Shadow parts

For custom styling: `::part(circle)`, `::part(label)`, `::part(description)`, `::part(connector)`.

## A11y

- The current step has `aria-current="step"`
- Each step has an `aria-label` that includes its status (e.g., "Profile — in progress", "Payment — error")
- Clickable steps are exposed as `role="button"` and accept Enter / Space
- Pulse animation honors `prefers-reduced-motion`

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`, React 19+ works natively.
