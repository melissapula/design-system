# @mfp-design-system/nav

Three navigation primitives for app shells:

- `<mfp-nav-bar>` — horizontal top bar with brand / nav / actions slots
- `<mfp-side-nav>` — vertical side panel with optional header / footer
- `<mfp-nav-item>` — link or button that adapts to its parent's orientation

Slot-driven shells; **bring your own router**. Items can be `<a href="...">` for plain links or buttons for SPA navigation (listen for `click`).

## Install

```sh
npm install @mfp-design-system/nav @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/nav';
import '@mfp-design-system/tokens/css';
```

### Top nav bar

```html
<mfp-nav-bar>
    <a slot="brand" href="/" style="color: inherit; text-decoration: none;">
        <strong>LessonForge</strong>
    </a>

    <mfp-nav-item href="/lessons" active>Lessons</mfp-nav-item>
    <mfp-nav-item href="/reviews">Reviews</mfp-nav-item>
    <mfp-nav-item href="/library">Library</mfp-nav-item>

    <div slot="actions">
        <mfp-icon-button label="Search">
            <span aria-hidden="true">🔍</span>
        </mfp-icon-button>
        <mfp-avatar name="Melissa Pula" size="sm"></mfp-avatar>
    </div>
</mfp-nav-bar>
```

Set `sticky` on the bar to pin it to the top of the viewport while scrolling.

#### Responsive collapse

Below `breakpoint` (default `768px`), the nav items + actions collapse into a hamburger-toggleable dropdown anchored to the bottom of the bar. Items automatically switch to vertical orientation in the dropdown. Close triggers: tapping the hamburger again, activating any nav item, pressing `Escape`, or clicking outside the bar.

```html
<!-- Collapse below 640px instead of the 768px default -->
<mfp-nav-bar breakpoint="640">…</mfp-nav-bar>

<!-- Disable responsive collapse entirely -->
<mfp-nav-bar breakpoint="0">…</mfp-nav-bar>
```

The breakpoint is measured against the **bar's own width** (via `ResizeObserver`), not the viewport — so a bar inside a narrow column will collapse independently. The hamburger button is exposed as the `menu-toggle` shadow part and the dropdown panel as the `menu` shadow part for custom styling.

### Side nav

```html
<mfp-side-nav>
    <a slot="header" href="/" style="color: inherit; text-decoration: none;">
        <strong>Workspace</strong>
    </a>

    <mfp-nav-item href="/dashboard" active>
        <span slot="icon" aria-hidden="true">🏠</span>
        Dashboard
    </mfp-nav-item>
    <mfp-nav-item href="/team">
        <span slot="icon" aria-hidden="true">👥</span>
        Team
    </mfp-nav-item>

    <div slot="footer">v1.0.0</div>
</mfp-side-nav>
```

Side nav default width is `240px`; override with inline style if needed: `style="width: 280px;"`.

### Full app shell

```html
<div style="display: flex; flex-direction: column; height: 100vh;">
    <mfp-nav-bar>…</mfp-nav-bar>
    <div style="display: flex; flex: 1; min-height: 0;">
        <mfp-side-nav>…</mfp-side-nav>
        <main style="flex: 1; overflow: auto;">…page content…</main>
    </div>
</div>
```

## API

### `<mfp-nav-bar>`

| Attribute    | Type                   | Default     | Description                                                                       |
| ------------ | ---------------------- | ----------- | --------------------------------------------------------------------------------- |
| `sticky`     | boolean                | `false`     | Pins the bar to the top while scrolling                                           |
| `variant`    | `'default' \| 'brand'` | `'default'` | `brand` uses the active theme's brand color as the bar background                 |
| `breakpoint` | number                 | `768`       | Width (px) below which the bar collapses into a hamburger. `0` disables.          |
| `menu-open`  | boolean                | `false`     | Whether the collapsed dropdown is open. Reflected for CSS / programmatic control. |

Slots: `brand`, _(default)_, `actions`.

Shadow parts: `menu-toggle` (hamburger button), `menu` (dropdown panel that contains nav + actions when collapsed).

### `<mfp-side-nav>`

| Attribute | Type                   | Default     |
| --------- | ---------------------- | ----------- |
| `variant` | `'default' \| 'brand'` | `'default'` |

Slots: `header`, _(default)_, `footer`. Header and footer auto-hide when empty.

Width: default `240px`; override with inline style.

### Brand variant

```html
<mfp-nav-bar variant="brand">…</mfp-nav-bar> <mfp-side-nav variant="brand">…</mfp-side-nav>
```

When set, the bar/side panel uses the active theme's `--color-brand-primary` as its background and `--color-brand-primary-fg` as its text. Combined with your app's theme import:

| Theme        | Brand-variant bar color |
| ------------ | ----------------------- |
| `blue`       | `#2563eb`               |
| `terracotta` | `#c4622a`               |
| `orange`     | `#f97316`               |
| `sand`       | `#2563eb`               |
| `navy`       | `#1a2744`               |
| `emerald`    | `#1d9e75`               |

Nested `<mfp-nav-item>`s automatically restyle for the new surface — hover/active states become translucent overlays instead of subtle background tints, so they remain visible on the brand color. This is wired via CSS custom properties that the parent nav sets and the items consume.

### `<mfp-nav-item>`

| Attribute     | Type                         | Default        | Description                                        |
| ------------- | ---------------------------- | -------------- | -------------------------------------------------- |
| `href`        | string                       | `''`           | If set, renders an `<a>`; else `<button>`          |
| `active`      | boolean                      | `false`        | Highlights as current page (`aria-current="page"`) |
| `disabled`    | boolean                      | `false`        | Disables clicks                                    |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Set automatically by the parent NavBar/SideNav     |

Slots: `icon` (optional), _(default)_ (label).

### SPA routing

Items rendered as buttons (no `href`) emit `click` events. Listen for them and dispatch your own router navigation:

```html
<mfp-nav-item @click="goTo('/lessons')">Lessons</mfp-nav-item>
```

Or use `<mfp-nav-item href="/lessons">` with a global click handler that preempts navigation for known routes — Angular Router and Vue Router both have helpers for this.

## A11y

- The bar's inner `<nav>` has `aria-label="Main"`; side nav's has `aria-label="Side navigation"`
- Active items get `aria-current="page"`
- Disabled items get `aria-disabled="true"` (anchors) or the native `disabled` attribute (buttons)
- Focus rings use `--color-brand-primary` and respect `:focus-visible`
- Respects `prefers-reduced-motion`
- The responsive hamburger button uses `aria-expanded` / `aria-controls` / `aria-label` (toggles between "Open menu" / "Close menu"); `Escape` closes the dropdown and returns focus to the toggle

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`, React 19+ works natively.
