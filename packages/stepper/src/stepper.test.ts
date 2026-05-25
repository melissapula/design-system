import { expect, fixture, html } from '@open-wc/testing';
import './stepper.js';
import type { MfpStep, MfpStepper } from './stepper.js';

describe('<mfp-stepper>', () => {
    async function setup(current = 1) {
        return fixture<MfpStepper>(html`
            <mfp-stepper current=${current}>
                <mfp-step label="One"></mfp-step>
                <mfp-step label="Two"></mfp-step>
                <mfp-step label="Three"></mfp-step>
                <mfp-step label="Four"></mfp-step>
            </mfp-stepper>
        `);
    }

    it('derives each step status from current index', async () => {
        const el = await setup(1);
        await el.updateComplete;
        const steps = el.querySelectorAll<MfpStep>('mfp-step');
        expect(steps[0]!.status).to.equal('completed');
        expect(steps[1]!.status).to.equal('current');
        expect(steps[2]!.status).to.equal('pending');
        expect(steps[3]!.status).to.equal('pending');
    });

    it('updates statuses when current changes', async () => {
        const el = await setup(0);
        await el.updateComplete;
        el.current = 3;
        await el.updateComplete;
        const steps = el.querySelectorAll<MfpStep>('mfp-step');
        expect(steps[0]!.status).to.equal('completed');
        expect(steps[1]!.status).to.equal('completed');
        expect(steps[2]!.status).to.equal('completed');
        expect(steps[3]!.status).to.equal('current');
    });

    it('a step with [error] overrides derived status', async () => {
        const el = await fixture<MfpStepper>(html`
            <mfp-stepper current="1">
                <mfp-step label="A"></mfp-step>
                <mfp-step label="B" error></mfp-step>
                <mfp-step label="C"></mfp-step>
            </mfp-stepper>
        `);
        await el.updateComplete;
        const steps = el.querySelectorAll<MfpStep>('mfp-step');
        expect(steps[1]!.status).to.equal('error');
    });

    it('marks the last step with data-last to hide its connector', async () => {
        const el = await setup(0);
        await el.updateComplete;
        const steps = el.querySelectorAll<MfpStep>('mfp-step');
        expect(steps[0]!.hasAttribute('data-last')).to.equal(false);
        expect(steps[3]!.hasAttribute('data-last')).to.equal(true);
    });

    it('does NOT fire step-click when not clickable', async () => {
        const el = await setup(1);
        await el.updateComplete;
        let fired = 0;
        el.addEventListener('step-click', () => fired++);
        const row = el.querySelector<MfpStep>('mfp-step')!.shadowRoot!.querySelector('.row');
        (row as HTMLElement).click();
        expect(fired).to.equal(0);
    });

    it('fires step-click with detail.index when clickable', async () => {
        const el = await fixture<MfpStepper>(html`
            <mfp-stepper current="1" clickable>
                <mfp-step label="One"></mfp-step>
                <mfp-step label="Two"></mfp-step>
                <mfp-step label="Three"></mfp-step>
            </mfp-stepper>
        `);
        await el.updateComplete;
        let clickedIndex = -1;
        el.addEventListener('step-click', (e) => {
            clickedIndex = (e as CustomEvent).detail.index;
        });
        const thirdStep = el.querySelectorAll<MfpStep>('mfp-step')[2]!;
        const row = thirdStep.shadowRoot!.querySelector('.row') as HTMLElement;
        row.click();
        expect(clickedIndex).to.equal(2);
    });

    it('propagates orientation to children', async () => {
        const el = await fixture<MfpStepper>(html`
            <mfp-stepper orientation="vertical" current="0">
                <mfp-step label="One"></mfp-step>
                <mfp-step label="Two"></mfp-step>
            </mfp-stepper>
        `);
        await el.updateComplete;
        const steps = el.querySelectorAll<MfpStep>('mfp-step');
        expect(steps[0]!.orientation).to.equal('vertical');
        expect(steps[1]!.orientation).to.equal('vertical');
    });

    it('marks the current step with aria-current="step"', async () => {
        const el = await setup(2);
        await el.updateComplete;
        const steps = el.querySelectorAll<MfpStep>('mfp-step');
        const currentRow = steps[2]!.shadowRoot!.querySelector('.row');
        expect(currentRow?.getAttribute('aria-current')).to.equal('step');
        const otherRow = steps[0]!.shadowRoot!.querySelector('.row');
        expect(otherRow?.getAttribute('aria-current')).to.equal(null);
    });
});
