---
'@mfp-design-system/icon-button': minor
---

Two changes to `<mfp-icon-button>` based on real-app feedback:

**1. Default variant flipped from `primary` to `ghost`.** Icon buttons should default to a transparent button with a faint hover background — that matches Material, Shoelace, Radix, and Ant. Filled variants (`primary`, `secondary`, `danger`) are still available as opt-in for FAB-style or prominent toolbar buttons. **Breaking visual change** for consumers that rendered `<mfp-icon-button>` without an explicit `variant=`: they'll switch from filled brand background to transparent. If you want the old behavior, add `variant="primary"`.

**2. Icon centering.** Slotted icons (SVGs, emojis, spans) now get `display: inline-flex` + `align-items: center` + `justify-content: center` + `line-height: 1`, so they sit dead-center in the button. Previously, emoji glyphs sat on the text baseline (visually low) and SVGs without explicit vertical-align inherited `text-bottom` and ended up bottom-aligned.
