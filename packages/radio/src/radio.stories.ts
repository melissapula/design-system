import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './radio.js';

interface Args {
    label: string;
    checked: boolean;
    disabled: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Radio',
    component: 'mfp-radio',
    tags: ['autodocs'],
    args: { label: 'Email', checked: false, disabled: false },
    render: (args) => html`
        <mfp-radio
            label=${args.label}
            ?checked=${args.checked}
            ?disabled=${args.disabled}
        ></mfp-radio>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const Group: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <fieldset style="border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
            <legend style="font-weight: 600; padding: 0 8px;">Notification preference</legend>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
                <mfp-radio name="notify" value="email" label="Email" checked></mfp-radio>
                <mfp-radio name="notify" value="sms" label="SMS"></mfp-radio>
                <mfp-radio name="notify" value="push" label="Push notification"></mfp-radio>
                <mfp-radio name="notify" value="none" label="None"></mfp-radio>
            </div>
        </fieldset>
    `,
};
