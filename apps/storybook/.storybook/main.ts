import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/web-components-vite';

/**
 * Component packages whose @mfp-design-system/<name> import should resolve
 * to their src/index.ts in Storybook, not the built dist. This avoids
 * double-registration of custom elements when one story imports the
 * source (`./button.js`) and another imports the package
 * (`@mfp-design-system/button`) — both should resolve to the same module
 * so `customElements.define('mfp-button', ...)` only runs once.
 */
const componentPackages = [
    'accordion',
    'alert',
    'avatar',
    'badge',
    'button',
    'card',
    'checkbox',
    'divider',
    'form-field',
    'icon-button',
    'input',
    'modal',
    'radio',
    'select',
    'spinner',
    'stepper',
    'switch',
    'tabs',
    'textarea',
    'toast',
    'tooltip',
] as const;

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|ts|mjs)',
        '../../../packages/*/src/**/*.stories.@(js|ts|mjs)',
        '../../../packages/*/src/**/*.mdx',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
    framework: {
        name: '@storybook/web-components-vite',
        options: {},
    },
    docs: {},
    async viteFinal(viteConfig) {
        const aliases: Record<string, string> = {};
        for (const name of componentPackages) {
            aliases[`@mfp-design-system/${name}`] = fileURLToPath(
                new URL(`../../../packages/${name}/src/index.ts`, import.meta.url),
            );
        }
        viteConfig.resolve = viteConfig.resolve ?? {};
        viteConfig.resolve.alias = {
            ...(viteConfig.resolve.alias as Record<string, string> | undefined),
            ...aliases,
        };
        return viteConfig;
    },
};

export default config;
