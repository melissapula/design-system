import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

let inputIdCounter = 0;

@customElement('mfp-input')
export class MfpInput extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-default, #111827);
        }

        :host([disabled]) {
            opacity: var(--opacity-disabled, 0.5);
        }

        label {
            display: block;
            font-size: var(--text-label, 14px);
            font-weight: var(--font-weight-medium, 500);
            line-height: var(--font-line-height-tight, 1.2);
            margin-bottom: var(--space-stack-sm, 8px);
        }

        .required {
            color: var(--color-status-error-solid, #dc2626);
            margin-left: var(--space-inline-xs, 4px);
        }

        .control {
            display: flex;
            align-items: center;
            gap: var(--space-inline-sm, 8px);
            background: var(--color-background-default, #ffffff);
            border: var(--size-border-width-thin, 1px) solid var(--color-border-default, #e5e7eb);
            border-radius: var(--radius-control, 8px);
            transition:
                border-color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                box-shadow var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
        }

        .control:focus-within {
            border-color: var(--color-brand-primary, #2563eb);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .control.invalid {
            border-color: var(--color-status-error-solid, #dc2626);
        }

        .control.invalid:focus-within {
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
        }

        ::slotted([slot='prefix']),
        ::slotted([slot='suffix']) {
            display: inline-flex;
            align-items: center;
            color: var(--color-text-muted, #6b7280);
            flex: none;
        }

        ::slotted([slot='prefix']) {
            padding-left: var(--space-component-md, 12px);
        }
        ::slotted([slot='suffix']) {
            padding-right: var(--space-component-md, 12px);
        }

        input {
            flex: 1 1 auto;
            min-width: 0;
            background: transparent;
            border: none;
            outline: none;
            font: inherit;
            color: inherit;
            padding: var(--space-component-sm, 8px) var(--space-component-md, 12px);
            /* Let browser-native UI on the input (autofill background, date
               picker popup, spelling-error underlines) follow the page's
               color-scheme. */
            color-scheme: light dark;
        }

        input::placeholder {
            color: var(--color-text-muted, #6b7280);
            opacity: var(--opacity-full, 1);
        }

        input:disabled,
        input:read-only {
            cursor: not-allowed;
        }

        /* Sizes — fall back to medium when no [size] attribute is set */
        :host(:not([size])) input,
        :host([size='md']) input {
            font-size: var(--font-size-base, 16px);
            min-height: var(--size-control-md, 40px);
        }
        :host([size='sm']) input {
            font-size: var(--text-button, 14px);
            min-height: var(--size-control-sm, 32px);
            padding: var(--space-component-xs, 4px) var(--space-component-md, 12px);
        }
        :host([size='lg']) input {
            font-size: var(--text-body-lg, 18px);
            min-height: var(--size-control-lg, 48px);
            padding: var(--space-component-md, 12px) var(--space-component-lg, 16px);
        }

        .hint,
        .error {
            margin: var(--space-stack-sm, 8px) 0 0;
            font-size: var(--text-body-sm, 14px);
            line-height: var(--font-line-height-tight, 1.2);
        }

        .hint {
            color: var(--color-text-muted, #6b7280);
        }

        .error {
            color: var(--color-status-error-solid, #dc2626);
        }

        @media (prefers-reduced-motion: reduce) {
            .control {
                transition: none;
            }
        }
    `;

    @property({ reflect: true })
    size: InputSize = 'md';

    @property()
    type: InputType = 'text';

    @property()
    value = '';

    @property()
    name = '';

    @property()
    label = '';

    @property()
    placeholder = '';

    @property()
    hint = '';

    @property()
    error = '';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    required = false;

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

    /** Run native HTML validation. Mirrors HTMLInputElement.checkValidity(). */
    checkValidity(): boolean {
        return this._internals.checkValidity();
    }

    /** Run validation and show validity UI. */
    reportValidity(): boolean {
        return this._internals.reportValidity();
    }

    private _id = `mfp-input-${++inputIdCounter}`;

    private _syncFormValue() {
        this._internals.setFormValue(this.value);

        // Validity: explicit error wins; otherwise enforce required.
        if (this.error) {
            this._internals.setValidity({ customError: true }, this.error);
        } else if (this.required && !this.value) {
            this._internals.setValidity({ valueMissing: true }, 'Please fill out this field.');
        } else {
            this._internals.setValidity({});
        }
    }

    override willUpdate(changed: Map<string, unknown>) {
        if (changed.has('value') || changed.has('required') || changed.has('error')) {
            this._syncFormValue();
        }
    }

    override connectedCallback() {
        super.connectedCallback();
        this._syncFormValue();
    }

    private _onInput = (e: Event) => {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
        this.dispatchEvent(
            new CustomEvent('input', {
                bubbles: true,
                composed: true,
                detail: { value: input.value },
            }),
        );
    };

    private _onChange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: input.value },
            }),
        );
    };

    override render() {
        const invalid = this.error.length > 0;
        const inputId = this._id;
        const hintId = `${inputId}-hint`;
        const errorId = `${inputId}-error`;
        const describedBy = invalid ? errorId : this.hint ? hintId : undefined;

        return html`
            ${this.label
                ? html`<label part="label" for=${inputId}>
                      ${this.label}
                      ${this.required
                          ? html`<span class="required" aria-hidden="true">*</span>`
                          : nothing}
                  </label>`
                : nothing}
            <div part="control" class="control ${invalid ? 'invalid' : ''}">
                <slot name="prefix"></slot>
                <input
                    id=${inputId}
                    part="input"
                    type=${this.type}
                    .value=${this.value}
                    name=${this.name}
                    placeholder=${this.placeholder}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    aria-invalid=${invalid ? 'true' : 'false'}
                    aria-describedby=${describedBy ?? nothing}
                    @input=${this._onInput}
                    @change=${this._onChange}
                />
                <slot name="suffix"></slot>
            </div>
            ${invalid
                ? html`<p part="error" id=${errorId} class="error" role="alert">${this.error}</p>`
                : this.hint
                  ? html`<p part="hint" id=${hintId} class="hint">${this.hint}</p>`
                  : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-input': MfpInput;
    }
}
