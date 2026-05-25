import { expect, fixture, html } from '@open-wc/testing';
import './nav.js';
import type { MfpNavBar, MfpNavItem, MfpSideNav } from './nav.js';

describe('<mfp-nav-item>', () => {
    it('renders an <a> when href is set', async () => {
        const el = await fixture<MfpNavItem>(html`<mfp-nav-item href="/home">Home</mfp-nav-item>`);
        await el.updateComplete;
        const link = el.shadowRoot?.querySelector('a');
        expect(link).to.exist;
        expect(link?.getAttribute('href')).to.equal('/home');
    });

    it('renders a <button> when no href is set', async () => {
        const el = await fixture<MfpNavItem>(html`<mfp-nav-item>Click</mfp-nav-item>`);
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('button')).to.exist;
        expect(el.shadowRoot?.querySelector('a')).to.equal(null);
    });

    it('sets aria-current="page" when active', async () => {
        const el = await fixture<MfpNavItem>(
            html`<mfp-nav-item href="/x" active>Active</mfp-nav-item>`,
        );
        await el.updateComplete;
        const link = el.shadowRoot?.querySelector('a');
        expect(link?.getAttribute('aria-current')).to.equal('page');
    });

    it('does not set aria-current when not active', async () => {
        const el = await fixture<MfpNavItem>(html`<mfp-nav-item href="/x">Inactive</mfp-nav-item>`);
        await el.updateComplete;
        const link = el.shadowRoot?.querySelector('a');
        expect(link?.getAttribute('aria-current')).to.equal(null);
    });

    it('prevents click when disabled', async () => {
        const el = await fixture<MfpNavItem>(
            html`<mfp-nav-item href="/x" disabled>Disabled</mfp-nav-item>`,
        );
        await el.updateComplete;
        let defaultPrevented = false;
        el.shadowRoot!.querySelector('a')!.addEventListener('click', (e) => {
            defaultPrevented = e.defaultPrevented;
        });
        const click = new MouseEvent('click', { bubbles: true, cancelable: true });
        el.shadowRoot!.querySelector('a')!.dispatchEvent(click);
        expect(defaultPrevented).to.equal(true);
    });
});

describe('<mfp-nav-bar>', () => {
    it('propagates horizontal orientation to nav items', async () => {
        const el = await fixture<MfpNavBar>(html`
            <mfp-nav-bar>
                <mfp-nav-item href="/a">A</mfp-nav-item>
                <mfp-nav-item href="/b">B</mfp-nav-item>
            </mfp-nav-bar>
        `);
        await el.updateComplete;
        const items = el.querySelectorAll<MfpNavItem>('mfp-nav-item');
        expect(items[0]!.orientation).to.equal('horizontal');
        expect(items[1]!.orientation).to.equal('horizontal');
    });

    it('renders sticky positioning when sticky attribute is set', async () => {
        const el = await fixture<MfpNavBar>(html`<mfp-nav-bar sticky></mfp-nav-bar>`);
        await el.updateComplete;
        expect(el.hasAttribute('sticky')).to.equal(true);
    });
});

describe('<mfp-side-nav>', () => {
    it('propagates vertical orientation to nav items', async () => {
        const el = await fixture<MfpSideNav>(html`
            <mfp-side-nav>
                <mfp-nav-item href="/a">A</mfp-nav-item>
                <mfp-nav-item href="/b">B</mfp-nav-item>
            </mfp-side-nav>
        `);
        await el.updateComplete;
        const items = el.querySelectorAll<MfpNavItem>('mfp-nav-item');
        expect(items[0]!.orientation).to.equal('vertical');
        expect(items[1]!.orientation).to.equal('vertical');
    });

    it('hides empty header and footer slots', async () => {
        const el = await fixture<MfpSideNav>(html`
            <mfp-side-nav>
                <mfp-nav-item href="/a">A</mfp-nav-item>
            </mfp-side-nav>
        `);
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header');
        const footer = el.shadowRoot!.querySelector('.footer');
        expect(header?.hasAttribute('data-empty')).to.equal(true);
        expect(footer?.hasAttribute('data-empty')).to.equal(true);
    });
});
