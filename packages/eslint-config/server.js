import globals from 'globals';

/**
 * Server-side configuration for files that need Node.js globals.
 * Use this to override browser globals for server files.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  {
    files: ['**/*.server.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
