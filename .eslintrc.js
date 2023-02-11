// @ts-check
const { defineConfig } = require('eslint-define-config') // eslint-disable-line

module.exports = defineConfig({
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:n/recommended',
    'prettier',
  ],
  plugins: ['eslint-plugin-tsdoc'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.mts', 'cts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['packages/oas30-to-zod/tsconfig.json'],
      },
    },
  },
  rules: {
    // Required settings
    'n/no-unsupported-features/es-syntax': 'off', // Required to use import
    'n/no-unsupported-features/node-builtins': 'off',
    // eslint-plugin-import
    'import/order': ['error', { 'newlines-between': 'always' }], // Required to use autofix
    'import/no-named-as-default-member': 'off', // When building a subproject with dual packages, some packages will not load if this option is satisfied.
    // eslint-import-resolver-typescript
    'import/no-unresolved': 'error', // Enable main feature
    // eslint-plugin-n
    'n/no-missing-import': 'off', // Conflict typescript path alias
    // eslint-plugin-tsdoc
    'tsdoc/syntax': 'warn', // Required to use autofix

    // Optional settings
    // for Map
    '@typescript-eslint/no-non-null-assertion': 'off',
    // loosen
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
  overrides: [
    {
      files: [
        'packages/*/__tests__/**/*.{js,cjs,mjs,ts}',
        'packages/**/*.test.{js,cjs,mjs,ts}',
        'vitest.config.ts',
      ],
      env: { node: true },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'n/no-extraneous-import': 'off',
        'no-console': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['**/cli.{js,cjs,mjs,ts,cts,mts}'],
      rules: {
        'n/shebang': 'off',
      },
    },
  ],
})
