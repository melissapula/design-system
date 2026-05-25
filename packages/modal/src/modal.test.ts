import { expect, fixture, html } from '@open-wc/testing';
import './modal.js';
import type { MfpModal } from './modal.js';

describe('<mfp-modal>', () => {
    it('renders closed by default', async () => {
        const el = await fixture<MfpModal>(html`<mfp-modal>Hello</mfp-modal>`);
        expect(el.open).to.equal(false);
        expect(el.shadowRoot?.querySelector('dialog')?.open).to.equal(false);
    });

    it('the inner dialog is not visible when closed', async () => {
        // Regression: an earlier version applied `display: flex` to the
        // bare `dialog` selector, overriding the UA rule
        // `dialog:not([open]) { display: none }`, so the modal rendered
        // visible in normal flow at mount. Lock that down here.
        const el = await fixture<MfpModal>(html`<mfp-modal>Hello</mfp-modal>`);
        const dialog = el.shadowRoot!.querySelector('dialog')!;
        expect(getComputedStyle(dialog).display).to.equal('none');
    });

    it('opens via show()', async () => {
        const el = await fixture<MfpModal>(html`<mfp-modal>Hello</mfp-modal>`);
        el.show();
        await el.updateComplete;
        expect(el.open).to.equal(true);
        expect(el.shadowRoot?.querySelector('dialog')?.open).to.equal(true);
    });

    it('closes via close() and fires close event', async () => {
        const el = await fixture<MfpModal>(html`<mfp-modal>Hello</mfp-modal>`);
        el.show();
        await el.updateComplete;
        // Confirm the native dialog actually opened before we test the close path
        const dialog = el.shadowRoot!.querySelector('dialog')!;
        expect(dialog.open).to.equal(true);

        // Wait for the close event explicitly rather than guessing at timing
        const closePromise = new Promise<void>((resolve) =>
            el.addEventListener('close', () => resolve(), { once: true }),
        );
        el.close();
        await closePromise;
        expect(el.open).to.equal(false);
    });

    it('reflects the open attribute', async () => {
        const el = await fixture<MfpModal>(html`<mfp-modal>Hello</mfp-modal>`);
        el.open = true;
        await el.updateComplete;
        expect(el.hasAttribute('open')).to.equal(true);
    });

    it('renders the close button by default', async () => {
        const el = await fixture<MfpModal>(html`<mfp-modal>Hello</mfp-modal>`);
        expect(el.shadowRoot?.querySelector('.close')).to.exist;
    });

    it('hides the close button when no-close-button is set', async () => {
        const el = await fixture<MfpModal>(html`<mfp-modal no-close-button>Hello</mfp-modal>`);
        expect(el.shadowRoot?.querySelector('.close')).to.equal(null);
    });
});
