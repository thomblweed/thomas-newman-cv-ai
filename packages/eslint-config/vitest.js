import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';

/**
 * ESLint configuration for Vitest and Testing Library.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    plugins: {
      vitest,
      'testing-library': testingLibrary
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...testingLibrary.configs['flat/react'].rules
    },
    languageOptions: {
      globals: vitest.environments.env.globals
    }
  }
];
