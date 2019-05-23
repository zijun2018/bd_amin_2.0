/**
 *   @Project:   Vue配置文件
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/10 14:06
 *   @Note:      ——
 */
const path = require('path');

function addStyleResource(rule) {
  rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
                 patterns: [
                   // 需要全局导入的less
                   path.resolve(__dirname, './src/styles/global/variables.less'),
                 ],
               });
}

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));

    config.output.filename('[name].[hash].js').end(); // 打包文件哈希化

    config.optimization.minimize(true); // 代码压缩优化
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: true,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
};
