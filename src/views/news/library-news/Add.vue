/**
*   @Project:   添加资讯
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/9 15:47
*   @Note:      ——
*/


<template>
    <div class="news-add">
      <a-form @submit="handleSubmit" :form="form" ref="form">
        <a-form-item
          label="标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
            'title',
            {
              rules: [{ required: true, message: '请输入标题' },
              {max:255,message:'标题字数不能超过255个字'}],
              initialValue:formData.title
            },
          ]"
            placeholder="请输入标题" />
        </a-form-item>
        <a-form-item
          label="发布时间"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-date-picker
            style="width: 100%"
            :showTime='true'
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="[
            'released_time',
            {
              rules: [
              { required: true, message: '请选择发布日期' }],
              initialValue:formData.released_time
            }
          ]"
          />
        </a-form-item>
        <a-form-item
          label="封面缩略图"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <span class="upload-des">(支持jpg/jpeg/png格式,不超过2M)</span>
          <input type="hidden"
                 v-decorator="[
            'article_url',
            {
              rules: [{ required: true, message: '请选择图片' }]
            }
          ]"
          />
          <a-upload
            :action="uploadUrl"
            @change="(info)=>uploadChange(info,1)"
            listType="picture-card"
            :remove="(e)=>onRemove(e,1)"
            :fileList="thubList"
            @preview='onPreview'
            :beforeUpload='(file,fileList)=>beforeUpload(file,fileList,1)'
            accept=".jpeg,.png,.jpg"
          >
            <img :src="thumbUrl" class="edit-img" alt="" v-if="!thubList.length&&thumbUrl">
            <div v-if="thubList.length==0&&thumbUrl==''">
              <a-icon :type="uploadLoading[0] ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="模块分类"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-select
            placeholder="请选择模块分类"
            v-decorator="[
            'sort',
            {
              rules: [{ required: true, message: '请选择模块分类' }],
              initialValue:formData.sort&&formData.sort+''
            }
          ]"
          >
            <a-select-option value="1">行情</a-select-option>
            <a-select-option value="2">热点</a-select-option>
            <a-select-option value="3">谈资</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="文章标签"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-select
            placeholder="请选择标签分类"
            v-decorator="[
            'tag',
            {
              rules: [{ required: true, message: '请选择标签分类' }],
              initialValue:formData.tag&&formData.tag+''
            }
          ]"
          >
            <a-select-option value="1">可转发</a-select-option>
            <a-select-option value="2">编辑文章</a-select-option>
            <a-select-option value="3">原创</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="文章分类"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-select
            placeholder="请选择文章分类"
            v-decorator="[
            'classification',
            {
              rules: [{ required: true, message: '请选择文章分类' }],
              initialValue:formData.classification&&formData.classification+''
            }
          ]"
          >
            <a-select-option value="1">技术类</a-select-option>
            <a-select-option value="2">价投类</a-select-option>
            <a-select-option value="3">热点类</a-select-option>
            <a-select-option value="4">综合类</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="文章来源"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            placeholder="文章来源"
            v-decorator="[
            'sources',
            {
              rules: [{ required: true, message: '请填写文章来源'},{max:45,message:'文章来源不超过45个字'}],
              initialValue:formData.sources
            }
          ]" />
        </a-form-item>
        <a-form-item
          label="文章作者"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="不超过10个字"
            v-decorator="[
            'author',
            {
              rules: [{ required: true, message: '请填写文章作者'},{max:255,message:'文章作者不超过255个字'}],
              initialValue:formData.author
            }
          ]"
          />
        </a-form-item>
        <a-form-item
          label="广告位1"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <span class="upload-des">(支持jpg/jpeg/png格式,不超过2M)</span>
          <input type="hidden"
                 v-decorator="[
            'ad_one_url'
          ]"
          />
          <a-upload
            :action="uploadUrl"
            @change="(info)=>uploadChange(info,2)"
            listType="picture-card"
            :remove="(e)=>onRemove(e,2)"
            @preview='onPreview'
            :beforeUpload='(file,fileList)=>beforeUpload(file,fileList,2)'
            accept=".jpeg,.png,.jpg"
            :fileList="add1List"
          >
            <img :src="ad1Url" class="edit-img" alt="" v-if="!add1List.length&&ad1Url">
            <div v-if="add1List.length==0&&ad1Url==''">
              <a-icon :type="uploadLoading[1] ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="广告位1URL"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入地址"
            v-decorator="[
            'ad_one_goal_url',
            {
              initialValue:formData.ad_one_goal_url
            }
          ]"
          />
        </a-form-item>
        <a-form-item
          label="广告位2"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <span class="upload-des">(支持jpg/jpeg/png格式,不超过2M)</span>
          <input type="hidden"
                 v-decorator="[
            'ad_two_url'
          ]"
          />
          <a-upload
            :action="uploadUrl"
            @change="(info)=>uploadChange(info,3)"
            listType="picture-card"
            :remove="(e)=>onRemove(e,3)"
            :beforeUpload='(file,fileList)=>beforeUpload(file,fileList,3)'
            @preview='onPreview'
            :fileList="add2List"
            accept=".jpeg,.png,.jpg"
          >
            <img :src="ad2Url" class="edit-img" alt="" v-if="!add2List.length&&ad2Url">
            <div v-if="add2List.length==0&&ad2Url==''">
              <a-icon :type="uploadLoading[2] ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="广告位2URL"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-input
            placeholder="请输入地址"
            v-decorator="[
            'ad_two_goal_url',
            {
              initialValue:formData.ad_two_goal_url
            }
          ]"
          />
        </a-form-item>
        <a-form-item
          label="资讯状态"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-select
            placeholder="请选择资讯状态"
            v-decorator="[
            'article_status',
            {
              rules: [{ required: true, message: '请选择资讯状态' }],
              initialValue:formData.article_status&&formData.article_status+''
            }
          ]"
          >
            <a-select-option value="1">待上架</a-select-option>
            <a-select-option value="2">上架</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="内容"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 15}, sm: {span: 17} }"
          :required="true"
        >
          <input type="hidden"
                 v-decorator="[
            'content',
            {
              rules: [{ required: true, message: '请填写文章内容' }]
            }
          ]"
          />
          <tinymce
            :id="Date.parse(new Date()).toString()"
            v-model="data"
            :other_options="options"
          ></tinymce>
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px" @click="resetForm" type="primary">重置</a-button>
          <a-button style="margin-left: 8px"
                    @click="$router.push({name: 'library_news_list'})">取消</a-button>
        </a-form-item>
      </a-form>
    </div>
