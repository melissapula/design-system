import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

export type RowGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RowAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type RowJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

@customElement('mfp-row')
export class MfpRow extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
        }

        /* Gap — default md when no [gap] attribute is set */
        :host(:not([gap])),
        :host([gap='md']) {
            gap: var(--space-inline-md, 16px);
        }
        :host([gap='none']) {
            gap: 0;
        }
        :host([gap='xs']) {
            gap: var(--space-inline-xs, 4px);
        }
        :host([gap='sm']) {
            gap: var(--space-inline-sm, 8px);
        }
        :host([gap='lg']) {
            gap: var(--space-inline-lg, 24px);
        }
        :host([gap='xl']) {
            gap: var(--space-component-xl, 32px);
        }

        :host([wrap]) {
            flex-wrap: wrap;
        }

        /* Cross-axis alignment */
        :host([align='start']) {
            align-items: flex-start;
        }
        :host([align='center']) {
            align-items: center;
        }
        :host([align='end']) {
            align-items: flex-end;
        }
        :host([align='stretch']) {
            align-items: stretch;
        }
        :host([align='baseline']) {
            align-items: baseline;
        }

        /* Main-axis distribution */
        :host([justify='start']) {
            justify-content: flex-start;
        }
        :host([justify='center']) {
            justify-content: center;
        }
        :host([justify='end']) {
            justify-content: flex-end;
        }
        :host([justify='between']) {
            justify-content: space-between;
        }
        :host([justify='around']) {
            justify-content: space-around;
        }
        :host([justify='evenly']) {
            justify-content: space-evenly;
        }
    `;

    override render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-row': MfpRow;
    }
}
