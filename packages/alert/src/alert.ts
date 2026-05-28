import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const ICONS: Record<AlertVariant, string> = {
    info: 'M10 2a8 8 0 100 16 8 8 0 000-16zm0 6.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 0110 8.5zm0-3a1 1 0 100 2 1 1 0 000-2z',
    success:
        'M10 2a8 8 0 100 16 8 8 0 000-16zm3.78 6.28a.75.75 0 00-1.06-1.06L9 11.94 7.28 10.22a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z',
    warning:
        'M9.135 2.467a1 1 0 011.73 0l7.5 13a1 1 0 01-.865 1.5h-15a1 1 0 01-.865-1.5l7.5-13zM10 7a.75.75 0 00-.75.75v4a.75.75 0 001.5 0v-4A.75.75 0 0010 7zm0 7.5a1 1 0 100 2 1 1 0 000-2z',
    error: 'M10 2a8 8 0 100 16 8 8 0 000-16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z',
};

@customElement('mfp-alert')
export class MfpAlert extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            align-items: flex-start;
            gap: var(--space-inline-md, 12px);
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-size: var(--text-body-sm, 14px);
            line-height: var(--font-line-height-normal, 1.5);
            padding: var(--space-component-md, 12px) var(--space-component-lg, 16px);
            border-radius: var(--radius-control, 8px);
            border: var(--size-border-width-thin, 1px) solid transparent;
        }

        :host(:not([variant])),
        :host([variant='info']) {
            background: var(--color-status-info-bg, #dbeafe);
            color: var(--color-status-info-fg, #1e40af);
            border-color: var(--color-status-info-border, #93c5fd);
        }
        :host([variant='success']) {
            background: var(--color-status-success-bg, #dcfce7);
            color: var(--color-status-success-fg, #166534);
            border-color: var(--color-status-success-border, #86efac);
        }
        :host([variant='warning']) {
            background: var(--color-status-warning-bg, #fef3c7);
            color: var(--color-status-warning-fg, #92400e);
            border-color: var(--color-status-warning-border, #fcd34d);
        }
        :host([variant='error']) {
            background: var(--color-status-error-bg, #fee2e2);
            color: var(--color-status-error-fg, #991b1b);
            border-color: var(--color-status-error-border, #fca5a5);
        }

        .icon {
            flex: none;
            width: var(--size-icon-md, 20px);
            height: var(--size-icon-md, 20px);
        }

        .body {
            flex: 1 1 auto;
            min-width: 0;
        }

        .title {
            font-weight: var(--font-weight-semibold, 600);
            margin: 0;
        }

        .title + .message {
            margin-top: var(--space-stack-xs, 4px);
        }

        .message {
            margin: 0;
        }

        .close {
            flex: none;
            background: none;
            border: none;
            padding: var(--space-component-xs, 4px);
            margin: calc(-1 * var(--space-component-xs, 4px))
                calc(-1 * var(--space-component-xs, 4px)) 0 0;
            cursor: pointer;
            color: inherit;
            border-radius: var(--size-radius-sm, 4px);
            opacity: var(--opacity-muted, 0.7);
            line-height: 0;
        }
        .close:hover {
            opacity: var(--opacity-full, 1);
        }
    `;

    @property({ reflect: true }) variant: AlertVariant = 'info';
    @property() heading = '';
    @property({ type: Boolean, attribute: 'dismissible' }) dismissible = false;

    private _onClose = () => {
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
        this.remove();
    };

    override render() {
        return html`
            <svg
                class="icon"
                part="icon"
                viewBox="0 0 20 20"
                aria-hidden="true"
                fill="currentColor"
            >
                <path d=${ICONS[this.variant] ?? ICONS.info} />
            </svg>
            <div class="body" role="alert">
                ${this.heading ? html`<p class="title" part="title">${this.heading}</p>` : nothing}
                <div class="message" part="message"><slot></slot></div>
            </div>
            ${this.dismissible
                ? html`<button
                      type="button"
                      class="close"
                      part="close"
                      aria-label="Dismiss"
                      @click=${this._onClose}
                  >
                      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                          <path
                              d="M4 4l8 8M12 4l-8 8"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                          />
                      </svg>
                  </button>`
                : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-alert': MfpAlert;
    }
}
