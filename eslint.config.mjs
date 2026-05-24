import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/storybook-static/**',
            '**/coverage/**',
            'pnpm-lock.yaml',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx,js,mjs,cjs}'],
        languageOptions: {
            globals: { ...globals.browser },
        },
        plugins: {
            wc,
            lit,
        },
        rules: {
            ...wc.configs.recommended.rules,
            ...lit.configs.recommended.rules,
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
        },
    },
    {
        files: [
            '**/scripts/**/*.{js,mjs,cjs,ts}',
            '**/*.config.{js,mjs,cjs,ts}',
            '**/.storybook/**/*.{js,mjs,cjs,ts}',
        ],
        languageOptions: {
            globals: { ...globals.node },
        },
    },
    prettier,
];
