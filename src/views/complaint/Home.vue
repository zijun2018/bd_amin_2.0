/**
*   @Project:   投诉管理
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/20 14:57
*   @Note:
*/

<template>
  <div class="complaint-home">
    <!-- Part1: 左侧投诉列表区域 -->
    <div class="complaint-home-left">
      <!-- Part1-1: 头部区域 -->
      <div class="left-header">
        <p>全部消息</p>
      </div>
      <!-- Part1-2: 列表区域 -->
      <div class="left-content">
        <div :class="{'active': currentIndex === i}"
             :key="item.id"
             @click="handleClickNews(item.key, i)"
             class="complaint-news-item"
             v-for="(item, i) in this.newsList">
          <p :title="item.title" class="item-title">{{item.title || '--'}}</p>
          <div class="item-info">
            <p class="item-time">{{item.created_at}}</p>
            <p class="item-count">{{item.complaint_num || 0}}条</p>
          </div>
        </div>
      </div>

      <!-- Part1-3: 分页 -->
      <div class="left-pagination">
        <a-pagination :current="newsPaginationCurrent"
                      :pageSize="newsPaginationPageSize"
                      :total="newsPaginationTotal"
                      @change="handleNewsPageChange"
                      simple/>
      </div>

    </div>

    <!-- Part2: 右侧投诉详细列表区域 -->
    <div class="complaint-home-right">
      <!-- Part2-1: 头部查询 -->
      <div class="complaint-right-header">
        <div class="select-tag">
          <span>标签：</span>
          <a-select
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            @change="handleChangeTag"
            defaultValue="1"
            size="default"
            style="width: 200px">
            <a-select-option
              :key="item.title"
              :value="item.value"
              v-for="item in searchTags">
              {{item.title}}
            </a-select-option>
          </a-select>
        </div>
        <div class="select-date">
          <span>时间：</span>
          <a-select
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            @change="handleChangeDate"
            defaultValue="0"
            size="default"
            style="width: 200px">
            <a-select-option
              :key="item.t"
              :value="item.value"
              v-for="item in searchDate">
              {{item.title}}
            </a-select-option>
          </a-select>
        </div>

        <a-button @click="handleSearch" type="primary">查询</a-button>
      </div>

      <!-- Part2-2: 列表数据 -->
      <a-locale-provider :locale="zh_CN">
        <a-table :columns="columns"
                 :dataSource="listData"
                 :loading="isShowLoading"
                 :pagination="detailPagination"
                 :rowKey="record => record.id"
                 @change="handleDetailChange"
                 style="word-break: break-all; word-wrap: break-word;width: 100%; margin-top: 0;">
          <!-- 用户信息 -->
          <template slot="userInfo" slot-scope="text, record">
            <div class="user-info-part">
              <div class="part1">
                <img :src="record.user_info.avatar_url || record.agent_info.avatar_url" alt="">
                <p>{{record.user_info.user_name || record.agent_info.user_name}}</p>
              </div>
              <div class="part2">
                {{record.created_at}}
              </div>
            </div>
          </template>

          <!-- 证据截图 -->
          <template slot="pic" slot-scope="text, record">
            <div class="pic-part">
              <div :key="i"
                   @click="showPic(item)"
                   class="img-item"
                   v-for="(item, i) in record.pic.split(',')">
                <img :src="item" alt="">
              </div>
            </div>
          </template>
        </a-table>
      </a-locale-provider>

      <!-- Part2-3: 操作按钮 -->
      <div class="news-operate">
        <a-button @click="reviewNews"
                  size="default"
                  style="margin-right: 40px"
                  type="primary">预览文章
        </a-button>
        <a-locale-provider :locale="zh_CN">
          <a-popconfirm
            @confirm="onDelete"
            title="确认删除?"
            v-if="listData.length">
            <a-button ghost size="default" type="danger">删除</a-button>
          </a-popconfirm>
        </a-locale-provider>
      </div>
    </div>

    <!-- Part3: 证据截图的图片预览 -->
    <a-modal
      :width='600'
      @ok="modalPicVisible=false"
      cancelText="关闭"
      title="图片预览"
      v-model="modalPicVisible"
      wrapClassName="news-preview-modal">
      <img :src="showImageUrl" alt="">
    </a-modal>

    <!-- Part4: 文章预览 -->
    <a-modal
      :title="newsDetail && newsDetail.title"
      :width='455'
      @ok="modalVisible=false"
      cancelText="关闭"
      v-model="modalVisible"
      wrapClassName="news-preview-modal">
      <div class="detail-content">
        <div class="article-des">
          <div class="article-source">
            原文由 "<span class="">{{newsDetail && newsDetail.sources}}</span>" 发布
          </div>
          <p class="article-author">作者 | <span class="">{{newsDetail&&newsDetail.author}}</span></p>
        </div>
        <div v-html="newsDetail && newsDetail.content"></div>
        <div class="ad-img">
          <a :href="newsDetail && newsDetail.ad_one_goal_url" target="_blank"
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
  import { Button, LocaleProvider, message, Modal, Pagination, Popconfirm, Select, Table } from 'ant-design-vue'
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import { getAdminComplaintList, getAdminComplaintNewsList } from '../../axios/api/admin-complaint'
  import { getAdminThirdNewsDelete, getAdminThirdNewsShow } from '../../axios/api/admin-third-news'

  export default {
    name: 'ComplaintHome',

    components: {
      ATable: Table,
      ALocaleProvider: LocaleProvider,
      AButton: Button,
      APopconfirm: Popconfirm,
      AModal: Modal,
      ASelect: Select,
      ASelectOption: Select.Option,
      APagination: Pagination
    },

    data () {
      return {
        zh_CN, // 中文

        /** ****************************************************** */
        /*                   左侧投诉文章列表相关                      */
        /** ****************************************************** */

        newsList: '', // 投诉文章列表

        newsDetail: null, // 文章预览的详情

        currentIndex: 0, // 当前显示第几条

        currentNewsKey: '', // 当前文章的key值

        queryNewsParams: { // 获取文章投诉列表的请求参数
          page_size: 7,
          page: 0,
          order_by: '1',
          time_type: '0'
        },

        newsPaginationCurrent: 1, // 文章当前分页

        newsPaginationPageSize: 7, // 文章每页大小

        newsPaginationTotal: 0, // 文章列表总数


        /** ****************************************************** */
        /*                  右侧投诉文章详情列表相关                    */
        /** ****************************************************** */

        searchConditionTag: '1',

        searchConditionDate: '0',

        listData: [], // 文章投诉详情列表

        isShowLoading: true, // 是否显示加载获取文章投诉详情列表的动画

        modalPicVisible: false, // 是否展示弹出投诉的图片

        modalVisible: false, // 是否展示文章预览

        showImageUrl: '', // 预览图片的图片地址

        queryDetailParams: { // 获取文章投诉详情请求参数
          key: '',
          page: 1,
          page_size: 5
        },

        detailPagination: { // 获取文章详细列表,分页相关
          current: 1,
          pageSize: 5,
          total: 0
        },

        searchTags: [ // 查询条件，标签
          {
            title: '时间排序',
            value: '1'
          },
          {
            title: '投诉总数排序',
            value: '2'
          }
        ],

        searchDate: [ // 查询条件，时间
          {
            title: '不限时间',
            value: '0'
          },
          {
            title: '今天',
            value: '3'
          },
          {
            title: '昨天',
            value: '2'
          },
          {
            title: '前天',
            value: '1'
          },
          {
            title: '最近五天',
            value: '4'
          }
        ],

        columns: [ // 投诉详情列表的表格表头
          {
            title: '投诉用户',
            width: 240,
            dataIndex: 'userInfo',
            scopedSlots: { customRender: 'userInfo' }
          },
          {
            title: '投诉原因',
            dataIndex: 'type',
            customRender: (value) => {
              switch (value) {
                case '1':
                  return '欺诈'
                case '1-1':
                  return '多级分销'
                case '1-2':
                  return '网络借贷'
                case '1-3':
                  return '兼职赚钱'
                case '1-4':
                  return '高额返利'
                case '1-5':
                  return '相亲交友'
                case '1-6':
                  return '虚假活动'
                case '1-7':
                  return '高收益理财'
                case '1-8':
                  return '微盘微交易'
                case '2':
                  return '诱导行为'
                case '2-1':
                  return '诱导分享'
                case '2-2':
                  return '诱导关注'
                case '3':
                  return '不实信息'
                case '3-1':
                  return '政治类不实信息'
                case '3-2':
                  return '医疗健康类不实信息'
                case '3-3':
                  return '社会事件类不实信息'
                case '4':
                  return '内容未经授权/滥用原创'
                case '4-1':
                  return '抄袭/洗稿'
                case '4-2':
                  return '滥用原创'
                case '5':
                  return '色情'
                case '6':
                  return '违法犯罪'
                case '7':
                  return '骚扰'
                case '8':
                  return '其他'
                default:
                  return ''
              }
            }
          },
          {
            title: '投诉描述',
            dataIndex: 'content'
          },
          {
            title: '证据截图',
            dataIndex: 'pic',
            // customRender: value => value.split(','),
            scopedSlots: { customRender: 'pic' }
          }
          /*
                    {
                      title: '操作',
                      dataIndex: 'action',
                      scopedSlots: { customRender: 'action' },
                    }
          */
        ]

      }
    },

    mounted () {
      this.initComplaintNewsData()
    },

    methods: {
      /**
       * 获取投诉文章列表
       * 注意：不是文章对应的投诉详情列表
       * @return {Promise<any>}
       */
      initComplaintNewsData () {
        this.currentIndex = 0
        return getAdminComplaintNewsList({
          params: this.queryNewsParams,
          success: (res) => {
            this.newsList = res.data // 文章列表赋值
            this.newsPaginationTotal = res.total
            // 默认请求第一篇投诉文章对应的投诉详情列表
            if (res.data[0]) {
              this.currentNewsKey = res.data[0].key
              this.queryDetailParams.key = res.data[0].key
              this.getComplaintDetailData()
            }
          }
        })
      },

      /**
       * 点击文章
       * @param key {String} 文章key值
       * @param i {Number} 序列号
       */
      handleClickNews (key = this.currentNewsKey, i = 0) {
        this.isShowLoading = true
        this.currentIndex = i
        this.currentNewsKey = key
        this.queryDetailParams.key = key
        this.$nextTick(() => {
          this.getComplaintDetailData(this.queryDetailParams)
        })
      },

      /**
       * 获取投诉文章对应的详情列表
       * @param params {Object} 请求参数对象
       */
      getComplaintDetailData (params = this.queryDetailParams) {
        return getAdminComplaintList({
          params,
          success: (res) => {
            this.isShowLoading = false // 关闭加载动画
            this.listData = res.data // 列表赋值
            this.detailPagination.total = Number(res.total) // 分页总数赋值
          }
        })
      },

      /**
       * 预览文章
       * 注意：预览文章，调用之前第三方文章的预览接口
       */
      reviewNews () {
        const params = {
          key: this.currentNewsKey
        }
        return getAdminThirdNewsShow({
          params,
          success: (res) => {
            this.newsDetail = res
            this.modalVisible = true
          }
        })
      },

      /**
       * 删除文章
       * 注意：删除文章，调用之前第三方文章的删除接口
       */
      onDelete () {
        const params = {
          key: this.currentNewsKey
        }
        return getAdminThirdNewsDelete({
          params,
          success: () => {
            message.success('删除成功')
            this.initComplaintNewsData()
          }
        })
      },

      /**
       * 展示证据截图的图片展示
       * @param url
       */
      showPic (url) {
        this.modalPicVisible = true
        this.showImageUrl = url
        console.log(url)
      },

      /**
       * 监听到文章列表的页码变化
       * @param pagination {Object} 页码相关对象
       */
      handleNewsPageChange (pagination) {
        this.newsPaginationCurrent = pagination
        this.queryNewsParams.page = pagination
        this.initComplaintNewsData()
      },

      /**
       * 监听到文章投诉详情页码变化
       * @param pagination {Object} 页码相关对象
       */
      handleDetailChange (pagination) {
        this.queryDetailParams.page = pagination.current
        this.detailPagination.current = pagination.current
        this.getComplaintDetailData(this.queryDetailParams)
      },

      /**
       * 监听查询标签变化
       * @param value {String} option值
       */
      handleChangeTag (value) {
        this.queryNewsParams.order_by = value
      },

      /**
       * 监听查询日期变化
       * @param value {String} option值
       */
      handleChangeDate (value) {
        this.queryNewsParams.time_type = value
      },

      /**
       * 查询
       */
      handleSearch () {
        this.initComplaintNewsData()
      }
    },

    watch: {
      currentNewsKey (v) {
        this.detailPagination = { // 重新赋值
          current: 1,
          pageSize: 5,
          total: 0
        }
        this.queryDetailParams = { // 重新赋值
          key: v,
          page: 1,
          page_size: 5
        }
        this.queryNewsParams = { // 重新赋值
          page_size: 7,
          page: 0,
          order_by: '1',
          time_type: '0'
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  @import "../../styles/views/complaint/home";
</style>
