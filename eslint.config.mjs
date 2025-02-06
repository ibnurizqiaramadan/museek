import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'valid-jsdoc': 'off',
      'linebreak-style': 'off',
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'array-bracket-spacing': [
        'error',
        'always'
      ],
      'max-len': [
        'error',
        {
          'code': 1000
        }
      ],
      'spaced-comment': 'off',
      'no-multi-spaces': 'off',
      'require-jsdoc': 'off',
      'new-cap': 'off',
      'no-multiple-empty-lines': 'off',
      'no-unsafe-finally': 'off',
      'no-console': 'off',
      'no-mixed-spaces-and-tabs': 'off'
    },
  },
];

export default eslintConfig;