</template>

<script>
  import tinymce from 'vue-tinymce-editor';
  import moment from 'moment';
  import { Form, Select, Upload, DatePicker, Icon, Input, Button, message } from 'ant-design-vue';
  import { uploadImage, createNews, getNewsDetail } from '../../../axios/api/admin-news';
  import { PYTHON_IMG_UPLOAD_URL } from '../../../utils/const';

  export default {
    name: 'news_list_edit',
    components: {
      tinymce,
      AForm: Form,
      AFormItem: Form.Item,
      ASelect: Select,
      ASelectOption: Select.Option,
      AUpload: Upload,
      ADatePicker: DatePicker,
      AIcon: Icon,
      AInput: Input,
      AButton: Button
    },
    data() {
      return {
        thumbUrl: '',
        ad1Url: '',
        ad2Url: '',
        thumbObj: null,
        ad1Obj: null,
        ad2Obj: null,
        uploadLoading: [false, false, false],
        // form
        data: '',
        form: this.$form.createForm(this),
        thubLength: 0,
        thubList: [],
        add1List: [],
        add2List: [],
        formData: {},
        uploadUrl: '',
        options: {
          language_url: require('@/static/tinymce/langs/zh_CN.js'),
          language: 'zh_CN',
          skin_url: require('@/static/tinymce/skins/lightgray/content.min.css'),
          theme: 'modern',
          statusbar: false,
          height: 500,
          toolbar_items_size: 'small',
          images_upload_url: PYTHON_IMG_UPLOAD_URL, // 上传图片url地址
          automatic_uploads: true,
          images_upload_credentials: true,
          images_upload_handler: (blobInfo, success, failure) => { // 上传图片回调
            const formData = new FormData();
            formData.set('file', blobInfo.blob());
            uploadImage(formData).then((res) => {
              success(res.path);
            }).catch((error) => {
              failure(error.info);
            });
          },
          branding: false,
          menubar: false,
          toolbar1: 'formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image media  | alignleft aligncenter alignright alignjustify | outdent indent  ',
          toolbar2: 'numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen',
          plugins: `
          paste
          importcss
          image
          code
          table
          advlist
          fullscreen
          link
          media
          lists
          textcolor
          colorpicker
          hr
          preview
        `,
          insert_button_items: 'image',
          paste_data_images: true, // 黏贴
        }
      };
    },
    mounted() {
      const { id } = this.$route.params;
      this.uploadUrl = PYTHON_IMG_UPLOAD_URL;
      console.log(process.env, 'env');
      this.$nextTick(() => {
        if (id) {
          getNewsDetail({ id: this.$route.params.id }).then((res) => {
            const { data } = res;
            this.formData = data;
            setTimeout(() => {
              this.data = data.content;
              this.form.setFieldsValue({ content: this.data });
            }, 200);
            // this.data = data.content
            this.formData.released_time = moment(data.released_time);
            this.thumbUrl = data.article_url;
            this.ad1Url = data.ad_one_url;
            this.ad2Url = data.ad_two_url;
            console.log(this.data, 'data');
          });
        }
      });
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault();
        this.form.setFieldsValue({ content: this.data });
        this.thumbUrl && this.form.setFieldsValue({ article_url: 1 });
        this.form.validateFields((err, values) => {
          console.log(values.article_url, 'article_url');
          console.log(values, 'values');
          console.log(err, 'err');
          // 编辑时获取图片地址，图片地址不能做验证标准，所以删掉错误信息里的地址
          this.thumbUrl && err && err.article_url && delete err.article_url;
          if (!err) {
            this.formData = values;
            this.formData.article_url = this.thumbUrl || values.article_url;
            this.formData.ad_two_url = values.ad_two_url ? values.ad_two_url : this.ad2Url || '';
            this.formData.ad_one_url = values.ad_one_url ? values.ad_one_url : this.ad1Url || '';
            this.formData.released_time = moment(values.released_time).format('YYYY-MM-DD HH:mm:ss');
            this.formData.content = this.data;
            const { id } = this.$route.params;
            this.formData.id = id;
            createNews(this.formData).then((res) => {
              this.$router.push({ name: 'library_news_list' });
            });
            console.log('form ', this.formData);
          }
        });
      },
      resetForm() {
        this.form.resetFields();
        this.formData = {};
        this.thumbUrl = '';
        this.ad1Url = '';
        this.ad2Url = '';
        this.data = '';
        this.thubList = [];
        this.add1List = [];
        this.add2List = [];
        this.form.setFieldsValue({ content: '' });
      },
      beforeUpload (file, fileList, type) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        const isJPEG = file.type === 'image/jpeg';
        const isJPG = file.type === 'image/jpg';
        const isPNG = file.type === 'image/png';
        if (!isLt2M) {
          message.error('图片大小不能超过2MB!');
        }
        !isJPEG && !isJPG && !isPNG && message.error('只能上传jpg/jpeg/png格式图片!');
        return isLt2M || isJPEG || isJPG || isPNG;
      },
      uploadChange(info, type) {
        console.log(info, 'info');
        const isLt2M = info.file.size / 1024 / 1024 < 2;
        const valImg = info.file.type === 'image/jpeg'
          || info.file.type === 'image/jpg'
          || info.file.type === 'image/png';
        switch (type) {
          case 1:
            this.thumbUrl = '';
            this.thubList = !isLt2M || !valImg ? [] : info.fileList;
            this.thumbObj = info.file;

            break;
          case 2:
            this.ad1Url = '';
            this.add1List = !isLt2M || !valImg ? [] : info.fileList;
            this.ad1Obj = info.file;
            break;
          case 3:
            this.ad2Url = '';
            this.add2List = !isLt2M || !valImg ? [] : info.fileList;
            this.ad2Obj = info.file;
            break;
        }
        if (info.file.status === 'done') {
          type == 1 && this.form.setFieldsValue({ article_url: info.file.response.path });
          type == 2 && this.form.setFieldsValue({ ad_one_url: info.file.response.path });
          type == 3 && this.form.setFieldsValue({ ad_two_url: info.file.response.path });
          message.success(`${info.file.name}图片上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name}图片上传失败`);
        }
      },
      onRemove(e, type) {
        switch (type) {
          case 1:
            // this.thubList = []
            console.log(e, 'remove');
            this.form.setFieldsValue({ article_url: null });
            break;
          case 2:
            // this.add1List = []
            this.form.setFieldsValue({ ad_one_url: null });
            break;
          case 3:
            // this.add2List = []
            this.form.setFieldsValue({ ad_two_url: null });
            break;
        }
      },
      onPreview(e) {
        console.log(e, 'preview');
        console.log(e, 'preview');
      }
    }
  };
</script>
<style lang="less" scoped>
  iframe #tinymce p{margin:0;}
  .edit-img{
    width:86px;
    height:86px;
  }
  .upload-des{
    position:absolute;
    left: 111px;
    top: 2px;
    z-index: 100;
    width: 185px;
    font-size: 12px;
    color: #999;
  }
</style>
