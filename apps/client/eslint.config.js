// @ts-check

import { config as baseConfig } from '@repo/eslint-config/base';
import { config as reactConfig } from '@repo/eslint-config/react';
import { config as typescriptConfig } from '@repo/eslint-config/typescript';
import { config as importConfig } from '@repo/eslint-config/import';
import { config as serverConfig } from '@repo/eslint-config/server';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  ...typescriptConfig,
  ...importConfig,
  ...reactConfig,
  ...serverConfig,
  {
    ignores: ['.turbo', '.nitro', '.output', '.tanstack']
  }
];
