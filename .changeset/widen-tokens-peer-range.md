---
'@mfp-design-system/alert': patch
'@mfp-design-system/avatar': patch
'@mfp-design-system/badge': patch
'@mfp-design-system/divider': patch
'@mfp-design-system/radio': patch
'@mfp-design-system/spinner': patch
'@mfp-design-system/tabs': patch
'@mfp-design-system/textarea': patch
'@mfp-design-system/toast': patch
'@mfp-design-system/tooltip': patch
---

Widen `@mfp-design-system/tokens` peer-dependency range to `^0.4.0` to match the rest of the package family. Ten packages had drifted on `^0.2.0`, preventing installation alongside other DS components in apps consuming the current `tokens@0.4.x`.

No behavior change — pure metadata fix.
