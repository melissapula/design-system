import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Register all the components we'll showcase
import '@mfp-design-system/button';
import '@mfp-design-system/icon-button';
import '@mfp-design-system/input';
import '@mfp-design-system/checkbox';
import '@mfp-design-system/switch';

const meta: Meta = {
    title: 'Themes/Showcase',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'A side-by-side comparison of the same component composition rendered under each shipped theme. ' +
                    'You can also browse any other story under any theme via the **Theme** toolbar dropdown at the top.',
            },
        },
    },
};

export default meta;

type Story = StoryObj;

const themes = [
    { name: 'blue', label: 'Blue (default)' },
    { name: 'warm', label: 'Warm — fourseasonsstudio' },
    { name: 'orange', label: 'Orange — garage-sales' },
    { name: 'earth', label: 'Earth — lessonforge' },
    { name: 'portfolio', label: 'Navy — portfolio' },
];

const sampleComposition = (label: string) => html`
    <div
        style="
            background: var(--color-background-default, #fff);
            color: var(--color-text-default, #111827);
            padding: 24px;
            border-radius: 12px;
            border: 1px solid var(--color-border-default, #e5e7eb);
            display: flex;
            flex-direction: column;
            gap: 16px;
            min-height: 360px;
        "
    >
        <header
            style="
                font-size: 14px;
                font-weight: 600;
                color: var(--color-text-muted, #6b7280);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            "
        >
            ${label}
        </header>

        <mfp-input label="Email address" type="email" placeholder="you@example.com"></mfp-input>

        <mfp-checkbox label="Subscribe to updates" checked></mfp-checkbox>

        <mfp-switch label="Dark mode" checked></mfp-switch>

        <div style="display: flex; gap: 8px;">
            <mfp-button variant="primary" size="sm">Save</mfp-button>
            <mfp-button variant="secondary" size="sm">Cancel</mfp-button>
            <mfp-icon-button variant="ghost" size="sm" label="More options">
                <span aria-hidden="true">⋯</span>
            </mfp-icon-button>
        </div>
    </div>
`;

/**
 * Five themes side-by-side. Each cell is wrapped in its own `[data-theme]`
 * container so the theme styles cascade only to that subtree.
 */
export const AllThemes: Story = {
    render: () => html`
        <div
            style="
                padding: 32px;
                background: #f4f4f5;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 24px;
            "
        >
            ${themes.map(
                (t) => html`<div data-theme=${t.name}>${sampleComposition(t.label)}</div>`,
            )}
        </div>
    `,
};

/**
 * One theme per row, showing a denser composition with multiple buttons,
 * inputs, and toggle states.
 */
export const ThemeRows: Story = {
    render: () => html`
        <div
            style="padding: 32px; background: #f4f4f5; display: flex; flex-direction: column; gap: 16px;"
        >
            ${themes.map(
                (t) => html`
                    <div data-theme=${t.name}>
                        <div
                            style="
                                background: var(--color-background-default, #fff);
                                color: var(--color-text-default, #111827);
                                padding: 20px 24px;
                                border-radius: 12px;
                                border: 1px solid var(--color-border-default, #e5e7eb);
                                display: flex;
                                align-items: center;
                                gap: 24px;
                                flex-wrap: wrap;
                            "
                        >
                            <span
                                style="
                                    font-weight: 600;
                                    color: var(--color-text-muted, #6b7280);
                                    min-width: 200px;
                                    text-transform: uppercase;
                                    font-size: 12px;
                                    letter-spacing: 0.08em;
                                "
                            >
                                ${t.label}
                            </span>
                            <mfp-button variant="primary" size="sm">Primary</mfp-button>
                            <mfp-button variant="secondary" size="sm">Secondary</mfp-button>
                            <mfp-button variant="danger" size="sm">Danger</mfp-button>
                            <mfp-button variant="ghost" size="sm">Ghost</mfp-button>
                            <mfp-checkbox checked></mfp-checkbox>
                            <mfp-switch checked></mfp-switch>
                        </div>
                    </div>
                `,
            )}
        </div>
    `,
};

/**
 * Focus rings are the easiest thing to forget when adding components,
 * so this story makes them very visible. Click into each input to see
 * how the focus ring color shifts with the active theme.
 */
export const FocusRingsAcrossThemes: Story = {
    render: () => html`
        <div
            style="
                padding: 32px;
                background: #f4f4f5;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 24px;
            "
        >
            ${themes.map(
                (t) => html`
                    <div data-theme=${t.name}>
                        <div
                            style="
                                background: var(--color-background-default, #fff);
                                padding: 20px;
                                border-radius: 12px;
                                border: 1px solid var(--color-border-default, #e5e7eb);
                            "
                        >
                            <p
                                style="
                                    margin: 0 0 12px;
                                    font-weight: 600;
                                    color: var(--color-text-muted, #6b7280);
                                    font-size: 12px;
                                    text-transform: uppercase;
                                    letter-spacing: 0.08em;
                                "
                            >
                                ${t.label}
                            </p>
                            <mfp-input
                                label="Focus me"
                                placeholder="Click to see the focus ring"
                            ></mfp-input>
                        </div>
                    </div>
                `,
            )}
        </div>
    `,
};
