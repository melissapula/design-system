import { expect, fixture, html } from '@open-wc/testing';
import './divider.js';
import type { MfpDivider } from './divider.js';

describe('<mfp-divider>', () => {
    it('renders a single hr without label', async () => {
        const el = await fixture<MfpDivider>(html`<mfp-divider></mfp-divider>`);
        expect(el.shadowRoot?.querySelectorAll('hr').length).to.equal(1);
    });

    it('renders two hr elements when a label is set', async () => {
        const el = await fixture<MfpDivider>(html`<mfp-divider label="or"></mfp-divider>`);
        expect(el.shadowRoot?.querySelectorAll('hr').length).to.equal(2);
        expect(el.shadowRoot?.querySelector('.label')?.textContent?.trim()).to.equal('or');
    });
});
