import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

@customElement('mfp-spinner')
export class MfpSpinner extends LitElement {
    static override styles = css`
        :host {
            display: inline-block;
            color: var(--color-brand-primary, #2563eb);
        }

        .ring {
            width: 1em;
            height: 1em;
            border: 0.15em solid currentColor;
            border-top-color: transparent;
            border-radius: 50%;
            animation: mfp-spinner-spin 0.7s linear infinite;
        }

        :host(:not([size])),
        :host([size='md']) {
            font-size: var(--size-icon-lg, 24px);
        }
        :host([size='sm']) {
            font-size: var(--size-icon-sm, 16px);
        }
        :host([size='lg']) {
            font-size: var(--size-icon-xl, 32px);
        }
        :host([size='xl']) {
            font-size: 48px;
        }

        @keyframes mfp-spinner-spin {
            to {
                transform: rotate(360deg);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .ring {
                animation-duration: 2s;
            }
        }
    `;

    @property({ reflect: true }) size: SpinnerSize = 'md';
    @property() label = 'Loading';

    override render() {
        return html`<div class="ring" role="status" aria-label=${this.label}></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-spinner': MfpSpinner;
    }
}
