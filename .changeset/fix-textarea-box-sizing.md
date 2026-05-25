---
'@mfp-design-system/textarea': patch
---

Fix: the native resize handle on `<mfp-textarea>` appeared OUTSIDE the bordered `.control` wrapper, sitting in the page background to the bottom-right of the visible field.

Root cause: shadow DOM doesn't inherit the consuming app's global `box-sizing: border-box`. The inner `<textarea>` had `width: 100%` + padding without `box-sizing` set, so the element box overflowed its `.control` container horizontally. The native resize handle (rendered at the bottom-right of the element) ended up outside the bordered area.

Fix: explicitly set `box-sizing: border-box` on the inner `<textarea>`. Regression test added that asserts `textarea.offsetWidth <= control.offsetWidth`.
