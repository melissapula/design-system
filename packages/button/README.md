# @mfp-design-system/button

A Lit-based `<mfp-button>` web component. Works in any framework that supports custom elements (React, Vue, Angular, Nuxt, plain HTML).

## Install

```sh
npm install @mfp-design-system/button @mfp-design-system/tokens
```

`@mfp-design-system/tokens` is an optional peer dependency — the button has built-in fallback values, but loading the design tokens stylesheet gives it the canonical look.

## Usage

```ts
// register the element (side-effect import)
import '@mfp-design-system/button';

// load design tokens (recommended)
import '@mfp-design-system/tokens/css';
```

```html
<mfp-button>Click me</mfp-button>

<mfp-button variant="primary" size="md">Save</mfp-button>
<mfp-button variant="secondary">Cancel</mfp-button>
<mfp-button variant="danger">Delete</mfp-button>
<mfp-button variant="ghost">More info</mfp-button>

<mfp-button size="sm">Small</mfp-button>
<mfp-button size="md">Medium</mfp-button>
<mfp-button size="lg">Large</mfp-button>

<mfp-button disabled>Disabled</mfp-button>
<mfp-button loading>Saving…</mfp-button>
```

## API

| Attribute  | Type                                              | Default     | Description                             |
| ---------- | ------------------------------------------------- | ----------- | --------------------------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style                            |
| `size`     | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Sizing                                  |
| `disabled` | `boolean`                                         | `false`     | Disables the button                     |
| `loading`  | `boolean`                                         | `false`     | Shows a spinner and disables the button |
| `type`     | `'button' \| 'submit' \| 'reset'`                 | `'button'`  | Native button `type`                    |

The button forwards clicks via the standard `click` event. The default slot accepts arbitrary content (text, icons, etc.).

For custom styling, the inner `<button>` is exposed as a CSS shadow part:

```css
mfp-button::part(button) {
    border-radius: 999px;
}
```

## Framework notes

- **Vue 3 / Nuxt**: tell the template compiler that `mfp-` tags are custom elements:
    ```ts
    // vite.config.ts or nuxt.config.ts
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('mfp-'),
    }
    ```
- **Angular**: add `CUSTOM_ELEMENTS_SCHEMA` to any module/standalone component that uses `<mfp-button>`.
- **React**: works natively in React 19+; for older React, listen for the `click` event via a ref.

## Forms

`<mfp-button>` is form-associated via `ElementInternals`. Inside a `<form>`:

- `type="submit"` triggers `form.requestSubmit()` (full native flow including validation and the `submit` event)
- `type="reset"` triggers `form.reset()`
- The `form` getter returns the associated `<form>` element if any

```html
<form @submit.prevent="onSubmit">
    <mfp-input name="email" type="email" required label="Email"></mfp-input>
    <mfp-button type="submit" variant="primary">Sign up</mfp-button>
</form>
```
