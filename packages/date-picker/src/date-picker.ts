import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

let datePickerIdCounter = 0;

/**
 * `<mfp-date-picker>` — a custom date picker. Renders a trigger button
 * that opens a calendar popover below. Form-associated like the other
 * input components: pair with `<form>` + `name=` and the selected
 * date submits as an ISO `YYYY-MM-DD` string.
 *
 *   <mfp-date-picker
 *     name="dob"
 *     label="Date of birth"
 *     value="1990-01-15"
 *     min="1900-01-01"
 *     max="2025-12-31"
 *     required
 *   ></mfp-date-picker>
 *
 * Keyboard nav once the popover is open:
 *   - Arrow keys: move one day (←/→) or one week (↑/↓), crossing month boundaries
 *   - PageUp / PageDown: previous / next month
 *   - Shift+PageUp / Shift+PageDown: previous / next year
 *   - Home / End: start / end of the focused week
 *   - Enter or Space: select the focused date
 *   - Escape: close the popover (focus returns to the trigger)
 *
 * Min/max constrain selection — out-of-range days render disabled.
 */
@customElement('mfp-date-picker')
export class MfpDatePicker extends LitElement {
    static formAssociated = true;

    static override styles = css`
        :host {
            display: block;
            position: relative;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            color: var(--color-text-default, #111827);
        }

        :host([disabled]) {
            opacity: var(--opacity-disabled, 0.5);
            pointer-events: none;
        }

        label {
            display: block;
            font-size: var(--text-label, 14px);
            font-weight: var(--font-weight-medium, 500);
            line-height: var(--font-line-height-tight, 1.2);
            margin-bottom: var(--space-stack-sm, 8px);
        }

        .required {
            color: var(--color-status-error-solid, #dc2626);
            margin-left: var(--space-inline-xs, 4px);
        }

        .trigger {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-inline-sm, 8px);
            width: 100%;
            min-height: var(--size-control-md, 40px);
            padding: var(--space-component-sm, 8px) var(--space-component-md, 12px);
            background: var(--color-background-default, #ffffff);
            border: var(--size-border-width-thin, 1px) solid var(--color-border-default, #e5e7eb);
            border-radius: var(--radius-control, 8px);
            color: inherit;
            font: inherit;
            font-size: var(--font-size-base, 16px);
            text-align: left;
            cursor: pointer;
            transition:
                border-color var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease),
                box-shadow var(--motion-duration-fast, 150ms) var(--motion-easing-standard, ease);
        }

        .trigger:hover:not(:disabled) {
            border-color: var(--color-border-strong, #9ca3af);
        }

        .trigger:focus-visible,
        :host([data-open]) .trigger {
            outline: none;
            border-color: var(--color-brand-primary, #2563eb);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .trigger.invalid {
            border-color: var(--color-status-error-solid, #dc2626);
        }
        .trigger.invalid:focus-visible,
        :host([data-open]) .trigger.invalid {
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
        }

        .placeholder {
            color: var(--color-text-muted, #6b7280);
        }

        .trigger svg {
            width: var(--size-icon-sm, 16px);
            height: var(--size-icon-sm, 16px);
            color: var(--color-text-muted, #6b7280);
            flex: none;
        }

        .popup {
            position: absolute;
            top: calc(100% + var(--space-stack-xs, 4px));
            left: 0;
            z-index: var(--z-popover, 500);
            min-width: 280px;
            padding: var(--space-component-sm, 8px);
            background: var(--color-background-default, #ffffff);
            border: var(--size-border-width-thin, 1px) solid var(--color-border-default, #e5e7eb);
            border-radius: var(--radius-surface, 12px);
            box-shadow: var(--elevation-overlay, 0 4px 12px rgba(0, 0, 0, 0.1));
        }

        .nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-component-xs, 4px) var(--space-component-sm, 8px)
                var(--space-component-sm, 8px);
        }

        .nav-label {
            font-weight: var(--font-weight-semibold, 600);
            font-size: var(--text-body-md, 16px);
        }

        .nav-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--size-control-sm, 32px);
            height: var(--size-control-sm, 32px);
            background: none;
            border: var(--size-border-width-thin, 1px) solid transparent;
            border-radius: var(--radius-control, 8px);
            color: inherit;
            cursor: pointer;
        }
        .nav-btn:hover {
            background: var(--color-background-subtle, #f9fafb);
        }
        .nav-btn:focus-visible {
            outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid)
                var(--focus-ring-color, #2563eb);
            outline-offset: var(--focus-ring-offset, 2px);
        }
        .nav-btn svg {
            width: var(--size-icon-sm, 16px);
            height: var(--size-icon-sm, 16px);
        }

        .weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            padding: 0 var(--space-component-xs, 4px);
            font-size: var(--text-caption, 12px);
            font-weight: var(--font-weight-medium, 500);
            color: var(--color-text-muted, #6b7280);
            text-align: center;
        }

        .weekdays span {
            padding: var(--space-component-xs, 4px) 0;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            padding: 0 var(--space-component-xs, 4px) var(--space-component-xs, 4px);
            gap: 2px;
        }

        .day {
            width: 36px;
            height: 36px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: var(--size-border-width-thin, 1px) solid transparent;
            border-radius: var(--radius-control, 8px);
            color: inherit;
            font: inherit;
            font-size: var(--text-body-sm, 14px);
            cursor: pointer;
            padding: 0;
        }

        .day.outside {
            color: var(--color-text-muted, #6b7280);
            opacity: var(--opacity-muted, 0.7);
        }

        .day:hover:not(:disabled):not(.selected) {
            background: var(--color-background-subtle, #f9fafb);
        }

        .day:focus-visible {
            outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid)
                var(--focus-ring-color, #2563eb);
            outline-offset: -2px;
        }

        .day.today:not(.selected) {
            border-color: var(--color-brand-primary, #2563eb);
            color: var(--color-brand-primary, #2563eb);
            font-weight: var(--font-weight-semibold, 600);
        }

        .day.selected {
            background: var(--color-brand-primary, #2563eb);
            color: var(--color-brand-primary-fg, #ffffff);
            font-weight: var(--font-weight-semibold, 600);
        }

        .day:disabled {
            opacity: var(--opacity-disabled, 0.5);
            cursor: not-allowed;
        }

        .hint,
        .error {
            margin: var(--space-stack-sm, 8px) 0 0;
            font-size: var(--text-body-sm, 14px);
            line-height: var(--font-line-height-tight, 1.2);
        }
        .hint {
            color: var(--color-text-muted, #6b7280);
        }
        .error {
            color: var(--color-status-error-solid, #dc2626);
        }

        @media (prefers-reduced-motion: reduce) {
            .trigger {
                transition: none;
            }
        }
    `;

