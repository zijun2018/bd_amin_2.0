import Vue from 'vue';
import Router from 'vue-router';
import RouterUser from './router-user';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 项目根目录页 -> 首页
    {
      path: '',
      redirect: { name: 'home' },
      name: 'root',
      meta: {
        auth: true,
        icon: '',
        title: '量化云CMS',
        keepAlive: false
      },
    },
    // 首页
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
      name: 'home',
      meta: {
        auth: true,
        icon: '',
        title: '量化云CMS-首页',
        keepAlive: false
      }
    },
    // 登录 - 后期可以去除
    {
      path: '/login',
      redirect: { name: 'user_login' },
      name: 'login',
      meta: {
        auth: false,
        title: '量化云CMS-登录',
        keepAlive: false
      },
    },
    ...RouterUser,
    {
      path: '*',
      component: () => import(/* webpackChunkName: "others" */ '@/views/404'),
    }
  ],
});

// 路由进入之前的钩子
router.beforeEach((to, from, next) => {
  // 验证用户是否登录
  // if (to.matched.some(m => m.meta.auth)) {
  //
  // }
  next();
});

// 路由进入之后的钩子
router.afterEach((to, from, next) => {
  // next();

});

export default router;
