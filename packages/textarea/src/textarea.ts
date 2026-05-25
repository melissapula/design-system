import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

let textareaIdCounter = 0;

@customElement('mfp-textarea')
export class MfpTextarea extends LitElement {
    static formAssociated = true;

    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-default, #111827);
        }

        :host([disabled]) {
            opacity: 0.6;
        }

        label {
            display: block;
            font-size: var(--font-size-sm, 14px);
            font-weight: var(--font-weight-medium, 500);
            line-height: var(--font-line-height-tight, 1.2);
            margin-bottom: var(--size-spacing-2, 8px);
        }

        .required {
            color: var(--color-status-error-solid, #dc2626);
            margin-left: var(--size-spacing-1, 4px);
        }

        .control {
            background: var(--color-neutral-0, #ffffff);
            border: 1px solid var(--color-border-default, #e5e7eb);
            border-radius: var(--size-radius-md, 8px);
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

        textarea {
            display: block;
            width: 100%;
            /*
             * Shadow DOM doesn't inherit a global "box-sizing: border-box"
             * from the consuming app. Without this, "width: 100%" + padding
             * makes the textarea element overflow the .control wrapper,
             * and the native resize handle ends up outside the visible border.
             */
            box-sizing: border-box;
            background: transparent;
            border: none;
            outline: none;
            font: inherit;
            color: inherit;
            resize: vertical;
            padding: var(--size-spacing-2, 8px) var(--size-spacing-3, 12px);
        }

        :host([resize='none']) textarea {
            resize: none;
        }
        :host([resize='horizontal']) textarea {
            resize: horizontal;
        }
        :host([resize='both']) textarea {
            resize: both;
        }

        textarea::placeholder {
            color: var(--color-text-muted, #6b7280);
            opacity: 1;
        }

        textarea:disabled,
        textarea:read-only {
            cursor: not-allowed;
        }

        :host(:not([size])) textarea,
        :host([size='md']) textarea {
            font-size: var(--font-size-base, 16px);
            line-height: var(--font-line-height-normal, 1.5);
        }
        :host([size='sm']) textarea {
            font-size: var(--font-size-sm, 14px);
            line-height: var(--font-line-height-normal, 1.5);
        }
        :host([size='lg']) textarea {
            font-size: var(--font-size-lg, 18px);
            line-height: var(--font-line-height-normal, 1.5);
        }

        .hint,
        .error {
            margin: var(--size-spacing-2, 8px) 0 0;
            font-size: var(--font-size-sm, 14px);
            line-height: var(--font-line-height-tight, 1.2);
        }

        .hint {
            color: var(--color-text-muted, #6b7280);
        }
        .error {
            color: var(--color-status-error-solid, #dc2626);
        }
    `;

    @property({ reflect: true }) size: TextareaSize = 'md';
    @property({ reflect: true }) resize: TextareaResize = 'vertical';
    @property() value = '';
    @property() name = '';
    @property() label = '';
    @property() placeholder = '';
    @property() hint = '';
    @property() error = '';
    @property({ type: Number }) rows = 4;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) readonly = false;
    @property({ type: Boolean, reflect: true }) required = false;

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

    private _id = `mfp-textarea-${++textareaIdCounter}`;

    private _syncFormValue() {
        this._internals.setFormValue(this.value);
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
        const ta = e.target as HTMLTextAreaElement;
        this.value = ta.value;
        this.dispatchEvent(
            new CustomEvent('input', {
                bubbles: true,
                composed: true,
                detail: { value: ta.value },
            }),
        );
    };

    private _onChange = (e: Event) => {
        const ta = e.target as HTMLTextAreaElement;
        this.value = ta.value;
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: ta.value },
            }),
        );
    };

    override render() {
        const invalid = this.error.length > 0;
        const id = this._id;
        const hintId = `${id}-hint`;
        const errorId = `${id}-error`;
        const describedBy = invalid ? errorId : this.hint ? hintId : undefined;

        return html`
            ${this.label
                ? html`<label part="label" for=${id}>
                      ${this.label}
                      ${this.required
                          ? html`<span class="required" aria-hidden="true">*</span>`
                          : nothing}
                  </label>`
                : nothing}
            <div part="control" class="control ${invalid ? 'invalid' : ''}">
                <textarea
                    id=${id}
                    part="textarea"
                    .value=${this.value}
                    name=${this.name}
                    placeholder=${this.placeholder}
                    rows=${this.rows}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    aria-invalid=${invalid ? 'true' : 'false'}
                    aria-describedby=${describedBy ?? nothing}
                    @input=${this._onInput}
                    @change=${this._onChange}
                ></textarea>
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
        'mfp-textarea': MfpTextarea;
    }
}
