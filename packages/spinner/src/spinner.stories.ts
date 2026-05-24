import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './spinner.js';
import type { SpinnerSize } from './spinner.js';

interface Args {
    size: SpinnerSize;
    label: string;
}

const meta: Meta<Args> = {
    title: 'Components/Spinner',
    component: 'mfp-spinner',
    tags: ['autodocs'],
    argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
    args: { size: 'md', label: 'Loading' },
    render: (a) => html`<mfp-spinner size=${a.size} label=${a.label}></mfp-spinner>`,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 24px; align-items: center;">
            <mfp-spinner size="sm"></mfp-spinner>
            <mfp-spinner size="md"></mfp-spinner>
            <mfp-spinner size="lg"></mfp-spinner>
            <mfp-spinner size="xl"></mfp-spinner>
        </div>
    `,
};

export const InText: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <p style="display: flex; align-items: center; gap: 8px;">
            <mfp-spinner size="sm"></mfp-spinner>
            <span>Loading recipes…</span>
        </p>
    `,
};

export const CustomColor: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 24px; align-items: center;">
            <mfp-spinner style="color: #16a34a;"></mfp-spinner>
            <mfp-spinner style="color: #dc2626;"></mfp-spinner>
            <mfp-spinner style="color: #6b7280;"></mfp-spinner>
        </div>
    `,
};
