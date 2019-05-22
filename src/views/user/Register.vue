<template>
    <div class="user-register">
      <!-- Part1: 注册表单 -->
      <div class="user-register-form">
        <a-form :form="form"
                @submit="handleSubmit">

          <!-- Part1-1: 名称 -->
          <a-form-item v-bind="formItemLayout">
            <span slot="label">
              姓名&nbsp;
              <a-tooltip title="请填写您的真实姓名">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-input v-decorator="['name',
                {
                  rules: [{ required: true,
                    message: '请输入你的名字！', whitespace: true }]
                }]"/>
          </a-form-item>

          <!-- Part1-2: 密码 -->
          <a-form-item v-bind="formItemLayout"
                       label="密码">
            <a-input v-decorator="[
                 'password',
                {
                  rules: [{
                  required: true, message: '请输入您的密码！',
                }, {
                  validator: validateToNextPassword,
                }],}]"
                     type="password"
            />
          </a-form-item>

          <!-- Part1-3: 确认密码 -->
          <a-form-item v-bind="formItemLayout"
                       label="确认密码">
            <a-input v-decorator="['confirm',
                {
                  rules: [{
                  required: true, message: '请确认您的密码！',
                 }, {
                  validator: compareToFirstPassword,
                }],}]"
                     type="password"
                     @blur="handleConfirmBlur"/>
          </a-form-item>

          <!-- Part1-4: 邮箱 -->
          <a-form-item v-bind="formItemLayout"
                       label="邮箱">
            <a-input v-decorator="['email', {
                  rules: [{
                  type: 'email', message: '输入的电子邮件无效！',
                }, {
                  required: true, message: '请输入您的电子邮箱！',
                }]
              }]"/>
          </a-form-item>

          <!-- Part1-5: 手机号码 -->
          <a-form-item v-bind="formItemLayout"
                       label="手机号码">
            <a-input v-decorator="['phone',
                {
                  rules: [{ required: true, message: '请输入您的电话号码！' }],
                }]"
                     style="width: 100%">
              <a-select slot="addonBefore"
                        v-decorator="['prefix', { initialValue: '86' }]"
                        style="width: 70px">
                <a-select-option value="86">+86</a-select-option>
                <a-select-option value="87">+87</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>

          <!-- Part1-6: 获取验证码 -->
          <a-form-item v-bind="formItemLayout"
                       label="验证码"
                       extra="我们必须确保是您本人">
            <a-row :gutter="8">
              <a-col :span="12">
                <a-input v-decorator="['captcha',
                        {rules: [{ required: true,
                          message: '请输入你的验证码！' }]}]"/>
              </a-col>
              <a-col :span="12">
                <a-button>获取验证码</a-button>
              </a-col>
            </a-row>
          </a-form-item>

          <!-- Part1-7: 同意协议 -->
          <a-form-item v-bind="tailFormItemLayout">
            <a-checkbox v-decorator="['agreement', {valuePropName: 'checked'}]">
              I have read the <a @click="handleAgreement">agreement</a>
            </a-checkbox>
          </a-form-item>

          <!-- Part1-8: 注册按钮 -->
          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary"
                      html-type="submit">注册</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
</template>

<script>
  import { Form, Select, Input, Button, Tooltip, Row, Col, Checkbox, Icon, message } from 'ant-design-vue';

  export default {
    name: 'Register',

    components: {
      AForm: Form,
      AFormItem: Form.Item,
      ASelect: Select,
      ASelectOption: Select.Option,
      AInput: Input,
      AButton: Button,
      ATooltip: Tooltip,
      ARow: Row,
      ACol: Col,
      ACheckbox: Checkbox,
      AIcon: Icon,
    },

    data() {
      return {
        confirmDirty: false,

        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        },

        tailFormItemLayout: {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        }
      };
    },

    beforeCreate () {
      this.form = this.$form.createForm(this);
    },

    methods: {
      /**
       * 点击表单提交处理
       * @param e {Object} 点击的Dom
       */
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            // TODO: 此处应有接口数据交互
            console.log('Received values of form: ', values);
            message.success('恭喜你注册成功，但是未记录到数据库');
          } else {
            message.error(err);
          }
        });
      },

      /**
       * 处理确认密码
       * @param e {Object} Dom
       */
      handleConfirmBlur (e) {
        const { value } = e.target;
        this.confirmDirty = this.confirmDirty || !!value;
      },

      /**
       * 确认密码
       * @param rule {Object} 确认规则
       * @param value {String} 二次密码
       * @param callback {Function} 回调函数
       */
      compareToFirstPassword  (rule, value, callback) {
        const { form } = this;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      },

      /**
       * 验证密码
       * @param rule {Object} 确认规则
       * @param value {String} 二次密码
       * @param callback {Function} 回调函数
       */
      validateToNextPassword (rule, value, callback) {
        const { form } = this;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      },

      /**
       * 点击处理协议
       */
      handleAgreement() {
        message.error('此模块暂未开发!');
      }

    },


  };
</script>

<style lang="less" scoped>
  @import "../../styles/views/user/register";
</style>
