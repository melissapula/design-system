# @mfp-design-system/tabs

Three custom elements: `<mfp-tabs>` (container), `<mfp-tab>` (trigger), `<mfp-tab-panel>` (panel).

```html
<mfp-tabs>
    <mfp-tab slot="tab" value="overview">Overview</mfp-tab>
    <mfp-tab slot="tab" value="details">Details</mfp-tab>
    <mfp-tab slot="tab" value="activity">Activity</mfp-tab>

    <mfp-tab-panel value="overview"><p>Overview content</p></mfp-tab-panel>
    <mfp-tab-panel value="details"><p>Details content</p></mfp-tab-panel>
    <mfp-tab-panel value="activity"><p>Activity content</p></mfp-tab-panel>
</mfp-tabs>
```

Each tab's `value` is matched against each panel's `value` to decide which panel is visible. The first tab is selected by default unless `value` is set on `<mfp-tabs>`.

| Element           | Attribute           | Description                          |
| ----------------- | ------------------- | ------------------------------------ |
| `<mfp-tabs>`      | `value`             | Active tab value (set to pre-select) |
| `<mfp-tab>`       | `value`, `disabled` | Trigger; must live in the `tab` slot |
| `<mfp-tab-panel>` | `value`             | Panel; lives in the default slot     |

### Events

- `change` on `<mfp-tabs>` — fires when selection changes; `event.detail.value` is the new value.

### Keyboard

- `ArrowLeft` / `ArrowRight` (or `Up` / `Down`) — move selection (with wrap)
- `Home` / `End` — jump to first / last tab
- `Enter` / `Space` — activate focused tab

### A11y

Roles and attributes wired automatically: `role="tablist"` on the tab strip, `role="tab"` on each trigger with `aria-selected` and `aria-controls`, `role="tabpanel"` on each panel with `aria-labelledby`. Selection follows focus.
