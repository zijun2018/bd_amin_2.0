/**
*   @Project:   资讯列表页
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/9 15:43
*   @Note:      ——
*/


<template>
  <div class="news-library-news">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48" :style="{paddingBottom: '20px'}">
          <a-col :sm="12">
            <a-button type="primary" icon="plus" @click="jumpToNewsAdd">新建</a-button>
          </a-col>
          <a-col :sm="8">
            <a-form-item label="标题">
              <a-input v-model="queryParam.title" @keyup.13="onSearch" placeholder="请输入标题"/>
            </a-form-item>
          </a-col>
          <a-col :sm="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="onSearch">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-locale-provider :locale="zh_CN">
      <a-table :columns="columns"
               :dataSource="listData"
               :loading="loading"
               style="word-break: break-all; word-wrap: break-word;"
               :pagination="pagination"
               @change="handleTableChange">
        <template slot="action" slot-scope="text, record">
        <span v-if="record.article_status==1">
          <a-popconfirm
            @confirm="onShelf(record)"
            title="确认上架?"
            v-if="listData.length">
          <a-button ghost size="small" type="primary">上架</a-button>
        </a-popconfirm>
          <a-divider type="vertical"/>
        </span>
          <a-button @click="jumpToNewsEdit(record.id)" ghost size="small" type="primary">编辑</a-button>
          <a-divider type="vertical"/>
          <a-button @click="reviewNews(record.id)" ghost size="small" type="primary">预览</a-button>
          <a-divider type="vertical"/>
          <a-popconfirm
            @confirm="onDelete(record.id)"
            title="确认删除?"
            v-if="listData.length">
            <a-button ghost size="small" type="danger">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-locale-provider>
    <a-modal
      :title="newsDetail&&newsDetail.title"
      v-model="modalVisible"
      @ok="modalVisible=false"
      cancelText="关闭"
      :width='455'
      wrapClassName="news-preview-modal">
      <div class="detail-content">
        <div class="article-des">
          <div class="article-source">
            原文由 "<span class="">{{newsDetail&&newsDetail.sources}}</span>" 发布
          </div>
          <p class="article-author">作者 | <span class="">{{newsDetail&&newsDetail.author}}</span></p>
        </div>
        <div v-html="newsDetail&&newsDetail.content"></div>
        <div class="ad-img-wrap">
          <a :href="newsDetail&&newsDetail.ad_one_goal_url" v-if="newsDetail&&newsDetail.ad_one_goal_url" target="_blank" >
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
</template>
<script>
  import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    LocaleProvider,
    message,
    Modal,
    Popconfirm,
    Row,
    Table
  } from 'ant-design-vue';
  import { editNews, getNewsDetail, getNewsList } from '../../../axios/api/admin-news';
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: 'newsList',

    components: {
      AForm: Form,
      AFormItem: Form.Item,
      ACol: Col,
      ATable: Table,
      AButton: Button,
      APopconfirm: Popconfirm,
      ARow: Row,
      AModal: Modal,
      ADivider: Divider,
      AInput: Input,
      ALocaleProvider: LocaleProvider
    },
    data () {
      return {
        zh_CN, // 中文
        listData: [],
        modalVisible: false,
        queryParam: {
          title: ''
        },
        columns: [
          {
            title: '#',
            dataIndex: 'serial'
          },
          {
            title: '标题',
            width: 300,
            dataIndex: 'title'
          },
          {
            title: '模块分类',
            dataIndex: 'sort',
            filterMultiple: false,
            filters: [
              { text: '全部', value: '' },
              { text: '行情', value: '1' },
              { text: '热点', value: '2' },
              { text: '谈资', value: '3' },
            ],
            onFilter: (value, record) => value == '' || record.sort == value,
            customRender: (value, row, index) => {
              switch (value) {
                case 1:
                  return '行情';
                case 2:
                  return '热点';
                case 3:
                  return '谈资';
              }
            }
          },
          {
            title: '文章分类',
            dataIndex: 'classification',
            filterMultiple: false,
            filters: [
              { text: '全部', value: '' },
              { text: '技术类', value: '1' },
              { text: '价投类', value: '2' },
              { text: '热点类', value: '3' },
              { text: '综合类', value: '4' },
            ],
            customRender: (value) => {
              switch (value) {
                case 1:
                  return '技术类';
                case 2:
                  return '价投类';
                case 3:
                  return '热点类';
                case 4:
                  return '综合类';
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
            customRender: (value, row, index) => {
              if (value) {
                return value.indexOf('T') === -1 ? value : value.split('T').join(' ');
              }
                return '— —';
            }
          },
          {
            title: '更新时间',
            dataIndex: 'updated_time',
            customRender: (value, row, index) => {
              if (value) {
                return value.indexOf('T') === -1 ? value : value.split('T').join(' ');
              }
              return '— —';
            }
          },
          {
            title: '状态',
            dataIndex: 'article_status',
            filterMultiple: false,
            filters: [
              { text: '全部', value: '' },
              { text: '待上架', value: '1' },
              { text: '上架', value: '2' },
            ],
            onFilter: (value, record) => value == '' || record.article_status == value,
            customRender: (value, row, index) => (value == '2' ? '上架' : '待上架')
          },
          {
            title: '操作',
            dataIndex: 'action',
            // width: '150px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        newsParams: {
          page: 1,
          limit: 20
        },
        pagination: {
          current: 1,
          pageSize: 20,
          total: 4
        },
        loading: true,
        newsDetail: null
      };
    },
    created() {
      this._getNewsList(this.newsParams);
    },
    methods: {
      _getNewsList(params) {
        getNewsList(params).then((res) => {
          this.loading = false;
          const { data } = res;
          this.listData = data.data;
          let seriesNum = this.pagination.current * this.pagination.pageSize - (this.pagination.pageSize - 1);

          for (let i = 0; i < this.listData.length; i++) {
            this.listData[i].serial = seriesNum++;
          }
          this.pagination.total = data.page_count;
        });
      },
      handleTableChange(pagination, filter) {
        if (JSON.stringify(filter) != '{}') {
          for (const k in filter) {
            this.newsParams[k] = filter[k].join('');
          }
        }
        this.newsParams.page = pagination.current;
        this.pagination.current = pagination.current;
        this._getNewsList(this.newsParams);
      },
      onSearch() {
        this.newsParams.title = this.queryParam.title;
        this.newsParams.page = 1;
        this.pagination.current = 1;
        this._getNewsList(this.newsParams);
      },
      onDelete (id) {
        editNews({ id, deleted_at: 1 }).then((res) => {
          message.success('删除成功');
          this._getNewsList(this.newsParams);
        });
      },
      reviewNews(id) {
        getNewsDetail({ id }).then((res) => {
          const { data } = res;
          this.newsDetail = data;
          this.modalVisible = true;
        });
      },
      onShelf(params) {
        editNews({ id: params.id, article_status: 2 }).then((res) => {
          message.success('上架成功');
          this._getNewsList(this.newsParams);
        });
      },
      jumpToNewsAdd () {
        this.$router.push({ name: 'library_news_add' });
      },
      jumpToNewsEdit (id) {
        this.$router.push({ name: 'library_news_edit', params: { id } });
      }
    }
  };
</script>
<style lang="less" scoped>
  .ant-table-filter-dropdown-btns{
    display:none;
  }
  .article-des{
    color:#999;
    margin-bottom:20px;
    overflow: hidden;
    span{
      font-size: 12px;
      color:#1C52BB;
    }
    .article-source,.article-author{
      float:left;
      margin-right:25px;
    }
  }
  .detail-wrap{
    overflow: auto;
    .detail-content{
      width:414px;
      margin:0 auto;
    }
    img{
      width:100%;
      height:100%;
    }
    p{
      margin:0;
    }
    .ant-btn-primary{
      display:none;
    }
  }
  .ad-img{
    margin-top:40px;
    padding-top: 20px;
    border-top:1px solid #E2E2E2;
    img{
      width:100%;
      height:100%;
      border-radius: 5px;
      margin-top:15px;
    }
  }

</style>
