import type { StorybookConfig } from '@storybook/web-components-vite';

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
};

export default config;
