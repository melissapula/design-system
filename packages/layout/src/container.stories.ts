import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './container.js';
import type { ContainerSize } from './container.js';

interface Args {
    size: ContainerSize;
}

const meta: Meta<Args> = {
    title: 'Layout/Container',
    component: 'mfp-container',
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
            description: 'Max-width breakpoint',
        },
    },
    args: { size: 'lg' },
    render: (args) => html`
        <div style="background: #e5e7eb; padding: 8px 0;">
            <mfp-container size=${args.size}>
                <div
                    style="
                        background: var(--color-background-default, #fff);
                        border: 1px solid var(--color-border-default, #e5e7eb);
                        border-radius: 8px;
                        padding: 24px;
                        text-align: center;
                        color: var(--color-text-muted, #6b7280);
                    "
                >
                    Container content (size = ${args.size})
                </div>
            </mfp-container>
        </div>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const AllSizes: Story = {
    parameters: { controls: { hideNoControlsWarning: true } },
    render: () => html`
        <div
            style="background: #f4f4f5; padding: 16px 0; display: flex; flex-direction: column; gap: 16px;"
        >
            ${(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map(
                (size) => html`
                    <mfp-container size=${size}>
                        <div
                            style="
                                background: var(--color-background-default, #fff);
                                border: 1px solid var(--color-border-default, #e5e7eb);
                                border-radius: 8px;
                                padding: 16px;
                                font-family: monospace;
                                font-size: 14px;
                                color: var(--color-text-default, #111827);
                            "
                        >
                            size="${size}"
                        </div>
                    </mfp-container>
                `,
            )}
        </div>
    `,
};
