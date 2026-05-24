import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@customElement('mfp-button')
export class MfpButton extends LitElement {
    static formAssociated = true;

    private _internals: ElementInternals;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    /** The associated <form>, if any. */
    get form(): HTMLFormElement | null {
        return this._internals.form;
    }

    static override styles = css`
        :host {
            display: inline-block;
        }

        button {
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-weight: var(--font-weight-medium, 500);
            line-height: var(--font-line-height-tight, 1.2);
            border: 1px solid transparent;
            border-radius: var(--size-radius-md, 8px);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--size-spacing-2, 8px);
            white-space: nowrap;
            user-select: none;
            transition:
                background var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                border-color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                box-shadow var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
        }

        button:focus-visible {
            outline: 2px solid var(--color-status-info-solid, #2563eb);
            outline-offset: 2px;
        }

        button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        /* Sizes — fall back to medium when no [size] attribute is set */
        :host(:not([size])) button,
        :host([size='md']) button {
            padding: var(--size-spacing-2, 8px) var(--size-spacing-4, 16px);
            font-size: var(--font-size-base, 16px);
            min-height: 40px;
        }
        :host([size='sm']) button {
            padding: var(--size-spacing-1, 4px) var(--size-spacing-3, 12px);
            font-size: var(--font-size-sm, 14px);
            min-height: 32px;
        }
        :host([size='lg']) button {
            padding: var(--size-spacing-3, 12px) var(--size-spacing-5, 20px);
            font-size: var(--font-size-lg, 18px);
            min-height: 48px;
        }

        /* Variants — fall back to primary when no [variant] attribute is set */
        :host(:not([variant])) button,
        :host([variant='primary']) button {
            background: var(--color-status-info-solid, #2563eb);
            color: var(--color-neutral-0, #ffffff);
        }
        :host(:not([variant])) button:hover:not(:disabled),
        :host([variant='primary']) button:hover:not(:disabled) {
            background: var(--color-status-info-fg, #1e40af);
            box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08));
        }

        :host([variant='secondary']) button {
            background: var(--color-neutral-0, #ffffff);
            color: var(--color-text-default, #111827);
            border-color: var(--color-border-default, #e5e7eb);
        }
        :host([variant='secondary']) button:hover:not(:disabled) {
            background: var(--color-background-subtle, #f9fafb);
            border-color: var(--color-border-strong, #9ca3af);
        }

        :host([variant='danger']) button {
            background: var(--color-status-error-solid, #dc2626);
            color: var(--color-neutral-0, #ffffff);
        }
        :host([variant='danger']) button:hover:not(:disabled) {
            background: var(--color-status-error-fg, #991b1b);
            box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08));
        }

        :host([variant='ghost']) button {
            background: transparent;
            color: var(--color-text-default, #111827);
        }
        :host([variant='ghost']) button:hover:not(:disabled) {
            background: var(--color-background-muted, #f3f4f6);
        }

        /* Loading spinner — sized relative to current font-size */
        .spinner {
            width: 1em;
            height: 1em;
            border: 2px solid currentColor;
            border-top-color: transparent;
            border-radius: 50%;
            animation: mfp-button-spin 0.6s linear infinite;
            flex: none;
        }

        @keyframes mfp-button-spin {
            to {
                transform: rotate(360deg);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            button {
                transition: none;
            }
            .spinner {
                animation-duration: 1.5s;
            }
        }
    `;

    @property({ reflect: true })
    variant: ButtonVariant = 'primary';

    @property({ reflect: true })
    size: ButtonSize = 'md';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    loading = false;

    @property()
    type: ButtonType = 'button';

    private _onClick = () => {
        if (this.disabled || this.loading) return;
        if (this.type === 'submit') {
            this.form?.requestSubmit();
        } else if (this.type === 'reset') {
            this.form?.reset();
        }
    };

    override render() {
        const isInactive = this.disabled || this.loading;
        // The inner button is always type="button" so it can't trigger native
        // form behavior from inside shadow DOM. The host handles submit/reset
        // via the click handler above and ElementInternals.form.
        return html`
            <button
                type="button"
                ?disabled=${isInactive}
                aria-busy=${this.loading ? 'true' : 'false'}
                part="button"
                @click=${this._onClick}
            >
                ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : ''}
                <slot></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-button': MfpButton;
    }
}
