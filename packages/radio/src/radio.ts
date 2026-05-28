import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

let radioIdCounter = 0;

/**
 * `<mfp-radio>` — a single radio button. To get single-select behavior
 * across a group, give multiple radios the same `name` attribute (native
 * form semantics) and wrap them in a `<fieldset>` with a `<legend>` for
 * accessibility. Browsers handle the mutual exclusion.
 *
 *   <fieldset>
 *     <legend>Notification preference</legend>
 *     <mfp-radio name="notify" value="email" label="Email"></mfp-radio>
 *     <mfp-radio name="notify" value="sms" label="SMS"></mfp-radio>
 *   </fieldset>
 */
@customElement('mfp-radio')
export class MfpRadio extends LitElement {
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

        .ring {
            width: 18px;
            height: 18px;
            flex: none;
            border: 1.5px solid var(--color-border-strong, #9ca3af);
            border-radius: 50%;
            background: var(--color-background-default, #ffffff);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: border-color var(--motion-duration-fast, 150ms)
                var(--motion-easing-standard, ease);
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--color-brand-primary, #2563eb);
            transform: scale(0);
            transition: transform var(--motion-duration-fast, 150ms)
                var(--motion-easing-standard, ease);
        }

        :host([checked]) .ring {
            border-color: var(--color-brand-primary, #2563eb);
        }
        :host([checked]) .dot {
            transform: scale(1);
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

        input:focus-visible + .ring {
            outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid)
                var(--focus-ring-color, #2563eb);
            outline-offset: var(--focus-ring-offset, 2px);
        }

        @media (prefers-reduced-motion: reduce) {
            .ring,
            .dot {
                transition: none;
            }
        }
    `;

    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property() name = '';
    @property() value = 'on';
    @property() label = '';

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

    private _id = `mfp-radio-${++radioIdCounter}`;

    private _syncFormValue() {
        // For radio groups: form picks up the checked one's value under name.
        this._internals.setFormValue(this.checked ? this.value : null);
    }

    override willUpdate(changed: Map<string, unknown>) {
        if (changed.has('checked') || changed.has('value')) {
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
        // Uncheck sibling radios with the same name in the same root.
        if (this.checked && this.name) {
            const root = this.getRootNode() as Document | ShadowRoot;
            const siblings = root.querySelectorAll<MfpRadio>(`mfp-radio[name="${this.name}"]`);
            siblings.forEach((sib) => {
                if (sib !== this) sib.checked = false;
            });
        }
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { checked: this.checked, value: this.value },
            }),
        );
    };

    override render() {
        return html`
            <input
                id=${this._id}
                type="radio"
                name=${this.name}
                .checked=${this.checked}
                ?disabled=${this.disabled}
                ?required=${this.required}
                @change=${this._onChange}
            />
            <span part="ring" class="ring" aria-hidden="true">
                <span class="dot"></span>
            </span>
            ${this.label
                ? html`<label part="label" for=${this._id}>${this.label}</label>`
                : html`<label part="label" for=${this._id}><slot></slot></label>`}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-radio': MfpRadio;
    }
}
