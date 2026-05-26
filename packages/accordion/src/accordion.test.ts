import { expect, fixture, html } from '@open-wc/testing';
import './accordion.js';
import type { MfpAccordion, MfpAccordionItem } from './accordion.js';

describe('<mfp-accordion-item>', () => {
    it('renders closed by default', async () => {
        const el = await fixture<MfpAccordionItem>(html`
            <mfp-accordion-item label="One">body</mfp-accordion-item>
        `);
        await el.updateComplete;
        expect(el.open).to.equal(false);
        expect(el.shadowRoot?.querySelector('details')?.open).to.equal(false);
    });

    it('reflects open attribute', async () => {
        const el = await fixture<MfpAccordionItem>(html`
            <mfp-accordion-item label="One" open>body</mfp-accordion-item>
        `);
        await el.updateComplete;
        expect(el.hasAttribute('open')).to.equal(true);
        expect(el.shadowRoot?.querySelector('details')?.open).to.equal(true);
    });

    it('fires toggle event when opened by click', async () => {
        const el = await fixture<MfpAccordionItem>(html`
            <mfp-accordion-item label="One">body</mfp-accordion-item>
        `);
        await el.updateComplete;
        let eventOpen: boolean | undefined;
        el.addEventListener('toggle', (e) => {
            // The component dispatches a CustomEvent named 'toggle' to be
            // ergonomic, but TS's lib.dom.d.ts types listeners for 'toggle'
            // as the native ToggleEvent. Cast through unknown.
            eventOpen = (e as unknown as CustomEvent<{ open: boolean }>).detail.open;
        });
        // Simulate user clicking the summary — sets details.open then fires toggle
        const details = el.shadowRoot!.querySelector('details')!;
        details.open = true;
        details.dispatchEvent(new Event('toggle'));
        await el.updateComplete;
        expect(el.open).to.equal(true);
        expect(eventOpen).to.equal(true);
    });

    it('renders label or slotted header', async () => {
        const labelOnly = await fixture<MfpAccordionItem>(html`
            <mfp-accordion-item label="Label">body</mfp-accordion-item>
        `);
        const summary = labelOnly.shadowRoot!.querySelector('summary')!;
        expect(summary.textContent).to.include('Label');
    });
});

describe('<mfp-accordion exclusive>', () => {
    it('does NOT close siblings when not exclusive', async () => {
        const el = await fixture<MfpAccordion>(html`
            <mfp-accordion>
                <mfp-accordion-item label="A" open>A</mfp-accordion-item>
                <mfp-accordion-item label="B">B</mfp-accordion-item>
            </mfp-accordion>
        `);
        await el.updateComplete;
        const items = el.querySelectorAll<MfpAccordionItem>('mfp-accordion-item');
        // Open B
        items[1]!.open = true;
        items[1]!.shadowRoot!.querySelector('details')!.open = true;
        items[1]!.shadowRoot!.querySelector('details')!.dispatchEvent(new Event('toggle'));
        await el.updateComplete;
        expect(items[0]!.open).to.equal(true);
        expect(items[1]!.open).to.equal(true);
    });

    it('closes sibling when one opens in exclusive mode', async () => {
        const el = await fixture<MfpAccordion>(html`
            <mfp-accordion exclusive>
                <mfp-accordion-item label="A" open>A</mfp-accordion-item>
                <mfp-accordion-item label="B">B</mfp-accordion-item>
                <mfp-accordion-item label="C">C</mfp-accordion-item>
            </mfp-accordion>
        `);
        await el.updateComplete;
        const items = el.querySelectorAll<MfpAccordionItem>('mfp-accordion-item');
        // Open B — should close A
        const bDetails = items[1]!.shadowRoot!.querySelector('details')!;
        bDetails.open = true;
        bDetails.dispatchEvent(new Event('toggle'));
        await items[0]!.updateComplete;
        await items[1]!.updateComplete;
        expect(items[0]!.open).to.equal(false);
        expect(items[1]!.open).to.equal(true);
        expect(items[2]!.open).to.equal(false);
    });

    it('closing an item does NOT ripple to siblings', async () => {
        const el = await fixture<MfpAccordion>(html`
            <mfp-accordion exclusive>
                <mfp-accordion-item label="A" open>A</mfp-accordion-item>
                <mfp-accordion-item label="B">B</mfp-accordion-item>
            </mfp-accordion>
        `);
        await el.updateComplete;
        const items = el.querySelectorAll<MfpAccordionItem>('mfp-accordion-item');
        // Close A — B should stay where it was
        const aDetails = items[0]!.shadowRoot!.querySelector('details')!;
        aDetails.open = false;
        aDetails.dispatchEvent(new Event('toggle'));
        await el.updateComplete;
        expect(items[0]!.open).to.equal(false);
        expect(items[1]!.open).to.equal(false);
    });
});
