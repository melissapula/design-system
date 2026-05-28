import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button.js';
import { showToast } from '@mfp-design-system/toast';
import type { ButtonSize, ButtonVariant } from './button.js';

interface Args {
    variant: ButtonVariant;
    size: ButtonSize;
    disabled: boolean;
    loading: boolean;
    label: string;
}

const meta: Meta<Args> = {
    title: 'Components/Button',
    component: 'mfp-button',
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'danger', 'ghost'],
            description: 'Visual style',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Sizing',
        },
        disabled: { control: 'boolean' },
        loading: { control: 'boolean' },
        label: { control: 'text', description: 'Button label (slot content)' },
    },
    args: {
        variant: 'primary',
        size: 'md',
        disabled: false,
        loading: false,
        label: 'Button',
    },
    render: (args) => html`
        <mfp-button
            variant=${args.variant}
            size=${args.size}
            ?disabled=${args.disabled}
            ?loading=${args.loading}
        >
            ${args.label}
        </mfp-button>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Primary: Story = {
    args: { variant: 'primary', label: 'Primary' },
};

export const Secondary: Story = {
    args: { variant: 'secondary', label: 'Secondary' },
};

export const Danger: Story = {
    args: { variant: 'danger', label: 'Delete' },
};

export const Ghost: Story = {
    args: { variant: 'ghost', label: 'More info' },
};

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <mfp-button size="sm">Small</mfp-button>
            <mfp-button size="md">Medium</mfp-button>
            <mfp-button size="lg">Large</mfp-button>
        </div>
    `,
};

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <mfp-button variant="primary">Primary</mfp-button>
            <mfp-button variant="secondary">Secondary</mfp-button>
            <mfp-button variant="danger">Danger</mfp-button>
            <mfp-button variant="ghost">Ghost</mfp-button>
        </div>
    `,
};

export const Disabled: Story = {
    args: { disabled: true, label: 'Disabled' },
};

export const Loading: Story = {
    args: { loading: true, label: 'Saving…' },
};

export const FiresToast: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px;">
            Each button fires a toast on click. Toggle the Theme toolbar to see them rebrand.
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <mfp-button
                variant="primary"
                @click=${() => showToast({ message: 'Profile saved.', variant: 'success' })}
            >
                Save profile
            </mfp-button>
            <mfp-button
                variant="ghost"
                @click=${() => showToast({ message: 'Nothing to undo.', variant: 'info' })}
            >
                Undo
            </mfp-button>
            <mfp-button
                variant="secondary"
                @click=${() =>
                    showToast({ message: 'Connection unstable — retrying.', variant: 'warning' })}
            >
                Reconnect
            </mfp-button>
            <mfp-button
                variant="danger"
                @click=${() =>
                    showToast({
                        message: 'Account deleted. This action cannot be undone.',
                        variant: 'error',
                        duration: 6000,
                    })}
            >
                Delete account
            </mfp-button>
        </div>
    `,
};

export const LoadingStates: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <mfp-button variant="primary" loading>Saving…</mfp-button>
            <mfp-button variant="secondary" loading>Loading</mfp-button>
            <mfp-button variant="danger" loading>Deleting</mfp-button>
            <mfp-button variant="ghost" loading>…</mfp-button>
        </div>
    `,
};
