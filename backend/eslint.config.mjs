import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylistic from '@stylistic/eslint-plugin'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
    rules: {
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
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/eol-last': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**'],
    plugins: {
      '@stylistic/ts': stylisticTs,
      '@stylistic': stylistic
    }
  }
]
