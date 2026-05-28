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

[data-theme='terracotta'] {
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

[data-theme='sand'] {
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

[data-theme='navy'] {
    --color-brand-primary: #1a2744;
    --color-brand-primary-hover: #2c4068;
    --color-brand-primary-fg: #ffffff;
    --color-brand-primary-subtle: #eef1f7;
    --color-brand-primary-emphasis: #0f1729;
}

[data-theme='emerald'] {
    --color-brand-primary: #1d9e75;
    --color-brand-primary-hover: #177e5d;
    --color-brand-primary-fg: #ffffff;
    --color-brand-primary-subtle: #e8f7f1;
    --color-brand-primary-emphasis: #125f46;
}

[data-mode='dark'] {
    --color-text-default: var(--color-neutral-50);
    --color-text-muted: var(--color-neutral-400);
    --color-text-inverse: var(--color-neutral-900);
    --color-text-inverse-muted: var(--color-neutral-600);
    --color-text-brand: var(--color-brand-300);

    --color-background-default: var(--color-neutral-900);
    --color-background-subtle: var(--color-neutral-800);
    --color-background-muted: var(--color-neutral-700);

    --color-border-default: var(--color-neutral-700);
    --color-border-strong: var(--color-neutral-500);

    --color-status-success-bg: #052e1c;
    --color-status-success-fg: #86efac;
    --color-status-success-border: #166534;
    --color-status-success-solid: #22c55e;

    --color-status-warning-bg: #3b2106;
    --color-status-warning-fg: #fcd34d;
    --color-status-warning-border: #92400e;
    --color-status-warning-solid: #fbbf24;

    --color-status-error-bg: #3b0a0a;
    --color-status-error-fg: #fca5a5;
    --color-status-error-border: #991b1b;
    --color-status-error-solid: #ef4444;

    --color-status-info-bg: #0c1e3b;
    --color-status-info-fg: #93c5fd;
    --color-status-info-border: #1e40af;
    --color-status-info-solid: #3b82f6;

    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.5);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.55);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.6);
    --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.65);
    --shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.3);

    color-scheme: dark;
}

/* Paint the storybook canvas surface from the active mode/theme vars.
   Wide selector list because Storybook 8 docs pages stack several
   Emotion-themed wrappers with white backgrounds; we have to flip all
   of them to follow the active mode.
   - html / body — canvas-mode iframe root
   - .sb-show-main — single-story canvas wrapper
   - [class*='sbdocs'] — sbdocs / sbdocs-wrapper / sbdocs-content
   - [class*='sb-preview'], [class*='sb-story'] — preview card + story container
   - [class*='docs-story'], [class*='docs-block'] — autodocs inline wrappers
   - .docblock-source — the "Show code" source-view block
   The doubled selectors with html body raise specificity above Emotion's
   inline style rules; !important covers the rest. */
html[data-mode='dark'],
html[data-mode='dark'] body,
html[data-mode='dark'] .sb-show-main,
html[data-mode='dark'] [class*='sbdocs'],
html[data-mode='dark'] [class*='sb-preview'],
html[data-mode='dark'] [class*='sb-story'],
html[data-mode='dark'] [class*='docs-story'],
html[data-mode='dark'] [class*='docs-block'],
html[data-mode='dark'] .docblock-source,
html[data-mode='dark'] body [class*='sbdocs'],
html[data-mode='dark'] body [class*='docs-story'] {
    background: var(--color-background-default) !important;
    background-color: var(--color-background-default) !important;
    color: var(--color-text-default) !important;
    border-color: var(--color-border-default) !important;
}

/* Every Emotion wrapper inside the preview card carries its own white bg
   in Storybook's light docs theme. Flip them ALL to transparent so the
   dark parent shows through. Excludes buttons/inputs/code blocks via :not()
   to keep the "Show code" button and any rendered <code> chrome intact. */
html[data-mode='dark'] [class*='sbdocs-preview'] *:not(button):not(code):not(pre):not(input):not(textarea):not(select),
html[data-mode='dark'] [class*='docs-story'] *:not(button):not(code):not(pre):not(input):not(textarea):not(select) {
    background-color: transparent !important;
}

html[data-mode='light'],
html[data-mode='light'] body {
    background: var(--color-background-default);
    color: var(--color-text-default);
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
        options: {
            // Sidebar ordering: Introduction first, then Components alphabetically,
            // then Themes, then anything else (alphabetical). Within each section,
            // entries are alphabetized too.
            storySort: {
                order: ['Introduction', 'Components', 'Themes', '*'],
                method: 'alphabetical',
            },
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
                    { value: 'blue', title: 'Blue — default' },
                    { value: 'terracotta', title: 'Terracotta — fourseasonsstudio' },
                    { value: 'orange', title: 'Orange — garage-sales' },
                    { value: 'sand', title: 'Sand — lessonforge' },
                    { value: 'navy', title: 'Navy — portfolio' },
                    { value: 'emerald', title: 'Emerald — frula-homes' },
                ],
                dynamicTitle: true,
            },
        },
        mode: {
            description: 'Light or dark mode',
            defaultValue: 'light',
            toolbar: {
                title: 'Mode',
                icon: 'circlehollow',
                items: [
                    { value: 'light', title: 'Light', icon: 'sun' },
                    { value: 'dark', title: 'Dark', icon: 'moon' },
                ],
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (story, context) => {
            const globals = context.globals as { theme?: string; mode?: string };
            document.documentElement.setAttribute('data-theme', globals.theme ?? 'blue');
            document.documentElement.setAttribute('data-mode', globals.mode ?? 'light');
            return story();
        },
    ],
};

export default preview;
