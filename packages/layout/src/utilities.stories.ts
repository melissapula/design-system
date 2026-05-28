import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './utilities.css';

const meta: Meta = {
    title: 'Layout/Utility Classes',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Spacing (p-/m-/gap-), flex, and grid utility classes driven by spacing tokens. Import once at app root: `import "@mfp-design-system/layout/utilities.css";`. The scale is xs/sm/md/lg/xl mapped to --space-stack-* (4/8/16/24/40 px).',
            },
        },
    },
};

export default meta;

type Story = StoryObj;

const swatch = (cls: string, label: string) => html`
    <div
        style="display: flex; gap: 16px; align-items: center; font-family: monospace; font-size: 13px;"
    >
        <code
            style="
                min-width: 90px;
                padding: 2px 6px;
                background: var(--color-background-subtle, #f3f4f6);
                border-radius: 4px;
            "
            >${cls}</code
        >
        <div
            style="
                background: var(--color-brand-primary, #2563eb);
                color: var(--color-brand-primary-fg, #fff);
                border-radius: 4px;
            "
        >
            <div class=${cls} style="background: rgba(255, 255, 255, 0.4);">
                <span style="background: var(--color-brand-primary, #2563eb); padding: 0 4px;">
                    ${label}
                </span>
            </div>
        </div>
    </div>
`;

export const PaddingScale: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${['xs', 'sm', 'md', 'lg', 'xl'].map((s) => swatch(`p-${s}`, `p-${s}`))}
        </div>
    `,
};

export const MarginScale: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <p style="font-size: 13px; color: var(--color-text-muted, #6b7280); margin: 0 0 8px;">
                Stacked blocks with mt-{scale}. Outer container has no margin so you can compare.
            </p>
            ${['xs', 'sm', 'md', 'lg', 'xl'].map(
                (s) => html`
                    <div
                        class="mt-${s}"
                        style="
                            background: var(--color-background-subtle, #f3f4f6);
                            border: 1px dashed var(--color-border-default, #e5e7eb);
                            padding: 8px;
                            font-family: monospace;
                            font-size: 13px;
                        "
                    >
                        mt-${s}
                    </div>
                `,
            )}
        </div>
    `,
};

export const FlexUtilities: Story = {
    render: () => html`
        <div
            style="display: flex; flex-direction: column; gap: 24px; font-family: monospace; font-size: 13px;"
        >
            <div>
                <p>.flex .justify-between .items-center .gap-md</p>
                <div
                    class="flex justify-between items-center gap-md"
                    style="
                        background: var(--color-background-subtle, #f3f4f6);
                        padding: 16px;
                        border-radius: 8px;
                    "
                >
                    <span>Left</span>
                    <span>Middle</span>
                    <span>Right</span>
                </div>
            </div>
            <div>
                <p>.flex .flex-col .gap-sm</p>
                <div
                    class="flex flex-col gap-sm"
                    style="
                        background: var(--color-background-subtle, #f3f4f6);
                        padding: 16px;
                        border-radius: 8px;
                    "
                >
                    <span>First</span>
                    <span>Second</span>
                    <span>Third</span>
                </div>
            </div>
            <div>
                <p>.flex .items-center .gap-lg</p>
                <div
                    class="flex items-center gap-lg"
                    style="
                        background: var(--color-background-subtle, #f3f4f6);
                        padding: 16px;
                        border-radius: 8px;
                    "
                >
                    <span style="font-size: 32px;">Big</span>
                    <span>Small</span>
                </div>
            </div>
        </div>
    `,
};

export const GridUtilities: Story = {
    render: () => html`
        <div
            style="display: flex; flex-direction: column; gap: 24px; font-family: monospace; font-size: 13px;"
        >
            ${[2, 3, 4, 6].map(
                (n) => html`
                    <div>
                        <p>.grid .grid-cols-${n} .gap-md</p>
                        <div class="grid grid-cols-${n} gap-md">
                            ${Array.from(
                                { length: n },
                                (_, i) => html`
                                    <div
                                        style="
                                            background: var(--color-background-subtle, #f3f4f6);
                                            border: 1px solid var(--color-border-default, #e5e7eb);
                                            padding: 16px;
                                            text-align: center;
                                            border-radius: 8px;
                                        "
                                    >
                                        ${i + 1}
                                    </div>
                                `,
                            )}
                        </div>
                    </div>
                `,
            )}
        </div>
    `,
};