    /** Selected date as `YYYY-MM-DD`. Empty string when no selection. */
    @property() value = '';
    @property() name = '';
    @property() label = '';
    @property() placeholder = 'Select a date';
    @property() hint = '';
    @property() error = '';
    /** Earliest selectable date as `YYYY-MM-DD`. */
    @property() min = '';
    /** Latest selectable date as `YYYY-MM-DD`. */
    @property() max = '';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    /**
     * BCP-47 locale for month/weekday labels and the display format.
     * Defaults to the browser/page locale.
     */
    @property() locale = '';

    @state() private _open = false;
    @state() private _viewYear = new Date().getFullYear();
    @state() private _viewMonth = new Date().getMonth();
    @state() private _focusedISO = '';

    private _id = `mfp-date-picker-${++datePickerIdCounter}`;

    private _internals: ElementInternals;

    constructor() {
        super();
        this._internals = this.attachInternals();
    }

    /** Associated `<form>`, if any. */
    get form(): HTMLFormElement | null {
        return this._internals.form;
    }

    checkValidity(): boolean {
        return this._internals.checkValidity();
    }
    reportValidity(): boolean {
        return this._internals.reportValidity();
    }

    /** Open the calendar popover. */
    show(): void {
        if (!this.disabled) this._open = true;
    }
    /** Close the calendar popover. */
    hide(): void {
        this._open = false;
    }

    @query('.trigger')
    private _triggerEl!: HTMLButtonElement;

    // --- Date utilities ---------------------------------------------------
    // We use Date with local-time components; the ISO string is always
    // YYYY-MM-DD (no time, no zone). Parsing 'YYYY-MM-DD' with `new Date()`
    // would treat it as UTC midnight, which can off-by-one in negative
    // offset zones — so we parse manually.

    private _parseISO(iso: string): Date | null {
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
        if (!m) return null;
        const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
        return Number.isNaN(d.getTime()) ? null : d;
    }

