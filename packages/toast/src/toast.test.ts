import { expect, fixture, html } from '@open-wc/testing';
import { showToast } from './toast.js';
import type { MfpToast } from './toast.js';

describe('<mfp-toast>', () => {
    afterEach(() => {
        // Clean up the global container between tests
        document.getElementById('mfp-toast-container')?.remove();
    });

    it('renders a message inline', async () => {
        const el = await fixture<MfpToast>(html`<mfp-toast message="Hello"></mfp-toast>`);
        expect(el.shadowRoot?.querySelector('.message')?.textContent?.trim()).to.equal('Hello');
    });

    it('showToast() appends to a singleton container', () => {
        const toast = showToast({ message: 'A' });
        const container = document.getElementById('mfp-toast-container');
        expect(container).to.exist;
        expect(container?.contains(toast)).to.equal(true);

        const toast2 = showToast({ message: 'B' });
        // Same container, two children
        expect(container?.children.length).to.equal(2);
        toast.remove();
        toast2.remove();
    });

    it('auto-dismisses after duration', async () => {
        const toast = showToast({ message: 'temp', duration: 50 });
        await new Promise((r) => setTimeout(r, 80));
        expect(toast.isConnected).to.equal(false);
    });

    it('does not auto-dismiss when duration is 0', async () => {
        const toast = showToast({ message: 'sticky', duration: 0 });
        await new Promise((r) => setTimeout(r, 50));
        expect(toast.isConnected).to.equal(true);
        toast.remove();
    });
});
