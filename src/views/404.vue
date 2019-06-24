<!--
 * @Project: 404页面
 * @Author: Zi_Jun
 * @Email: zijun2030@gmail.com
 * @Date: 2019-05-22 18:05:07
 * @LastEditTime: 2019-06-21 16:09:10
 * @LastEditors: Do not edit
 * @Note: Do not edit
 -->

<template>
  <div class="error-404">
    <!-- Part1: 展示信息 -->
    <section>
      <img class="section-left" src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt="">
      <div class="section-right">
        <p>404</p>
        <p>抱歉，访问的页面不存在</p>
        <p @click="jumpToHome">返回首页</p>
      </div>
    </section>

    <!-- Part2: 底部信息 -->
    <footer>
      <p @click="jumpToHome">量化云</p>
    </footer>
  </div>

</template>

<script>
  export default {
    name: 'error-404',

    methods: {
      
      jumpToHome () {
        this.$router.push({name: 'home'});
      }
    }
  };
</script>

<style scoped lang='less'>
  @import "../styles/views/error-404.less";
</style>
