import type { Preview } from '@storybook/web-components';
import '@mfp-design-system/tokens/css';

/**
 * Theme stylesheets injected once at startup, scoped to `[data-theme="X"]`
 * on <html>. The toolbar (globalTypes.theme below) flips the dataset
 * attribute; the corresponding rules win via specificity over the default
 * :root tokens.
 *
 * These are duplicates of packages/tokens/src/themes/*.css with the :root
 * selector replaced by the data-theme attribute selector. Keep them in sync
 * with the source files if values change.
 */
const themeStyles = `
[data-theme='blue'] {
    --color-brand-primary: #2563eb;
    --color-brand-primary-hover: #1d4ed8;
    --color-brand-primary-fg: #ffffff;
    --color-brand-primary-subtle: #eff6ff;
    --color-brand-primary-emphasis: #1e40af;
}

[data-theme='warm'] {
    --color-brand-primary: #c4622a;
    --color-brand-primary-hover: #a3501f;
    --color-brand-primary-fg: #fcfaf7;
    --color-brand-primary-subtle: #f5e6d8;
    --color-brand-primary-emphasis: #8b6914;

    --color-text-default: #2c2416;
    --color-text-muted: #6b5d4f;
    --color-text-inverse: #fcfaf7;
    --color-text-brand: #8b6914;

    --color-background-default: #fcfaf7;
    --color-background-subtle: #f5f0e8;
    --color-background-muted: #e4d8c4;

    --color-border-default: #e4d8c4;
    --color-border-strong: #a89470;
}

[data-theme='orange'] {
    --color-brand-primary: #f97316;
    --color-brand-primary-hover: #ea580c;
    --color-brand-primary-fg: #ffffff;
    --color-brand-primary-subtle: #fff7ed;
    --color-brand-primary-emphasis: #c2410c;
}

[data-theme='earth'] {
    --color-brand-primary: #2563eb;
    --color-brand-primary-hover: #1d4ed8;
    --color-brand-primary-fg: #ffffff;
    --color-brand-primary-subtle: #eff6ff;
    --color-brand-primary-emphasis: #1e40af;

    --color-text-default: #1f2937;
    --color-text-muted: #6b6963;
    --color-text-inverse: #fafaf7;

    --color-background-default: #fafaf7;
    --color-background-subtle: #f4f3ef;
    --color-background-muted: #e5e3df;

    --color-border-default: #e5e3df;
    --color-border-strong: #cbd5e1;
}

[data-theme='portfolio'] {
    --color-brand-primary: #1a2744;
    --color-brand-primary-hover: #2c4068;
    --color-brand-primary-fg: #ffffff;
    --color-brand-primary-subtle: #eef1f7;
    --color-brand-primary-emphasis: #0f1729;
}
`;

const styleEl = document.createElement('style');
styleEl.setAttribute('data-mfp-themes', '');
styleEl.textContent = themeStyles;
document.head.appendChild(styleEl);

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#111111' },
            ],
        },
    },
    globalTypes: {
        theme: {
            description: 'Active design system theme',
            defaultValue: 'blue',
            toolbar: {
                title: 'Theme',
                icon: 'paintbrush',
                items: [
                    { value: 'blue', title: 'Blue (default)' },
                    { value: 'warm', title: 'Warm — chrissys' },
                    { value: 'orange', title: 'Orange — garage-sales' },
                    { value: 'earth', title: 'Earth — lessonforge' },
                    { value: 'portfolio', title: 'Portfolio — navy' },
                ],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (story, context) => {
            const theme = (context.globals as { theme?: string }).theme ?? 'blue';
            document.documentElement.setAttribute('data-theme', theme);
            return story();
        },
    ],
};

export default preview;
