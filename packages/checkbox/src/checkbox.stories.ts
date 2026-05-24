import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './checkbox.js';

interface Args {
    label: string;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    required: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Checkbox',
    component: 'mfp-checkbox',
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Subscribe to newsletter',
        checked: false,
        indeterminate: false,
        disabled: false,
        required: false,
    },
    render: (args) => html`
        <mfp-checkbox
            label=${args.label}
            ?checked=${args.checked}
            ?indeterminate=${args.indeterminate}
            ?disabled=${args.disabled}
            ?required=${args.required}
        ></mfp-checkbox>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const Checked: Story = {
    args: { checked: true },
};

export const Indeterminate: Story = {
    args: { indeterminate: true, label: 'Select all' },
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const DisabledChecked: Story = {
    args: { disabled: true, checked: true },
};

export const SlottedLabel: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-checkbox>
            I agree to the <a href="#">terms of service</a> and
            <a href="#">privacy policy</a>
        </mfp-checkbox>
    `,
};

export const Group: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <fieldset
            style="display: flex; flex-direction: column; gap: 8px; border: none; padding: 0;"
        >
            <legend style="font-weight: 600; margin-bottom: 8px;">Notifications</legend>
            <mfp-checkbox label="Email updates" checked></mfp-checkbox>
            <mfp-checkbox label="SMS alerts"></mfp-checkbox>
            <mfp-checkbox label="Push notifications" checked></mfp-checkbox>
            <mfp-checkbox label="Weekly digest"></mfp-checkbox>
        </fieldset>
    `,
};
