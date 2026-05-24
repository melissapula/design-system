import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

@customElement('mfp-toast')
export class MfpToast extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-size: var(--font-size-sm, 14px);
            line-height: var(--font-line-height-normal, 1.5);
            background: var(--color-neutral-900, #111827);
            color: var(--color-neutral-0, #ffffff);
            padding: var(--size-spacing-3, 12px) var(--size-spacing-4, 16px);
            border-radius: var(--size-radius-md, 8px);
            box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.15));
            min-width: 240px;
            max-width: 360px;
            display: flex;
            align-items: center;
            gap: var(--size-spacing-3, 12px);
            animation: mfp-toast-in var(--motion-duration-normal, 200ms)
                var(--motion-easing-decelerate, ease-out);
        }

        :host([variant='success']) {
            background: var(--color-status-success-solid, #16a34a);
        }
        :host([variant='warning']) {
            background: var(--color-status-warning-solid, #f59e0b);
        }
        :host([variant='error']) {
            background: var(--color-status-error-solid, #dc2626);
        }
        :host([variant='info']) {
            background: var(--color-status-info-solid, #2563eb);
        }

        .message {
            flex: 1 1 auto;
        }

        .close {
            background: none;
            border: none;
            padding: var(--size-spacing-1, 4px);
            margin: calc(-1 * var(--size-spacing-1, 4px));
            cursor: pointer;
            color: inherit;
            border-radius: var(--size-radius-sm, 4px);
            opacity: 0.7;
            line-height: 0;
        }
        .close:hover {
            opacity: 1;
        }

        @keyframes mfp-toast-in {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            :host {
                animation: none;
            }
        }
    `;

    @property({ reflect: true }) variant: ToastVariant = 'info';
    @property() message = '';
    @property({ type: Number }) duration = 4000;

    private _timer?: ReturnType<typeof setTimeout>;

    override connectedCallback() {
        super.connectedCallback();
        if (this.duration > 0) {
            this._timer = setTimeout(() => this._dismiss(), this.duration);
        }
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        if (this._timer) clearTimeout(this._timer);
    }

    private _dismiss = () => {
        this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
        this.remove();
    };

    override render() {
        return html`
            <span class="message" role="status">${this.message || html`<slot></slot>`}</span>
            <button type="button" class="close" aria-label="Dismiss" @click=${this._dismiss}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                    <path
                        d="M4 4l8 8M12 4l-8 8"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-toast': MfpToast;
    }
}

/**
 * Programmatic toast API. Lazily creates a fixed-position container in
 * document.body on first call; subsequent calls append into the same container.
 */
const CONTAINER_ID = 'mfp-toast-container';

function getContainer(): HTMLElement {
    let container = document.getElementById(CONTAINER_ID);
    if (container) return container;
    container = document.createElement('div');
    container.id = CONTAINER_ID;
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    Object.assign(container.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '12px',
        zIndex: 'var(--z-toast, 600)',
        pointerEvents: 'none',
    });
    document.body.appendChild(container);
    return container;
}

export interface ToastOptions {
    message: string;
    variant?: ToastVariant;
    duration?: number;
}

/**
 * Show a toast notification.
 *
 *   showToast({ message: 'Saved!', variant: 'success' });
 *   showToast({ message: 'Connection lost.', variant: 'error', duration: 8000 });
 *
 * Returns the created `<mfp-toast>` element so callers can dismiss it
 * imperatively by calling `.remove()`.
 */
export function showToast(options: ToastOptions): MfpToast {
    const container = getContainer();
    const toast = document.createElement('mfp-toast');
    toast.message = options.message;
    if (options.variant) toast.variant = options.variant;
    if (options.duration !== undefined) toast.duration = options.duration;
    toast.style.pointerEvents = 'auto';
    container.appendChild(toast);
    return toast;
}
