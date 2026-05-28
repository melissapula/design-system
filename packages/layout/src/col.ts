import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Bootstrap-style column intended to sit inside `<mfp-row>`. The 12-col
 * grid is conceptual: spans use `flex-basis: span/12 * 100%`. With a
 * sibling gap on the row, columns flex-shrink slightly to absorb it,
 * which keeps the row fitting without overflow.
 *
 * Without a `span` attribute the column fills the available row space
 * equally with its siblings.
 */
@customElement('mfp-col')
export class MfpCol extends LitElement {
    static override styles = css`
        :host {
            display: block;
            box-sizing: border-box;
            /* Auto column — equal share of row, can shrink with siblings */
            flex: 1 1 0;
            min-width: 0;
        }

        /* 12-column spans: flex-basis as fraction of 12. No grow; allow
           shrink so a row's gap can squeeze cols without overflow. */
        :host([span='1']) {
            flex: 0 1 calc(100% / 12);
        }
        :host([span='2']) {
            flex: 0 1 calc(100% / 12 * 2);
        }
        :host([span='3']) {
            flex: 0 1 calc(100% / 12 * 3);
        }
        :host([span='4']) {
            flex: 0 1 calc(100% / 12 * 4);
        }
        :host([span='5']) {
            flex: 0 1 calc(100% / 12 * 5);
        }
        :host([span='6']) {
            flex: 0 1 calc(100% / 12 * 6);
        }
        :host([span='7']) {
            flex: 0 1 calc(100% / 12 * 7);
        }
        :host([span='8']) {
            flex: 0 1 calc(100% / 12 * 8);
        }
        :host([span='9']) {
            flex: 0 1 calc(100% / 12 * 9);
        }
        :host([span='10']) {
            flex: 0 1 calc(100% / 12 * 10);
        }
        :host([span='11']) {
            flex: 0 1 calc(100% / 12 * 11);
        }
        :host([span='12']) {
            flex: 0 0 100%;
        }

        /* Per-column self-alignment override */
        :host([align='start']) {
            align-self: flex-start;
        }
        :host([align='center']) {
            align-self: center;
        }
        :host([align='end']) {
            align-self: flex-end;
        }
        :host([align='stretch']) {
            align-self: stretch;
        }
    `;

    override render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-col': MfpCol;
    }
}
