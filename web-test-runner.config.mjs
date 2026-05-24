import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
    files: ['packages/*/src/**/*.test.ts'],
    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },
    plugins: [
        esbuildPlugin({
            ts: true,
            target: 'es2022',
            tsconfig: 'tsconfig.base.json',
        }),
    ],
    browsers: [playwrightLauncher({ product: 'chromium' })],
    testFramework: {
        config: {
            ui: 'bdd',
            timeout: '5000',
        },
    },
    coverage: false,
};
