import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './switch.js';

interface Args {
    label: string;
    checked: boolean;
    disabled: boolean;
    required: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Switch',
    component: 'mfp-switch',
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Dark mode',
        checked: false,
        disabled: false,
        required: false,
    },
    render: (args) => html`
        <mfp-switch
            label=${args.label}
            ?checked=${args.checked}
            ?disabled=${args.disabled}
            ?required=${args.required}
        ></mfp-switch>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const On: Story = {
    args: { checked: true },
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const DisabledOn: Story = {
    args: { disabled: true, checked: true },
};

export const SettingsPanel: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <mfp-switch label="Email notifications" checked></mfp-switch>
            <mfp-switch label="Desktop notifications"></mfp-switch>
            <mfp-switch label="Two-factor authentication" checked></mfp-switch>
            <mfp-switch label="Marketing emails"></mfp-switch>
        </div>
    `,
};
