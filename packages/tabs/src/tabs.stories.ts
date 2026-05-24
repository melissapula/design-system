import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tabs.js';

const meta: Meta = {
    title: 'Components/Tabs',
    component: 'mfp-tabs',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => html`
        <mfp-tabs style="max-width: 480px;">
            <mfp-tab slot="tab" value="overview">Overview</mfp-tab>
            <mfp-tab slot="tab" value="details">Details</mfp-tab>
            <mfp-tab slot="tab" value="activity">Activity</mfp-tab>

            <mfp-tab-panel value="overview">
                <p>This is the overview panel. The first tab is selected by default.</p>
            </mfp-tab-panel>
            <mfp-tab-panel value="details">
                <p>Details about the item, with more in-depth information.</p>
            </mfp-tab-panel>
            <mfp-tab-panel value="activity">
                <p>Recent activity and changes.</p>
            </mfp-tab-panel>
        </mfp-tabs>
    `,
};

export const PreSelected: Story = {
    render: () => html`
        <mfp-tabs value="details" style="max-width: 480px;">
            <mfp-tab slot="tab" value="overview">Overview</mfp-tab>
            <mfp-tab slot="tab" value="details">Details</mfp-tab>
            <mfp-tab slot="tab" value="activity">Activity</mfp-tab>

            <mfp-tab-panel value="overview"><p>Overview content</p></mfp-tab-panel>
            <mfp-tab-panel value="details"><p>Details (pre-selected)</p></mfp-tab-panel>
            <mfp-tab-panel value="activity"><p>Activity content</p></mfp-tab-panel>
        </mfp-tabs>
    `,
};

export const WithDisabledTab: Story = {
    render: () => html`
        <mfp-tabs style="max-width: 480px;">
            <mfp-tab slot="tab" value="a">Available</mfp-tab>
            <mfp-tab slot="tab" value="b" disabled>Coming soon</mfp-tab>
            <mfp-tab slot="tab" value="c">Another</mfp-tab>

            <mfp-tab-panel value="a"><p>Panel A</p></mfp-tab-panel>
            <mfp-tab-panel value="b"><p>Panel B (unreachable while tab disabled)</p></mfp-tab-panel>
            <mfp-tab-panel value="c"><p>Panel C</p></mfp-tab-panel>
        </mfp-tabs>
    `,
};
