import { expect, fixture, html } from '@open-wc/testing';
import './tooltip.js';
import type { MfpTooltip } from './tooltip.js';

describe('<mfp-tooltip>', () => {
    it('wires aria-describedby on the first slotted child', async () => {
        const el = await fixture<MfpTooltip>(html`
            <mfp-tooltip content="hello"><button>Anchor</button></mfp-tooltip>
        `);
        const btn = el.querySelector('button')!;
        await el.updateComplete;
        expect(btn.getAttribute('aria-describedby')).to.match(/^mfp-tooltip-/);
    });

    it('shows on mouseenter and hides on mouseleave', async () => {
        const el = await fixture<MfpTooltip>(html`
            <mfp-tooltip content="hi"><button>x</button></mfp-tooltip>
        `);
        const bubble = el.shadowRoot!.querySelector('.bubble')!;
        expect(bubble.getAttribute('data-visible')).to.equal('false');
        el.dispatchEvent(new Event('mouseenter'));
        await el.updateComplete;
        expect(bubble.getAttribute('data-visible')).to.equal('true');
        el.dispatchEvent(new Event('mouseleave'));
        await el.updateComplete;
        expect(bubble.getAttribute('data-visible')).to.equal('false');
    });

    it('hides on Escape key', async () => {
        const el = await fixture<MfpTooltip>(html`
            <mfp-tooltip content="hi"><button>x</button></mfp-tooltip>
        `);
        el.dispatchEvent(new Event('mouseenter'));
        await el.updateComplete;
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.bubble')!.getAttribute('data-visible')).to.equal(
            'false',
        );
    });
});
