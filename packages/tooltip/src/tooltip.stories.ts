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
