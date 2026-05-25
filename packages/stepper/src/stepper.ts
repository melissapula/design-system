import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepStatus = 'pending' | 'current' | 'completed' | 'error';

/**
 * `<mfp-stepper>` — orchestrates a list of `<mfp-step>` children for
 * multi-step flows (onboarding, checkout, multi-page forms, lesson
 * progress).
 *
 *   <mfp-stepper current="1">
 *     <mfp-step label="Account"></mfp-step>
 *     <mfp-step label="Profile"></mfp-step>
 *     <mfp-step label="Preferences"></mfp-step>
 *     <mfp-step label="Done"></mfp-step>
 *   </mfp-stepper>
 *
 * Each step's status is derived from its index vs `current`:
 *   - index < current: completed (checkmark)
 *   - index === current: current (pulsing dot)
 *   - index > current: pending (step number)
 *   - any step with `error` attribute: error (X mark), overrides the above
 *
 * If `clickable` is set, clicking any step fires a `step-click` event with
 * `detail.index` — the consumer decides whether to honor it (some flows
 * allow free navigation; onboarding usually doesn't).
 */
@customElement('mfp-stepper')
export class MfpStepper extends LitElement {
    static override styles = css`
        :host {
            display: block;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-default, #111827);
        }

        .list {
            display: flex;
            gap: 0;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        :host(:not([orientation])) .list,
        :host([orientation='horizontal']) .list {
            flex-direction: row;
            align-items: flex-start;
        }
        :host([orientation='vertical']) .list {
            flex-direction: column;
            align-items: stretch;
        }
    `;

    @property({ type: Number }) current = 0;
    @property({ reflect: true }) orientation: StepperOrientation = 'horizontal';
    @property({ type: Boolean }) clickable = false;

    @queryAssignedElements({ selector: 'mfp-step' })
    private _steps!: MfpStep[];

    override firstUpdated() {
        this._sync();
    }

    override updated(changed: Map<string, unknown>) {
        if (changed.has('current') || changed.has('orientation') || changed.has('clickable')) {
            this._sync();
        }
    }

    private _sync() {
        const total = this._steps.length;
        this._steps.forEach((step, i) => {
            step.index = i;
            step.total = total;
            step.orientation = this.orientation;
            step.clickable = this.clickable;
            // Step's own error attribute wins; otherwise derive from current
            if (step.error) {
                step.status = 'error';
            } else if (i < this.current) {
                step.status = 'completed';
            } else if (i === this.current) {
                step.status = 'current';
            } else {
                step.status = 'pending';
            }
        });
    }

    private _onSlotChange = () => this._sync();

    private _onStepClick = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (!detail || typeof detail.index !== 'number') return;
        if (!this.clickable) return;
        this.dispatchEvent(
            new CustomEvent('step-click', {
                bubbles: true,
                composed: true,
                detail: { index: detail.index },
            }),
        );
    };

    override render() {
        return html`
            <ol class="list" role="list" @mfp-step-activate=${this._onStepClick}>
                <slot @slotchange=${this._onSlotChange}></slot>
            </ol>
        `;
    }
}

/**
 * `<mfp-step>` — a single step rendered inside `<mfp-stepper>`. Most of its
 * state (index, status, orientation, clickable) is set by the parent during
 * the stepper's sync pass; consumers only need to provide `label` and
 * optional `description` / `error`.
 */
