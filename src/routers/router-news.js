/**
 *   @Project:   资讯文章的路由
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/9 15:06
 *   @Note:      ——
 */

const EmptyView = () => import(/* webpackChunkName: "home" */ '@/views/EmptyView');
const LayoutHome = () => import(/* webpackChunkName: "home" */ '@/views/Home');

const ROUTER_LIBRARY_NEWS = [
  // 父级路由: 用户页面
  {
    path: '/news',
    redirect: { name: 'library_news_index' },
    component: EmptyView,
    meta: {
      auth: true,
      icon: '',
      title: '资讯管理',
      keepAlive: false
    },
    name: 'news_index',
    children: [
      // 二级子路由: 资讯库文章列表
      {
        path: 'library-news',
        redirect: { name: 'library_news_list' },
        component: LayoutHome,
        meta: {
          auth: true,
          icon: '',
          title: '资讯库文章列表',
          keepAlive: false
        },
        name: 'library_news_index',
        children: [
          // 三级子路由: 新闻列表
          {
            path: 'list',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/library-news/List'),
            name: 'library_news_list',
            meta: {
              auth: true,
              icon: '',
              title: '新闻列表',
              keepAlive: false
            }
          },
          // 三级子路由: 添加资讯
          {
            path: 'add',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/library-news/Add'),
            name: 'library_news_add',
            meta: {
              auth: true,
              icon: '',
              title: '添加资讯',
              keepAlive: false
            }
          },
          // 三级子路由: 编辑资讯
          {
            path: 'edit/:key',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/library-news/Add'),
            name: 'library_news_edit',
            meta: {
              auth: true,
              icon: '',
              title: '编辑资讯',
              keepAlive: false
            }
          }
        ]
      },
      // 二级子路由: 早盘文章列表
      {
        path: 'early-news',
        redirect: { name: 'early_news_list' },
        component: LayoutHome,
        meta: {
          auth: true,
          icon: '',
          title: '早盘文章列表',
          keepAlive: false
        },
        name: 'early_news_index',
        children: [
          // 三级子路由: 新闻列表
          {
            path: 'list',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/early-news/List'),
            name: 'early_news_list',
            meta: {
              auth: true,
              icon: '',
              title: '文章列表',
              keepAlive: false
            }
          },
          // 三级子路由: 添加资讯
          {
            path: 'add',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/early-news/Add'),
            name: 'early_news_add',
            meta: {
              auth: true,
              icon: '',
              title: '添加文章',
              keepAlive: false
            }
          },
          // 三级子路由: 编辑资讯
          {
            path: 'edit/:key',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/early-news/Add'),
            name: 'early_news_edit',
            meta: {
              auth: true,
              icon: '',
              title: '编辑文章',
              keepAlive: false
            }
          }
        ]
      },
      // 二级子路由: 复盘文章列表
      {
        path: 'compound-news',
        redirect: { name: 'compound_news_list' },
        component: LayoutHome,
        meta: {
          auth: true,
          icon: '',
          title: '复盘文章列表',
          keepAlive: false
        },
        name: 'compound_news_index',
        children: [
          // 三级子路由: 新闻列表
          {
            path: 'list',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/compound-news/List'),
            name: 'compound_news_list',
            meta: {
              auth: true,
              icon: '',
              title: '新闻列表',
              keepAlive: false
            }
          },
          // 三级子路由: 添加资讯
          {
            path: 'add',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/compound-news/Add'),
            name: 'compound_news_add',
            meta: {
              auth: true,
              icon: '',
              title: '添加资讯',
              keepAlive: false
            }
          },
          // 三级子路由: 编辑资讯
          {
            path: 'edit/:key',
            component: () => import(/* webpackChunkName: "news" */ '@/views/news/compound-news/Add'),
            name: 'compound_news_edit',
            meta: {
              auth: true,
              icon: '',
              title: '编辑资讯',
              keepAlive: false
            }
          }
        ]
      },

    ]
  }];

export default ROUTER_LIBRARY_NEWS;