    private _toISO(d: Date): string {
        const y = d.getFullYear().toString().padStart(4, '0');
        const m = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    private _isSameDay(a: Date, b: Date): boolean {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    private _isInRange(d: Date): boolean {
        const min = this._parseISO(this.min);
        const max = this._parseISO(this.max);
        if (min && d < this._stripTime(min)) return false;
        if (max && d > this._stripTime(max)) return false;
        return true;
    }

    private _stripTime(d: Date): Date {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    private _formatDisplay(d: Date): string {
        try {
            return new Intl.DateTimeFormat(this.locale || undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }).format(d);
        } catch {
            return this._toISO(d);
        }
    }

    private _monthYearLabel(year: number, month: number): string {
        try {
            return new Intl.DateTimeFormat(this.locale || undefined, {
                year: 'numeric',
                month: 'long',
            }).format(new Date(year, month, 1));
        } catch {
            return `${year}-${(month + 1).toString().padStart(2, '0')}`;
        }
    }

    private _weekdayLabels(): string[] {
        try {
            const fmt = new Intl.DateTimeFormat(this.locale || undefined, { weekday: 'short' });
            // Sunday-first; weekday ordering varies by locale but Intl doesn't
            // expose week-start, so we keep a consistent Sun→Sat layout.
            return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 11, 1 + i)));
        } catch {
            return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        }
    }

    // --- State management ------------------------------------------------

    private _syncFormValue() {
        this._internals.setFormValue(this.value);
        if (this.error) {
            this._internals.setValidity({ customError: true }, this.error);
        } else if (this.required && !this.value) {
            this._internals.setValidity({ valueMissing: true }, 'Please select a date.');
        } else {
            this._internals.setValidity({});
        }
    }

    override willUpdate(changed: Map<string, unknown>) {
        if (changed.has('value') || changed.has('required') || changed.has('error')) {
            this._syncFormValue();
        }
        if (changed.has('value')) {
            // When value changes, snap the calendar view to it for next open.
            const d = this._parseISO(this.value);
            if (d) {
                this._viewYear = d.getFullYear();
                this._viewMonth = d.getMonth();
                this._focusedISO = this.value;
            }
        }
        if (changed.has('_open')) {
            this.toggleAttribute('data-open', this._open);
            if (this._open) {
                // Set initial focus target if none yet
                if (!this._focusedISO) {
                    const today = new Date();
                    this._focusedISO = this.value || this._toISO(today);
                    this._viewYear = (this._parseISO(this._focusedISO) ?? today).getFullYear();
                    this._viewMonth = (this._parseISO(this._focusedISO) ?? today).getMonth();
                }
            }
        }
    }

    override updated(changed: Map<string, unknown>) {
        if (changed.has('_open') && this._open) {
            // Focus the focused day cell on next paint
            queueMicrotask(() => this._focusDay());
        }
        if (changed.has('_focusedISO') && this._open) {
            this._focusDay();
        }
    }

    override connectedCallback() {
        super.connectedCallback();
        this._syncFormValue();
        document.addEventListener('click', this._onDocClick);
        document.addEventListener('keydown', this._onKeyDown);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._onDocClick);
        document.removeEventListener('keydown', this._onKeyDown);
    }

    private _onDocClick = (e: MouseEvent) => {
        if (!this._open) return;
        if (!e.composedPath().includes(this)) this.hide();
    };

    private _onKeyDown = (e: KeyboardEvent) => {
        if (!this._open) return;
        if (!e.composedPath().includes(this)) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            this.hide();
            this._triggerEl?.focus();
            return;
        }
        const focused = this._parseISO(this._focusedISO);
        if (!focused) return;
        const next = new Date(focused);
        switch (e.key) {
            case 'ArrowLeft':
                next.setDate(focused.getDate() - 1);
                break;
            case 'ArrowRight':
                next.setDate(focused.getDate() + 1);
                break;
            case 'ArrowUp':
                next.setDate(focused.getDate() - 7);
                break;
            case 'ArrowDown':
                next.setDate(focused.getDate() + 7);
                break;
            case 'PageUp':
                next.setMonth(focused.getMonth() - (e.shiftKey ? 12 : 1));
                break;
            case 'PageDown':
                next.setMonth(focused.getMonth() + (e.shiftKey ? 12 : 1));
                break;
            case 'Home':
                next.setDate(focused.getDate() - focused.getDay());
                break;
            case 'End':
                next.setDate(focused.getDate() + (6 - focused.getDay()));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                this._selectDate(focused);
                return;
            default:
                return;
        }
        e.preventDefault();
        this._focusedISO = this._toISO(next);
        this._viewYear = next.getFullYear();
        this._viewMonth = next.getMonth();
    };

    private _focusDay() {
        const btn = this.renderRoot.querySelector<HTMLButtonElement>(
            `.day[data-iso="${this._focusedISO}"]`,
        );
        btn?.focus();
    }

    private _selectDate(d: Date) {
        if (!this._isInRange(d)) return;
        this.value = this._toISO(d);
        this._focusedISO = this.value;
        this.hide();
        this._triggerEl?.focus();
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: this.value },
            }),
        );
    }

    private _toggle = () => {
        if (this._open) this.hide();
        else this.show();
    };

    private _navMonth(delta: number) {
        let m = this._viewMonth + delta;
        let y = this._viewYear;
        if (m < 0) {
            m = 11;
            y -= 1;
        } else if (m > 11) {
            m = 0;
            y += 1;
        }
        this._viewYear = y;
        this._viewMonth = m;
    }

    // --- Render ----------------------------------------------------------

    override render() {
        const invalid = this.error.length > 0;
        const inputId = this._id;
        const selected = this._parseISO(this.value);
        const display = selected ? this._formatDisplay(selected) : '';
        return html`
            ${this.label
                ? html`<label part="label" for=${inputId}>
                      ${this.label}
                      ${this.required
                          ? html`<span class="required" aria-hidden="true">*</span>`
                          : nothing}
                  </label>`
                : nothing}
            <button
                type="button"
                id=${inputId}
                part="trigger"
                class="trigger ${invalid ? 'invalid' : ''}"
                ?disabled=${this.disabled}
                aria-haspopup="dialog"
                aria-expanded=${this._open ? 'true' : 'false'}
                aria-invalid=${invalid ? 'true' : 'false'}
                @click=${this._toggle}
            >
                <span class=${display ? '' : 'placeholder'}>${display || this.placeholder}</span>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect
                        x="2"
                        y="3"
                        width="12"
                        height="11"
                        rx="1.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                    ></rect>
                    <path
                        d="M2 6.5h12M5 2v2M11 2v2"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    ></path>
                </svg>
            </button>
            ${this._open ? this._renderPopup() : nothing}
            ${invalid
                ? html`<p part="error" class="error" role="alert">${this.error}</p>`
                : this.hint
                  ? html`<p part="hint" class="hint">${this.hint}</p>`
                  : nothing}
        `;
    }

    private _renderPopup() {
        const today = new Date();
        const selected = this._parseISO(this.value);
        const focused = this._parseISO(this._focusedISO);
        const firstOfMonth = new Date(this._viewYear, this._viewMonth, 1);
        const gridStart = new Date(firstOfMonth);
        gridStart.setDate(1 - firstOfMonth.getDay());

        // Always render 42 cells for consistent height
        const days = Array.from({ length: 42 }, (_, i) => {
            const d = new Date(gridStart);
            d.setDate(gridStart.getDate() + i);
            return d;
        });

        return html`
            <div
                class="popup"
                part="popup"
                role="dialog"
                aria-label="Choose date"
                @click=${(e: Event) => e.stopPropagation()}
            >
                <div class="nav">
                    <button
                        type="button"
                        class="nav-btn"
                        aria-label="Previous month"
                        @click=${() => this._navMonth(-1)}
                    >
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                                d="M10 4L6 8l4 4"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <span class="nav-label" aria-live="polite">
                        ${this._monthYearLabel(this._viewYear, this._viewMonth)}
                    </span>
                    <button
                        type="button"
                        class="nav-btn"
                        aria-label="Next month"
                        @click=${() => this._navMonth(1)}
                    >
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                                d="M6 4l4 4-4 4"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div class="weekdays" aria-hidden="true">
                    ${this._weekdayLabels().map((w) => html`<span>${w}</span>`)}
                </div>
                <div class="grid" role="grid">
                    ${days.map((d) => {
                        const iso = this._toISO(d);
                        const outside = d.getMonth() !== this._viewMonth;
                        const isToday = this._isSameDay(d, today);
                        const isSelected = selected ? this._isSameDay(d, selected) : false;
                        const isFocused = focused ? this._isSameDay(d, focused) : false;
                        const disabled = !this._isInRange(d);
                        const classes = [
                            'day',
                            outside ? 'outside' : '',
                            isToday ? 'today' : '',
                            isSelected ? 'selected' : '',
                        ]
                            .filter(Boolean)
                            .join(' ');
                        return html`
                            <button
                                type="button"
                                role="gridcell"
                                class=${classes}
                                data-iso=${iso}
                                tabindex=${isFocused ? 0 : -1}
                                ?disabled=${disabled}
                                aria-selected=${isSelected ? 'true' : 'false'}
                                aria-label=${this._formatDisplay(d)}
                                @click=${() => this._selectDate(d)}
                            >
                                ${d.getDate()}
                            </button>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-date-picker': MfpDatePicker;
    }
}
