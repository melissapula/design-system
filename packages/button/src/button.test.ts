import { expect, fixture, html } from '@open-wc/testing';
import './button.js';
import type { MfpButton } from './button.js';

describe('<mfp-button>', () => {
    it('renders with default variant and size', async () => {
        const el = await fixture<MfpButton>(html`<mfp-button>Click</mfp-button>`);
        expect(el.variant).to.equal('primary');
        expect(el.size).to.equal('md');
        expect(el.shadowRoot?.querySelector('button')).to.exist;
    });

    it('reflects variant and size to attributes', async () => {
        const el = await fixture<MfpButton>(
            html`<mfp-button variant="danger" size="lg">Delete</mfp-button>`,
        );
        expect(el.getAttribute('variant')).to.equal('danger');
        expect(el.getAttribute('size')).to.equal('lg');
    });

    it('forwards clicks via the click event', async () => {
        const el = await fixture<MfpButton>(html`<mfp-button>Click</mfp-button>`);
        let clicks = 0;
        el.addEventListener('click', () => clicks++);
        el.shadowRoot!.querySelector('button')!.click();
        expect(clicks).to.equal(1);
    });

    it('does not fire submit when disabled', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <mfp-button type="submit" disabled>Submit</mfp-button>
            </form>
        `);
        let submits = 0;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submits++;
        });
        const btn = form.querySelector<MfpButton>('mfp-button')!;
        btn.shadowRoot!.querySelector('button')!.click();
        expect(submits).to.equal(0);
    });

    it('submits its associated form when type="submit" is clicked', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form>
                <input name="email" value="me@example.com" />
                <mfp-button type="submit">Submit</mfp-button>
            </form>
        `);
        let submits = 0;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submits++;
        });
        const btn = form.querySelector<MfpButton>('mfp-button')!;
        btn.shadowRoot!.querySelector('button')!.click();
        // requestSubmit is async; wait a microtask
        await new Promise((r) => setTimeout(r, 0));
        expect(submits).to.equal(1);
    });

    it('exposes the associated form via the .form getter', async () => {
        const form = await fixture<HTMLFormElement>(html`
            <form id="my-form">
                <mfp-button type="submit">Submit</mfp-button>
            </form>
        `);
        const btn = form.querySelector<MfpButton>('mfp-button')!;
        expect(btn.form).to.equal(form);
    });

    it('shows spinner when loading', async () => {
        const el = await fixture<MfpButton>(html`<mfp-button loading>Saving…</mfp-button>`);
        expect(el.shadowRoot?.querySelector('.spinner')).to.exist;
        expect(el.shadowRoot?.querySelector('button')?.getAttribute('aria-busy')).to.equal('true');
    });
});
