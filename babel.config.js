module.exports = {
  presets: [
    '@vue/app'
  ],
  // 配置babel-plugin-import, 用于按需加载组件代码和样式
  plugins: [
    [
      'import',
      { libraryName: 'Ant', libraryDirectory: 'es', style: 'css' }
    ]
  ]
};
