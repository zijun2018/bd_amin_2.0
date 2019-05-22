/**
*   @Project:   app进入页
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/10 11:52
*   @Note:      为何要注释掉已有注释（中文包）?
*               因为会造成app.js过大，影响加载性能
*/


<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {};
    },

    created() {
      // 从localStorage/sessionStorage中拿取用户登录信息，放置到vuex
      const userInfo = sessionStorage.getItem('userInfo') || localStorage.getItem('userInfo');
      userInfo && this['login/setUserInfo'](JSON.parse(userInfo));
    },

    methods: {
      ...mapActions(['login/setUserInfo'])
    }
  };
</script>
