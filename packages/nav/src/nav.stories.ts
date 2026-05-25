import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './nav.js';
import '@mfp-design-system/icon-button';
import '@mfp-design-system/avatar';
import '@mfp-design-system/badge';

const meta: Meta = {
    title: 'Components/Nav',
    component: 'mfp-nav-bar',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

export const NavBar: Story = {
    render: () => html`
        <mfp-nav-bar>
            <a slot="brand" href="/" style="color: inherit; text-decoration: none;">
                <strong>LessonForge</strong>
            </a>
            <mfp-nav-item href="#" active>Lessons</mfp-nav-item>
            <mfp-nav-item href="#">Reviews</mfp-nav-item>
            <mfp-nav-item href="#">Library</mfp-nav-item>
            <mfp-nav-item href="#" disabled>Coming soon</mfp-nav-item>
            <div slot="actions">
                <mfp-icon-button label="Search">
                    <span aria-hidden="true">🔍</span>
                </mfp-icon-button>
                <mfp-avatar name="Melissa Pula" size="sm"></mfp-avatar>
            </div>
        </mfp-nav-bar>
        <div style="padding: 24px;">Page content goes here.</div>
    `,
};

export const NavBarSticky: Story = {
    render: () => html`
        <div style="height: 200vh;">
            <mfp-nav-bar sticky>
                <a slot="brand" href="/" style="color: inherit; text-decoration: none;">
                    <strong>Sticky</strong>
                </a>
                <mfp-nav-item href="#" active>One</mfp-nav-item>
                <mfp-nav-item href="#">Two</mfp-nav-item>
                <mfp-nav-item href="#">Three</mfp-nav-item>
            </mfp-nav-bar>
            <div style="padding: 24px;">Scroll the preview to see the bar stick.</div>
        </div>
    `,
};

export const SideNav: Story = {
    render: () => html`
        <div style="display: flex; height: 480px; border: 1px solid #e5e7eb;">
            <mfp-side-nav>
                <a
                    slot="header"
                    href="/"
                    style="display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none;"
                >
                    <span aria-hidden="true">🛠</span> <strong>Workspace</strong>
                </a>
                <mfp-nav-item href="#" active>
                    <span slot="icon" aria-hidden="true">🏠</span>
                    Dashboard
                </mfp-nav-item>
                <mfp-nav-item href="#">
                    <span slot="icon" aria-hidden="true">📁</span>
                    Projects
                </mfp-nav-item>
                <mfp-nav-item href="#">
                    <span slot="icon" aria-hidden="true">👥</span>
                    Team
                </mfp-nav-item>
                <mfp-nav-item href="#">
                    <span slot="icon" aria-hidden="true">⚙️</span>
                    Settings
                </mfp-nav-item>
                <mfp-nav-item href="#" disabled>
                    <span slot="icon" aria-hidden="true">🔒</span>
                    Admin
                </mfp-nav-item>
                <div slot="footer">v1.0.0 — © 2026</div>
            </mfp-side-nav>
            <div style="flex: 1; padding: 24px; background: #fafafa;">Main content area.</div>
        </div>
    `,
};

export const FullAppShell: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; height: 100vh;">
            <mfp-nav-bar>
                <a slot="brand" href="/" style="color: inherit; text-decoration: none;">
                    <strong>App</strong>
                </a>
                <mfp-nav-item href="#" active>Home</mfp-nav-item>
                <mfp-nav-item href="#">Reports</mfp-nav-item>
                <div slot="actions">
                    <mfp-badge variant="success">PRO</mfp-badge>
                    <mfp-avatar name="Melissa Pula" size="sm"></mfp-avatar>
                </div>
            </mfp-nav-bar>
            <div style="display: flex; flex: 1; min-height: 0;">
                <mfp-side-nav>
                    <mfp-nav-item href="#" active>
                        <span slot="icon" aria-hidden="true">📊</span>
                        Overview
                    </mfp-nav-item>
                    <mfp-nav-item href="#">
                        <span slot="icon" aria-hidden="true">📁</span>
                        Files
                    </mfp-nav-item>
                    <mfp-nav-item href="#">
                        <span slot="icon" aria-hidden="true">🔔</span>
                        Notifications
                    </mfp-nav-item>
                </mfp-side-nav>
                <div style="flex: 1; padding: 24px; background: #fafafa;">
                    Combine NavBar + SideNav for a full app shell.
                </div>
            </div>
        </div>
    `,
};

export const BrandVariant: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <p style="padding: 16px 24px 0; font-size: 14px; color: #6b7280; margin: 0;">
            Toggle the <strong>Theme</strong> dropdown above — the brand-variant bar picks up the
            theme's brand color (portfolio = navy, warm = terracotta, orange = orange, etc.).
        </p>
        <div style="margin-top: 16px;">
            <mfp-nav-bar variant="brand">
                <a slot="brand" href="/" style="color: inherit; text-decoration: none;">
                    <strong>Brand bar</strong>
                </a>
                <mfp-nav-item href="#" active>Home</mfp-nav-item>
                <mfp-nav-item href="#">Reports</mfp-nav-item>
                <mfp-nav-item href="#">Settings</mfp-nav-item>
            </mfp-nav-bar>
        </div>
        <div style="display: flex; min-height: 240px; margin-top: 16px;">
            <mfp-side-nav variant="brand">
                <mfp-nav-item href="#" active>Dashboard</mfp-nav-item>
                <mfp-nav-item href="#">Team</mfp-nav-item>
                <mfp-nav-item href="#">Reports</mfp-nav-item>
            </mfp-side-nav>
            <div style="flex: 1; padding: 24px;">Side nav with the same brand variant.</div>
        </div>
    `,
};

export const Buttons: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <mfp-nav-bar>
            <a slot="brand" href="/" style="color: inherit; text-decoration: none;">
                <strong>No href = button</strong>
            </a>
            <mfp-nav-item active @click=${() => alert('Clicked!')}>Click me</mfp-nav-item>
            <mfp-nav-item @click=${() => alert('Another')}>Another</mfp-nav-item>
        </mfp-nav-bar>
        <div style="padding: 24px;">
            Items without <code>href</code> render as <code>&lt;button&gt;</code> — use
            <code>@click</code> for SPA route changes.
        </div>
    `,
};
