/**
 * @mfp-design-system/all — meta-package that re-exports every component.
 *
 * Importing this file (for its side effects) registers every <mfp-*>
 * custom element with the browser. Importing named exports works too.
 *
 *   import '@mfp-design-system/all';                  // registers everything
 *   import { MfpButton } from '@mfp-design-system/all';
 *
 * Tradeoff: convenience over bundle size. Tree-shaking won't strip
 * unused components because each re-exported file has the side effect
 * of registering its custom element. Apps that only use a few components
 * should still cherry-pick individual packages instead.
 */

export * from '@mfp-design-system/accordion';
export * from '@mfp-design-system/alert';
export * from '@mfp-design-system/avatar';
export * from '@mfp-design-system/badge';
export * from '@mfp-design-system/button';
export * from '@mfp-design-system/card';
export * from '@mfp-design-system/checkbox';
export * from '@mfp-design-system/divider';
export * from '@mfp-design-system/footer';
export * from '@mfp-design-system/form-field';
export * from '@mfp-design-system/icon-button';
export * from '@mfp-design-system/input';
export * from '@mfp-design-system/modal';
export * from '@mfp-design-system/nav';
export * from '@mfp-design-system/radio';
export * from '@mfp-design-system/select';
export * from '@mfp-design-system/spinner';
export * from '@mfp-design-system/stepper';
export * from '@mfp-design-system/switch';
export * from '@mfp-design-system/tabs';
export * from '@mfp-design-system/textarea';
export * from '@mfp-design-system/toast';
export * from '@mfp-design-system/tooltip';
