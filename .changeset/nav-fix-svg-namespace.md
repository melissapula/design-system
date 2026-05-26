---
'@mfp-design-system/nav': patch
---

**Actually** fix the invisible hamburger icon. The previous two patches (color cascade, then explicit color override + filled rects) addressed real concerns but missed the root cause:

The conditional inside the `<svg>` was using Lit's `html` tagged template:

```ts
${this.menuOpen ? html`<rect ...>` : html`<rect ...>`}
```

`html` creates elements in the HTML namespace via `document.createElement`. `<rect>` is an SVG element — it only renders inside the SVG namespace (created via `document.createElementNS('http://www.w3.org/2000/svg', 'rect')`). HTML-namespaced "rect" elements are valid DOM nodes but the browser renders them as zero-width unknown elements, which is why the button was an empty clickable square.

Lit ships an `svg` tagged template specifically for this — it creates the elements in the SVG namespace. Swap `html` → `svg` for both branches of the conditional and import `svg` from `'lit'`.

This affects every consumer who used the responsive collapse — the hamburger button now actually contains a visible icon.
