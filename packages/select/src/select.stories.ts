import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './select.js';
import type { SelectSize } from './select.js';

interface Args {
    label: string;
    size: SelectSize;
    placeholder: string;
    value: string;
    hint: string;
    error: string;
    disabled: boolean;
    required: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Select',
    component: 'mfp-select',
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        placeholder: { control: 'text' },
        value: { control: 'text' },
        hint: { control: 'text' },
        error: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Favorite color',
        size: 'md',
        placeholder: 'Pick one…',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        required: false,
    },
    render: (args) => html`
        <mfp-select
            label=${args.label}
            size=${args.size}
            placeholder=${args.placeholder}
            .value=${args.value}
            hint=${args.hint}
            error=${args.error}
            ?disabled=${args.disabled}
            ?required=${args.required}
            style="max-width: 320px;"
        >
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
        </mfp-select>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const WithHint: Story = {
    args: { hint: 'Choose the color used for accents.' },
};

export const WithError: Story = {
    args: { error: 'Please pick a color.' },
};

export const Preselected: Story = {
    args: { value: 'green', placeholder: '' },
};

export const Required: Story = {
    args: { required: true },
};

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
            <mfp-select size="sm" label="Small" placeholder="sm">
                <option>One</option>
                <option>Two</option>
            </mfp-select>
            <mfp-select size="md" label="Medium" placeholder="md">
                <option>One</option>
                <option>Two</option>
            </mfp-select>
            <mfp-select size="lg" label="Large" placeholder="lg">
                <option>One</option>
                <option>Two</option>
            </mfp-select>
        </div>
    `,
};

export const Disabled: Story = {
    args: { disabled: true, value: 'red', placeholder: '' },
};

export const WithGroups: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-select label="Pick a fruit" placeholder="Choose…" style="max-width: 320px;">
            <optgroup label="Citrus">
                <option value="orange">Orange</option>
                <option value="lemon">Lemon</option>
                <option value="lime">Lime</option>
            </optgroup>
            <optgroup label="Berries">
                <option value="strawberry">Strawberry</option>
                <option value="blueberry">Blueberry</option>
            </optgroup>
        </mfp-select>
    `,
};