@customElement('mfp-step')
export class MfpStep extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            flex: 1 1 0;
            min-width: 0;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
        }

        /* Horizontal layout */
        :host(:not([orientation])),
        :host([orientation='horizontal']) {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 var(--size-spacing-2, 8px);
            position: relative;
        }
        :host(:not([orientation])) .row,
        :host([orientation='horizontal']) .row {
            display: contents;
        }
        :host(:not([orientation])) .connector,
        :host([orientation='horizontal']) .connector {
            position: absolute;
            top: 16px; /* center of the 32px circle */
            left: calc(50% + 20px);
            right: calc(-50% + 20px);
            height: 2px;
            background: var(--color-border-default, #e5e7eb);
        }

        /* Vertical layout */
        :host([orientation='vertical']) {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            padding: 0 0 var(--size-spacing-5, 20px);
            position: relative;
        }
        :host([orientation='vertical']) .row {
            display: flex;
            align-items: flex-start;
            gap: var(--size-spacing-3, 12px);
            width: 100%;
        }
        :host([orientation='vertical']) .connector {
            position: absolute;
            top: 32px;
            bottom: 0;
            left: 15px; /* center of the 32px circle */
            width: 2px;
            background: var(--color-border-default, #e5e7eb);
        }

        /* Hide connector on the last step */
        :host([data-last]) .connector {
            display: none;
        }

        /* Completed-state connector picks up the success color */
        :host([status='completed']) .connector {
            background: var(--color-status-success-solid, #16a34a);
        }

        .circle {
            width: 32px;
            height: 32px;
            flex: none;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--color-neutral-0, #ffffff);
            border: 2px solid var(--color-border-default, #e5e7eb);
            color: var(--color-text-muted, #6b7280);
            font-size: var(--font-size-sm, 14px);
            font-weight: var(--font-weight-semibold, 600);
            position: relative;
            transition:
                background var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                border-color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
        }

        /*
         * Status colors map to meaning, not brand: green = success/done,
         * yellow = in-progress/warning-adjacent, red = error.
         */
        :host([status='completed']) .circle {
            background: var(--color-status-success-solid, #16a34a);
            border-color: var(--color-status-success-solid, #16a34a);
            color: var(--color-neutral-0, #ffffff);
        }

        :host([status='current']) .circle {
            background: var(--color-neutral-0, #ffffff);
            border-color: var(--color-status-warning-solid, #f59e0b);
            color: var(--color-status-warning-fg, #92400e);
        }

        :host([status='error']) .circle {
            background: var(--color-status-error-solid, #dc2626);
            border-color: var(--color-status-error-solid, #dc2626);
            color: var(--color-neutral-0, #ffffff);
        }

        /* Pulsing dot at the center of the current step (in-progress yellow) */
        :host([status='current']) .pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            margin: -4px 0 0 -4px;
            border-radius: 50%;
            background: var(--color-status-warning-solid, #f59e0b);
            animation: mfp-step-pulse var(--motion-duration-slowest, 1000ms) ease-in-out infinite;
        }

        @keyframes mfp-step-pulse {
            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.5;
                transform: scale(1.4);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .pulse {
                animation: none;
            }
            .circle {
                transition: none;
            }
        }

        /* Labels */
        .text {
            min-width: 0;
        }
        :host(:not([orientation])) .text,
        :host([orientation='horizontal']) .text {
            margin-top: var(--size-spacing-2, 8px);
            max-width: 140px;
        }
        :host([orientation='vertical']) .text {
            flex: 1 1 auto;
            padding-top: 4px;
        }

        .label {
            font-size: var(--font-size-sm, 14px);
            font-weight: var(--font-weight-medium, 500);
            line-height: var(--font-line-height-tight, 1.2);
            color: var(--color-text-muted, #6b7280);
        }
        :host([status='current']) .label,
        :host([status='completed']) .label,
        :host([status='error']) .label {
            color: var(--color-text-default, #111827);
        }

        .description {
            font-size: var(--font-size-xs, 12px);
            line-height: var(--font-line-height-normal, 1.5);
            color: var(--color-text-muted, #6b7280);
            margin-top: var(--size-spacing-1, 4px);
        }

        /* Interactive */
        :host([clickable]) .row {
            cursor: pointer;
        }
        :host([clickable]) .row:focus-visible .circle {
            outline: 2px solid var(--color-brand-primary, #2563eb);
            outline-offset: 4px;
        }
    `;

    @property() label = '';
    @property() description = '';
    @property({ type: Boolean }) error = false;

    // Set by the parent stepper during _sync()
    @property({ type: Number, reflect: true }) index = -1;
    @property({ type: Number }) total = 0;
    @property({ reflect: true }) status: StepStatus = 'pending';
    @property({ reflect: true }) orientation: StepperOrientation = 'horizontal';
    @property({ type: Boolean, reflect: true }) clickable = false;

    override willUpdate(changed: Map<string, unknown>) {
        // Mark the last step so the connector can be hidden via [data-last]
        if (changed.has('index') || changed.has('total')) {
            if (this.index === this.total - 1 && this.total > 0) {
                this.setAttribute('data-last', '');
            } else {
                this.removeAttribute('data-last');
            }
        }
    }

    private _onActivate = () => {
        if (!this.clickable) return;
        this.dispatchEvent(
            new CustomEvent('mfp-step-activate', {
                bubbles: true,
                composed: true,
                detail: { index: this.index },
            }),
        );
    };

    private _onKey = (e: KeyboardEvent) => {
        if (!this.clickable) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._onActivate();
        }
    };

    private _ariaLabel(): string {
        const base = this.label || `Step ${this.index + 1}`;
        switch (this.status) {
            case 'completed':
                return `${base} — completed`;
            case 'current':
                return `${base} — in progress`;
            case 'error':
                return `${base} — error`;
            default:
                return base;
        }
    }

    override render() {
        const stepNumber = this.index + 1;

        const icon =
            this.status === 'completed'
                ? html`<svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <path
                          d="M3 8l4 4 6-7"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                  </svg>`
                : this.status === 'error'
                  ? html`<svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                        <path
                            d="M4 4l8 8M12 4l-8 8"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>`
                  : this.status === 'current'
                    ? html`<span class="pulse" aria-hidden="true"></span>${stepNumber}`
                    : html`${stepNumber}`;

        const rowProps = this.clickable
            ? {
                  role: 'button',
                  tabindex: '0',
                  onclick: this._onActivate,
                  onkeydown: this._onKey,
              }
            : {};

        return html`
            <div
                class="row"
                role=${rowProps.role || nothing}
                tabindex=${rowProps.tabindex || nothing}
                aria-current=${this.status === 'current' ? 'step' : nothing}
                aria-label=${this._ariaLabel()}
                @click=${this.clickable ? this._onActivate : null}
                @keydown=${this.clickable ? this._onKey : null}
            >
                <span class="circle" part="circle" aria-hidden="true">${icon}</span>
                <div class="text">
                    <div class="label" part="label">${this.label || `Step ${stepNumber}`}</div>
                    ${this.description
                        ? html`<div class="description" part="description">
                              ${this.description}
                          </div>`
                        : nothing}
                </div>
            </div>
            <span class="connector" part="connector" aria-hidden="true"></span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-stepper': MfpStepper;
        'mfp-step': MfpStep;
    }
}
