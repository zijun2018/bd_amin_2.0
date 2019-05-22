/**
 *   @Project:   第三方文章管理
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/20 10:16
 *   @Note:      ——
 */

const EmptyView = () => import(/* webpackChunkName: "news" */ '@/views/EmptyView');
const LayoutHome = () => import(/* webpackChunkName: "news" */ '@/views/Home');

const ROUTER_THIRD_NEWS = [
  // 父级路由: 第三方文章审核页面
  {
    path: '/third-news',
    redirect: { name: 'third_news_index' },
    component: EmptyView,
    meta: {
      auth: true,
      icon: '',
      title: '第三方文章审核管理',
      keepAlive: false
    },
    name: 'third_news_index',
    children: [
      // 二级子路由: 第三方文章目录
      {
        path: 'board',
        redirect: { name: 'third_news_list' },
        component: LayoutHome,
        meta: {
          auth: true,
          icon: '',
          title: '第三方文章列表',
          keepAlive: false
        },
        name: 'third_news_board',
        children: [
          // 三级子路由: 第三方文章列表
          {
            path: 'list',
            component: () => import(/* webpackChunkName: "news" */ '@/views/third-news/List'),
            name: 'third_news_list',
            meta: {
              auth: true,
              icon: '',
              title: '文章列表',
              keepAlive: false
            }
          }
        ]
      }
    ]
  }];

export default ROUTER_THIRD_NEWS;
