import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './stepper.js';
import type { StepperOrientation } from './stepper.js';

interface Args {
    current: number;
    orientation: StepperOrientation;
    clickable: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Stepper',
    component: 'mfp-stepper',
    tags: ['autodocs'],
    argTypes: {
        current: { control: { type: 'number', min: 0, max: 3 } },
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        clickable: { control: 'boolean' },
    },
    args: { current: 1, orientation: 'horizontal', clickable: false },
    render: (a) => html`
        <div style="padding: 24px; max-width: ${a.orientation === 'vertical' ? '320px' : '720px'};">
            <mfp-stepper
                current=${a.current}
                orientation=${a.orientation}
                ?clickable=${a.clickable}
                @step-click=${(e: CustomEvent) => console.log('step-click', e.detail)}
            >
                <mfp-step label="Account"></mfp-step>
                <mfp-step label="Profile"></mfp-step>
                <mfp-step label="Preferences"></mfp-step>
                <mfp-step label="Done"></mfp-step>
            </mfp-stepper>
        </div>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const Vertical: Story = { args: { orientation: 'vertical' } };

export const WithDescriptions: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="padding: 24px; max-width: 320px;">
            <mfp-stepper current="2" orientation="vertical">
                <mfp-step
                    label="Create account"
                    description="Pick a username and password to get started."
                ></mfp-step>
                <mfp-step
                    label="Add profile"
                    description="A photo and short bio help others recognize you."
                ></mfp-step>
                <mfp-step
                    label="Set preferences"
                    description="Choose what kinds of updates you want."
                ></mfp-step>
                <mfp-step label="Done" description="You're ready to go."></mfp-step>
            </mfp-stepper>
        </div>
    `,
};

export const WithError: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="padding: 24px; max-width: 720px;">
            <mfp-stepper current="2">
                <mfp-step label="Choose plan"></mfp-step>
                <mfp-step label="Payment" error description="Card was declined"></mfp-step>
                <mfp-step label="Confirm"></mfp-step>
                <mfp-step label="Done"></mfp-step>
            </mfp-stepper>
        </div>
    `,
};

export const Clickable: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="padding: 24px; max-width: 720px;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 12px;">
                Click any step — see the console for the step-click event.
            </p>
            <mfp-stepper
                current="1"
                clickable
                @step-click=${(e: CustomEvent) => console.log('Clicked step', e.detail.index)}
            >
                <mfp-step label="One"></mfp-step>
                <mfp-step label="Two"></mfp-step>
                <mfp-step label="Three"></mfp-step>
                <mfp-step label="Four"></mfp-step>
            </mfp-stepper>
        </div>
    `,
};

export const LongerFlow: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="padding: 24px; max-width: 800px;">
            <mfp-stepper current="3">
                <mfp-step label="Start"></mfp-step>
                <mfp-step label="Personal"></mfp-step>
                <mfp-step label="Address"></mfp-step>
                <mfp-step label="Payment"></mfp-step>
                <mfp-step label="Review"></mfp-step>
                <mfp-step label="Done"></mfp-step>
            </mfp-stepper>
        </div>
    `,
};

export const Progression: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
            ${[0, 1, 2, 3].map(
                (i) => html`
                    <mfp-stepper current=${i} style="max-width: 720px;">
                        <mfp-step label="Account"></mfp-step>
                        <mfp-step label="Profile"></mfp-step>
                        <mfp-step label="Preferences"></mfp-step>
                        <mfp-step label="Done"></mfp-step>
                    </mfp-stepper>
                `,
            )}
        </div>
    `,
};
