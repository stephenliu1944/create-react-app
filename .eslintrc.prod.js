module.exports = {
  'extends': ['.eslintrc.js'],
  'rules': {
    'no-empty': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'no-console': ['error', { 'allow': ['error'] }],
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-eval': 'error',
    'indent': ['error', 2, { 'SwitchCase': 1, 'MemberExpression': 1, 'ignoredNodes': ['TemplateLiteral'] }],
    'spaced-comment': 'error'
  }
};
