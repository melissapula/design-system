import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

/**
 * `<mfp-accordion>` — wraps a list of `<mfp-accordion-item>` children.
 * By default each item opens/closes independently. Pass `exclusive` to
 * close siblings when one item opens (FAQ-style behavior).
 *
 *   <mfp-accordion>
 *     <mfp-accordion-item label="What is X?">Answer here.</mfp-accordion-item>
 *     <mfp-accordion-item label="What is Y?">Another answer.</mfp-accordion-item>
 *   </mfp-accordion>
 *
 *   <mfp-accordion exclusive>
 *     <mfp-accordion-item label="Section A">...</mfp-accordion-item>
 *     <mfp-accordion-item label="Section B">...</mfp-accordion-item>
 *   </mfp-accordion>
 */
@customElement('mfp-accordion')
export class MfpAccordion extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            border: var(--size-border-width-thin, 1px) solid var(--color-border-default, #e5e7eb);
            border-radius: var(--radius-control, 8px);
            overflow: hidden;
        }

        ::slotted(mfp-accordion-item) {
            display: block;
        }

        ::slotted(mfp-accordion-item:not(:last-of-type)) {
            border-bottom: var(--size-border-width-thin, 1px) solid
                var(--color-border-default, #e5e7eb);
        }
    `;

    @property({ type: Boolean }) exclusive = false;

    @queryAssignedElements({ selector: 'mfp-accordion-item' })
    private _items!: MfpAccordionItem[];

    constructor() {
        super();
        this.addEventListener('mfp-accordion-toggle', this._onToggle as EventListener);
    }

    private _onToggle = (e: CustomEvent<{ open: boolean }>) => {
        if (!this.exclusive) return;
        const opened = e.target as MfpAccordionItem;
        // Only react when an item OPENS; closing one shouldn't ripple.
        if (!opened.open) return;
        for (const item of this._items) {
            if (item !== opened && item.open) item.open = false;
        }
    };

    override render() {
        return html`<slot></slot>`;
    }
}

/**
 * `<mfp-accordion-item>` — a single disclosure section. Uses native
 * `<details>` + `<summary>` under the hood, so keyboard support
 * (Tab to focus the header, Enter/Space to toggle) and ARIA semantics
 * come for free from the browser.
 *
 * Provide a header via the `label` attribute or the `header` slot
 * (slot wins). Body content goes in the default slot.
 */
@customElement('mfp-accordion-item')
export class MfpAccordionItem extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-default, #111827);
            background: var(--color-background-default, #ffffff);
        }

        details > summary {
            list-style: none;
            cursor: pointer;
            padding: var(--space-component-md, 12px) var(--space-component-lg, 16px);
            display: flex;
            align-items: center;
            gap: var(--space-inline-md, 12px);
            font-size: var(--text-body-md, 16px);
            font-weight: var(--font-weight-medium, 500);
            line-height: var(--font-line-height-tight, 1.2);
            user-select: none;
            transition: background var(--motion-duration-fast, 150ms)
                var(--motion-easing-standard, ease);
        }

        /* Hide the browser default disclosure marker (the little triangle). */
        details > summary::-webkit-details-marker {
            display: none;
        }
        details > summary::marker {
            display: none;
        }

        details > summary:hover {
            background: var(--color-background-subtle, #f9fafb);
        }

        details > summary:focus-visible {
            outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid)
                var(--focus-ring-color, #2563eb);
            outline-offset: -2px;
        }

        .chevron {
            margin-left: auto;
            flex: none;
            color: var(--color-text-muted, #6b7280);
            transition: transform var(--motion-duration-normal, 200ms)
                var(--motion-easing-standard, ease);
        }

        details[open] > summary .chevron {
            transform: rotate(180deg);
        }

        .content {
            padding: 0 var(--space-component-lg, 16px) var(--space-component-lg, 16px);
            font-size: var(--text-body-md, 16px);
            line-height: var(--font-line-height-normal, 1.5);
            color: var(--color-text-default, #111827);
        }

        :host([disabled]) details > summary {
            cursor: not-allowed;
            opacity: var(--opacity-disabled, 0.5);
            pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
            details > summary,
            .chevron {
                transition: none;
            }
        }
    `;

    @property() label = '';
    @property({ type: Boolean, reflect: true }) open = false;
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _onToggle = (e: Event) => {
        const details = e.target as HTMLDetailsElement;
        // Sync the property to whatever the native element settled on.
        if (this.open !== details.open) {
            this.open = details.open;
        }
        // Re-dispatch as our own custom event so the parent <mfp-accordion>
        // can implement exclusive mode without ambiguity with the native
        // `toggle` event (which doesn't cross shadow boundaries by default).
        this.dispatchEvent(
            new CustomEvent('mfp-accordion-toggle', {
                bubbles: true,
                composed: true,
                detail: { open: this.open },
            }),
        );
        // Public-facing event for consumers. Named `mfp-toggle` (not just
        // `toggle`) to avoid colliding with the native ToggleEvent that
        // lib.dom.d.ts maps `addEventListener('toggle', ...)` to — a
        // collision that forced consumers to cast through `unknown` to
        // reach `.detail.open`. With this name, `(e as CustomEvent).detail`
        // works directly.
        this.dispatchEvent(
            new CustomEvent('mfp-toggle', {
                bubbles: true,
                composed: true,
                detail: { open: this.open },
            }),
        );
    };

    override render() {
        return html`
            <details ?open=${this.open} @toggle=${this._onToggle}>
                <summary part="summary">
                    <slot name="header">${this.label}</slot>
                    <svg
                        class="chevron"
                        part="chevron"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
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
                </summary>
                <div class="content" part="content">
                    <slot></slot>
                </div>
            </details>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-accordion': MfpAccordion;
        'mfp-accordion-item': MfpAccordionItem;
    }
}
