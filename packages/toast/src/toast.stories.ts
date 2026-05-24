import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { showToast } from './toast.js';
import type { ToastVariant } from './toast.js';

const meta: Meta = {
    title: 'Components/Toast',
    component: 'mfp-toast',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Programmatic: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
            <p style="margin: 0;">
                Toasts are shown via the <code>showToast()</code> API. Click a button below.
            </p>
            ${(['info', 'success', 'warning', 'error'] as const).map(
                (variant: ToastVariant) => html`
                    <button
                        type="button"
                        @click=${() =>
                            showToast({
                                message: `${variant} toast — auto-dismisses in 4s.`,
                                variant,
                            })}
                        style="padding: 8px 16px; cursor: pointer;"
                    >
                        Show ${variant} toast
                    </button>
                `,
            )}
            <button
                type="button"
                @click=${() =>
                    showToast({
                        message: 'Sticky — only goes away on dismiss',
                        variant: 'info',
                        duration: 0,
                    })}
                style="padding: 8px 16px; cursor: pointer;"
            >
                Show sticky toast (duration: 0)
            </button>
        </div>
    `,
};

export const InlineMarkup: Story = {
    render: () => html`
        <div
            style="display: flex; flex-direction: column; gap: 12px; max-width: 320px; padding: 24px; background: #f4f4f5; border-radius: 8px;"
        >
            <p style="margin: 0; font-weight: 600;">Inline (for layout preview)</p>
            <mfp-toast variant="info" message="Hello there"></mfp-toast>
            <mfp-toast variant="success" message="Saved successfully"></mfp-toast>
            <mfp-toast variant="warning" message="Heads up"></mfp-toast>
            <mfp-toast variant="error" message="Something went wrong"></mfp-toast>
        </div>
    `,
};
