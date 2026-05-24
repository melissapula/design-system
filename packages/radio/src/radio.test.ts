import { expect, fixture, html } from '@open-wc/testing';
import './radio.js';
import type { MfpRadio } from './radio.js';

describe('<mfp-radio>', () => {
    it('renders unchecked by default', async () => {
        const el = await fixture<MfpRadio>(html`<mfp-radio label="Test"></mfp-radio>`);
        expect(el.checked).to.equal(false);
    });

    it('reflects checked attribute', async () => {
        const el = await fixture<MfpRadio>(html`<mfp-radio></mfp-radio>`);
        el.checked = true;
        await el.updateComplete;
        expect(el.hasAttribute('checked')).to.equal(true);
    });

    it('unchecks siblings with same name when selected', async () => {
        const container = await fixture<HTMLDivElement>(html`
            <div>
                <mfp-radio name="g" value="a" checked></mfp-radio>
                <mfp-radio name="g" value="b"></mfp-radio>
                <mfp-radio name="g" value="c"></mfp-radio>
            </div>
        `);
        const radios = container.querySelectorAll<MfpRadio>('mfp-radio');
        // Simulate user clicking the second radio
        const second = radios[1]!;
        const innerInput = second.shadowRoot!.querySelector('input')!;
        innerInput.checked = true;
        innerInput.dispatchEvent(new Event('change'));
        await second.updateComplete;
        expect(radios[0]!.checked).to.equal(false);
        expect(radios[1]!.checked).to.equal(true);
        expect(radios[2]!.checked).to.equal(false);
    });

    it('submits the checked value to form under name', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-radio name="g" value="a"></mfp-radio>
                <mfp-radio name="g" value="b" checked></mfp-radio>
            </form>
        `);
        const fd = new FormData(form);
        expect(fd.get('g')).to.equal('b');
    });
});
