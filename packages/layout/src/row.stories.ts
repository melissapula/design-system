import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './row.js';
import './col.js';
import type { RowGap, RowAlign, RowJustify } from './row.js';

interface Args {
    gap: RowGap;
    wrap: boolean;
    align: RowAlign;
    justify: RowJustify;
}

const cellStyle = `
    background: var(--color-background-subtle, #f3f4f6);
    border: 1px solid var(--color-border-default, #e5e7eb);
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    color: var(--color-text-default, #111827);
    font-family: monospace;
    font-size: 14px;
`;

const meta: Meta<Args> = {
    title: 'Layout/Row & Col',
    component: 'mfp-row',
    tags: ['autodocs'],
    argTypes: {
        gap: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
        },
        wrap: { control: 'boolean' },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch', 'baseline'],
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
        },
    },
    args: { gap: 'md', wrap: false, align: 'stretch', justify: 'start' },
    render: (args) => html`
        <mfp-row gap=${args.gap} ?wrap=${args.wrap} align=${args.align} justify=${args.justify}>
            <mfp-col span="6"><div style=${cellStyle}>span=6</div></mfp-col>
            <mfp-col span="3"><div style=${cellStyle}>span=3</div></mfp-col>
            <mfp-col span="3"><div style=${cellStyle}>span=3</div></mfp-col>
        </mfp-row>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

/**
 * Every 12-col span value rendered as a single-column row, so it's easy
 * to eyeball relative widths.
 */
export const Spans: Story = {
    parameters: { controls: { hideNoControlsWarning: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px;">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                (span) => html`
                    <mfp-row gap="sm">
                        <mfp-col span=${String(span) as '1'}>
                            <div style=${cellStyle}>span=${span}</div>
                        </mfp-col>
                    </mfp-row>
                `,
            )}
        </div>
    `,
};

/**
 * Common layout splits — useful as copy/paste references.
 */
export const CommonSplits: Story = {
    parameters: { controls: { hideNoControlsWarning: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <mfp-row gap="md">
                <mfp-col span="6"><div style=${cellStyle}>6</div></mfp-col>
                <mfp-col span="6"><div style=${cellStyle}>6</div></mfp-col>
            </mfp-row>
            <mfp-row gap="md">
                <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
            </mfp-row>
            <mfp-row gap="md">
                <mfp-col span="3"><div style=${cellStyle}>3</div></mfp-col>
                <mfp-col span="3"><div style=${cellStyle}>3</div></mfp-col>
                <mfp-col span="3"><div style=${cellStyle}>3</div></mfp-col>
                <mfp-col span="3"><div style=${cellStyle}>3</div></mfp-col>
            </mfp-row>
            <mfp-row gap="md">
                <mfp-col span="8"><div style=${cellStyle}>8 — main</div></mfp-col>
                <mfp-col span="4"><div style=${cellStyle}>4 — aside</div></mfp-col>
            </mfp-row>
            <mfp-row gap="md">
                <mfp-col><div style=${cellStyle}>auto</div></mfp-col>
                <mfp-col><div style=${cellStyle}>auto</div></mfp-col>
                <mfp-col><div style=${cellStyle}>auto</div></mfp-col>
            </mfp-row>
        </div>
    `,
};

/**
 * Demonstrates wrap behavior: four span=4 cols totaling 16 of 12 wrap to a
 * second row when `wrap` is set; without wrap they shrink together.
 */
export const WrapBehavior: Story = {
    parameters: { controls: { hideNoControlsWarning: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
                <h4 style="margin: 0 0 8px; font-size: 14px;">wrap (4 × span=4):</h4>
                <mfp-row gap="md" wrap>
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                </mfp-row>
            </div>
            <div>
                <h4 style="margin: 0 0 8px; font-size: 14px;">no wrap (same content):</h4>
                <mfp-row gap="md">
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                    <mfp-col span="4"><div style=${cellStyle}>4</div></mfp-col>
                </mfp-row>
            </div>
        </div>
    `,
};
