import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './footer.js';
import type { FooterVariant } from './footer.js';

interface Args {
    variant: FooterVariant;
}

const meta: Meta<Args> = {
    title: 'Components/Footer',
    component: 'mfp-footer',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: { variant: { control: 'select', options: ['default', 'brand', 'dark'] } },
    args: { variant: 'default' },
    render: (a) => html`
        <div style="min-height: 220px; padding: 24px; background: #fafafa;">
            Page content above the footer.
        </div>
        <mfp-footer variant=${a.variant}>
            <div>© 2026 LessonForge</div>
            <nav style="display: flex; gap: 16px;">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Status</a>
            </nav>
        </mfp-footer>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};
export const Brand: Story = { args: { variant: 'brand' } };
export const Dark: Story = { args: { variant: 'dark' } };

export const Rich: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="min-height: 240px; padding: 24px; background: #fafafa;">Content</div>
        <mfp-footer>
            <div
                style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 32px; width: 100%;"
            >
                <div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #111827;">Product</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                        <a href="#">Changelog</a>
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #111827;">Company</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                        <a href="#">Careers</a>
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #111827;">Legal</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 8px; color: #111827;">Social</div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <a href="#">GitHub</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </div>
        </mfp-footer>
    `,
};
