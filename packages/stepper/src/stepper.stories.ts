import type { Meta, StoryObj } from '@storybook/web-components';
import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import './stepper.js';
import '@mfp-design-system/button';
import '@mfp-design-system/input';
import '@mfp-design-system/select';
import type { StepperOrientation } from './stepper.js';

/**
 * Tiny stateful host for the WithFormFlow story so we can show step
 * transitions without pulling in a router or a framework.
 */
class StepperFormFlow extends LitElement {
    @state() private _step = 0;

    private _next = () => {
        if (this._step < 2) this._step += 1;
        else alert('Signup complete!');
    };
    private _back = () => {
        if (this._step > 0) this._step -= 1;
    };
    private _jumpTo = (e: CustomEvent<{ index: number }>) => {
        this._step = e.detail.index;
    };

    private _body() {
        switch (this._step) {
            case 0:
                return html`
                    <mfp-input label="Full name" placeholder="Ada Lovelace" required></mfp-input>
                    <mfp-input
                        label="Email"
                        type="email"
                        placeholder="ada@example.com"
                        required
                    ></mfp-input>
                `;
            case 1:
                return html`
                    <mfp-input label="Username" placeholder="ada42" required></mfp-input>
                    <mfp-input
                        label="Password"
                        type="password"
                        hint="Minimum 12 characters."
                        required
                    ></mfp-input>
                    <mfp-select label="Plan" required>
                        <option value="free">Free</option>
                        <option value="pro">Pro — $9/mo</option>
                        <option value="team">Team — $29/mo</option>
                    </mfp-select>
                `;
            default:
                return html`
                    <p style="margin: 0; color: #6b7280;">
                        Click any circle above to revisit a step. Click <strong>Finish</strong>
                        when ready.
                    </p>
                `;
        }
    }

    override render() {
        const headings = ['Tell us about you', 'Set up your account', 'Confirm and finish'];
        return html`
            <div style="padding: 24px; max-width: 520px;">
                <mfp-stepper current=${this._step} clickable @step-click=${this._jumpTo}>
                    <mfp-step label="Personal"></mfp-step>
                    <mfp-step label="Account"></mfp-step>
                    <mfp-step label="Review"></mfp-step>
                </mfp-stepper>
                <h3 style="margin: 24px 0 12px;">${headings[this._step]}</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">${this._body()}</div>
                <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
                    ${this._step > 0
                        ? html`<mfp-button variant="ghost" @click=${this._back}>Back</mfp-button>`
                        : ''}
                    <mfp-button variant="primary" @click=${this._next}>
                        ${this._step === 2 ? 'Finish' : 'Continue'}
                    </mfp-button>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('mfp-stepper-form-flow-demo')) {
    customElements.define('mfp-stepper-form-flow-demo', StepperFormFlow);
}

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

export const WithFormFlow: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`<mfp-stepper-form-flow-demo></mfp-stepper-form-flow-demo>`,
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
