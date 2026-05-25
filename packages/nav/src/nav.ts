import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

export type NavOrientation = 'horizontal' | 'vertical';
export type NavVariant = 'default' | 'brand';

/**
 * `<mfp-nav-bar>` — horizontal top navigation. Three slots:
 *
 *   - `brand` (left): logo or app name (use an <a href="/"> for the home link).
 *   - default (center): nav items.
 *   - `actions` (right): user menu, search, theme toggle, etc.
 *
 *   <mfp-nav-bar>
 *     <a slot="brand" href="/"><strong>LessonForge</strong></a>
 *     <mfp-nav-item href="/lessons" active>Lessons</mfp-nav-item>
 *     <mfp-nav-item href="/settings">Settings</mfp-nav-item>
 *     <div slot="actions">
 *       <mfp-icon-button label="Search"><span aria-hidden="true">🔍</span></mfp-icon-button>
 *     </div>
 *   </mfp-nav-bar>
 *
 * Set `sticky` to keep the bar pinned to the top while scrolling.
 */
@customElement('mfp-nav-bar')
export class MfpNavBar extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            /*
             * Surface tokens — these cascade into <mfp-nav-item>'s shadow DOM
             * via CSS custom properties (which DO pierce shadow boundaries),
             * so changing them here re-skins active/hover/text states on
             * every item without the item needing to know what surface it's
             * sitting on.
             */
            background: var(--color-background-default, #ffffff);
            color: var(--color-text-default, #111827);
            border-bottom: 1px solid var(--color-border-default, #e5e7eb);
            --mfp-nav-item-fg: var(--color-text-muted, #6b7280);
            --mfp-nav-item-fg-strong: var(--color-text-default, #111827);
            --mfp-nav-item-hover-bg: var(--color-background-subtle, #f9fafb);
            --mfp-nav-item-active-bg: var(--color-brand-primary-subtle, #eff6ff);
            --mfp-nav-item-active-fg: var(--color-brand-primary-emphasis, #1e40af);
        }

        :host([variant='brand']) {
            background: var(--color-brand-primary, #2563eb);
            color: var(--color-brand-primary-fg, #ffffff);
            border-bottom-color: var(--color-brand-primary-emphasis, #1e40af);
            --mfp-nav-item-fg: rgba(255, 255, 255, 0.78);
            --mfp-nav-item-fg-strong: var(--color-brand-primary-fg, #ffffff);
            --mfp-nav-item-hover-bg: rgba(255, 255, 255, 0.12);
            --mfp-nav-item-active-bg: rgba(255, 255, 255, 0.2);
            --mfp-nav-item-active-fg: var(--color-brand-primary-fg, #ffffff);
        }

        :host([sticky]) {
            position: sticky;
            top: 0;
            z-index: var(--z-sticky, 200);
        }

        .bar {
            display: flex;
            align-items: center;
            gap: var(--size-spacing-4, 16px);
            padding: var(--size-spacing-3, 12px) var(--size-spacing-5, 20px);
            min-height: 56px;
        }

        .brand {
            display: flex;
            align-items: center;
            min-width: 0;
        }

        .nav {
            display: flex;
            align-items: center;
            gap: var(--size-spacing-1, 4px);
            flex: 1 1 auto;
            min-width: 0;
            overflow-x: auto;
        }

        .actions {
            display: flex;
            align-items: center;
            gap: var(--size-spacing-2, 8px);
        }

        ::slotted([slot='brand']) {
            font-size: var(--font-size-lg, 18px);
            color: inherit;
            text-decoration: none;
        }
    `;

    @property({ type: Boolean, reflect: true }) sticky = false;
    @property({ reflect: true }) variant: NavVariant = 'default';

    @queryAssignedElements({ selector: 'mfp-nav-item' })
    private _items!: MfpNavItem[];

    private _syncOrientation() {
        for (const item of this._items) item.orientation = 'horizontal';
    }

    override firstUpdated() {
        this._syncOrientation();
    }

    private _onSlotChange = () => this._syncOrientation();

    override render() {
        return html`
            <nav class="bar" aria-label="Main">
                <div class="brand"><slot name="brand"></slot></div>
                <div class="nav" role="navigation">
                    <slot @slotchange=${this._onSlotChange}></slot>
                </div>
                <div class="actions"><slot name="actions"></slot></div>
            </nav>
        `;
    }
}

/**
 * `<mfp-side-nav>` — vertical side navigation. Default slot accepts
 * `<mfp-nav-item>` children (or any other content). Use the `header`
 * and `footer` slots for sticky sections.
 *
 *   <mfp-side-nav>
 *     <a slot="header" href="/"><strong>Acme</strong></a>
 *     <mfp-nav-item href="/dashboard" active>Dashboard</mfp-nav-item>
 *     <mfp-nav-item href="/team">Team</mfp-nav-item>
 *     <div slot="footer">v1.0.0</div>
 *   </mfp-side-nav>
 */
@customElement('mfp-side-nav')
export class MfpSideNav extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            flex-direction: column;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            background: var(--color-background-default, #ffffff);
            border-right: 1px solid var(--color-border-default, #e5e7eb);
            color: var(--color-text-default, #111827);
            width: 240px;
            min-height: 100%;
            --mfp-nav-item-fg: var(--color-text-muted, #6b7280);
            --mfp-nav-item-fg-strong: var(--color-text-default, #111827);
            --mfp-nav-item-hover-bg: var(--color-background-subtle, #f9fafb);
            --mfp-nav-item-active-bg: var(--color-brand-primary-subtle, #eff6ff);
            --mfp-nav-item-active-fg: var(--color-brand-primary-emphasis, #1e40af);
        }

        :host([variant='brand']) {
            background: var(--color-brand-primary, #2563eb);
            color: var(--color-brand-primary-fg, #ffffff);
            border-right-color: var(--color-brand-primary-emphasis, #1e40af);
            --mfp-nav-item-fg: rgba(255, 255, 255, 0.78);
            --mfp-nav-item-fg-strong: var(--color-brand-primary-fg, #ffffff);
            --mfp-nav-item-hover-bg: rgba(255, 255, 255, 0.12);
            --mfp-nav-item-active-bg: rgba(255, 255, 255, 0.2);
            --mfp-nav-item-active-fg: var(--color-brand-primary-fg, #ffffff);
        }

        .header,
        .footer {
            padding: var(--size-spacing-4, 16px);
        }

        .header {
            border-bottom: 1px solid var(--color-border-default, #e5e7eb);
        }

        .items {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            gap: var(--size-spacing-1, 4px);
            padding: var(--size-spacing-3, 12px) var(--size-spacing-2, 8px);
            overflow-y: auto;
        }

        .footer {
            border-top: 1px solid var(--color-border-default, #e5e7eb);
            font-size: var(--font-size-sm, 14px);
            color: var(--color-text-muted, #6b7280);
        }

        /* Auto-hide empty header/footer slots */
        .header[data-empty],
        .footer[data-empty] {
            display: none;
        }
    `;

    @property({ reflect: true }) variant: NavVariant = 'default';

    @queryAssignedElements({ selector: 'mfp-nav-item' })
    private _items!: MfpNavItem[];

    private _syncOrientation() {
        for (const item of this._items) item.orientation = 'vertical';
    }

    override firstUpdated() {
        this._syncOrientation();
    }

    private _onItemsSlotChange = () => this._syncOrientation();

    private _onNamedSlotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        const wrapper = slot.parentElement;
        if (!wrapper) return;
        const hasContent = slot.assignedNodes({ flatten: true }).length > 0;
        wrapper.toggleAttribute('data-empty', !hasContent);
    };

    override render() {
        return html`
            <div class="header" part="header" data-empty>
                <slot name="header" @slotchange=${this._onNamedSlotChange}></slot>
            </div>
            <nav class="items" aria-label="Side navigation">
                <slot @slotchange=${this._onItemsSlotChange}></slot>
            </nav>
            <div class="footer" part="footer" data-empty>
                <slot name="footer" @slotchange=${this._onNamedSlotChange}></slot>
            </div>
        `;
    }
}

/**
 * `<mfp-nav-item>` — a single nav entry. Works inside both `<mfp-nav-bar>`
 * and `<mfp-side-nav>`; the parent sets `orientation` on the item so its
 * styling adapts. Renders an `<a>` if `href` is set, otherwise a `<button>`
 * — consumers can listen for `click` events for SPA navigation.
 *
 * Mark the current page with the `active` attribute; it sets
 * `aria-current="page"` on the anchor.
 */
@customElement('mfp-nav-item')
export class MfpNavItem extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-size: var(--font-size-sm, 14px);
            font-weight: var(--font-weight-medium, 500);
            /*
             * Surface tokens — set by the parent nav (mfp-nav-bar / mfp-side-nav)
             * via CSS custom properties that cascade into this shadow DOM.
             * Defaults here are what a standalone (no parent) item would use.
             */
            color: var(--mfp-nav-item-fg, var(--color-text-muted, #6b7280));
        }

        a,
        button {
            display: inline-flex;
            align-items: center;
            gap: var(--size-spacing-2, 8px);
            padding: var(--size-spacing-2, 8px) var(--size-spacing-3, 12px);
            border-radius: var(--size-radius-md, 8px);
            color: inherit;
            background: none;
            border: none;
            font: inherit;
            text-decoration: none;
            cursor: pointer;
            white-space: nowrap;
            transition:
                background var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
        }

        /* Vertical (side nav) takes full row width */
        :host([orientation='vertical']) a,
        :host([orientation='vertical']) button {
            display: flex;
            width: 100%;
            justify-content: flex-start;
        }

        a:hover:not([aria-disabled]),
        button:hover:not(:disabled) {
            background: var(--mfp-nav-item-hover-bg, var(--color-background-subtle, #f9fafb));
            color: var(--mfp-nav-item-fg-strong, var(--color-text-default, #111827));
        }

        a:focus-visible,
        button:focus-visible {
            outline: 2px solid var(--color-brand-primary, #2563eb);
            outline-offset: 2px;
        }

        :host([active]) a,
        :host([active]) button {
            background: var(--mfp-nav-item-active-bg, var(--color-brand-primary-subtle, #eff6ff));
            color: var(--mfp-nav-item-active-fg, var(--color-brand-primary-emphasis, #1e40af));
            font-weight: var(--font-weight-semibold, 600);
        }

        :host([disabled]) a,
        :host([disabled]) button {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        ::slotted([slot='icon']) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.2em;
            height: 1.2em;
            flex: none;
            line-height: 1;
        }

        @media (prefers-reduced-motion: reduce) {
            a,
            button {
                transition: none;
            }
        }
    `;

    @property() href = '';
    @property({ type: Boolean, reflect: true }) active = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ reflect: true }) orientation: NavOrientation = 'horizontal';

    private _onClick = (e: MouseEvent) => {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    override render() {
        const content = html`
            <slot name="icon"></slot>
            <span class="label"><slot></slot></span>
        `;

        if (this.href) {
            return html`
                <a
                    part="link"
                    href=${this.href}
                    aria-current=${this.active ? 'page' : nothing}
                    aria-disabled=${this.disabled ? 'true' : nothing}
                    @click=${this._onClick}
                >
                    ${content}
                </a>
            `;
        }
        return html`
            <button
                type="button"
                part="link"
                ?disabled=${this.disabled}
                aria-current=${this.active ? 'page' : nothing}
            >
                ${content}
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-nav-bar': MfpNavBar;
        'mfp-side-nav': MfpSideNav;
        'mfp-nav-item': MfpNavItem;
    }
}
