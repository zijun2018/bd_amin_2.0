/**
*   @Project:   第三方文章审核管理
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/20 10:02
*   @Note:
*/


<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48" :style="{paddingBottom: '20px'}">

          <!-- 标题（输入框） -->
          <a-col :sm="8">
            <a-form-item label="标题">
              <a-input @keyup.13="onSearch" placeholder="请输入标题" v-model="queryParam.title"/>
            </a-form-item>
          </a-col>

          <!-- 审核状态 -->
          <a-col :sm="8">
            <a-select labelInValue
                      :defaultValue="{ key: '全部' }"
                      style="width: 240px"
                      @change="handleSelectChange">
              <a-select-option value="-1"
                               v-if="Number(queryParam.status) !== -1">全部</a-select-option>
              <a-select-option value="0"
                               v-if="Number(queryParam.status) !== 0">未审核</a-select-option>
              <a-select-option value="1"
                               v-if="Number(queryParam.status) !== 1">审核通过</a-select-option>
            </a-select>
          </a-col>

          <!-- 查询按钮 -->
          <a-col :sm="4">
            <span class="table-page-search-submitButtons">
              <a-button @click="onSearch" type="primary">查询</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <a-table :columns="columns"
             :dataSource="listData"
             :loading="loading"
             :pagination="pagination"
             @change="handleTableChange"
    >
      <template slot="action" slot-scope="text, record">
        <span v-if="record.is_review==0">
          <a-popconfirm
            @confirm="updateArticleStatus(record)"
            title='确认通过审核?'
            v-if="listData.length">
            <a-button ghost size="small" type="primary">审核通过</a-button>
        </a-popconfirm>
          <a-divider type="vertical"/>
        </span>
        <a-divider type="vertical" v-if="record.article_status === '0'"/>
        <a-button @click="reviewNews(record.key)" ghost size="small" type="primary">预览</a-button>
        <a-divider type="vertical"/>
        <a-popconfirm
          @confirm="onDelete(record.key)"
          title="确认删除?"
          v-if="listData.length">
          <a-button ghost size="small" type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>


    <a-modal
        :title="newsDetail&&newsDetail.title"
        :width='455'
        @ok="modalVisible=false"
        cancelText="关闭"
        v-model="modalVisible"
        wrapClassName="news-preview-modal">
        <div class="detail-content">
          <div class="article-des">
          </div>
          <div v-html="newsDetail&&newsDetail.content"></div>
          <div class="ad-img">
            <a :href="newsDetail&&newsDetail.ad_one_goal_url" target="_blank"
               v-if="newsDetail&&newsDetail.ad_one_goal_url">
              <img :src="newsDetail&&newsDetail.ad_one_url" alt="" v-if="newsDetail&&newsDetail.ad_one_url">
            </a>
            <a :href="newsDetail&&newsDetail.ad_two_goal_url" target="_blank"
               v-if="newsDetail&&newsDetail.ad_two_goal_url">
              <img :src="newsDetail&&newsDetail.ad_two_url" alt="" v-if="newsDetail&&newsDetail.ad_two_url">
            </a>
            <img :src="newsDetail&&newsDetail.ad_one_url"
                 alt="" v-if="newsDetail&&newsDetail.ad_one_url&&!newsDetail.ad_one_goal_url">
            <img :src="newsDetail&&newsDetail.ad_two_url"
                 alt="" v-if="newsDetail&&newsDetail.ad_two_url&&!newsDetail.ad_two_goal_url">
          </div>
        </div>
      </a-modal>

  </div>
</template>

