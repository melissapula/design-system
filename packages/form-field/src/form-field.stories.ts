import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './form-field.js';

interface Args {
    label: string;
    hint: string;
    error: string;
    required: boolean;
    orientation: 'vertical' | 'horizontal';
}

const meta: Meta<Args> = {
    title: 'Components/FormField',
    component: 'mfp-form-field',
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        hint: { control: 'text' },
        error: { control: 'text' },
        required: { control: 'boolean' },
        orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    },
    args: {
        label: 'Date of birth',
        hint: '',
        error: '',
        required: false,
        orientation: 'vertical',
    },
    render: (args) => html`
        <mfp-form-field
            label=${args.label}
            hint=${args.hint}
            error=${args.error}
            ?required=${args.required}
            orientation=${args.orientation}
            style="max-width: 320px;"
        >
            <input type="date" />
        </mfp-form-field>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const WithHint: Story = {
    args: { hint: 'Used to verify your age.' },
};

export const WithError: Story = {
    args: { error: 'Please select a date.' },
};

export const Required: Story = {
    args: { required: true, label: 'Birthday' },
};

export const WrappingCheckbox: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-form-field
            label="Subscribe to our newsletter"
            hint="Twice a week, plus occasional product announcements."
            orientation="horizontal"
        >
            <input type="checkbox" />
        </mfp-form-field>
    `,
};

export const WrappingRadioGroup: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-form-field label="Notification preference" required>
            <div role="radiogroup" style="display: flex; flex-direction: column; gap: 6px;">
                <label><input type="radio" name="notify" value="email" /> Email</label>
                <label><input type="radio" name="notify" value="sms" /> SMS</label>
                <label><input type="radio" name="notify" value="push" /> Push notification</label>
            </div>
        </mfp-form-field>
    `,
};

export const WrappingTextarea: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-form-field
            label="Comments"
            hint="Optional — anything else you'd like us to know."
            style="max-width: 480px;"
        >
            <textarea rows="4" style="width: 100%; padding: 8px; font: inherit;"></textarea>
        </mfp-form-field>
    `,
};

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        label: 'I agree to the terms and conditions',
        required: true,
    },
    render: (args) => html`
        <mfp-form-field
            label=${args.label}
            hint=${args.hint}
            error=${args.error}
            ?required=${args.required}
            orientation=${args.orientation}
        >
            <input type="checkbox" />
        </mfp-form-field>
    `,
};
