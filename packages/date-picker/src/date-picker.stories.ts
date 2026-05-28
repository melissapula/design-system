import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './date-picker.js';
import '@mfp-design-system/button';

interface Args {
    label: string;
    placeholder: string;
    value: string;
    hint: string;
    error: string;
    min: string;
    max: string;
    required: boolean;
    disabled: boolean;
    locale: string;
}

const meta: Meta<Args> = {
    title: 'Components/DatePicker',
    component: 'mfp-date-picker',
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        value: { control: 'text', description: 'ISO YYYY-MM-DD' },
        hint: { control: 'text' },
        error: { control: 'text' },
        min: { control: 'text', description: 'Earliest selectable date (ISO)' },
        max: { control: 'text', description: 'Latest selectable date (ISO)' },
        required: { control: 'boolean' },
        disabled: { control: 'boolean' },
        locale: { control: 'text', description: 'BCP-47 locale (defaults to browser)' },
    },
    args: {
        label: 'Date of birth',
        placeholder: 'Select a date',
        value: '',
        hint: '',
        error: '',
        min: '',
        max: '',
        required: false,
        disabled: false,
        locale: '',
    },
    render: (a) => html`
        <div style="max-width: 320px;">
            <mfp-date-picker
                label=${a.label}
                placeholder=${a.placeholder}
                value=${a.value}
                hint=${a.hint}
                error=${a.error}
                min=${a.min}
                max=${a.max}
                ?required=${a.required}
                ?disabled=${a.disabled}
                locale=${a.locale}
            ></mfp-date-picker>
        </div>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { value: '2024-03-15' },
};

export const WithHint: Story = {
    args: { hint: 'Used to verify your age.' },
};

export const WithError: Story = {
    args: { error: 'Please select your date of birth.', required: true },
};

export const Required: Story = {
    args: { required: true, label: 'Birthday' },
};

export const Disabled: Story = {
    args: { disabled: true, value: '2024-03-15' },
};

export const WithMinMax: Story = {
    args: {
        label: 'Booking date',
        value: '2024-03-15',
        min: '2024-03-10',
        max: '2024-03-20',
        hint: 'Open the picker — only the 10th through 20th are selectable.',
    },
};

export const FrenchLocale: Story = {
    args: {
        label: 'Date de naissance',
        value: '1990-06-21',
        locale: 'fr-FR',
        hint: 'Affichage et noms de mois en français.',
    },
};

export const InAForm: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <form
            id="dp-form-demo"
            style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;"
            onsubmit="event.preventDefault();
                     const data = new FormData(event.target);
                     alert('Submitted:\\n' + JSON.stringify(Object.fromEntries(data), null, 2));"
        >
            <mfp-date-picker
                name="check_in"
                label="Check-in"
                placeholder="Pick check-in date"
                required
            ></mfp-date-picker>
            <mfp-date-picker
                name="check_out"
                label="Check-out"
                placeholder="Pick check-out date"
                required
            ></mfp-date-picker>
            <div style="display: flex; justify-content: flex-end;">
                <mfp-button variant="primary" type="submit">Submit</mfp-button>
            </div>
        </form>
    `,
};
