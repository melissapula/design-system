# @mfp-design-system/footer

Footer shell for app chrome. Slot-driven — bring your own content (copyright, links, sitemap). Themable via three variants.

## Install

```sh
npm install @mfp-design-system/footer @mfp-design-system/tokens
```

## Usage

```ts
import '@mfp-design-system/footer';
import '@mfp-design-system/tokens/css';
```

```html
<mfp-footer>
    <div>© 2026 LessonForge</div>
    <nav style="display: flex; gap: 16px;">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/status">Status</a>
    </nav>
</mfp-footer>
```

## API

| Attribute | Type                             | Default     |
| --------- | -------------------------------- | ----------- |
| `variant` | `'default' \| 'brand' \| 'dark'` | `'default'` |

### Variants

- **`default`** — subtle background using `--color-background-subtle`. Muted text. Looks clean under any theme.
- **`brand`** — fills with the active theme's `--color-brand-primary`. Navy under the portfolio theme, terracotta under warm, etc.
- **`dark`** — neutral-900 background with light muted text. Classic GitHub-style.

### Slotted styling

Slotted links and text inherit the footer's surface text color via `::slotted(*) { color: inherit }`. You can override per-link with `style="color: ..."`.

## Layout patterns

The footer is just a styled `<footer>` shell with `display: flex` + `justify-content: space-between` + `flex-wrap: wrap`. For a two-column layout you only need two slotted children. For a multi-column sitemap, slot a single grid:

```html
<mfp-footer>
    <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 32px; width: 100%;"
    >
        <div>
            <strong>Product</strong>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
        </div>
        <div>
            <strong>Company</strong>
            <a href="#">About</a>
        </div>
        …
    </div>
</mfp-footer>
```

## Framework notes

Same as the rest of the suite — Vue/Nuxt need `isCustomElement`, Angular needs `CUSTOM_ELEMENTS_SCHEMA`, React 19+ works natively.
