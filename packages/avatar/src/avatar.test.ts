import { expect, fixture, html } from '@open-wc/testing';
import './avatar.js';
import type { MfpAvatar } from './avatar.js';

describe('<mfp-avatar>', () => {
    it('renders initials from a two-word name', async () => {
        const el = await fixture<MfpAvatar>(html`<mfp-avatar name="Melissa Pula"></mfp-avatar>`);
        const text = el.shadowRoot?.textContent?.trim();
        expect(text).to.equal('MP');
    });

    it('renders initials from a single-word name', async () => {
        const el = await fixture<MfpAvatar>(html`<mfp-avatar name="Melissa"></mfp-avatar>`);
        const text = el.shadowRoot?.textContent?.trim();
        expect(text).to.equal('ME');
    });

    it('renders an <img> when src is given', async () => {
        const el = await fixture<MfpAvatar>(html`<mfp-avatar src="/x.png" name="A"></mfp-avatar>`);
        expect(el.shadowRoot?.querySelector('img')).to.exist;
    });

    it('renders status dot when status is set', async () => {
        const el = await fixture<MfpAvatar>(
            html`<mfp-avatar name="A" status="online"></mfp-avatar>`,
        );
        const dot = el.shadowRoot?.querySelector('.status');
        expect(dot?.getAttribute('data-status')).to.equal('online');
    });
});
