/**
 *   @Project:   投诉管理
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/20 15:24
 *   @Note:      ——
 */

const EmptyView = () => import(/* webpackChunkName: "news" */ '@/views/EmptyView');
const LayoutHome = () => import(/* webpackChunkName: "news" */ '@/views/Home');

const ROUTER_COMPLAINT = [
  // 父级路由: 投诉管理
  {
    path: '/complaint',
    redirect: { name: 'complaint_Home' },
    component: EmptyView,
    meta: {
      auth: true,
      icon: '',
      title: '投诉管理',
      keepAlive: false
    },
    name: 'complaint_index',
    children: [
      // 二级子路由: 第三方文章目录
      {
        path: 'board',
        redirect: { name: 'complaint_home' },
        component: LayoutHome,
        meta: {
          auth: true,
          icon: '',
          title: '投诉管理',
          keepAlive: false
        },
        name: 'complaint_board',
        children: [
          // 三级子路由: 第三方文章列表
          {
            path: 'home',
            component: () => import(/* webpackChunkName: "complaint" */ '@/views/complaint/Home'),
            name: 'complaint_home',
            meta: {
              auth: true,
              icon: '',
              title: '投诉列表',
              keepAlive: false
            }
          }
        ]
      }
    ]
  }];

export default ROUTER_COMPLAINT;
