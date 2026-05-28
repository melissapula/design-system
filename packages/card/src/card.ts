import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type CardVariant = 'default' | 'flat' | 'elevated';
export type CardPadding = 'compact' | 'default' | 'roomy' | 'none';

@customElement('mfp-card')
export class MfpCard extends LitElement {
    static override styles = css`
        :host {
            display: block;
            background: var(--color-background-default, #ffffff);
            border-radius: var(--radius-surface, 12px);
            color: var(--color-text-default, #111827);
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
        }

        /* Variants — fall back to default when no [variant] attribute is set */
        :host(:not([variant])),
        :host([variant='default']) {
            border: var(--size-border-width-thin, 1px) solid var(--color-border-default, #e5e7eb);
            box-shadow: var(--elevation-subtle, 0 1px 2px rgba(0, 0, 0, 0.05));
        }
        :host([variant='flat']) {
            border: var(--size-border-width-thin, 1px) solid var(--color-border-default, #e5e7eb);
            box-shadow: none;
        }
        :host([variant='elevated']) {
            border: none;
            box-shadow: var(--elevation-overlay, 0 4px 12px rgba(0, 0, 0, 0.1));
        }

        .surface {
            display: flex;
            flex-direction: column;
        }

        /* Padding tiers — fall back to default when no [padding] attribute is set */
        :host(:not([padding])) .surface,
        :host([padding='default']) .surface {
            padding: var(--space-component-lg, 20px);
            gap: var(--space-stack-md, 16px);
        }
        :host([padding='compact']) .surface {
            padding: var(--space-component-md, 12px);
            gap: var(--space-stack-sm, 8px);
        }
        :host([padding='roomy']) .surface {
            padding: var(--space-component-xl, 32px);
            gap: var(--space-component-lg, 20px);
        }
        :host([padding='none']) .surface {
            padding: 0;
            gap: 0;
        }

        .header {
            font-size: var(--text-heading-xs, 18px);
            font-weight: var(--font-weight-semibold, 600);
            line-height: var(--font-line-height-tight, 1.2);
        }

        .footer {
            border-top: var(--size-border-width-thin, 1px) solid
                var(--color-border-default, #e5e7eb);
            padding-top: var(--space-stack-md, 16px);
        }

        :host([padding='none']) .footer {
            padding-top: 0;
        }

        /* Hide section wrappers that have no slotted content */
        .header,
        .footer {
            display: contents;
        }

        .header[data-empty],
        .footer[data-empty] {
            display: none;
        }
    `;

    @property({ reflect: true })
    variant: CardVariant = 'default';

    @property({ reflect: true })
    padding: CardPadding = 'default';

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

    override render() {
        return html`
            <div part="surface" class="surface">
                <div part="header" class="header" data-empty>
                    <slot name="header" @slotchange=${this._onSlotChange}></slot>
                </div>
                <div part="body" class="body">
                    <slot></slot>
                </div>
                <div part="footer" class="footer" data-empty>
                    <slot name="footer" @slotchange=${this._onSlotChange}></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-card': MfpCard;
    }
}
