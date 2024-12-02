import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs,
      '@stylistic/jsx': stylisticJsx
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/eol-last': 'error',
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/comma-dangle': ['error', 'never'],
      '@stylistic/ts/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@stylistic/ts/block-spacing': ['error', 'always'],
      '@stylistic/ts/brace-style': 'error',
      '@stylistic/ts/function-call-spacing': ['error', 'never'],
      '@stylistic/ts/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['case', 'default'], next: '*' }
      ],
      '@stylistic/ts/space-infix-ops': 'error',
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@stylistic/jsx/jsx-indent': ['error', 2],
      '@stylistic/jsx/jsx-closing-bracket-location': 1,
      '@stylistic/jsx/jsx-closing-tag-location': 1,
      '@stylistic/jsx/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never', propElementValues: 'always' }
      ],
      '@stylistic/jsx/jsx-curly-newline': 'error',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
)
