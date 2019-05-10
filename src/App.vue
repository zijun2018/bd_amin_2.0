/**
*   @Project:   app进入页
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/10 11:52
*   @Note:      为何要注释掉已有注释（中文包）?
                因为会造成app.js过大，影响加载性能
*/


<template>
  <div id="app">
    <transition name="fade">
      <!-- <a-locale-provider :locale="zh_CN"> -->
      <router-view></router-view>
      <!-- </a-locale-provider> -->
    </transition>
  </div>
</template>
<script>
  // import { LocaleProvider } from 'ant-design-vue';
  // import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  // import moment from 'moment';
  // import 'moment/locale/zh-cn';
  //
  // moment.locale('zh_ch');

  export default {
    data() {
      return {
        // zh_CN
      };
    },

    // components: { ALocaleProvider: LocaleProvider }
  };
</script>
