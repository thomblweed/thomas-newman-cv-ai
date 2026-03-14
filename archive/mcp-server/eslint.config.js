// @ts-check

import { config as baseConfig } from '@repo/eslint-config/base';
import { config as typescriptConfig } from '@repo/eslint-config/typescript';

/** @type {import("eslint").Linter.Config[]} */
export default [...baseConfig, ...typescriptConfig];
