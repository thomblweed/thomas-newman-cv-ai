import tseslint from 'typescript-eslint';

/**
 * TypeScript ESLint configuration with type-aware linting.
 * Can be used separately when TypeScript ESLint is provided by another config (e.g., tanstackConfig).
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
    }
  }
];
