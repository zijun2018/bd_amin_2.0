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
    "camelcase": ["error", {"allow": ["zh_CN"]}]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
