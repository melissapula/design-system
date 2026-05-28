import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

let checkboxIdCounter = 0;

@customElement('mfp-checkbox')
export class MfpCheckbox extends LitElement {
    static formAssociated = true;

    static override styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            gap: var(--space-inline-sm, 8px);
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-size: var(--font-size-base, 16px);
            color: var(--color-text-default, #111827);
            cursor: pointer;
            user-select: none;
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: var(--opacity-disabled, 0.5);
        }

        .box {
            width: 18px;
            height: 18px;
            flex: none;
            border: 1.5px solid var(--color-border-strong, #9ca3af);
            border-radius: var(--size-radius-sm, 4px);
            background: var(--color-neutral-0, #ffffff);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition:
                background var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                border-color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
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

        input:focus-visible + .box {
            outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid)
                var(--focus-ring-color, #2563eb);
            outline-offset: var(--focus-ring-offset, 2px);
        }

        :host([checked]) .box,
        :host([indeterminate]) .box {
            background: var(--color-brand-primary, #2563eb);
            border-color: var(--color-brand-primary, #2563eb);
        }

        .check {
            color: var(--color-brand-primary-fg, #ffffff);
            display: none;
        }
        :host([checked]) .check {
            display: inline;
        }
        :host([indeterminate]) .check {
            display: none;
        }

        .indeterminate-mark {
            width: 10px;
            height: 2px;
            background: var(--color-brand-primary-fg, #ffffff);
            border-radius: 1px;
            display: none;
        }
        :host([indeterminate]) .indeterminate-mark {
            display: inline-block;
        }

        :host([invalid]) .box {
            border-color: var(--color-status-error-solid, #dc2626);
        }

        @media (prefers-reduced-motion: reduce) {
            .box {
                transition: none;
            }
        }
    `;

    @property({ type: Boolean, reflect: true })
    checked = false;

    @property({ type: Boolean, reflect: true })
    indeterminate = false;

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

    private _id = `mfp-checkbox-${++checkboxIdCounter}`;

    @query('input')
    private _inputEl!: HTMLInputElement;

    private _syncFormValue() {
        this._internals.setFormValue(this.checked ? this.value : null);
        if (this.required && !this.checked) {
            this._internals.setValidity({ valueMissing: true }, 'Please check this box.');
        } else {
            this._internals.setValidity({});
        }
    }

    override willUpdate(changed: Map<string, unknown>) {
        if (changed.has('checked') || changed.has('required') || changed.has('value')) {
            this._syncFormValue();
        }
        if (this._inputEl && changed.has('indeterminate')) {
            this._inputEl.indeterminate = this.indeterminate;
        }
    }

    override firstUpdated() {
        // The native indeterminate property has to be set on the element, not as
        // an attribute, so we sync it after first render.
        this._inputEl.indeterminate = this.indeterminate;
    }

    override connectedCallback() {
        super.connectedCallback();
        this._syncFormValue();
    }

    private _onChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        this.checked = input.checked;
        this.indeterminate = false;
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
                .checked=${this.checked}
                ?disabled=${this.disabled}
                ?required=${this.required}
                aria-checked=${this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
                @change=${this._onChange}
            />
            <span part="box" class="box" aria-hidden="true">
                <svg class="check" viewBox="0 0 16 16" width="12" height="12" fill="none">
                    <path
                        d="M3 8l4 4 6-7"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span class="indeterminate-mark"></span>
            </span>
            ${this.label
                ? html`<label part="label" for=${this._id}>${this.label}</label>`
                : html`<label part="label" for=${this._id}><slot></slot></label>`}
            ${this.label === '' ? nothing : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-checkbox': MfpCheckbox;
    }
}
