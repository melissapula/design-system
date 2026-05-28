# @mfp-design-system/layout

Layout primitives — `<mfp-container>`, `<mfp-row>`, `<mfp-col>` — plus a spacing / flex / grid utility CSS sheet driven by the design system's spacing tokens.

## Install

```sh
npm install @mfp-design-system/layout @mfp-design-system/tokens
```

## Usage

```ts
// register the elements (side-effect import)
import '@mfp-design-system/layout';

// optional: utility classes
import '@mfp-design-system/layout/utilities.css';

// load design tokens (recommended — drives spacing / breakpoint vars)
import '@mfp-design-system/tokens/css';
```

```html
<mfp-container size="lg">
    <mfp-row gap="md" wrap>
        <mfp-col span="6">Left half</mfp-col>
        <mfp-col span="6">Right half</mfp-col>
    </mfp-row>
    <mfp-row gap="lg" align="center">
        <mfp-col span="4">Main</mfp-col>
        <mfp-col span="8">Sidebar</mfp-col>
    </mfp-row>
</mfp-container>
```

## Components

### `<mfp-container>`

Centered max-width wrapper. Adds horizontal padding by default so content doesn't bleed to edges on small viewports.

| Attribute | Type                                              | Default | Description                             |
| --------- | ------------------------------------------------- | ------- | --------------------------------------- |
| `size`    | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'`  | Max-width breakpoint (or `full` = none) |

Max-widths come from `--breakpoint-{sm,md,lg,xl,2xl}` tokens.

### `<mfp-row>`

Bootstrap-style flex row.

| Attribute | Type                                                                | Default     | Description                          |
| --------- | ------------------------------------------------------------------- | ----------- | ------------------------------------ |
| `gap`     | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                    | `'md'`      | Gap between children                 |
| `wrap`    | `boolean`                                                           | `false`     | Allow children to wrap to next line  |
| `align`   | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`           | `'stretch'` | Cross-axis alignment (`align-items`) |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'`   | Main-axis distribution               |

### `<mfp-col>`

Column inside a row. Without `span`, columns share row space equally.

| Attribute | Type                                        | Default   | Description                                       |
| --------- | ------------------------------------------- | --------- | ------------------------------------------------- |
| `span`    | `'1'` through `'12'`                        | _auto_    | Fraction of a 12-column grid                      |
| `align`   | `'start' \| 'center' \| 'end' \| 'stretch'` | _inherit_ | Per-column self-alignment override (`align-self`) |

The 12-col grid is conceptual: a `span="6"` col gets `flex-basis: 50%` and can shrink to absorb the row's gap so siblings don't overflow.

## Utility classes

Import `@mfp-design-system/layout/utilities.css` once at app root. The scale is `xs / sm / md / lg / xl`, mapped to `--space-stack-{xs..xl}` tokens (4 / 8 / 16 / 24 / 40 px under the default scale).

| Group     | Classes                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------ |
| Padding   | `.p-{scale}`, `.px-{scale}`, `.py-{scale}`, `.pt-/pr-/pb-/pl-{scale}`                                  |
| Margin    | `.m-{scale}`, `.mx-{scale}`, `.my-{scale}`, `.mt-/mr-/mb-/ml-{scale}`, `.m-auto`, `.mx-auto`           |
| Gap       | `.gap-{scale}`                                                                                         |
| Display   | `.block`, `.inline-block`, `.inline`, `.hidden`                                                        |
| Flex      | `.flex`, `.inline-flex`, `.flex-row`, `.flex-col`, `.flex-wrap`, `.flex-1`, `.flex-auto`, `.flex-none` |
| Alignment | `.items-{start,center,end,stretch,baseline}`, `.justify-{start,center,end,between,around,evenly}`      |
| Grid      | `.grid`, `.inline-grid`, `.grid-cols-{1,2,3,4,6,12}`                                                   |

No responsive prefixes (no `md:` / `lg:`) — for breakpoint-aware layouts use `<mfp-row wrap>` plus media queries, or reach for a real utility framework.

## Framework notes

- **Vue 3 / Nuxt**: tell the template compiler that `mfp-` tags are custom elements:
    ```ts
    compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('mfp-');
    }
    ```
- **Angular**: add `CUSTOM_ELEMENTS_SCHEMA` to any module/standalone component that uses these.
- **React**: works natively in React 19+.
