import { expect, fixture, html } from '@open-wc/testing';
import './spinner.js';
import type { MfpSpinner } from './spinner.js';

describe('<mfp-spinner>', () => {
    it('renders with default label', async () => {
        const el = await fixture<MfpSpinner>(html`<mfp-spinner></mfp-spinner>`);
        const ring = el.shadowRoot?.querySelector('.ring');
        expect(ring?.getAttribute('aria-label')).to.equal('Loading');
        expect(ring?.getAttribute('role')).to.equal('status');
    });

    it('accepts a custom label', async () => {
        const el = await fixture<MfpSpinner>(html`<mfp-spinner label="Saving…"></mfp-spinner>`);
        expect(el.shadowRoot?.querySelector('.ring')?.getAttribute('aria-label')).to.equal(
            'Saving…',
        );
    });
});
