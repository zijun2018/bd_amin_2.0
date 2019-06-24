module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [2, 'only-multiline'],
    'no-new': 0,
    'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
    'indent': ['off'],
    'eslint no-trailing-spaces': [0],
    'camelcase': ["error", {"allow": ["zh_CN"]}],
    'no-param-reassign': [2, { "props": false }],
    'object-curly-newline': ["error", { "consistent": true }],
    'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true }],
    'max-len': ["error", {"code": 300}],
    'linebreak-style': ["off", "windows"],
    'no-plusplus': ["off", { "allowForLoopAfterthoughts": true }]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
