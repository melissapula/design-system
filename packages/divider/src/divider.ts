import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DividerOrientation = 'horizontal' | 'vertical';

@customElement('mfp-divider')
export class MfpDivider extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-muted, #6b7280);
        }

        /* Horizontal (default) */
        :host(:not([orientation])),
        :host([orientation='horizontal']) {
            display: flex;
            align-items: center;
            width: 100%;
            gap: var(--space-inline-md, 12px);
        }
        :host(:not([orientation])) hr,
        :host([orientation='horizontal']) hr {
            flex: 1 1 auto;
            border: none;
            border-top: var(--size-border-width-thin, 1px) solid
                var(--color-border-default, #e5e7eb);
            margin: 0;
        }

        /* Vertical */
        :host([orientation='vertical']) {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            align-self: stretch;
            gap: var(--space-stack-sm, 8px);
        }
        :host([orientation='vertical']) hr {
            flex: 1 1 auto;
            border: none;
            border-left: var(--size-border-width-thin, 1px) solid
                var(--color-border-default, #e5e7eb);
            margin: 0;
            min-height: 1em;
        }

        .label {
            font-size: var(--text-caption, 12px);
            font-weight: var(--font-weight-medium, 500);
            text-transform: uppercase;
            letter-spacing: var(--font-letter-spacing-wider, 0.05em);
            white-space: nowrap;
        }

        .label[data-empty] {
            display: none;
        }
    `;

    @property({ reflect: true }) orientation: DividerOrientation = 'horizontal';
    @property() label = '';

    override render() {
        const hasLabel = this.label.length > 0;
        return html`
            ${hasLabel
                ? html`<hr aria-hidden="true" />
                      <span class="label" part="label">${this.label}</span>
                      <hr aria-hidden="true" />`
                : html`<hr role="separator" />`}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-divider': MfpDivider;
    }
}
