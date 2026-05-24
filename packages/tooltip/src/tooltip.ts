import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

let tooltipIdCounter = 0;

/**
 * `<mfp-tooltip>` — a tooltip anchored to its slotted child. Wrap any element:
 *
 *   <mfp-tooltip content="Save your changes" placement="top">
 *     <button>Save</button>
 *   </mfp-tooltip>
 *
 * Shows on hover and on keyboard focus. Hides on blur/mouseleave or Escape.
 * Sets `aria-describedby` on the first slotted child so screen readers
 * announce the tooltip text when the anchor is focused.
 *
 * Positioning is CSS-only relative to the anchor (the host). For collision
 * avoidance / viewport flipping, swap in a positioning library later.
 */
@customElement('mfp-tooltip')
export class MfpTooltip extends LitElement {
    static override styles = css`
        :host {
            position: relative;
            display: inline-block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
        }

        .bubble {
            position: absolute;
            z-index: var(--z-tooltip, 700);
            background: var(--color-neutral-900, #111827);
            color: var(--color-neutral-0, #ffffff);
            font-size: var(--font-size-xs, 12px);
            line-height: var(--font-line-height-tight, 1.2);
            padding: var(--size-spacing-2, 8px) var(--size-spacing-3, 12px);
            border-radius: var(--size-radius-sm, 4px);
            max-width: 240px;
            white-space: normal;
            opacity: 0;
            pointer-events: none;
            transition: opacity var(--motion-duration-fast, 150ms)
                var(--motion-easing-standard, ease);
            box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.1));
        }

        .bubble[data-visible='true'] {
            opacity: 1;
        }

        :host(:not([placement])) .bubble,
        :host([placement='top']) .bubble {
            bottom: calc(100% + var(--size-spacing-2, 8px));
            left: 50%;
            transform: translateX(-50%);
        }
        :host([placement='bottom']) .bubble {
            top: calc(100% + var(--size-spacing-2, 8px));
            left: 50%;
            transform: translateX(-50%);
        }
        :host([placement='left']) .bubble {
            right: calc(100% + var(--size-spacing-2, 8px));
            top: 50%;
            transform: translateY(-50%);
        }
        :host([placement='right']) .bubble {
            left: calc(100% + var(--size-spacing-2, 8px));
            top: 50%;
            transform: translateY(-50%);
        }

        @media (prefers-reduced-motion: reduce) {
            .bubble {
                transition: none;
            }
        }
    `;

    @property() content = '';
    @property({ reflect: true }) placement: TooltipPlacement = 'top';

    @state() private _visible = false;
    private _id = `mfp-tooltip-${++tooltipIdCounter}`;

    private _show = () => {
        this._visible = true;
    };
    private _hide = () => {
        this._visible = false;
    };
    private _onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this._hide();
    };

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('mouseenter', this._show);
        this.addEventListener('mouseleave', this._hide);
        this.addEventListener('focusin', this._show);
        this.addEventListener('focusout', this._hide);
        this.addEventListener('keydown', this._onKey);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mouseenter', this._show);
        this.removeEventListener('mouseleave', this._hide);
        this.removeEventListener('focusin', this._show);
        this.removeEventListener('focusout', this._hide);
        this.removeEventListener('keydown', this._onKey);
    }

    private _onSlotChange = (e: Event) => {
        const slot = e.target as HTMLSlotElement;
        const first = slot
            .assignedElements({ flatten: true })
            .find((el): el is HTMLElement => el.nodeType === Node.ELEMENT_NODE);
        if (first) first.setAttribute('aria-describedby', this._id);
    };

    override render() {
        return html`
            <slot @slotchange=${this._onSlotChange}></slot>
            <span
                role="tooltip"
                id=${this._id}
                class="bubble"
                part="bubble"
                data-visible=${this._visible ? 'true' : 'false'}
            >
                ${this.content}
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-tooltip': MfpTooltip;
    }
}