<script>
  import { Form, Col, Modal, Row, Table, Divider, Popconfirm, Button, Input, Select, message } from 'ant-design-vue';
  import { getAdminThirdNewsList,
    postAdminThirdNewsUpdateStatus,
    getAdminThirdNewsShow,
    getAdminThirdNewsDelete } from '../../axios/api/admin-third-news';

  export default {
    name: 'newsThirdNewsList',

    components: {
      AForm: Form,
      AFormItem: Form.Item,
      ACol: Col,
      AModal: Modal,
      ARow: Row,
      ATable: Table,
      ADivider: Divider,
      APopconfirm: Popconfirm,
      AButton: Button,
      AInput: Input,
      ASelect: Select,
      ASelectOption: Select.Option
    },

    data () {
      return {
        listData: [],
        modalVisible: false,
        queryParam: {
          title: '',
          status: -1,
        },
        columns: [
          {
            title: '#',
            dataIndex: 'serial'
          },
          {
            title: '标题',
            width: 320,
            dataIndex: 'title',
            customRender: value => value || '— —'
          },
          {
            title: '文章来源',
            dataIndex: 'sources',
            width: 200,
            customRender: value => value || '— —'
          },
          {
            title: '发布时间',
            dataIndex: 'released_time',
            customRender: value => value || '— —'
          },
          {
            title: '状态',
            dataIndex: 'is_review',
            filterMultiple: false,
            onFilter: (value, record) => value === '' || record.is_review === value,
            customRender: (value) => String(value) === '1' ? '已审核' : '未审核'
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        newsParams: {
          title: '',
          status: -1,
          page: 1,
          page_size: 20
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

    created () {
      this.getThirdNewsListData(this.newsParams);
    },

    methods: {
      /**
       *  获取第三方文章列表
       *  @param params {Object} 参数对象
       */
      getThirdNewsListData (params) {
        getAdminThirdNewsList({
            params,
            success: (res) => {
              this.loading = false;
              const data = res;
              this.listData = data.data;
              let seriesNum = this.pagination.current * this.pagination.pageSize - (this.pagination.pageSize - 1);

              for (let i = 0; i < this.listData.length; i++) {
                this.listData[i].serial = seriesNum++;
              }
              this.pagination.total = data.total;
            }
        });
      },

      /**
       * 监听到表格数据变化
       * @param pagination {Number} 页码
       * @param filter {Object} 参数对象
       */
      handleTableChange (pagination, filter) {
        if (JSON.stringify(filter) !== '{}') {
          for (let k in filter) {
            this.newsParams[k] = filter[k].join('');
          }
        }
        this.newsParams.page = pagination.current;
        this.pagination.current = pagination.current;
        this.getThirdNewsListData(this.newsParams);
      },

      /**
       * 查询搜索
       */
      onSearch () {
        this.newsParams.title = this.queryParam.title;
        this.newsParams.status = this.queryParam.status;
        this.newsParams.page = 1;
        this.pagination.current = 1;
        this.getThirdNewsListData(this.newsParams);
      },

      /**
       * 删除文章
       * @param key {String} 文章key值
       */
      onDelete (key) {
        const params = {
          key
        };
        return getAdminThirdNewsDelete({
          params,
          success: () => {
            message.success('删除成功');
            this.getThirdNewsListData(this.newsParams);
          }
        });
      },

      /**
       * 文章预览
       * @param key {String} 文章key值
       */
      reviewNews (key) {
        const params = {
          key
        };
        return getAdminThirdNewsShow({
          params,
          success: (res) => {
            this.newsDetail = res;
            this.modalVisible = true;
          }
        });
      },

      /**
       * 更新文章审核状态
       * @param params {Object} 参数对象
       */
      updateArticleStatus (params) {
        const obj = {
          key: params.key,
          status: String(params.is_review) === '1' ? 0 : 1
        };
        return postAdminThirdNewsUpdateStatus({
          params: obj,
          success: () => {
            // 审核成功,给审核成功提示，否则弹出错误信息
            message.success('通过审核成功');
            this.getThirdNewsListData(this.newsParams);
          },
          error: () => {
            message.error('网络有点问题，请稍后重试');
          }
        });
      },

      /**
       * 监听审核状态的变化
       * @param value
       */
      handleSelectChange(value) {
        this.queryParam.status = Number(value.key);
      }
    }
  };
</script>

<style lang="less" scoped>
  .ant-table-filter-dropdown-btns {
    display: none;
  }

  .article-des {
    color: #999;
    margin-bottom: 20px;
    overflow: hidden;

    span {
      font-size: 12px;
      color: #1C52BB;
    }

    .article-source, .article-author {
      float: left;
      margin-right: 25px;
    }
  }

  .detail-wrap {
    overflow: auto;

    .detail-content {
      width: 414px;
      margin: 0 auto;
    }

    img {
      width: 100%;
      height: 100%;
    }

    p {
      margin: 0;
    }

    .ant-btn-primary {
      display: none;
    }
  }

  .ad-img {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #E2E2E2;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      margin-top: 15px;
    }
  }
</style>
