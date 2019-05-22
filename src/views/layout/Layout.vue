/**
*   @Project:   框架页面基本布局
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/17 10:57
*   @Note:
*/

<template>
  <!-- Part1: 基本布局 -->
  <a-layout id="views-layout">

    <!-- Part1-1: 左侧栏 -->
        <a-layout-sider collapsible
                        width="240px"
                        breakpoint="xl"
                        v-model="collapsed">

          <!-- Part1: logo区域 -->
          <div class="logo" @click="jumpToHome">
          <span class="logo-icon">
            <img src="../../assets/logo.png" alt="">
          </span>
              <transition name="fade">
                <span v-show="!collapsed" class="logo-text">展业宝CMS</span>
              </transition>
          </div>

          <!-- Part2: 菜单区域 -->
          <a-menu :defaultOpenKeys="['sub1', 'sub2']"
                  :selectedKeys="[selectItem]"
                  mode="inline"
                  theme="dark">

            <!-- Part2-1: 运营管理 -->
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="table" /><span>运营管理</span></span>
              <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="align-left" /><span>资讯管理</span></span>
                <a-menu-item key="1" @click="jumpToLibraryNewsList">资讯库文章列表</a-menu-item>
                <a-menu-item key="2" @click="jumpToEarlyNewsList">早盘文章列表</a-menu-item>
                <a-menu-item key="3" @click="jumpToCompoundNewsList">复盘文章列表</a-menu-item>
              </a-sub-menu>
              <a-menu-item key="4" @click="jumpToThirdNewsList">第三方文章审核管理</a-menu-item>
              <a-menu-item key="5" @click="jumpToComplaintHome">投诉管理</a-menu-item>
            </a-sub-menu>

          </a-menu>

        </a-layout-sider>

    <!-- Part1-2: 右侧栏 -->
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '240px', height: '100vh' }">

      <!-- Part1-2-1: 右侧-顶部栏 -->
      <a-layout-header :style="{ paddingLeft: collapsed ? '80px' : '240px' }">
        <!-- Part1-2-1-1: 右侧-顶部栏-缩放按钮 -->
        <a-icon
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
          class="trigger"/>
        <!-- Part1-2-1-2: 右侧-顶部栏-公告 -->
        <div class="notice-text">
          <a-icon theme="filled" type="notification"/>
          <p>{{noticeText}}</p></div>
        <!-- Part1-2-1-3: 右侧-顶部栏-头像 -->
        <a-avatar>admin</a-avatar>
        <!-- Part1-2-1-4: 右侧-顶部栏-登出 -->
        <a-button type="dashed" icon="logout" @click="handleSignOut">退出登录</a-button>
      </a-layout-header>

      <!-- Part1-2-2: 右侧-内容栏 -->
      <a-layout-content :style="{ margin: '80px 16px 69px', overflow: 'auto' }">
        <div class="render-content" :style="{ padding: '24px', background: '#fff'}">
          <slot></slot>
        </div>
      </a-layout-content>

      <!-- Part1-2-3: 右侧-底部栏 -->
      <a-layout-footer :style="{ paddingLeft: collapsed ? '80px' : '240px' }">
        Copyright <a-icon type="copyright" /> 2019 高盈量化云科技有限公司
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import { Avatar, Icon, Layout, Menu, Button, message } from 'ant-design-vue';

  export default {
    name: 'Layout',

    components: {
      ALayout: Layout,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      AIcon: Icon,
      ALayoutSider: Layout.Sider,
      ALayoutHeader: Layout.Header,
      ALayoutContent: Layout.Content,
      ALayoutFooter: Layout.Footer,
      ASubMenu: Menu.SubMenu,
      AAvatar: Avatar,
      AButton: Button
    },

    data() {
      return {
        collapsed: false, // 是否展开左侧sider栏
        noticeText: '展业宝CMS V2.0已重写，新增资讯管理分类和投资管理功能！', // 顶部文字提示
        selectItem: '1', // 当前选择的路由
        RouterName: this.$route.name, // 当前路由名称
      };
    },

    created() {
      this.listenRouterMenu(this.RouterName);
    },

    methods: {
      /**
       * 跳转到首页
       */
      jumpToHome() {
        this.$router.push({ name: 'home' });
      },

      /**
       * 登出操作
       */
      handleSignOut() {
        // 清除用户信息,初始未登录
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('userInfo');

        // 提示登录成功
        message.success('退出成功,请重新登录!', 2);
        // 跳转到登录页
        setTimeout(() => {
          this.$router.push({ name: 'user_login' });
        }, 1500);
      },

      /**
       * 跳转到资讯库文章列表页
       */
      jumpToLibraryNewsList() {
        this.$router.push({ name: 'library_news_list' });
      },

      /**
       * 跳转到第三方文章审核管理的文章列表页
       */
      jumpToThirdNewsList() {
        this.$router.push({ name: 'third_news_list' });
      },

      /**
       * 跳转到早盘文章列表
       */
      jumpToEarlyNewsList() {
        this.$router.push({ name: 'early_news_list' });
      },

      /**
       * 跳转到复盘文章列表
       */
      jumpToCompoundNewsList() {
        this.$router.push({ name: 'compound_news_list' });
      },

      /**
       * 跳转到投诉管理
       */
      jumpToComplaintHome() {
        this.$router.push({ name: 'complaint_home' });
      },

      /**
       * 监听路由，绑定Menu效果
       * @param routerName {String} 路由名
       */
      listenRouterMenu(routerName) {
        // 绑定路由
        switch (routerName) {
          case 'library_news_list':
          case 'library_news_add':
          case 'library_news_edit':
            this.selectItem = '1';
            break;
          case 'early_news_list':
          case 'early_news_add':
          case 'early_news_edit':
            this.selectItem = '2';
            break;
          case 'compound_news_list':
            this.selectItem = '3';
            break;
          case 'third_news_list':
          case 'compound_news_add':
          case 'compound_news_edit':
            this.selectItem = '4';
            break;
          case 'complaint_home':
            this.selectItem = '5';
            break;
          default:
            this.selectItem = '1';
        }
      }
    },

    watch: {
      // 监听路由变化，绑定Menu
      $route(to) {
        this.listenRouterMenu(to.name);
      }
    }


  };
</script>

<style scoped lang="less">
  @import "../../styles/views/layout/layout";
</style>
