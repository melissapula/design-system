import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

let tabsIdCounter = 0;

/**
 * `<mfp-tabs>` — orchestrates a list of `<mfp-tab>` triggers and matching
 * `<mfp-tab-panel>` panels. Usage:
 *
 *   <mfp-tabs>
 *     <mfp-tab slot="tab" value="overview">Overview</mfp-tab>
 *     <mfp-tab slot="tab" value="details">Details</mfp-tab>
 *
 *     <mfp-tab-panel value="overview">...</mfp-tab-panel>
 *     <mfp-tab-panel value="details">...</mfp-tab-panel>
 *   </mfp-tabs>
 *
 * Each tab's `value` is matched against each panel's `value` to decide
 * which panel is visible. The first tab is selected by default unless
 * `value` is set on the wrapper.
 *
 * Keyboard: arrow keys move between tabs (with wrap), Home/End jump to
 * first/last, Enter/Space activate. Selection follows focus.
 */
@customElement('mfp-tabs')
export class MfpTabs extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
        }

        .tablist {
            display: flex;
            gap: var(--space-inline-xs, 4px);
            border-bottom: var(--size-border-width-thin, 1px) solid
                var(--color-border-default, #e5e7eb);
            padding-bottom: 0;
        }

        ::slotted([slot='tab']) {
            display: block;
        }
    `;

    @property() value = '';

    @queryAssignedElements({ slot: 'tab' })
    private _tabs!: HTMLElement[];

    @queryAssignedElements({ selector: 'mfp-tab-panel' })
    private _panels!: HTMLElement[];

    private _id = `mfp-tabs-${++tabsIdCounter}`;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mfp-tab-select', this._onTabSelect as EventListener);
        this.addEventListener('keydown', this._onKey);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mfp-tab-select', this._onTabSelect as EventListener);
        this.removeEventListener('keydown', this._onKey);
    }

    override firstUpdated() {
        if (!this.value && this._tabs.length > 0) {
            this.value = (this._tabs[0] as MfpTab).value;
        }
        this._sync();
    }

    override updated(changed: Map<string, unknown>) {
        if (changed.has('value')) this._sync();
    }

    private _sync() {
        const groupId = this._id;
        this._tabs.forEach((tab, i) => {
            const t = tab as MfpTab;
            const selected = t.value === this.value;
            t.selected = selected;
            t.setAttribute('role', 'tab');
            t.setAttribute('aria-selected', selected ? 'true' : 'false');
            t.setAttribute('tabindex', selected ? '0' : '-1');
            t.id = `${groupId}-tab-${i}`;
            const panel = this._panels.find((p) => (p as MfpTabPanel).value === t.value);
            if (panel) {
                panel.id = `${groupId}-panel-${i}`;
                t.setAttribute('aria-controls', panel.id);
                panel.setAttribute('role', 'tabpanel');
                panel.setAttribute('aria-labelledby', t.id);
            }
        });
        this._panels.forEach((panel) => {
            const p = panel as MfpTabPanel;
            p.hidden = p.value !== this.value;
        });
    }

    private _onTabSelect = (e: CustomEvent<{ value: string }>) => {
        this.value = e.detail.value;
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: this.value },
            }),
        );
    };

    private _onKey = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target || target.tagName !== 'MFP-TAB') return;
        const tabs = this._tabs as MfpTab[];
        const currentIndex = tabs.indexOf(target as MfpTab);
        if (currentIndex < 0) return;

        let next = currentIndex;
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                next = (currentIndex + 1) % tabs.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                next = (currentIndex - 1 + tabs.length) % tabs.length;
                break;
            case 'Home':
                next = 0;
                break;
            case 'End':
                next = tabs.length - 1;
                break;
            default:
                return;
        }
        e.preventDefault();
        const nextTab = tabs[next];
        if (nextTab) {
            this.value = nextTab.value;
            nextTab.focus();
        }
    };

    override render() {
        return html`
            <div class="tablist" role="tablist">
                <slot name="tab"></slot>
            </div>
            <div class="panels"><slot></slot></div>
        `;
    }
}

@customElement('mfp-tab')
export class MfpTab extends LitElement {
    static override styles = css`
        :host {
            display: inline-block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            font-size: var(--text-button, 14px);
            font-weight: var(--font-weight-medium, 500);
            color: var(--color-text-muted, #6b7280);
            cursor: pointer;
            padding: var(--space-component-sm, 8px) var(--space-component-lg, 16px);
            border-bottom: var(--size-border-width-medium, 2px) solid transparent;
            margin-bottom: -1px;
            transition:
                color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                border-color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
            user-select: none;
        }

        :host(:hover:not([disabled])) {
            color: var(--color-text-default, #111827);
        }

        :host([selected]) {
            color: var(--color-brand-primary, #2563eb);
            border-bottom-color: var(--color-brand-primary, #2563eb);
        }

        :host([disabled]) {
            opacity: var(--opacity-disabled, 0.5);
            cursor: not-allowed;
        }

        :host(:focus-visible) {
            outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid)
                var(--focus-ring-color, #2563eb);
            outline-offset: var(--focus-ring-offset, 2px);
            border-radius: var(--size-radius-sm, 4px);
        }
    `;

    @property() value = '';
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) disabled = false;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._onActivate);
        this.addEventListener('keydown', this._onKey);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._onActivate);
        this.removeEventListener('keydown', this._onKey);
    }

    private _onActivate = () => {
        if (this.disabled) return;
        this.dispatchEvent(
            new CustomEvent('mfp-tab-select', {
                bubbles: true,
                composed: true,
                detail: { value: this.value },
            }),
        );
    };

    private _onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._onActivate();
        }
    };

    override render() {
        return html`<slot></slot>`;
    }
}

@customElement('mfp-tab-panel')
export class MfpTabPanel extends LitElement {
    static override styles = css`
        :host {
            display: block;
            padding: var(--space-stack-md, 16px) 0;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-default, #111827);
        }
        :host([hidden]) {
            display: none;
        }
    `;

    @property() value = '';

    override render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-tabs': MfpTabs;
        'mfp-tab': MfpTab;
        'mfp-tab-panel': MfpTabPanel;
    }
}
