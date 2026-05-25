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

    it('applies maxWidth as a number (treated as px)', async () => {
        const el = await fixture<MfpTooltip>(html`
            <mfp-tooltip content="hi" max-width="400"><button>x</button></mfp-tooltip>
        `);
        await el.updateComplete;
        const bubble = el.shadowRoot!.querySelector('.bubble') as HTMLElement;
        expect(bubble.style.maxWidth).to.equal('400px');
    });

    it('applies maxWidth as a string (used verbatim for unit support)', async () => {
        const el = await fixture<MfpTooltip>(html`
            <mfp-tooltip content="hi" max-width="20rem"><button>x</button></mfp-tooltip>
        `);
        await el.updateComplete;
        const bubble = el.shadowRoot!.querySelector('.bubble') as HTMLElement;
        expect(bubble.style.maxWidth).to.equal('20rem');
    });

    it('defaults maxWidth to 240px and minWidth to 80px', async () => {
        const el = await fixture<MfpTooltip>(html`
            <mfp-tooltip content="hi"><button>x</button></mfp-tooltip>
        `);
        await el.updateComplete;
        const bubble = el.shadowRoot!.querySelector('.bubble') as HTMLElement;
        expect(bubble.style.maxWidth).to.equal('240px');
        expect(bubble.style.minWidth).to.equal('80px');
    });

    it('applies minWidth via attribute', async () => {
        const el = await fixture<MfpTooltip>(html`
            <mfp-tooltip content="hi" min-width="160"><button>x</button></mfp-tooltip>
        `);
        await el.updateComplete;
        const bubble = el.shadowRoot!.querySelector('.bubble') as HTMLElement;
        expect(bubble.style.minWidth).to.equal('160px');
    });
});
