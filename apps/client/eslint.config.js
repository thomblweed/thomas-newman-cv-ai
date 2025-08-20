// @ts-check

import { config as reactConfig } from '@repo/eslint-config/react';
import { tanstackConfig } from '@tanstack/eslint-config';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactConfig,
  ...tanstackConfig,
  {
    ignores: ['.turbo', '.nitro', '.output', '.tanstack']
  }
];
