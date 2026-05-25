import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tooltip.js';
import type { TooltipPlacement } from './tooltip.js';

interface Args {
    content: string;
    placement: TooltipPlacement;
}

const meta: Meta<Args> = {
    title: 'Components/Tooltip',
    component: 'mfp-tooltip',
    tags: ['autodocs'],
    argTypes: { placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } },
    args: { content: 'Save your changes', placement: 'top' },
    render: (a) => html`
        <div style="padding: 60px; display: inline-block;">
            <mfp-tooltip content=${a.content} placement=${a.placement}>
                <button>Hover or focus me</button>
            </mfp-tooltip>
        </div>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Top: Story = {};
export const Bottom: Story = { args: { placement: 'bottom' } };
export const Left: Story = { args: { placement: 'left' } };
export const Right: Story = { args: { placement: 'right' } };

export const ShortLabel: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="padding: 60px; display: flex; gap: 60px; align-items: flex-end;">
            <mfp-tooltip content="Save">
                <button>Save (default min-width)</button>
            </mfp-tooltip>
            <mfp-tooltip content="Save" min-width="0">
                <button>Save (no min)</button>
            </mfp-tooltip>
        </div>
    `,
};

export const CustomWidth: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="padding: 60px; display: flex; gap: 60px; align-items: flex-end;">
            <mfp-tooltip content="Default 240px max-width. Lorem ipsum dolor sit amet consectetur.">
                <button>Default</button>
            </mfp-tooltip>
            <mfp-tooltip
                max-width="120"
                content="Narrow 120px. Lorem ipsum dolor sit amet consectetur adipiscing elit."
            >
                <button>Narrow (120)</button>
            </mfp-tooltip>
            <mfp-tooltip
                max-width="400"
                content="Wide 400px. Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <button>Wide (400)</button>
            </mfp-tooltip>
            <mfp-tooltip
                max-width="20rem"
                content="String unit (20rem). Lorem ipsum dolor sit amet consectetur adipiscing elit."
            >
                <button>String (20rem)</button>
            </mfp-tooltip>
        </div>
    `,
};

export const Placements: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div
            style="display: grid; place-items: center; gap: 40px; padding: 60px; grid-template-columns: repeat(4, 1fr);"
        >
            ${(['top', 'bottom', 'left', 'right'] as const).map(
                (p) => html`
                    <mfp-tooltip content="placement=${p}" placement=${p}>
                        <button>${p}</button>
                    </mfp-tooltip>
                `,
            )}
        </div>
    `,
};
