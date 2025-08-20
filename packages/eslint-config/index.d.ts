import type { Linter } from 'eslint';

declare module '@repo/eslint-config/base' {
  export const config: Linter.Config[];
}

declare module '@repo/eslint-config/react' {
  export const config: Linter.Config[];
}
