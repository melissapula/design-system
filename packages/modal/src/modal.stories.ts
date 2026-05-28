import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './modal.js';
import '@mfp-design-system/button';
import type { ModalSize } from './modal.js';

interface Args {
    size: ModalSize;
    dismissible: boolean;
    noCloseButton: boolean;
}

const meta: Meta<Args> = {
    title: 'Components/Modal',
    component: 'mfp-modal',
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        dismissible: { control: 'boolean' },
        noCloseButton: { control: 'boolean' },
    },
    args: {
        size: 'md',
        dismissible: true,
        noCloseButton: false,
    },
    render: (args) => html`
        <mfp-button variant="primary" onclick="this.nextElementSibling.show()">
            Open modal
        </mfp-button>
        <mfp-modal
            size=${args.size}
            ?dismissible=${args.dismissible}
            ?no-close-button=${args.noCloseButton}
        >
            <span slot="header">Modal title</span>
            <p style="margin: 0;">
                This is the body of the modal. Press Escape, click the backdrop, or click the close
                button to dismiss.
            </p>
        </mfp-modal>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const Small: Story = {
    args: { size: 'sm' },
};

export const Large: Story = {
    args: { size: 'lg' },
};

export const NonDismissible: Story = {
    args: { dismissible: false, noCloseButton: false },
};

export const ConfirmDelete: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-button variant="danger" onclick="this.nextElementSibling.show()">
            Delete account
        </mfp-button>
        <mfp-modal>
            <span slot="header">Delete account?</span>
            <p style="margin: 0;">
                This action is permanent. All your data will be lost and cannot be recovered.
            </p>
            <div slot="footer">
                <mfp-button variant="ghost" onclick="this.closest('mfp-modal').close()">
                    Cancel
                </mfp-button>
                <mfp-button variant="danger" onclick="this.closest('mfp-modal').close()">
                    Delete
                </mfp-button>
            </div>
        </mfp-modal>
    `,
};

export const LongContent: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-button variant="primary" onclick="this.nextElementSibling.show()">
            Open terms
        </mfp-button>
        <mfp-modal size="lg">
            <span slot="header">Terms of Service</span>
            ${Array.from(
                { length: 12 },
                (_, i) =>
                    html`<p>
                        <strong>Section ${i + 1}.</strong> Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                    </p>`,
            )}
            <div slot="footer">
                <mfp-button variant="primary" onclick="this.closest('mfp-modal').close()">
                    I agree
                </mfp-button>
            </div>
        </mfp-modal>
    `,
};
