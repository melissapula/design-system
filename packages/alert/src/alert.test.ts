import { expect, fixture, html } from '@open-wc/testing';
import './alert.js';
import type { MfpAlert } from './alert.js';

describe('<mfp-alert>', () => {
    it('renders slotted message', async () => {
        const el = await fixture<MfpAlert>(html`<mfp-alert>Hello there</mfp-alert>`);
        expect(el.textContent?.trim()).to.include('Hello there');
    });

    it('shows the dismiss button only when dismissible', async () => {
        const el = await fixture<MfpAlert>(html`<mfp-alert>x</mfp-alert>`);
        expect(el.shadowRoot?.querySelector('.close')).to.equal(null);
        const el2 = await fixture<MfpAlert>(html`<mfp-alert dismissible>x</mfp-alert>`);
        expect(el2.shadowRoot?.querySelector('.close')).to.exist;
    });

    it('dismissing fires close event and removes the alert', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <mfp-alert dismissible>dismiss me</mfp-alert>
            </div>
        `);
        const alert = container.querySelector<MfpAlert>('mfp-alert')!;
        let closed = false;
        alert.addEventListener('close', () => (closed = true));
        alert.shadowRoot!.querySelector<HTMLButtonElement>('.close')!.click();
        expect(closed).to.equal(true);
        expect(container.querySelector('mfp-alert')).to.equal(null);
    });
});
