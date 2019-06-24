/**
*   @Project:   早盘文章编辑/新增
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/20 15:55
*   @Note:
*/


<template>
  <div class="early-news-add">
    <!-- part1: 表单 -->
    <a-form :form="form"
            ref="form"
            @submit="handleSubmit">

      <!-- Part1-1: 标题 -->
      <a-form-item label="标题"
                   :label-col="{span: 2}"
                   :wrapper-col="{span: 10}">
        <a-input placeholder="请输入标题"
                 v-decorator="[ 'title', {
                    rules: [{ required: true, message: '请输入标题'},
                    { max: 255, message: '标题字数不能超过255个字' }],
                    initialValue: formData.title
                  }]" />
      </a-form-item>

      <!-- Part1-2: 发布时间 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
      label="发布时间">
      <a-locale-provider :locale="zh_CN">
        <a-date-picker :showTime='true'
                       format="YYYY-MM-DD HH:mm:ss"
                       :getCalendarContainer="triggerNode => triggerNode.parentNode"
                       placeholder="请选择时间"
                       v-decorator="[ 'released_time',{
                        rules: [{ required: true, message: '请选择发布日期'}],
                        initialValue: formData.released_time
                        }]"/>
      </a-locale-provider>
      </a-form-item>

      <!-- Part1-3: 封面缩略图 -->
      <a-form-item :label-col="{span: 2}"
                   class="cover-form-item"
                   :wrapper-col="{span: 10}"
                   label="封面缩略图">
        <p class="upload-pic-tip">(支持jpg/jpeg/png格式,不超过10k)</p>
        <input type="hidden"
               v-decorator="['article_url',{ rules: [{ required: true, message: '请选择图片' }] }]"/>
        <a-upload
          :customRequest="handleRequestUploadPic"
          :beforeUpload="(file, fileList) => beforeUpload(file, fileList, 1)"
          :fileList="fileList1"
          @preview="handlePreview"
          @change="handleChange"
          :remove="handleRemove1"
          accept=".jpeg,.png,.jpg"
          listType="picture-card">
          <div v-if="fileList1.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
      </a-form-item>

      <!-- Part1-4: 模块分类 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="模块分类">
        <a-select placeholder="请选择模块分类"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  v-decorator="['sort',{ rules: [{ required: true, message:'请选择模块分类' }], initialValue: formData.sort && String(formData.sort)}]">
          <a-select-option v-for="(v, i) in moduleTypes"
                           :value="v.value"
                           :key="i">
            {{v.name}}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- Part1-5: 文章标签 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="文章标签">
        <a-select placeholder="请选择标签分类"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  v-decorator="['tag',{ rules: [{ required: true, message:'请选择标签分类' }], initialValue: formData.tag && String(formData.tag) }]">
          <a-select-option v-for="(v, i) in tagTypes"
                           :value="v.value"
                           :key="i">
            {{v.name}}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- Part1-6: 文章分类 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="文章分类">
        <a-select placeholder="请选择文章分类"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  v-decorator="['classification',{ rules: [{ required: false, message:'请选择文章分类' }], initialValue: formData.classification === 0 ? '' : formData.classification && String(formData.classification) }]">
          <a-select-option v-for="(v, i) in newsTypes"
                           :value="v.value"
                           :key="i">
            {{v.name}}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- Part1-7: 文章来源 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="文章来源">
        <a-input placeholder="请填写文章来源"
                 v-decorator="['sources', { rules: [{ required: true, message: '请填写文章来源' }, { max: 255, message: '文章来源不超过255个字' }], initialValue: formData.sources}]" />
      </a-form-item>

      <!-- Part1-8: 文章作者 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="文章作者">
        <a-input placeholder="请填写文章作者"
                 v-decorator="['author', { rules: [{ required: true, message: '请填写文章作者' }, { max: 255, message: '作者不超过255个字' }], initialValue: formData.author}]" />
      </a-form-item>

      <!-- Part1-9: 广告位1 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="广告位1">
        <p class="upload-pic-tip">(支持jpg/jpeg/png格式,不超过2M)</p>
        <input type="hidden"
               v-decorator="['ad1Url']"/>
        <a-upload
          :customRequest="handleRequestUploadPic"
          :beforeUpload="(file, fileList) => beforeUpload(file, fileList, 2)"
          :fileList="fileList2"
          @preview="handlePreview"
          @change="handleChange"
          :remove="handleRemove2"
          accept=".jpeg,.png,.jpg"
          listType="picture-card">
          <div v-if="fileList2.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
      </a-form-item>

      <!-- Part1-10: 广告位1url -->
      <a-form-item label="广告位1URL"
                   :label-col="{span: 2}"
                   :wrapper-col="{span: 10}">
        <a-input placeholder="请输入地址"
                 v-decorator="[ 'ad_one_goal_url', { initialValue: formData.ad_one_goal_url }]" />
      </a-form-item>

      <!-- Part1-11: 广告位2 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="广告位2">
        <p class="upload-pic-tip">(支持jpg/jpeg/png格式,不超过2M)</p>
        <input type="hidden"
               v-decorator="['ad2Url']"/>
        <a-upload
          :customRequest="handleRequestUploadPic"
          :beforeUpload="(file, fileList) => beforeUpload(file, fileList, 3)"
          :fileList="fileList3"
          @preview="handlePreview"
          @change="handleChange"
          :remove="handleRemove3"
          accept=".jpeg,.png,.jpg"
          listType="picture-card">
          <div v-if="fileList3.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
      </a-form-item>

      <!-- Part1-12: 广告位2url -->
      <a-form-item label="广告位2URL"
                   :label-col="{span: 2}"
                   :wrapper-col="{span: 10}">
        <a-input placeholder="请输入地址"
                 v-decorator="[ 'ad_two_goal_url', { initialValue: formData.ad_two_goal_url }]" />
      </a-form-item>

      <!-- Part1-13: 资讯状态 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="资讯状态">
        <a-select placeholder="请选择资讯状态"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  v-decorator="['article_status',{ rules: [{ required: true, message:'请选择资讯状态' }], initialValue: formData.article_status && String(formData.article_status)}]">
          <a-select-option v-for="(v, i) in statusTypes"
                           :value="v.value"
                           :key="i">
            {{v.name}}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- Part1-14: 富文本内容 -->
      <a-form-item :label-col="{span: 2}"
                   :wrapper-col="{span: 10}"
                   label="内容">
        <a-input type="hidden"
                 v-decorator="['content', {rules: [{ required: true, message: '请输入文章内容'}]}]"/>
        <tiny-mce :id="Date.parse(new Date()).toString()"
                  v-model="articleData"
                  :other_options="tinyMceOptions"></tiny-mce>
      </a-form-item>

      <!-- Part1-15: 按钮 -->
      <a-form-item :wrapper-col="{span: 12, offset: 4}">
        <!-- Part1-14-1: 提交 -->
        <a-button type="primary" html-type="submit">提交</a-button>
        <a-button type="primary" @click="resetForm" class="btn-reset">重置</a-button>
        <a-button @click="jumpToEarlyNewsList">取消</a-button>
      </a-form-item>
    </a-form>

    <!-- Part2: 图片预览层 -->
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
  import { Button, DatePicker, Form, Icon, Input, LocaleProvider, message, Modal, Select, Upload } from 'ant-design-vue';
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  import tinyMce from 'vue-tinymce-editor';
  import { getImagename } from '../../../utils/base-methods';
  import { ADMIN_IMAGE_UPLOAD_URL } from '../../../utils/const';
  import TinyMceLanguage from '../../../static/tinymce/langs/zh_CN';
  import {
    getAdminMorningMarketShow,
    getAdminMorningMarketUploadPic,
    postAdminMorningMarketAdd,
    postAdminMorningMarketUpdate
  } from '../../../axios/api/admin-early-news';

  moment.locale('zh-cn');
  export default {
    name: 'NewsEarlyNewsAdd',

    data() {
      return {
        zh_CN, // 中文

        formLayout: 'horizontal', // 表单排列方式，垂直

        form: this.$form.createForm(this), // 创建的表单数据

        /** ********************************************************* */
        /*                        表单初始数据                          */
        /** ********************************************************* */

        formData: {}, // 表单数据

        coverUrl: '', // 预览的图片

        fileList1: [], // 已经上传的文件列表,预览缩略图

        ad1Url: '', // 广告位1图片，已经上传的文件列表

        fileList2: [], // 已经上传的文件列表,广告位1

        ad2Url: '', // 广告位2图片，已经上传的文件列表

        fileList3: [], // 已经上传的文件列表,广告位2

        coverLoading: false, // 是否显示上传图片的动画-缩略图

        ad1Loading: false, // 是否显示上传图片的动画-广告位1

        ad2Loading: false, // 是否显示上传图片的动画-广告位2

        previewImage: '', // 预览图资源路径

        previewVisible: false, // 是否展示上传图片的放大预览

        currentUploadIndex: 1, // 当前上传图片的upload组件

        checkPicUpload: true, // 是否通过图片上传验证

        articleData: '', // 文章内容数据

        moduleTypes: [ // 模块分类
          {
            value: '1',
            name: '行情'
          },
          {
            value: '2',
            name: '热点'
          },
          {
            value: '3',
            name: '谈资'
          }
        ],

        tagTypes: [ // 标签分类
          {
            value: '1',
            name: '可转发'
          },
          {
            value: '2',
            name: '编辑文章'
          },
          {
            value: '3',
            name: '原创'
          }
        ],

        newsTypes: [ // 文章分类
          {
            value: '1',
            name: '技术类'
          },
          {
            value: '2',
            name: '价投类'
          },
          {
            value: '3',
            name: '热点类'
          },
          {
            value: '4',
            name: '综合类'
          }
        ],

        statusTypes: [ // 资讯状态
          {
            value: '1',
            name: '待上架'
          },
          {
            value: '2',
            name: '上架'
          }
        ],

        tinyMceOptions: { // tinyMce富文本编辑器配置项
          languageUrl: TinyMceLanguage,
          theme: 'modern',
          height: 500,
          statusbar: false,
          branding: false,
          menubar: false,
          toolbar1: 'formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image media  | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen',
          plugins: 'paste importcss image code table advlist fullscreen link media lists textcolor colorpicker hr preview',
          insertButtonItems: 'image',
          pasteDataImages: true, // 黏贴
          toolbar_items_size: 'small',
          images_upload_url: ADMIN_IMAGE_UPLOAD_URL, // 上传图片url地址
          automatic_uploads: true,
          images_upload_credentials: true,
          images_upload_handler: (blobInfo, success, failure) => { // 上传图片回调
            const formData = new FormData();
            formData.set('fname', blobInfo.blob());
            return getAdminMorningMarketUploadPic({
              params: formData,
              success: (res) => {
                success(res.url);
                message.success('上传图片成功');
              },
              error: (err) => {
                failure(err);
                message.error('上传图片失败');
              }
            });
          },
        }

      };
    },

    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      AButton: Button,
      ADatePicker: DatePicker,
      ALocaleProvider: LocaleProvider,
      AUpload: Upload,
      AIcon: Icon,
      ASelect: Select,
      AModal: Modal,
      ASelectOption: Select.Option,
      TinyMce: tinyMce
    },

    mounted () {
      // 根据key值获取文章编辑数据，用于显示编辑
      const { key } = this.$route.params;
      const params = {
        key
      };
      this.$nextTick(() => {
        if (key) {
          return getAdminMorningMarketShow({
            params,
            success: (res) => {
              this.formData = res;
              setTimeout(() => {
                this.articleData = res.content;
                this.form.setFieldsValue({ content: this.articleData });
              }, 200);
              this.formData.released_time = moment(res.released_time || res.created_time);
              this.coverUrl = res.article_url;
              this.ad1Url = res.ad_one_url;
              this.ad2Url = res.ad_two_url;

              // 此处为编辑回显图片设置
              res.article_url && (this.fileList1 = [{
                uid: '-1',
                name: getImagename(res.article_url),
                status: 'done',
                url: res.article_url
              }]);
              res.ad_one_url && (this.fileList2 = [{
                uid: '-2',
                name: getImagename(res.ad_one_url),
                status: 'done',
                url: res.ad_one_url
              }]);
              res.ad_two_url && (this.fileList3 = [{
                uid: '-3',
                name: getImagename(res.ad_two_url),
                status: 'done',
                url: res.ad_two_url
              }]);
            }
          });
        }
        return false;
      });
    },

    methods: {
      /**
       * 点击提交表单处理
       */
      handleSubmit(e) {
        e.preventDefault();
        this.form.setFieldsValue({ content: this.articleData }); // 富文本内容赋值
        this.coverUrl && this.form.setFieldsValue({ article_url: this.coverUrl });
        this.form.validateFields((err, values) => {
          if (!err) {
            // 对表单数据做相应处理
            this.formData = values;
            this.formData.classification = this.formData.classification || '0';
            this.formData.article_url = this.coverUrl;
            this.formData.ad_one_url = this.ad1Url || '';
            this.formData.ad_two_url = this.ad2Url || '';
            this.formData.released_time = moment(values.released_time).format('YYYY-MM-DD HH:mm:ss');
            this.formData.content = this.articleData;

            // 如果有key值，则更新文章，否则添加文章
            if (this.$route.params.key) {
              // 更新早盘文章到数
              this.formData.key = this.$route.params.key;
              return postAdminMorningMarketUpdate({
                params: this.formData,
                success: () => {
                  message.success('提交成功');
                  this.$router.push({ name: 'early_news_list' }); // 跳转到列表页
                },
                error: () => {
                  message.error('提交失败');
                }
              });
            }
              // 添加早盘文章到数据库
              return postAdminMorningMarketAdd({
                params: this.formData,
                success: () => {
                  message.success('提交成功');
                  this.$router.push({ name: 'early_news_list' }); // 跳转到列表页
                },
                error: () => {
                  message.error('提交失败');
                }
              });
          }
        });
      },

      /**
       * 重置表单
       */
      resetForm() {
        this.form.resetFields();
        this.formData = {};
        this.coverUrl = '';
        this.ad1Url = '';
        this.ad2Url = '';
        this.articleData = '';
        this.coverLoading = false;
        this.ad1Loading = false;
        this.ad1Loading = false;
        this.fileList1 = [];
        this.fileList2 = [];
        this.fileList3 = [];
        this.form.setFieldsValue({ content: '' });
      },


      /**
       * 图片方法预览取消操作
       */
      handleCancel () {
        this.previewVisible = false;
      },


      /**
       * 删除文章缩略图图片操作，由于自带参数问题，分开写方法
       */
      handleRemove1 () {
        this.form.setFieldsValue({ article_url: '' }); // 清空form表单对应的图片字段
        this.coverUrl = ''; // 清空文章缩略图
        this.coverLoading = false; // 改变加载状态
        this.fileList1 = [];
      },


      /**
       * 删除广告位1图片操作，由于自带参数问题，分开写方法
       */
      handleRemove2 () {
        this.form.setFieldsValue({ ad_one_url: '' }); // 清空form表单对应的图片字段
        this.ad1Url = ''; // 清空广告位1的缩略图
        this.ad1Loading = false; // 改变加载状态
        this.fileList2 = [];
      },


      /**
      * 删除广告位3图片操作，由于自带参数问题，分开写方法
      */
      handleRemove3 () {
        this.form.setFieldsValue({ ad_two_url: '' }); // 清空form表单对应的图片字段
        this.ad2Url = ''; // 清空广告位1的缩略图
        this.ad2Loading = false; // 改变加载状态
        this.fileList3 = [];
      },


      /**
       * 图片预览操作
       * @param file {Object} 文件状态信息
       */
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
      },

      /**
       * 上传文件改变时的状态
       * @param info {Object} 文件状态信息
       */
      handleChange(info) {
        if (this.checkPicUpload) {
          switch (Number(this.currentUploadIndex)) {
            case 1:
              this.coverLoading = info.file.status === 'uploading';
              this.fileList1 = info.fileList;
              break;
            case 2:
              this.ad1Loading = info.file.status === 'uploading';
              this.fileList2 = info.fileList;
              break;
            case 3:
              this.ad2Loading = info.file.status === 'uploading';
              this.fileList3 = info.fileList;
              break;
            default:
              break;
          }
        }
      },

      /**
       * 上传图片之前的钩子
       */
      beforeUpload (file, fileList, index) {
        this.checkPicUpload = true; // 上传前把图片验证状态改为true
        this.currentUploadIndex = index; // 赋值当前操作的upload组件序列号
        let isLt2M = false;
        if (index === 1) {
          isLt2M = file.size / 1024 < 10;
        } else {
          isLt2M = file.size / 1024 / 1024 < 2;
        }
        const isJPEG = file.type === 'image/jpeg';
        const isJPG = file.type === 'image/jpg';
        const isPNG = file.type === 'image/png';
        if (!isLt2M) {
          this.checkPicUpload = false;
          switch (index) {
            case 1:
              this.coverLoading = false;
              message.error('图片大小不能超过10k!');
              break;
            case 2:
              this.ad1Loading = false;
              message.error('图片大小不能超过2MB!');
              break;
            case 3:
              this.ad2Loading = false;
              message.error('图片大小不能超过2MB!');
              break;
            default:
              break;
          }
        }
        !isJPEG && !isJPG && !isPNG && message.error('只能上传jpg/jpeg/png格式图片!');
        return isLt2M || isJPEG || isJPG || isPNG;
      },


      /**
       * 跳转到早盘观测列表页
       */
      jumpToEarlyNewsList() {
        this.$router.push({ name: 'early_news_list' });
      },


      /**
       * 自定义上传图片到远程
       * @param obj {Object} 文件对象
       * @return {boolean}
       *  type {Number} 上传图片类型： 1）缩略图 2）广告位1 3）广告位2
       */
      handleRequestUploadPic(obj) {
        const formData = new FormData();
        formData.set('fname', obj.file);
        if (this.checkPicUpload) {
          return getAdminMorningMarketUploadPic({
            params: formData,
            success: (res) => {
              switch (Number(this.currentUploadIndex)) {
                case 1:
                  this.coverUrl = res.url;
                  this.fileList1[0].status = 'done';
                  this.fileList1[0].response = res;
                  this.form.setFieldsValue({ article_url: res.url });
                  break;
                case 2:
                  this.ad1Url = res.url;
                  this.fileList2[0].status = 'done';
                  this.fileList2[0].response = res;
                  this.form.setFieldsValue({ ad1Url: res.url });
                  break;
                case 3:
                  this.ad2Url = res.url;
                  this.fileList3[0].status = 'done';
                  this.fileList3[0].response = res;
                  this.form.setFieldsValue({ ad2Url: res.url });
                  break;
                default:
                  break;
              }
              message.success(`${obj.file.name}上传成功`);
            },
            error: () => {
              message.error(`${obj.file.name}上传失败`);
            }
          });
        }
        return false;
      }
    }
  };
</script>

<style scoped lang="less">
  .ant-form-item {
    display: flex;
    justify-content: center;
    .upload-pic-tip {
      font-size: 12px;
      color: @font-color-grey9;
    }

    .ant-upload {
      width: 128px;
      height: 128px;
      img {
        width: 100%;
      }
    }

    .btn-reset {
      margin: 0 20px;
    }
  }

  .ant-calendar-picker {
    width: 100%!important;
  }

</style>
