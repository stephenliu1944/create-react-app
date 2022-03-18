module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'env': {
    'es6': true,
    'browser': true,
    'commonjs': true
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect'
    }
  },
  'plugins': [
    '@typescript-eslint',
    'react-hooks',
    'react'
  ],
  // "extends": [
  //     "plugin:react/recommended",
  //     "plugin:@typescript-eslint/recommended"
  // ],
  'rules': {
    'no-cond-assign': 'error',
    'no-constant-condition': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty': 'warn',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-obj-calls': 'error',
    'no-regex-spaces': 'error',
    'no-sparse-arrays': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-else-return': 'error',
    'no-empty-pattern': 'error',
    'no-redeclare': 'error',
    'no-delete-var': 'error',
    'no-lonely-if': 'error',
    'no-self-assign': 'error',
    'no-multiple-empty-lines': ['warn', { 'max': 1 }],
    'space-infix-ops': 'error',
    'spaced-comment': 'warn',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'comma-dangle': 'error',
    'semi': 'error',
    'semi-spacing': 'error',
    'key-spacing': 'error',
    'curly': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'accessor-pairs': 'error',
    'eqeqeq': 'error',
    'radix': 'error',
    'quotes': ['error', 'single'],
    'indent': ['warn', 2, { 'SwitchCase': 1, 'MemberExpression': 1, 'ignoredNodes': ['TemplateLiteral'] }],
    'keyword-spacing': 'error',
    'arrow-spacing': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
    'jsx-quotes': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-deprecated': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-string-refs': 'error',
    'react/prefer-es6-class': 'error',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-uses-react': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
