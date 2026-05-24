import { expect, fixture, html } from '@open-wc/testing';
import './badge.js';
import type { MfpBadge } from './badge.js';

describe('<mfp-badge>', () => {
    it('renders slotted content', async () => {
        const el = await fixture<MfpBadge>(html`<mfp-badge>New</mfp-badge>`);
        expect(el.textContent?.trim()).to.equal('New');
    });

    it('reflects variant attribute', async () => {
        const el = await fixture<MfpBadge>(html`<mfp-badge variant="success">OK</mfp-badge>`);
        expect(el.getAttribute('variant')).to.equal('success');
    });
});
