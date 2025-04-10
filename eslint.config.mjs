import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js, prettier: prettierPlugin },
    extends: ['js/recommended', prettier],
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier rules as ESLint errors
    },
  },
  tseslint.configs.recommended,
  {
    ignores: ['dist/**'], // Ignore the dist folder
  },
]);
