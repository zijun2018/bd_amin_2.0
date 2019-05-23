/**
 *   @Project:   用户级别的路由
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/9 15:06
 *   @Note:      —>父级路由: 用户页面
 *                  —>二级子路由: 用户个人中心页
 *                  —>二级子路由: 用户登录页
 *                  —>二级子路由: 用户注册页
 *                  —>二级子路由: 用户注册结果页
 */

const EmptyView = () => import(/* webpackChunkName: "home" */ '@/views/EmptyView');

const ROUTER_USER = [
  // 父级路由: 用户页面
  {
    path: '/user',
    redirect: { name: 'user_info' },
    component: EmptyView,
    meta: {
      auth: false,
      icon: '',
      title: '用户',
      keepAlive: false
    },
    name: 'user_index',
    children: [
      // 二级子路由: 用户个人中心页
      {
        path: 'info',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Info'),
        name: 'user_info',
        meta: {
          auth: true,
          icon: '',
          title: '个人中心',
          keepAlive: false
        }
      },
      // 二级子路由: 用户登录页
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
        name: 'user_login',
        meta: {
          auth: false,
          icon: '',
          title: '登录',
          keepAlive: false
        }
      },
      // 二级子路由: 用户注册页
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register'),
        name: 'user_register',
        meta: {
          auth: false,
          icon: '',
          title: '注册',
          keepAlive: false
        }
      },
      // 二级子路由: 用户注册结果页
      {
        path: 'register-result',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult'),
        name: 'user_register_result',
        meta: {
          auth: true,
          icon: '',
          title: '注册结果',
          keepAlive: false
        }
      }
    ]
  }];

export default ROUTER_USER;
