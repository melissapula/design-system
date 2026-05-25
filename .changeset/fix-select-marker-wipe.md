---
'@mfp-design-system/select': patch
---

Fix: `<mfp-select>` crashed on re-render after a slot change (e.g., when a consumer's framework updated the `value` via Angular's ControlValueAccessor or Vue's v-model).

Root cause: `_onSlotChange` used `select.textContent = ''` to clear the inner `<select>` before re-appending cloned options. That wiped Lit's invisible ChildPart marker comment nodes for the conditional placeholder template (`${this.placeholder ? html`...` : nothing}`). The next Lit re-render then crashed trying to find its markers.

Fix: tag cloned options with `data-mfp-cloned` on insertion. On subsequent slot changes, remove only the tagged ones — leaving Lit's marker comments and the placeholder option untouched.

No API change; existing consumers automatically pick up the fix.

Regression test added that re-renders after a slot change (the exact path that was crashing in lessonforge).
