# @mfp-design-system/stepper

## 0.1.0

### Minor Changes

- 5a6672e: Initial release of `@mfp-design-system/stepper` — a stepper for multi-step flows (onboarding, checkout, multi-page forms, lesson progress).

    Two custom elements:
    - `<mfp-stepper>` orchestrates the list; props are `current` (active step index), `orientation` (`'horizontal' | 'vertical'`), and `clickable` (boolean).
    - `<mfp-step>` represents each step; props are `label`, `description`, and `error` (boolean override).

    Status is derived automatically from each step's index vs `current`:
    - index < current → **completed** (checkmark, brand color)
    - index === current → **current** (pulsing dot using `--motion-duration-slowest`, brand color outline)
    - index > current → **pending** (step number, muted)
    - any step with `[error]` → **error** (X mark, error color) — overrides the derived status

    Connecting lines pick up the brand color for completed steps. The last step's connector is auto-hidden via a `data-last` attribute.

    Events: `step-click` fires (only when `clickable`) with `event.detail.index`. Consumer decides whether to honor it — useful for "free navigation" flows (settings wizards), undesirable for strict onboarding.

    A11y: current step gets `aria-current="step"`; each step gets a descriptive `aria-label` including status ("Profile — in progress"); clickable steps are exposed as `role="button"` and accept Enter / Space; the pulse animation respects `prefers-reduced-motion`.

    8 tests cover status derivation, status updates on `current` change, error override, last-step marker, click events (with and without `clickable`), orientation propagation, and `aria-current`.

    Lessonforge's hand-rolled progress component (checkmark circles, pulsing dot, numbered steps) was the inspiration — and the use case ports directly: replace it with `<mfp-stepper>`.
