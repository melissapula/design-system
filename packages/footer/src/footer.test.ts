import { expect, fixture, html } from '@open-wc/testing';
import './footer.js';
import type { MfpFooter } from './footer.js';

describe('<mfp-footer>', () => {
    it('renders slotted content inside a footer element', async () => {
        const el = await fixture<MfpFooter>(html`<mfp-footer>© 2026</mfp-footer>`);
        await el.updateComplete;
        const footerEl = el.shadowRoot?.querySelector('footer');
        expect(footerEl).to.exist;
        expect(el.textContent?.trim()).to.include('© 2026');
    });

    it('defaults to the "default" variant', async () => {
        const el = await fixture<MfpFooter>(html`<mfp-footer>x</mfp-footer>`);
        await el.updateComplete;
        expect(el.variant).to.equal('default');
        expect(el.getAttribute('variant')).to.equal('default');
    });

    it('reflects brand variant', async () => {
        const el = await fixture<MfpFooter>(html`<mfp-footer variant="brand">x</mfp-footer>`);
        await el.updateComplete;
        expect(el.getAttribute('variant')).to.equal('brand');
    });

    it('reflects dark variant', async () => {
        const el = await fixture<MfpFooter>(html`<mfp-footer variant="dark">x</mfp-footer>`);
        await el.updateComplete;
        expect(el.getAttribute('variant')).to.equal('dark');
    });
});
