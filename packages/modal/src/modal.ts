import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export type ModalSize = 'sm' | 'md' | 'lg';

/**
 * `<mfp-modal>` — a modal dialog built on the native `<dialog>` element.
 *
 * Using `<dialog>` means focus trap, scroll lock, top-layer rendering, and
 * escape-to-close come for free from the browser. We add styling, backdrop
 * click-to-close, header/footer slots, and a Lit-friendly `open` property.
 *
 *   <mfp-modal ?open=${isOpen} @close=${() => isOpen = false}>
 *     <span slot="header">Delete account?</span>
 *     <p>This cannot be undone.</p>
 *     <div slot="footer">
 *       <mfp-button variant="ghost" @click=${cancel}>Cancel</mfp-button>
 *       <mfp-button variant="danger" @click=${confirm}>Delete</mfp-button>
 *     </div>
 *   </mfp-modal>
 */
@customElement('mfp-modal')
export class MfpModal extends LitElement {
    static override styles = css`
        :host {
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
        }

        /*
         * Layout styles are scoped to [open] so the native UA rule
         * 'dialog:not([open]) { display: none }' keeps an unopened dialog
         * hidden. Setting 'display: flex' unconditionally would override
         * that and the modal would render visible in normal flow at mount.
         */
        dialog[open] {
            padding: 0;
            border: none;
            background: var(--color-neutral-0, #ffffff);
            border-radius: var(--size-radius-lg, 12px);
            box-shadow: var(--shadow-xl, 0 16px 48px rgba(0, 0, 0, 0.2));
            color: var(--color-text-default, #111827);
            font: inherit;
            max-width: min(calc(100vw - 32px), 480px);
            width: 100%;
            max-height: calc(100vh - 32px);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: mfp-modal-fade-in var(--motion-duration-fast, 150ms)
                var(--motion-easing-decelerate, ease-out) forwards;
        }

        :host([size='sm']) dialog[open] {
            max-width: min(calc(100vw - 32px), 360px);
        }
        :host([size='lg']) dialog[open] {
            max-width: min(calc(100vw - 32px), 720px);
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.5);
            animation: mfp-modal-fade-in var(--motion-duration-fast, 150ms)
                var(--motion-easing-standard, ease) forwards;
        }

        @keyframes mfp-modal-fade-in {
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
            dialog[open],
            dialog::backdrop {
                animation: none;
            }
        }

        .header {
            padding: var(--size-spacing-5, 20px) var(--size-spacing-5, 20px)
                var(--size-spacing-3, 12px);
            font-size: var(--font-size-lg, 18px);
            font-weight: var(--font-weight-semibold, 600);
            line-height: var(--font-line-height-tight, 1.2);
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: var(--size-spacing-3, 12px);
        }

        .body {
            padding: 0 var(--size-spacing-5, 20px) var(--size-spacing-5, 20px);
            overflow-y: auto;
            flex: 1 1 auto;
        }

        .footer {
            padding: var(--size-spacing-4, 16px) var(--size-spacing-5, 20px);
            border-top: 1px solid var(--color-border-default, #e5e7eb);
            display: flex;
            justify-content: flex-end;
            gap: var(--size-spacing-2, 8px);
            background: var(--color-background-subtle, #f9fafb);
        }

        .close {
            background: none;
            border: none;
            padding: var(--size-spacing-1, 4px);
            margin: calc(-1 * var(--size-spacing-1, 4px)) calc(-1 * var(--size-spacing-1, 4px)) 0 0;
            cursor: pointer;
            color: var(--color-text-muted, #6b7280);
            border-radius: var(--size-radius-sm, 4px);
            line-height: 0;
        }
        .close:hover {
            background: var(--color-background-muted, #f3f4f6);
            color: var(--color-text-default, #111827);
        }
        .close:focus-visible {
            outline: 2px solid var(--color-brand-primary, #2563eb);
            outline-offset: 2px;
        }

        /* Hide section wrappers that have no slotted content */
        .header[data-empty],
        .footer[data-empty] {
            display: none;
        }
    `;

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ reflect: true })
    size: ModalSize = 'md';

    /** If false, clicking the backdrop will not close the modal. Default: true. */
    @property({ type: Boolean })
    dismissible = true;

    /** If true, hides the built-in × close button in the header. Default: false. */
    @property({ type: Boolean, attribute: 'no-close-button' })
    noCloseButton = false;

    @query('dialog')
    private _dialogEl!: HTMLDialogElement;

    /** Open the modal. */
    show(): void {
        this.open = true;
    }

    /** Close the modal. Fires the `close` event. */
    close(): void {
        this.open = false;
    }

    private _onDialogClose = () => {
        if (this.open) this.open = false;
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    };

    private _onDialogCancel = (e: Event) => {
        // Allow consumer to prevent escape-to-close by calling preventDefault().
        const event = new CustomEvent('cancel', {
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        if (!this.dispatchEvent(event)) {
            e.preventDefault();
        }
    };

    /** Click on the dialog element itself (not a child) → backdrop click. */
    private _onDialogClick = (e: MouseEvent) => {
        if (!this.dismissible) return;
        if (e.target === this._dialogEl) {
            this.close();
        }
    };

    private _onSlotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        const wrapper = slot.parentElement;
        if (!wrapper) return;
        const hasContent = slot.assignedNodes({ flatten: true }).length > 0;
        if (hasContent) {
            wrapper.removeAttribute('data-empty');
        } else {
            wrapper.setAttribute('data-empty', '');
        }
    };

    override updated(changed: Map<string, unknown>) {
        if (changed.has('open')) {
            if (this.open && !this._dialogEl.open) {
                this._dialogEl.showModal();
            } else if (!this.open && this._dialogEl.open) {
                this._dialogEl.close();
            }
        }
    }

    override render() {
        return html`
            <dialog
                part="dialog"
                @close=${this._onDialogClose}
                @cancel=${this._onDialogCancel}
                @click=${this._onDialogClick}
            >
                <div part="header" class="header" data-empty>
                    <slot name="header" @slotchange=${this._onSlotChange}></slot>
                    ${this.noCloseButton
                        ? ''
                        : html`<button
                              type="button"
                              class="close"
                              aria-label="Close"
                              @click=${this.close}
                          >
                              <svg viewBox="0 0 16 16" width="20" height="20" fill="none">
                                  <path
                                      d="M4 4l8 8M12 4l-8 8"
                                      stroke="currentColor"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                  />
                              </svg>
                          </button>`}
                </div>
                <div part="body" class="body">
                    <slot></slot>
                </div>
                <div part="footer" class="footer" data-empty>
                    <slot name="footer" @slotchange=${this._onSlotChange}></slot>
                </div>
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-modal': MfpModal;
    }
}
