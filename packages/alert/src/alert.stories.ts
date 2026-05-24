import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './alert.js';
import type { AlertVariant } from './alert.js';

interface Args {
    variant: AlertVariant;
    heading: string;
    message: string;
    dismissible: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Alert',
    component: 'mfp-alert',
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    },
    args: {
        variant: 'info',
        heading: '',
        message: 'A short alert message goes here.',
        dismissible: false,
    },
    render: (a) => html`
        <mfp-alert
            variant=${a.variant}
            heading=${a.heading}
            ?dismissible=${a.dismissible}
            style="max-width: 480px;"
            >${a.message}</mfp-alert
        >
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Info: Story = {};
export const Success: Story = { args: { variant: 'success', message: 'Your changes were saved.' } };
export const Warning: Story = {
    args: { variant: 'warning', message: 'This action cannot be undone.' },
};
export const Error: Story = {
    args: { variant: 'error', message: 'Could not connect to the server.' },
};

export const WithHeading: Story = {
    args: {
        variant: 'warning',
        heading: 'Connection unstable',
        message: 'Your work is being saved locally and will sync when you reconnect.',
        dismissible: true,
    },
};

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 480px;">
            <mfp-alert variant="info">Info: this is informational.</mfp-alert>
            <mfp-alert variant="success">Success: that went through.</mfp-alert>
            <mfp-alert variant="warning">Warning: double-check before saving.</mfp-alert>
            <mfp-alert variant="error">Error: something went wrong.</mfp-alert>
        </div>
    `,
};
