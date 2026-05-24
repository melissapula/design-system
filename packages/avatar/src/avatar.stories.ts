import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './avatar.js';
import type { AvatarShape, AvatarSize, AvatarStatus } from './avatar.js';

interface Args {
    src: string;
    name: string;
    alt: string;
    size: AvatarSize;
    shape: AvatarShape;
    status: AvatarStatus | '';
}

const meta: Meta<Args> = {
    title: 'Components/Avatar',
    component: 'mfp-avatar',
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
        shape: { control: 'select', options: ['circle', 'square'] },
        status: { control: 'select', options: ['', 'online', 'busy', 'away', 'offline'] },
    },
    args: { src: '', name: 'Melissa Pula', alt: '', size: 'md', shape: 'circle', status: '' },
    render: (a) => html`
        <mfp-avatar
            src=${a.src}
            name=${a.name}
            alt=${a.alt}
            size=${a.size}
            shape=${a.shape}
            status=${a.status as AvatarStatus}
        ></mfp-avatar>
    `,
};

export default meta;

type Story = StoryObj<Args>;

export const Initials: Story = { args: { name: 'Melissa Pula' } };
export const WithImage: Story = {
    args: { src: 'https://i.pravatar.cc/80?img=12', name: 'Melissa Pula' },
};
export const FallbackOnImageError: Story = {
    args: { src: 'https://invalid.example/avatar.png', name: 'Melissa Pula' },
};
export const NoNameNoImage: Story = { args: { name: '' } };

export const Sizes: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <mfp-avatar size="sm" name="Melissa Pula"></mfp-avatar>
            <mfp-avatar size="md" name="Melissa Pula"></mfp-avatar>
            <mfp-avatar size="lg" name="Melissa Pula"></mfp-avatar>
            <mfp-avatar size="xl" name="Melissa Pula"></mfp-avatar>
        </div>
    `,
};

export const Square: Story = { args: { shape: 'square', src: 'https://i.pravatar.cc/80?img=20' } };

export const WithStatus: Story = {
    parameters: { controls: { disable: true } },
    render: () => html`
        <div style="display: flex; gap: 12px;">
            <mfp-avatar name="A" status="online"></mfp-avatar>
            <mfp-avatar name="B" status="busy"></mfp-avatar>
            <mfp-avatar name="C" status="away"></mfp-avatar>
            <mfp-avatar name="D" status="offline"></mfp-avatar>
        </div>
    `,
};
