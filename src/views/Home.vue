<template>
  <div class="views-home">
    <base-layout>
      <transition name="layout-transition">
        <router-view></router-view>
      </transition>
    </base-layout>
  </div>
</template>

<script>
  import Layout from './layout/Layout.vue';

  export default {
  name: 'home',

  components: {
    BaseLayout: Layout
  },

  data() {
    return {};
  },

  computed: {
  },

  mounted() {

  },

  methods: {

  }
};
</script>

<style scoped lang="less">
  @import "../styles/views/home";
</style>
