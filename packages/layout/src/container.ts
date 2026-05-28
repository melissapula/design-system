import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

@customElement('mfp-container')
export class MfpContainer extends LitElement {
    static override styles = css`
        :host {
            display: block;
            width: 100%;
            margin-inline: auto;
            padding-inline: var(--space-component-md, 16px);
            box-sizing: border-box;
        }

        :host(:not([size])),
        :host([size='lg']) {
            max-width: var(--breakpoint-lg, 1024px);
        }
        :host([size='sm']) {
            max-width: var(--breakpoint-sm, 640px);
        }
        :host([size='md']) {
            max-width: var(--breakpoint-md, 768px);
        }
        :host([size='xl']) {
            max-width: var(--breakpoint-xl, 1280px);
        }
        :host([size='2xl']) {
            max-width: var(--breakpoint-2xl, 1536px);
        }
        :host([size='full']) {
            max-width: none;
        }
    `;

    override render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-container': MfpContainer;
    }
}
