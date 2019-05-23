/**
*   @Project:   复盘文章列表
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/20 14:50
*   @Note:      ——
*/

<template>
  <div class="news-compound-news-list">
    <!-- Part1: 上面按钮、搜索、查询 -->
    <div class="compound-news-list-header">
      <!-- Part1-1: 标题输入 -->
      <div class="compound-list-title-input">
        <p>标题:</p>
        <a-input placeholder="请输入标题" v-model="titleInput" @keyup.13="handleSearch" />
      </div>
      <!-- Part1-2: 查询按钮 -->
      <a-button type="primary" @click="handleSearch">查询</a-button>
    </div>

    <!-- Part2: 列表内容 -->
    <div class="compound-news-list-section">

      <!-- Part2-1: 列表数据 -->
      <a-locale-provider :locale="zh_CN">
        <a-table :columns="columns"
                 :dataSource="listData"
                 :loading="isShowLoading"
                 style="word-break: break-all; word-wrap: break-word;"
                 :pagination="pagination">
          <template slot="action" slot-scope="text, record">
<!--
            <span v-if="record.article_status === 1">
              <a-popconfirm @confirm="onShelf(record)"
                            title="确认上架?"
                            v-if="listData.length">
                <a-button ghost size="small" type="primary">上架</a-button>
              </a-popconfirm>
              <a-divider type="vertical"/>
            </span>

            <a-button @click="jumpToEarlyNewsAdd(record.key)"
                      ghost
                      size="small"
                      type="primary">编辑</a-button>
            <a-divider type="vertical"/>
-->
            <a-button @click="reviewNews(record.key)"
                      ghost
                      size="small"
                      type="primary">预览</a-button>
            <a-divider type="vertical"/>
            <a-popconfirm
              @confirm="onDelete(record.key)"
              title="确认删除?"
              v-if="listData.length">
              <a-button ghost size="small" type="danger">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table>
      </a-locale-provider>

      <!-- Part2-2: 弹出预览层 -->
      <a-modal
        :title="newsDetail && newsDetail.title"
        v-model="modalVisible"
        @ok="modalVisible=false"
        cancelText="关闭"
        :width='455'
        wrapClassName="news-preview-modal"
      >
        <div class="detail-content">
          <div class="article-des">
            <div class="article-source">
              原文由 "<span class="">{{newsDetail && newsDetail.sources}}</span>" 发布
            </div>
            <p class="article-author">作者 | <span class="">{{newsDetail&&newsDetail.author}}</span></p>
          </div>
          <div v-html="newsDetail && newsDetail.content"></div>
          <div class="ad-img">
            <a :href="newsDetail && newsDetail.ad_one_goal_url" v-if="newsDetail&&newsDetail.ad_one_goal_url" target="_blank" >
              <img v-if="newsDetail&&newsDetail.ad_one_url" :src="newsDetail&&newsDetail.ad_one_url" alt="">
            </a>
            <a :href="newsDetail&&newsDetail.ad_two_goal_url" v-if="newsDetail&&newsDetail.ad_two_goal_url" target="_blank" >
              <img v-if="newsDetail&&newsDetail.ad_two_url" :src="newsDetail&&newsDetail.ad_two_url" alt="">
            </a>
            <img v-if="newsDetail&&newsDetail.ad_one_url&&!newsDetail.ad_one_goal_url"  :src="newsDetail&&newsDetail.ad_one_url" alt="">
            <img v-if="newsDetail&&newsDetail.ad_two_url&&!newsDetail.ad_two_goal_url" :src="newsDetail&&newsDetail.ad_two_url" alt="">
          </div>
        </div>
      </a-modal>

    </div>
  </div>
</template>

<script>
  import { Button, Input, LocaleProvider, Table, Popconfirm, Divider, Modal, message } from 'ant-design-vue';
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import { getAdminCompoundList, getAdminCompoundShow, getAdminCompoundDel } from '../../../axios/api/admin-compound-news';

  export default {
    name: 'NewsCompoundNewsList',

    components: {
      AButton: Button,
      AInput: Input,
      ATable: Table,
      ALocaleProvider: LocaleProvider,
      APopconfirm: Popconfirm,
      ADivider: Divider,
      AModal: Modal
    },

    data() {
      return {
        zh_CN, // 中文

        titleInput: '', // 顶部查询需要输入的标题

        requestParams: { // 获取列表的请求参数
          title: '',
          page: 1,
          page_size: 20
        },

        listData: [], // 列表数据

        pagination: { // 分页相关
          current: 1,
          pageSize: 20,
          total: 4
        },

        isShowLoading: true, // 是否显示加载动画

        modalVisible: false, // 是否展示弹出文章预览

        newsDetail: null, // 文章详细数据

        columns: [ // 表格表头
          {
            title: '#',
            dataIndex: 'serial',
          },
          {
            title: '标题',
            width: 300,
            dataIndex: 'title',
          },
          {
            title: '模块分类',
            dataIndex: 'sort',
            customRender: (value) => {
              switch (value) {
                case 1:
                  return '行情';
                case 2:
                  return '热点';
                case 3:
                  return '谈资';
                default:
                  return '';
              }
            }
          },
          {
            title: '文章来源',
            width: 180,
            dataIndex: 'sources',
          },
          {
            title: '发布时间',
            dataIndex: 'released_time',
            customRender: value => value || '--'
          },
          {
            title: '更新时间',
            dataIndex: 'updated_time',
            customRender: value => value || '--'
          },
          {
            title: '状态',
            dataIndex: 'article_status',
            customRender: value => (Number(value) === 2 ? '上架' : '待上架')
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          }
        ]
      };
    },

    created() {
      this.getCompoundNewsData();
    },

    methods: {
      getCompoundNewsData () {
        return getAdminCompoundList({
          params: this.requestParams,
          success: (res) => {
            this.isShowLoading = false; // 关闭加载动画
            this.listData = res.data;
          }
        });
      },

      /**
       * 跳转到早盘文章添加页
       */
      jumpToEarlyNewsAdd(key) {
        this.$router.push({ name: 'early_news_edit', params: { key } });
      },

      /**
       * 预览文章
       * @param key {String} 文章key值
       */
      reviewNews(key) {
        const params = {
          key,
        };
        return getAdminCompoundShow({
          params,
          success: (res) => {
            this.newsDetail = res;
            this.modalVisible = true;
          }
        });
      },

      /**
       * 更改上架状态
       * @param params
       */
      onShelf() {

      },

      /**
       * 删除文章
       * @param key {String} 文章key值
       */
      onDelete (key) {
        const params = {
          key
        };
        return getAdminCompoundDel({
          params,
          success: () => {
            message.success('删除成功');
            this.getEarlyNewsData();
          }
        });
      },

      /**
       * 搜索
       */
      handleSearch() {
        this.requestParams.title = this.titleInput;
        this.requestParams.page = 1;
        this.pagination.current = 1;
        this.getCompoundNewsData();
      }
    },


  };
</script>

<style scoped lang="less">
  @import "../../../styles/views/news/compound-news";
</style>
