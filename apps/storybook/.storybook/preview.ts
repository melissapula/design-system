import type { Preview } from '@storybook/web-components';
import '@mfp-design-system/tokens/css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#111111' },
            ],
        },
    },
};

export default preview;
