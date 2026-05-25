import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type FooterVariant = 'default' | 'brand' | 'dark';

/**
 * `<mfp-footer>` — app footer shell. Slot-driven; consumers compose their
 * own content (copyright, links, social, sitemap, etc.).
 *
 *   <mfp-footer>
 *     <div>© 2026 LessonForge</div>
 *     <nav style="display: flex; gap: 16px;">
 *       <a href="/privacy">Privacy</a>
 *       <a href="/terms">Terms</a>
 *     </nav>
 *   </mfp-footer>
 *
 *   <mfp-footer variant="brand">…</mfp-footer>
 *   <mfp-footer variant="dark">…</mfp-footer>
 */
@customElement('mfp-footer')
export class MfpFooter extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-size: var(--font-size-sm, 14px);
            line-height: var(--font-line-height-normal, 1.5);
            background: var(--color-background-subtle, #f9fafb);
            color: var(--color-text-muted, #6b7280);
            border-top: 1px solid var(--color-border-default, #e5e7eb);
        }

        :host([variant='brand']) {
            background: var(--color-brand-primary, #2563eb);
            color: var(--color-brand-primary-fg, #ffffff);
            border-top-color: var(--color-brand-primary-emphasis, #1e40af);
        }

        :host([variant='dark']) {
            background: var(--color-neutral-900, #111827);
            color: var(--color-text-inverse-muted, #d1d5db);
            border-top-color: var(--color-neutral-900, #111827);
        }

        .inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--size-spacing-4, 16px);
            padding: var(--size-spacing-4, 16px) var(--size-spacing-5, 20px);
            flex-wrap: wrap;
        }

        ::slotted(a) {
            color: inherit;
        }

        /* Honor links in any nested element by inheriting the surface color */
        ::slotted(*) {
            color: inherit;
        }
    `;

    @property({ reflect: true }) variant: FooterVariant = 'default';

    override render() {
        return html` <footer class="inner" part="inner"><slot></slot></footer> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-footer': MfpFooter;
    }
}
