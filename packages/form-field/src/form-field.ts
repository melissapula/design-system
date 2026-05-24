import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

let fieldIdCounter = 0;

/**
 * `<mfp-form-field>` — a labeled wrapper around an arbitrary control.
 *
 * Use this when the control inside doesn't ship its own label/hint/error
 * (e.g., a raw checkbox, radio group, custom date picker). Components like
 * `<mfp-input>` and `<mfp-select>` already have built-in label/hint/error, so
 * you don't need a FormField around them — but you *can* use one for visual
 * consistency if you prefer one composition style across all form rows.
 *
 *   <mfp-form-field label="Subscribe" hint="We'll email twice a week.">
 *     <input type="checkbox" />
 *   </mfp-form-field>
 *
 *   <mfp-form-field label="Date of birth" required error="This field is required.">
 *     <input type="date" />
 *   </mfp-form-field>
 */
@customElement('mfp-form-field')
export class MfpFormField extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-default, #111827);
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
            display: block;
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

        /* When laid out horizontally (e.g., checkbox next to label) */
        :host([orientation='horizontal']) {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-areas:
                'control label'
                '. hint';
            column-gap: var(--size-spacing-3, 12px);
            row-gap: var(--size-spacing-1, 4px);
            align-items: center;
        }
        :host([orientation='horizontal']) .control {
            grid-area: control;
        }
        :host([orientation='horizontal']) label {
            grid-area: label;
            margin-bottom: 0;
            font-weight: var(--font-weight-regular, 400);
        }
        :host([orientation='horizontal']) .hint,
        :host([orientation='horizontal']) .error {
            grid-area: hint;
            margin-top: 0;
        }
    `;

    @property()
    label = '';

    @property()
    hint = '';

    @property()
    error = '';

    @property({ type: Boolean, reflect: true })
    required = false;

    @property({ reflect: true })
    orientation: 'vertical' | 'horizontal' = 'vertical';

    private _id = `mfp-form-field-${++fieldIdCounter}`;

    /**
     * When a control is slotted in, wire its `id`/`aria-describedby` to the
     * label/hint/error we render. This means consumers can drop in a bare
     * `<input>` or `<select>` and get correct a11y wiring without setting
     * ids themselves.
     */
    private _onSlotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        const controls = slot
            .assignedElements({ flatten: true })
            .filter((el): el is HTMLElement =>
                /^(input|select|textarea|button|mfp-)/i.test(el.tagName),
            );
        if (controls.length === 0) return;
        const first = controls[0];
        if (!first) return;
        if (!first.id) first.id = `${this._id}-control`;

        const invalid = this.error.length > 0;
        const describedByIds = [
            invalid ? `${this._id}-error` : '',
            !invalid && this.hint ? `${this._id}-hint` : '',
        ]
            .filter(Boolean)
            .join(' ');

        if (describedByIds) {
            first.setAttribute('aria-describedby', describedByIds);
        } else {
            first.removeAttribute('aria-describedby');
        }

        if (invalid) {
            first.setAttribute('aria-invalid', 'true');
        } else {
            first.removeAttribute('aria-invalid');
        }

        // Update the label's `for` so clicking it focuses the control
        const labelEl = this.shadowRoot?.querySelector('label');
        if (labelEl) labelEl.setAttribute('for', first.id);
    };

    override render() {
        const invalid = this.error.length > 0;
        const hintId = `${this._id}-hint`;
        const errorId = `${this._id}-error`;

        return html`
            ${this.label
                ? html`<label part="label" for=${`${this._id}-control`}>
                      ${this.label}
                      ${this.required
                          ? html`<span class="required" aria-hidden="true">*</span>`
                          : nothing}
                  </label>`
                : nothing}
            <div part="control" class="control">
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
        'mfp-form-field': MfpFormField;
    }
}
