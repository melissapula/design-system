import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './textarea.js';
import type { TextareaResize, TextareaSize } from './textarea.js';

interface Args {
    label: string;
    size: TextareaSize;
    resize: TextareaResize;
    placeholder: string;
    value: string;
    hint: string;
    error: string;
    rows: number;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Textarea',
    component: 'mfp-textarea',
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
        rows: { control: { type: 'number', min: 1, max: 20 } },
    },
    args: {
        label: 'Notes',
        size: 'md',
        resize: 'vertical',
        placeholder: 'Type your message...',
        value: '',
        hint: '',
        error: '',
        rows: 4,
        disabled: false,
        readonly: false,
        required: false,
    },
    render: (args) => html`
        <mfp-textarea
            label=${args.label}
            size=${args.size}
            resize=${args.resize}
            placeholder=${args.placeholder}
            .value=${args.value}
            hint=${args.hint}
            error=${args.error}
            rows=${args.rows}
            ?disabled=${args.disabled}
            ?readonly=${args.readonly}
            ?required=${args.required}
            style="max-width: 480px;"
        ></mfp-textarea>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We'll only use this to follow up if needed." } };
export const WithError: Story = {
    args: { value: 'too short', error: 'Please write at least 20 characters.' },
};
export const Required: Story = { args: { required: true } };
export const NoResize: Story = { args: { resize: 'none' } };
export const Disabled: Story = { args: { disabled: true, value: 'Locked content here.' } };
