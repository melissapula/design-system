import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type IconButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

@customElement('mfp-icon-button')
export class MfpIconButton extends LitElement {
    static override styles = css`
        :host {
            display: inline-block;
        }

        button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: var(--size-border-width-thin, 1px) solid transparent;
            border-radius: var(--radius-control, 8px);
            cursor: pointer;
            padding: 0;
            font: inherit;
            color: inherit;
            user-select: none;
            transition:
                background var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                border-color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                box-shadow var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
        }

        button:focus-visible {
            outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid)
                var(--focus-ring-color, #2563eb);
            outline-offset: var(--focus-ring-offset, 2px);
        }

        button:disabled {
            cursor: not-allowed;
            opacity: var(--opacity-disabled, 0.5);
        }

        ::slotted(*) {
            width: 1em;
            height: 1em;
            /*
             * Center the icon's content within its 1em x 1em box. Without
             * this, slotted spans/emojis sit on the text baseline and look
             * vertically offset; SVGs inherit text-bottom alignment and
             * end up bottom-aligned. inline-flex + line-height: 1 normalizes.
             */
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
        }

        /* Sizes — square aspect (control height), font-size sets icon size */
        :host(:not([size])) button,
        :host([size='md']) button {
            width: var(--size-control-md, 40px);
            height: var(--size-control-md, 40px);
            font-size: var(--size-icon-md, 20px);
        }
        :host([size='sm']) button {
            width: var(--size-control-sm, 32px);
            height: var(--size-control-sm, 32px);
            font-size: var(--size-icon-sm, 16px);
        }
        :host([size='lg']) button {
            width: var(--size-control-lg, 48px);
            height: var(--size-control-lg, 48px);
            font-size: var(--size-icon-lg, 24px);
        }

        /*
         * Variants. Default is ghost: transparent background with a faint
         * hover hit-target — matches industry convention (Material, Shoelace,
         * Radix all default icon buttons to no chrome). Filled variants are
         * opt-in for FAB-style or prominent toolbar actions.
         */
        :host([variant='primary']) button {
            background: var(--color-brand-primary, #2563eb);
            color: var(--color-brand-primary-fg, #ffffff);
        }
        :host([variant='primary']) button:hover:not(:disabled) {
            background: var(--color-brand-primary-hover, #1d4ed8);
        }

        :host([variant='secondary']) button {
            background: var(--color-neutral-0, #ffffff);
            color: var(--color-text-default, #111827);
            border-color: var(--color-border-default, #e5e7eb);
        }
        :host([variant='secondary']) button:hover:not(:disabled) {
            background: var(--color-background-subtle, #f9fafb);
            border-color: var(--color-border-strong, #9ca3af);
        }

        :host([variant='danger']) button {
            background: var(--color-status-error-solid, #dc2626);
            color: var(--color-neutral-0, #ffffff);
        }
        :host([variant='danger']) button:hover:not(:disabled) {
            background: var(--color-status-error-fg, #991b1b);
        }

        :host([variant='ghost']) button {
            background: transparent;
            color: var(--color-text-default, #111827);
        }
        :host([variant='ghost']) button:hover:not(:disabled) {
            background: var(--color-background-muted, #f3f4f6);
        }

        @media (prefers-reduced-motion: reduce) {
            button {
                transition: none;
            }
        }
    `;

    @property({ reflect: true })
    variant: IconButtonVariant = 'ghost';

    @property({ reflect: true })
    size: IconButtonSize = 'md';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property()
    type: 'button' | 'submit' | 'reset' = 'button';

    /**
     * REQUIRED for accessibility — icon-only buttons have no visible text, so
     * an aria-label is essential for screen readers.
     */
    @property()
    label = '';

    override render() {
        if (!this.label) {
            console.warn('<mfp-icon-button> requires a `label` attribute for accessibility');
        }
        return html`
            <button
                type=${this.type}
                ?disabled=${this.disabled}
                aria-label=${this.label}
                part="button"
            >
                <slot></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-icon-button': MfpIconButton;
    }
}
