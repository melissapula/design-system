import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './badge.js';
import type { BadgeSize, BadgeVariant } from './badge.js';

interface Args {
    variant: BadgeVariant;
    size: BadgeSize;
    outlined: boolean;
    label: string;
}

const meta: Meta<Args> = {
    title: 'Components/Badge',
    component: 'mfp-badge',
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['neutral', 'brand', 'success', 'warning', 'error', 'info'],
        },
        size: { control: 'select', options: ['sm', 'md'] },
    },
    args: { variant: 'neutral', size: 'sm', outlined: false, label: 'Badge' },
    render: (a) => html`
        <mfp-badge variant=${a.variant} size=${a.size} ?outlined=${a.outlined}
            >${a.label}</mfp-badge
        >
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Neutral: Story = {};
export const Brand: Story = { args: { variant: 'brand', label: 'New' } };
export const Success: Story = { args: { variant: 'success', label: 'Active' } };
export const Warning: Story = { args: { variant: 'warning', label: 'Ends Soon' } };
export const Error: Story = { args: { variant: 'error', label: 'Cancelled' } };
export const Info: Story = { args: { variant: 'info', label: 'Beta' } };

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <mfp-badge>Neutral</mfp-badge>
            <mfp-badge variant="brand">Brand</mfp-badge>
            <mfp-badge variant="success">Success</mfp-badge>
            <mfp-badge variant="warning">Warning</mfp-badge>
            <mfp-badge variant="error">Error</mfp-badge>
            <mfp-badge variant="info">Info</mfp-badge>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;">
            <mfp-badge outlined>Neutral</mfp-badge>
            <mfp-badge variant="brand" outlined>Brand</mfp-badge>
            <mfp-badge variant="success" outlined>Success</mfp-badge>
            <mfp-badge variant="warning" outlined>Warning</mfp-badge>
            <mfp-badge variant="error" outlined>Error</mfp-badge>
        </div>
    `,
};

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <mfp-badge size="sm" variant="success">Small</mfp-badge>
            <mfp-badge size="md" variant="success">Medium</mfp-badge>
        </div>
    `,
};
