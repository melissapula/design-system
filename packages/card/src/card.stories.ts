import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './card.js';
import '@mfp-design-system/button';
import type { CardPadding, CardVariant } from './card.js';

interface Args {
    variant: CardVariant;
    padding: CardPadding;
    showHeader: boolean;
    showFooter: boolean;
    body: string;
}

const meta: Meta<Args> = {
    title: 'Components/Card',
    component: 'mfp-card',
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['default', 'flat', 'elevated'] },
        padding: { control: 'select', options: ['compact', 'default', 'roomy', 'none'] },
        showHeader: { control: 'boolean' },
        showFooter: { control: 'boolean' },
        body: { control: 'text' },
    },
    args: {
        variant: 'default',
        padding: 'default',
        showHeader: true,
        showFooter: false,
        body: 'This is the body of the card. It can hold any content.',
    },
    render: (args) => html`
        <mfp-card variant=${args.variant} padding=${args.padding} style="max-width: 360px;">
            ${args.showHeader ? html`<span slot="header">Card title</span>` : ''}
            <p style="margin: 0;">${args.body}</p>
            ${args.showFooter
                ? html`<div
                      slot="footer"
                      style="display: flex; gap: 8px; justify-content: flex-end;"
                  >
                      <mfp-button variant="ghost">Cancel</mfp-button>
                      <mfp-button variant="primary">Save</mfp-button>
                  </div>`
                : ''}
        </mfp-card>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const Flat: Story = {
    args: { variant: 'flat' },
};

export const Elevated: Story = {
    args: { variant: 'elevated' },
};

export const Compact: Story = {
    args: { padding: 'compact', showHeader: false },
};

export const Roomy: Story = {
    args: { padding: 'roomy' },
};

export const BodyOnly: Story = {
    args: { showHeader: false, showFooter: false },
};

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            ${['default', 'flat', 'elevated'].map(
                (v) => html`
                    <mfp-card variant=${v} style="width: 220px;">
                        <span slot="header">${v}</span>
                        <p style="margin: 0;">A card in ${v} style.</p>
                    </mfp-card>
                `,
            )}
        </div>
    `,
};

export const WithFooterActions: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-card variant="elevated" style="max-width: 400px;">
            <span slot="header">Delete account?</span>
            <p style="margin: 0;">
                This action is permanent. All your data will be lost and cannot be recovered.
            </p>
            <div
                slot="footer"
                style="display: flex; gap: 8px; justify-content: flex-end; width: 100%;"
            >
                <mfp-button variant="ghost">Cancel</mfp-button>
                <mfp-button variant="danger">Delete</mfp-button>
            </div>
        </mfp-card>
    `,
};
