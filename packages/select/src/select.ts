import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export type SelectSize = 'sm' | 'md' | 'lg';

let selectIdCounter = 0;

/**
 * `<mfp-select>` wraps a native `<select>` element. Children projected into
 * the default slot are forwarded into the real select — usage:
 *
 *   <mfp-select label="Color">
 *     <option value="red">Red</option>
 *     <option value="green">Green</option>
 *   </mfp-select>
 *
 * Using the native control means full keyboard a11y, screen reader support,
 * and mobile-native pickers come for free. The visual chrome (border, focus
 * ring, chevron) is styled via shadow CSS using design tokens.
 */
@customElement('mfp-select')
export class MfpSelect extends LitElement {
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
            position: relative;
            display: flex;
            align-items: center;
            background: var(--color-neutral-0, #ffffff);
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

        select {
            flex: 1 1 auto;
            min-width: 0;
            appearance: none;
            -webkit-appearance: none;
            background: transparent;
            border: none;
            outline: none;
            font: inherit;
            color: inherit;
            cursor: pointer;
            padding: var(--space-component-sm, 8px) var(--size-spacing-9, 36px)
                var(--space-component-sm, 8px) var(--space-component-md, 12px);
        }

        select:disabled {
            cursor: not-allowed;
        }

        .chevron {
            position: absolute;
            right: var(--space-component-md, 12px);
            top: 50%;
            transform: translateY(-50%);
            width: 1em;
            height: 1em;
            color: var(--color-text-muted, #6b7280);
            pointer-events: none;
        }

        /* Sizes — fall back to medium when no [size] attribute is set */
        :host(:not([size])) select,
        :host([size='md']) select {
            font-size: var(--font-size-base, 16px);
            min-height: var(--size-control-md, 40px);
        }
        :host([size='sm']) select {
            font-size: var(--text-button, 14px);
            min-height: var(--size-control-sm, 32px);
            padding: var(--space-component-xs, 4px) var(--size-spacing-9, 36px)
                var(--space-component-xs, 4px) var(--space-component-md, 12px);
        }
        :host([size='lg']) select {
            font-size: var(--text-body-lg, 18px);
            min-height: var(--size-control-lg, 48px);
            padding: var(--space-component-md, 12px) var(--size-spacing-10, 40px)
                var(--space-component-md, 12px) var(--space-component-lg, 16px);
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

        /* Hide the slot — its children get moved into the native select */
        .options-source {
            display: none;
        }

        @media (prefers-reduced-motion: reduce) {
            .control {
                transition: none;
            }
        }
    `;

    @property({ reflect: true })
    size: SelectSize = 'md';

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

    checkValidity(): boolean {
        return this._internals.checkValidity();
    }

    reportValidity(): boolean {
        return this._internals.reportValidity();
    }

    private _syncFormValue() {
        this._internals.setFormValue(this.value);
        if (this.error) {
            this._internals.setValidity({ customError: true }, this.error);
        } else if (this.required && !this.value) {
            this._internals.setValidity({ valueMissing: true }, 'Please select an option.');
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

    private _id = `mfp-select-${++selectIdCounter}`;

    @query('select')
    private _selectEl!: HTMLSelectElement;

    private _onChange = (e: Event) => {
        const select = e.target as HTMLSelectElement;
        this.value = select.value;
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: select.value },
            }),
        );
    };

    /**
     * Move slotted <option> elements into the real <select> when they change.
     *
     * IMPORTANT: do not use `select.textContent = ''` to clear children. The
     * placeholder ChildPart in the template (`${this.placeholder ? html`...`
     * : nothing}`) leaves invisible Lit marker comment nodes inside the
     * <select> — wiping textContent removes them, and the next Lit re-render
     * crashes trying to find its markers. Instead, tag cloned options with
     * a data attribute on insertion and only remove those on subsequent
     * slot changes.
     */
    private _onSlotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        const select = this._selectEl;
        if (!select) return;

        const currentValue = this.value;

        // Remove only previously-cloned options (NOT the placeholder, NOT Lit markers)
        select.querySelectorAll('[data-mfp-cloned]').forEach((n) => n.remove());

        const optionLikeNodes = slot
            .assignedNodes({ flatten: true })
            .filter(
                (n): n is HTMLElement =>
                    n.nodeType === Node.ELEMENT_NODE &&
                    ((n as HTMLElement).tagName === 'OPTION' ||
                        (n as HTMLElement).tagName === 'OPTGROUP'),
            );

        for (const node of optionLikeNodes) {
            const clone = node.cloneNode(true) as HTMLElement;
            clone.setAttribute('data-mfp-cloned', '');
            select.appendChild(clone);
        }

        // Restore the value (reflect attribute → DOM value)
        select.value = currentValue;
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
                <select
                    id=${inputId}
                    part="select"
                    .value=${this.value}
                    name=${this.name}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    aria-invalid=${invalid ? 'true' : 'false'}
                    aria-describedby=${describedBy ?? nothing}
                    @change=${this._onChange}
                >
                    ${this.placeholder
                        ? html`<option value="" disabled selected hidden data-mfp-placeholder>
                              ${this.placeholder}
                          </option>`
                        : nothing}
                </select>
                <svg
                    class="chevron"
                    part="chevron"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="options-source">
                <slot @slotchange=${this._onSlotChange}></slot>
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
        'mfp-select': MfpSelect;
    }
}
