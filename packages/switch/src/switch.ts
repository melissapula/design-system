import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

let switchIdCounter = 0;

@customElement('mfp-switch')
export class MfpSwitch extends LitElement {
    static formAssociated = true;

    static override styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            gap: var(--size-spacing-3, 12px);
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-size: var(--font-size-base, 16px);
            color: var(--color-text-default, #111827);
            cursor: pointer;
            user-select: none;
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .track {
            position: relative;
            width: 36px;
            height: 20px;
            flex: none;
            background: var(--color-neutral-300, #d1d5db);
            border-radius: 999px;
            transition: background var(--motion-duration-fast, 150ms)
                var(--motion-easing-standard, ease);
        }

        .thumb {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 16px;
            height: 16px;
            background: var(--color-neutral-0, #ffffff);
            border-radius: 50%;
            box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08));
            transition: transform var(--motion-duration-fast, 150ms)
                var(--motion-easing-standard, ease);
        }

        :host([checked]) .track {
            background: var(--color-status-info-solid, #2563eb);
        }
        :host([checked]) .thumb {
            transform: translateX(16px);
        }

        input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }

        input:focus-visible + .track {
            outline: 2px solid var(--color-status-info-solid, #2563eb);
            outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
            .track,
            .thumb {
                transition: none;
            }
        }
    `;

    @property({ type: Boolean, reflect: true })
    checked = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    required = false;

    @property()
    name = '';

    @property()
    value = 'on';

    @property()
    label = '';

    private _internals: ElementInternals;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    get form(): HTMLFormElement | null {
        return this._internals.form;
    }

    checkValidity(): boolean {
        return this._internals.checkValidity();
    }

    reportValidity(): boolean {
        return this._internals.reportValidity();
    }

    private _id = `mfp-switch-${++switchIdCounter}`;

    private _syncFormValue() {
        this._internals.setFormValue(this.checked ? this.value : null);
        if (this.required && !this.checked) {
            this._internals.setValidity({ valueMissing: true }, 'This switch must be on.');
        } else {
            this._internals.setValidity({});
        }
    }

    override willUpdate(changed: Map<string, unknown>) {
        if (changed.has('checked') || changed.has('required') || changed.has('value')) {
            this._syncFormValue();
        }
    }

    override connectedCallback() {
        super.connectedCallback();
        this._syncFormValue();
    }

    private _onChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        this.checked = input.checked;
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { checked: this.checked },
            }),
        );
    };

    override render() {
        return html`
            <input
                id=${this._id}
                type="checkbox"
                role="switch"
                .checked=${this.checked}
                ?disabled=${this.disabled}
                ?required=${this.required}
                aria-checked=${this.checked ? 'true' : 'false'}
                @change=${this._onChange}
            />
            <span part="track" class="track" aria-hidden="true">
                <span part="thumb" class="thumb"></span>
            </span>
            ${this.label
                ? html`<label part="label" for=${this._id}>${this.label}</label>`
                : html`<label part="label" for=${this._id}><slot></slot></label>`}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-switch': MfpSwitch;
    }
}
