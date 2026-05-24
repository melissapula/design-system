import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './icon-button.js';
import type { IconButtonSize, IconButtonVariant } from './icon-button.js';

interface Args {
    variant: IconButtonVariant;
    size: IconButtonSize;
    disabled: boolean;
    label: string;
    icon: string;
}

const meta: Meta<Args> = {
    title: 'Components/IconButton',
    component: 'mfp-icon-button',
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' },
        label: { control: 'text', description: 'Required: aria-label for the button' },
        icon: { control: 'text', description: 'Emoji / glyph used as the icon slot content' },
    },
    args: {
        variant: 'primary',
        size: 'md',
        disabled: false,
        label: 'Search',
        icon: '🔍',
    },
    render: (args) => html`
        <mfp-icon-button
            variant=${args.variant}
            size=${args.size}
            ?disabled=${args.disabled}
            label=${args.label}
        >
            <span aria-hidden="true">${args.icon}</span>
        </mfp-icon-button>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Primary: Story = {};

export const Secondary: Story = {
    args: { variant: 'secondary', icon: '✏️', label: 'Edit' },
};

export const Danger: Story = {
    args: { variant: 'danger', icon: '🗑', label: 'Delete' },
};

export const Ghost: Story = {
    args: { variant: 'ghost', icon: '⋯', label: 'More options' },
};

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <mfp-icon-button size="sm" label="Search">
                <span aria-hidden="true">🔍</span>
            </mfp-icon-button>
            <mfp-icon-button size="md" label="Search">
                <span aria-hidden="true">🔍</span>
            </mfp-icon-button>
            <mfp-icon-button size="lg" label="Search">
                <span aria-hidden="true">🔍</span>
            </mfp-icon-button>
        </div>
    `,
};

export const AllVariants: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <mfp-icon-button variant="primary" label="Save">
                <span aria-hidden="true">💾</span>
            </mfp-icon-button>
            <mfp-icon-button variant="secondary" label="Edit">
                <span aria-hidden="true">✏️</span>
            </mfp-icon-button>
            <mfp-icon-button variant="danger" label="Delete">
                <span aria-hidden="true">🗑</span>
            </mfp-icon-button>
            <mfp-icon-button variant="ghost" label="More">
                <span aria-hidden="true">⋯</span>
            </mfp-icon-button>
        </div>
    `,
};

export const Toolbar: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div
            role="toolbar"
            aria-label="Text formatting"
            style="display: flex; gap: 4px; padding: 8px; border: 1px solid #e5e7eb; border-radius: 8px; width: fit-content;"
        >
            <mfp-icon-button variant="ghost" label="Bold">
                <span aria-hidden="true"><b>B</b></span>
            </mfp-icon-button>
            <mfp-icon-button variant="ghost" label="Italic">
                <span aria-hidden="true"><i>I</i></span>
            </mfp-icon-button>
            <mfp-icon-button variant="ghost" label="Underline">
                <span aria-hidden="true"><u>U</u></span>
            </mfp-icon-button>
        </div>
    `,
};

export const Disabled: Story = {
    args: { disabled: true },
};
