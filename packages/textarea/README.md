# @mfp-design-system/textarea

Multi-line text input. Mirrors `<mfp-input>`'s API and accessibility patterns.

```ts
import '@mfp-design-system/textarea';
```

```html
<mfp-textarea label="Notes" placeholder="What do you think?" rows="4"></mfp-textarea>
<mfp-textarea name="bio" required hint="Tell us about yourself"></mfp-textarea>
```

| Attribute                                                | Type                                             | Default      |
| -------------------------------------------------------- | ------------------------------------------------ | ------------ |
| `value`, `name`, `label`, `placeholder`, `hint`, `error` | string                                           | `''`         |
| `rows`                                                   | number                                           | `4`          |
| `size`                                                   | `'sm' \| 'md' \| 'lg'`                           | `'md'`       |
| `resize`                                                 | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` |
| `disabled`, `readonly`, `required`                       | boolean                                          | `false`      |

Form-associated, fires `input` and `change` CustomEvents with `detail.value`.
