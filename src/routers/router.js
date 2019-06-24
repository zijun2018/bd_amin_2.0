import Vue from 'vue';
import Router from 'vue-router';
import RouterUser from './router-user';
import RouterNews from './router-news';
import RouterThirdNews from './router-third-news';
import RouterComplaint from './router-complaint';
import { isLogin } from '../utils/base-methods';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
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
      redirect: { name: 'library_news_list' },
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
    ...RouterNews,
    ...RouterThirdNews,
    ...RouterComplaint,
    {
      path: '*',
      component: () => import(/* webpackChunkName: "home" */ '@/views/404'),
    }
  ],
});

// 路由进入之前的钩子
router.beforeEach((to, from, next) => {
  // 验证用户是否登录，meta信息和本地存储信息同步
  if (to.meta.auth) {
    if (!isLogin()) {
      // 判断当前没有登录，就跳转到登录页面
      // router.push({ name: 'user_login', query: { successUrl: encodeURIComponent(from) } });
      router.push({ name: 'user_login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

// 路由进入之后的钩子
router.afterEach(() => {
  // next();

});

export default router;
