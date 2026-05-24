import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './divider.js';
import type { DividerOrientation } from './divider.js';

interface Args {
    orientation: DividerOrientation;
    label: string;
}

const meta: Meta<Args> = {
    title: 'Components/Divider',
    component: 'mfp-divider',
    tags: ['autodocs'],
    argTypes: { orientation: { control: 'select', options: ['horizontal', 'vertical'] } },
    args: { orientation: 'horizontal', label: '' },
    render: (a) => html`<mfp-divider orientation=${a.orientation} label=${a.label}></mfp-divider>`,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'or' } };

export const InContent: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="max-width: 480px;">
            <p>Above the divider</p>
            <mfp-divider></mfp-divider>
            <p>Below the divider</p>
            <mfp-divider label="or continue with"></mfp-divider>
            <p>After labeled divider</p>
        </div>
    `,
};

export const Vertical: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; align-items: center; gap: 16px; height: 60px;">
            <span>Item A</span>
            <mfp-divider orientation="vertical"></mfp-divider>
            <span>Item B</span>
            <mfp-divider orientation="vertical"></mfp-divider>
            <span>Item C</span>
        </div>
    `,
};
