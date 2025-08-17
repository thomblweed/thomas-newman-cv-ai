// @ts-check

// @ts-expect-error -0 ignore this import error
import { tanstackConfig } from '@tanstack/eslint-config';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...tanstackConfig,
  { ignores: ['.turbo', '.nitro', '.output', '.tanstack'] }
];
