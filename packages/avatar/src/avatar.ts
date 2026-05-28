import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

@customElement('mfp-avatar')
export class MfpAvatar extends LitElement {
    static override styles = css`
        :host {
            display: inline-block;
            position: relative;
            font-family: var(--font-family-sans, system-ui, -apple-system, sans-serif);
            line-height: 1;
            vertical-align: middle;
        }

        .avatar {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--color-background-muted, #f3f4f6);
            color: var(--color-text-default, #111827);
            font-weight: var(--font-weight-semibold, 600);
            text-transform: uppercase;
            overflow: hidden;
            user-select: none;
        }

        :host([shape='square']) .avatar {
            border-radius: var(--radius-control, 8px);
        }
        :host(:not([shape])) .avatar,
        :host([shape='circle']) .avatar {
            border-radius: var(--radius-pill, 50%);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        :host(:not([size])),
        :host([size='md']) {
            font-size: var(--text-label, 14px);
        }
        :host(:not([size])) .avatar,
        :host([size='md']) .avatar {
            width: var(--size-control-md, 40px);
            height: var(--size-control-md, 40px);
        }
        :host([size='sm']) {
            font-size: var(--text-caption, 12px);
        }
        :host([size='sm']) .avatar {
            width: 28px;
            height: 28px;
        }
        :host([size='lg']) {
            font-size: var(--text-heading-xs, 18px);
        }
        :host([size='lg']) .avatar {
            width: var(--size-control-xl, 56px);
            height: var(--size-control-xl, 56px);
        }
        :host([size='xl']) {
            font-size: var(--text-heading-md, 24px);
        }
        :host([size='xl']) .avatar {
            width: 80px;
            height: 80px;
        }

        .status {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 30%;
            height: 30%;
            min-width: 8px;
            min-height: 8px;
            border-radius: var(--radius-pill, 50%);
            border: var(--size-border-width-medium, 2px) solid
                var(--color-background-default, #ffffff);
            box-sizing: content-box;
        }

        .status[data-status='online'] {
            background: var(--color-status-success-solid, #16a34a);
        }
        .status[data-status='busy'] {
            background: var(--color-status-error-solid, #dc2626);
        }
        .status[data-status='away'] {
            background: var(--color-status-warning-solid, #f59e0b);
        }
        .status[data-status='offline'] {
            background: var(--color-neutral-400, #9ca3af);
        }
    `;

    @property() src = '';
    @property() name = '';
    @property() alt = '';
    @property({ reflect: true }) size: AvatarSize = 'md';
    @property({ reflect: true }) shape: AvatarShape = 'circle';
    @property() status?: AvatarStatus;

    @state() private _imgFailed = false;

    private _onError = () => {
        this._imgFailed = true;
    };

    override updated(changed: Map<string, unknown>) {
        if (changed.has('src')) this._imgFailed = false;
    }

    override render() {
        const initials = getInitials(this.name);
        const altText = this.alt || this.name || '';
        const showImage = this.src && !this._imgFailed;
        return html`
            <span class="avatar" part="avatar">
                ${showImage
                    ? html`<img src=${this.src} alt=${altText} @error=${this._onError} />`
                    : initials
                      ? html`<span aria-label=${altText || nothing}>${initials}</span>`
                      : html`<svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            width="60%"
                            height="60%"
                            aria-label=${altText || 'User avatar'}
                        >
                            <path
                                d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 2c-3.5 0-6.5 1.5-6.5 4v.5h13V16c0-2.5-3-4-6.5-4z"
                            />
                        </svg>`}
            </span>
            ${this.status
                ? html`<span
                      class="status"
                      part="status"
                      data-status=${this.status}
                      aria-label=${this.status}
                  ></span>`
                : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mfp-avatar': MfpAvatar;
    }
}
