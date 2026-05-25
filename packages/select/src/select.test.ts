import { expect, fixture, html } from '@open-wc/testing';
import './select.js';
import type { MfpSelect } from './select.js';

describe('<mfp-select>', () => {
    it('renders with options forwarded into the inner select', async () => {
        const el = await fixture<MfpSelect>(html`
            <mfp-select label="Color">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </mfp-select>
        `);
        await el.updateComplete;
        const innerSelect = el.shadowRoot!.querySelector('select')!;
        const options = innerSelect.querySelectorAll('option[data-mfp-cloned]');
        expect(options.length).to.equal(3);
        expect(options[0]!.getAttribute('value')).to.equal('red');
    });

    it('keeps the placeholder option when slotted options change', async () => {
        const el = await fixture<MfpSelect>(html`
            <mfp-select placeholder="Pick one…">
                <option value="a">A</option>
            </mfp-select>
        `);
        await el.updateComplete;
        const innerSelect = el.shadowRoot!.querySelector('select')!;
        expect(innerSelect.querySelector('option[data-mfp-placeholder]')).to.exist;
        expect(innerSelect.querySelectorAll('option[data-mfp-cloned]').length).to.equal(1);
    });

    it('survives a re-render after slot change (regression for Lit marker wipe)', async () => {
        // Regression: an earlier version used `select.textContent = ''` to clear
        // the inner select, which removed Lit's invisible ChildPart marker
        // comment nodes for the conditional placeholder template. The next time
        // Lit re-rendered (e.g., when a consumer updated `value` via Angular's
        // ControlValueAccessor or Vue's v-model), it crashed looking for its
        // markers. Lock that down by exercising the re-render path.
        const el = await fixture<MfpSelect>(html`
            <mfp-select placeholder="Pick one…">
                <option value="a">A</option>
                <option value="b">B</option>
            </mfp-select>
        `);
        await el.updateComplete;

        // Trigger Lit re-render after the initial slot change happened.
        el.value = 'b';
        await el.updateComplete;
        el.label = 'Changed label';
        await el.updateComplete;

        // If the markers were wiped, one of the above awaits would have thrown.
        // Also assert end state is sane.
        const innerSelect = el.shadowRoot!.querySelector('select')!;
        expect(innerSelect.value).to.equal('b');
        expect(innerSelect.querySelectorAll('option[data-mfp-cloned]').length).to.equal(2);
    });

    it('submits the selected value to a form', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-select name="color" .value=${'green'}>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                </mfp-select>
            </form>
        `);
        await form.querySelector<MfpSelect>('mfp-select')!.updateComplete;
        const fd = new FormData(form);
        expect(fd.get('color')).to.equal('green');
    });

    it('reports invalid when required and empty', async () => {
        const el = await fixture<MfpSelect>(html`
            <mfp-select required placeholder="Pick one…">
                <option value="a">A</option>
            </mfp-select>
        `);
        await el.updateComplete;
        expect(el.checkValidity()).to.equal(false);
        el.value = 'a';
        await el.updateComplete;
        expect(el.checkValidity()).to.equal(true);
    });
});
