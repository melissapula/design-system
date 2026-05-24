import { expect, fixture, html } from '@open-wc/testing';
import './tabs.js';
import type { MfpTab, MfpTabPanel, MfpTabs } from './tabs.js';

describe('<mfp-tabs>', () => {
    async function setup() {
        return fixture<MfpTabs>(html`
            <mfp-tabs>
                <mfp-tab slot="tab" value="a">A</mfp-tab>
                <mfp-tab slot="tab" value="b">B</mfp-tab>
                <mfp-tab slot="tab" value="c">C</mfp-tab>
                <mfp-tab-panel value="a">Panel A</mfp-tab-panel>
                <mfp-tab-panel value="b">Panel B</mfp-tab-panel>
                <mfp-tab-panel value="c">Panel C</mfp-tab-panel>
            </mfp-tabs>
        `);
    }

    it('selects the first tab by default', async () => {
        const el = await setup();
        await el.updateComplete;
        expect(el.value).to.equal('a');
        const tabs = el.querySelectorAll<MfpTab>('mfp-tab');
        expect(tabs[0]!.selected).to.equal(true);
        expect(tabs[1]!.selected).to.equal(false);
    });

    it('shows only the matching panel', async () => {
        const el = await setup();
        await el.updateComplete;
        const panels = el.querySelectorAll<MfpTabPanel>('mfp-tab-panel');
        expect(panels[0]!.hidden).to.equal(false);
        expect(panels[1]!.hidden).to.equal(true);
        expect(panels[2]!.hidden).to.equal(true);
    });

    it('clicking a tab selects it and shows its panel', async () => {
        const el = await setup();
        await el.updateComplete;
        const tabs = el.querySelectorAll<MfpTab>('mfp-tab');
        tabs[1]!.click();
        await el.updateComplete;
        expect(el.value).to.equal('b');
        const panels = el.querySelectorAll<MfpTabPanel>('mfp-tab-panel');
        expect(panels[1]!.hidden).to.equal(false);
        expect(panels[0]!.hidden).to.equal(true);
    });

    it('ArrowRight moves selection to the next tab', async () => {
        const el = await setup();
        await el.updateComplete;
        const tabs = el.querySelectorAll<MfpTab>('mfp-tab');
        tabs[0]!.focus();
        tabs[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        expect(el.value).to.equal('b');
    });

    it('ArrowLeft wraps to the last tab from the first', async () => {
        const el = await setup();
        await el.updateComplete;
        const tabs = el.querySelectorAll<MfpTab>('mfp-tab');
        tabs[0]!.focus();
        tabs[0]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        await el.updateComplete;
        expect(el.value).to.equal('c');
    });

    it('sets proper ARIA roles and attributes', async () => {
        const el = await setup();
        await el.updateComplete;
        const tabs = el.querySelectorAll<MfpTab>('mfp-tab');
        expect(tabs[0]!.getAttribute('role')).to.equal('tab');
        expect(tabs[0]!.getAttribute('aria-selected')).to.equal('true');
        expect(tabs[1]!.getAttribute('aria-selected')).to.equal('false');
        const panels = el.querySelectorAll<MfpTabPanel>('mfp-tab-panel');
        expect(panels[0]!.getAttribute('role')).to.equal('tabpanel');
        expect(panels[0]!.getAttribute('aria-labelledby')).to.equal(tabs[0]!.id);
    });
});
