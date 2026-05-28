# @mfp-design-system/layout

## 1.0.0

### Minor Changes

- 3187544: New **`@mfp-design-system/layout`** package — Bootstrap-style layout primitives plus a spacing / flex / grid utility CSS sheet driven by the design system's spacing tokens.

    ```html
    <mfp-container size="lg">
        <mfp-row gap="md" wrap>
            <mfp-col span="6">Left half</mfp-col>
            <mfp-col span="6">Right half</mfp-col>
        </mfp-row>
    </mfp-container>
    ```

    **Components:**
    - `<mfp-container>` — centered max-width wrapper. `size` = `sm | md | lg | xl | 2xl | full`, defaults to `lg`. Max-widths come from `--breakpoint-*` tokens.
    - `<mfp-row>` — flex row with `gap` (xs–xl), `wrap`, `align`, `justify` attributes. Driven by `--space-inline-*` tokens.
    - `<mfp-col>` — column with `span` (1–12 of a conceptual 12-col grid) and per-column `align` override. Without `span`, columns share row space equally.

    **Utility sheet** (`@mfp-design-system/layout/utilities.css`):
    - Spacing: `.p-*`, `.m-*`, `.mt-/mr-/mb-/ml-*`, `.mx-/my-/px-/py-*`, `.gap-*` on an xs/sm/md/lg/xl scale, mapped to `--space-stack-*` tokens.
    - Display: `.block`, `.inline-block`, `.inline`, `.hidden`.
    - Flex: `.flex`, `.inline-flex`, `.flex-row`, `.flex-col`, `.flex-wrap`, `.flex-1`/`-auto`/`-none`, `.items-*`, `.justify-*`.
    - Grid: `.grid`, `.inline-grid`, `.grid-cols-{1,2,3,4,6,12}`.

    No responsive prefixes — narrow scope intended to sit alongside the component primitives without competing with a full utility framework.

### Patch Changes

- Updated dependencies [3187544]
    - @mfp-design-system/tokens@0.9.0
