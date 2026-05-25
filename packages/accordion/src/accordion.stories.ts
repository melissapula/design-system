import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './accordion.js';

interface Args {
    exclusive: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Accordion',
    component: 'mfp-accordion',
    tags: ['autodocs'],
    argTypes: { exclusive: { control: 'boolean' } },
    args: { exclusive: false },
    render: (a) => html`
        <div style="max-width: 560px;">
            <mfp-accordion ?exclusive=${a.exclusive}>
                <mfp-accordion-item label="What is the design system?">
                    A set of Lit web components plus design tokens, shipped under the
                    <code>@mfp-design-system/*</code> npm scope. Built once, themed per app.
                </mfp-accordion-item>
                <mfp-accordion-item label="How do I install it?">
                    <code
                        >npm install @mfp-design-system/tokens
                        @mfp-design-system/&lt;component&gt;</code
                    >
                </mfp-accordion-item>
                <mfp-accordion-item label="Does it work in Vue / Angular / React?">
                    Yes — every component is a custom element. Vue needs
                    <code>isCustomElement</code>, Angular needs <code>CUSTOM_ELEMENTS_SCHEMA</code>,
                    React 19+ works natively.
                </mfp-accordion-item>
            </mfp-accordion>
        </div>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const Exclusive: Story = {
    args: { exclusive: true },
};

export const WithInitiallyOpen: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="max-width: 560px;">
            <mfp-accordion>
                <mfp-accordion-item label="Closed initially">
                    Content for the first section.
                </mfp-accordion-item>
                <mfp-accordion-item label="Open initially" open>
                    This one is open when the page loads.
                </mfp-accordion-item>
                <mfp-accordion-item label="Also closed"> More content. </mfp-accordion-item>
            </mfp-accordion>
        </div>
    `,
};

export const WithDisabledItem: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="max-width: 560px;">
            <mfp-accordion>
                <mfp-accordion-item label="Available">Click to expand.</mfp-accordion-item>
                <mfp-accordion-item label="Coming soon" disabled>
                    Locked content.
                </mfp-accordion-item>
                <mfp-accordion-item label="Available">Click to expand.</mfp-accordion-item>
            </mfp-accordion>
        </div>
    `,
};

export const CustomHeader: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="max-width: 560px;">
            <mfp-accordion>
                <mfp-accordion-item>
                    <span slot="header" style="display: flex; align-items: center; gap: 8px;">
                        <span aria-hidden="true">🎨</span>
                        <strong>Rich header content</strong>
                        <span
                            style="margin-left: 8px; font-size: 12px; color: #6b7280; font-weight: 400;"
                        >
                            (uses the header slot)
                        </span>
                    </span>
                    The header slot accepts any content — icons, badges, multiple text styles.
                </mfp-accordion-item>
            </mfp-accordion>
        </div>
    `,
};

export const FAQ: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="max-width: 640px;">
            <h3 style="margin-bottom: 16px;">Frequently asked questions</h3>
            <mfp-accordion exclusive>
                <mfp-accordion-item label="When does the next garage sale start?">
                    Sales typically run from 8 AM Saturday morning. Check the individual listing for
                    exact times — they vary by neighborhood.
                </mfp-accordion-item>
                <mfp-accordion-item label="Can I cancel a posted sale?">
                    Yes. Go to <strong>My Sales</strong>, find the listing, and click "Cancel sale."
                    Buyers who saved it get a notification.
                </mfp-accordion-item>
                <mfp-accordion-item label="How do I report a problem with a sale?">
                    Each listing has a "Report" link in its detail page. Tell us what went wrong and
                    we'll investigate within 24 hours.
                </mfp-accordion-item>
            </mfp-accordion>
        </div>
    `,
};
