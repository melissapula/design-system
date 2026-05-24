import { expect, fixture, html } from '@open-wc/testing';
import './switch.js';
import type { MfpSwitch } from './switch.js';

describe('<mfp-switch>', () => {
    it('renders unchecked by default', async () => {
        const el = await fixture<MfpSwitch>(html`<mfp-switch label="Test"></mfp-switch>`);
        expect(el.checked).to.equal(false);
        expect(el.shadowRoot?.querySelector('input')?.checked).to.equal(false);
    });

    it('uses role="switch" on the inner input', async () => {
        const el = await fixture<MfpSwitch>(html`<mfp-switch></mfp-switch>`);
        expect(el.shadowRoot?.querySelector('input')?.getAttribute('role')).to.equal('switch');
    });

    it('toggles via user change event', async () => {
        const el = await fixture<MfpSwitch>(html`<mfp-switch></mfp-switch>`);
        let detail: { checked: boolean } | null = null;
        el.addEventListener('change', (e) => {
            detail = (e as CustomEvent).detail;
        });
        const input = el.shadowRoot!.querySelector('input')!;
        input.checked = true;
        input.dispatchEvent(new Event('change'));
        expect(detail).to.deep.equal({ checked: true });
        expect(el.checked).to.equal(true);
    });

    it('submits value to form when checked', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-switch name="dark" value="yes" checked></mfp-switch>
            </form>
        `);
        const fd = new FormData(form);
        expect(fd.get('dark')).to.equal('yes');
    });

    it('does not submit when off', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-switch name="dark" value="yes"></mfp-switch>
            </form>
        `);
        const fd = new FormData(form);
        expect(fd.get('dark')).to.equal(null);
    });
});
