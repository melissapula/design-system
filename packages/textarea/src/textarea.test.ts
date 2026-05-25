import { expect, fixture, html } from '@open-wc/testing';
import './textarea.js';
import type { MfpTextarea } from './textarea.js';

describe('<mfp-textarea>', () => {
    it('renders with defaults', async () => {
        const el = await fixture<MfpTextarea>(html`<mfp-textarea label="Notes"></mfp-textarea>`);
        expect(el.size).to.equal('md');
        expect(el.shadowRoot?.querySelector('textarea')).to.exist;
    });

    it('fires input event with detail.value', async () => {
        const el = await fixture<MfpTextarea>(html`<mfp-textarea></mfp-textarea>`);
        let value = '';
        el.addEventListener('input', (e) => {
            value = (e as CustomEvent).detail.value;
        });
        const ta = el.shadowRoot!.querySelector('textarea')!;
        ta.value = 'hello';
        ta.dispatchEvent(new Event('input'));
        expect(value).to.equal('hello');
    });

    it('submits value to form', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-textarea name="notes" .value=${'hello world'}></mfp-textarea>
            </form>
        `);
        const fd = new FormData(form);
        expect(fd.get('notes')).to.equal('hello world');
    });

    it('reports invalid when required and empty', async () => {
        const el = await fixture<MfpTextarea>(html`<mfp-textarea required></mfp-textarea>`);
        expect(el.checkValidity()).to.equal(false);
        el.value = 'something';
        await el.updateComplete;
        expect(el.checkValidity()).to.equal(true);
    });

    it('the inner textarea fits inside its .control wrapper (box-sizing regression)', async () => {
        // Regression: without box-sizing: border-box, width: 100% + padding
        // pushed the textarea wider than .control, so the native resize handle
        // appeared outside the bordered area.
        const el = await fixture<MfpTextarea>(html`
            <mfp-textarea style="width: 400px;"></mfp-textarea>
        `);
        await el.updateComplete;
        const control = el.shadowRoot!.querySelector('.control') as HTMLElement;
        const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
        expect(textarea.offsetWidth).to.be.at.most(control.offsetWidth);
    });
});
