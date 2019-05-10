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
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
