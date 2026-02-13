import importPlugin from 'eslint-plugin-import-x';

/**
 * Import rules configuration.
 * Enforces import ordering, prevents duplicates, and ensures consistent formatting.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-commonjs': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          'newlines-between': 'always'
        }
      ]
    }
  }
];
