import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './input.js';
import type { InputSize, InputType } from './input.js';

interface Args {
    label: string;
    type: InputType;
    size: InputSize;
    placeholder: string;
    value: string;
    hint: string;
    error: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Input',
    component: 'mfp-input',
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
        },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        placeholder: { control: 'text' },
        value: { control: 'text' },
        hint: { control: 'text' },
        error: { control: 'text' },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Email',
        type: 'email',
        size: 'md',
        placeholder: 'you@example.com',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        readonly: false,
        required: false,
    },
    render: (args) => html`
        <mfp-input
            label=${args.label}
            type=${args.type}
            size=${args.size}
            placeholder=${args.placeholder}
            .value=${args.value}
            hint=${args.hint}
            error=${args.error}
            ?disabled=${args.disabled}
            ?readonly=${args.readonly}
            ?required=${args.required}
        ></mfp-input>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {
    args: { label: '', placeholder: 'Type here…' },
};

export const WithLabel: Story = {
    args: { label: 'Email', placeholder: 'you@example.com' },
};

export const WithHint: Story = {
    args: {
        label: 'Username',
        placeholder: 'mfreundschuh',
        hint: '3–20 characters, letters and numbers only.',
        type: 'text',
    },
};

export const WithError: Story = {
    args: {
        label: 'Email',
        placeholder: 'you@example.com',
        value: 'not-an-email',
        error: 'Please enter a valid email address.',
    },
};

export const Required: Story = {
    args: { label: 'Full name', placeholder: 'Melissa Pula', required: true, type: 'text' },
};

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
            <mfp-input size="sm" label="Small" placeholder="sm"></mfp-input>
            <mfp-input size="md" label="Medium" placeholder="md"></mfp-input>
            <mfp-input size="lg" label="Large" placeholder="lg"></mfp-input>
        </div>
    `,
};

export const Types: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
            <mfp-input type="text" label="Text" placeholder="Plain text"></mfp-input>
            <mfp-input type="email" label="Email" placeholder="you@example.com"></mfp-input>
            <mfp-input type="password" label="Password" placeholder="••••••••"></mfp-input>
            <mfp-input type="number" label="Number" placeholder="42"></mfp-input>
            <mfp-input type="search" label="Search" placeholder="Search…"></mfp-input>
            <mfp-input type="tel" label="Phone" placeholder="(555) 555-5555"></mfp-input>
            <mfp-input type="url" label="URL" placeholder="https://example.com"></mfp-input>
        </div>
    `,
};

export const States: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
            <mfp-input label="Normal" placeholder="editable"></mfp-input>
            <mfp-input label="Disabled" .value=${"can't touch this"} disabled></mfp-input>
            <mfp-input
                label="Read-only"
                .value=${'look but don&rsquo;t touch'}
                readonly
            ></mfp-input>
            <mfp-input label="Required" placeholder="must fill" required></mfp-input>
            <mfp-input
                label="Invalid"
                .value=${'oops'}
                error="Something is wrong here."
            ></mfp-input>
        </div>
    `,
};

export const WithPrefix: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-input label="Search" type="search" placeholder="Search…" style="max-width: 320px;">
            <span slot="prefix">🔍</span>
        </mfp-input>
    `,
};

export const WithSuffix: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-input label="Amount" type="number" placeholder="0.00" style="max-width: 320px;">
            <span slot="prefix">$</span>
            <span slot="suffix">USD</span>
        </mfp-input>
    `,
};
