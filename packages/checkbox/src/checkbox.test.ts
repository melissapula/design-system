import { expect, fixture, html } from '@open-wc/testing';
import './checkbox.js';
import type { MfpCheckbox } from './checkbox.js';

describe('<mfp-checkbox>', () => {
    it('renders unchecked by default', async () => {
        const el = await fixture<MfpCheckbox>(html`<mfp-checkbox label="Test"></mfp-checkbox>`);
        expect(el.checked).to.equal(false);
        expect(el.shadowRoot?.querySelector('input')?.checked).to.equal(false);
    });

    it('reflects checked attribute when toggled via property', async () => {
        const el = await fixture<MfpCheckbox>(html`<mfp-checkbox></mfp-checkbox>`);
        el.checked = true;
        await el.updateComplete;
        expect(el.hasAttribute('checked')).to.equal(true);
    });

    it('fires change event with detail.checked', async () => {
        const el = await fixture<MfpCheckbox>(html`<mfp-checkbox></mfp-checkbox>`);
        let detail: { checked: boolean } | null = null;
        el.addEventListener('change', (e) => {
            detail = (e as CustomEvent).detail;
        });
        const input = el.shadowRoot!.querySelector('input')!;
        input.checked = true;
        input.dispatchEvent(new Event('change'));
        expect(detail).to.deep.equal({ checked: true });
    });

    it('submits value to form when checked', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-checkbox name="agree" value="yes" checked></mfp-checkbox>
            </form>
        `);
        const fd = new FormData(form);
        expect(fd.get('agree')).to.equal('yes');
    });

    it('does not submit when unchecked', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-checkbox name="agree" value="yes"></mfp-checkbox>
            </form>
        `);
        const fd = new FormData(form);
        expect(fd.get('agree')).to.equal(null);
    });

    it('reports validity when required and unchecked', async () => {
        const el = await fixture<MfpCheckbox>(html`<mfp-checkbox required></mfp-checkbox>`);
        expect(el.checkValidity()).to.equal(false);
        el.checked = true;
        await el.updateComplete;
        expect(el.checkValidity()).to.equal(true);
    });

    it('shows indeterminate mark when indeterminate is true', async () => {
        const el = await fixture<MfpCheckbox>(html`<mfp-checkbox indeterminate></mfp-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.indeterminate).to.equal(true);
        expect(input.getAttribute('aria-checked')).to.equal('mixed');
    });
});
