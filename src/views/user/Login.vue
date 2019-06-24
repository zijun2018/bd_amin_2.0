/**
*   @Project:   登录页
*   @Author:    Zi_Jun
*   @Email:     zijun2030@gmail.com
*   @Date:      2019/5/8 21:03
*   @Note:      ——
*/


<template>
  <div class="user-login">
    <!-- Part1: 标题名称-->
    <div class="user-login-title">
      <!-- Part1-1: logo、title -->
      <div class="login-title-part1">
        <img alt="" src="../../assets/logo.png">
        <p>展业宝CMS</p>
      </div>
      <!-- Part1-2: description -->
      <p class="login-title-part2">展业宝后台管理系统 - By@量化云前端团队</p>
    </div>

    <!-- Part2: 登录表单 -->
    <div class="user-login-form">
      <a-form :form="form"
              @submit="handleSubmit"
              class="login-form"
              id="components-form-demo-normal-login">
        <!-- Part2-1: 用户名 -->
        <a-form-item>
          <a-input placeholder="用户名"
                   v-decorator="[
                    'userName',
                    { rules: [{ required: true, message: '请输入用户名！' }] }]">
            <a-icon slot="prefix"
                    style="color: rgba(0,0,0,.25)"
                    type="user"/>
          </a-input>
        </a-form-item>
        <!-- Part2-2: 密码 -->
        <a-form-item>
          <a-input placeholder="密码"
                   type="password"
                   v-decorator="[
                    'password',
                    { rules: [{ required: true, message: '请输入密码' }] }]">
            <a-icon slot="prefix"
                    style="color: rgba(0,0,0,.25)"
                    type="lock"/>
          </a-input>
        </a-form-item>
        <!-- Part2-3: 其他按钮 -->
        <a-form-item>
          <a-checkbox v-decorator="['remember',{
            valuePropName: 'checked',
            initialValue: true,
          }]">自动登陆</a-checkbox>
          <a class="login-form-forgot"
             @click="handleForgetPassword">忘记密码</a>
          <a-button class="login-form-button"
                    html-type="submit"
                    type="primary">登 录</a-button>
          Or <a href="/user/register">注册账户</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { Button, Checkbox, Form, Icon, Input, message, Modal } from 'ant-design-vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Login',

    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      AIcon: Icon,
      ACheckbox: Checkbox,
      AButton: Button,
    },

    data() {
      return {
        isShowModal: false, // 是否展示确认框,

        // successUrl: this.$route.query.success || null
      };
    },

    computed: {
      ...mapGetters(['isShowTest', 'login/userInfo'])
    },

    beforeCreate() {
      this.form = this.$form.createForm(this);

      // 清除用户信息,初始未登录
      localStorage.removeItem('userInfo');
      sessionStorage.removeItem('userInfo');
    },

    methods: {

      /**
       * 处理表单提交并验证
       * @param e {Object} 点击form表单对象
       */
      handleSubmit(e) {
        e.preventDefault();
        // TODO: 验证表单数据，此处暂无接口，本地验证
        this.form.validateFields((err, values) => {
          if (!err) {
            // 登录不成功处理，提示错误点
            if (values.userName !== 'admin') {
              message.error('用户名错误');
              return;
            }
            if (String(values.password) !== '123456') {
              message.error('密码错误');
              return;
            }

            // 提示登录成功
            message.success('登录成功', 1.5);

            // 判断是否自动登录，如果勾选，则保存到localStorage否则保存到sessionsStorage中
            // 登录成功处理，保存登录信息到local/sessionStorage中，App.vue钩子中将local/sessionStorage数据恢复到Vuex中
            (values.remember ? localStorage : sessionStorage).setItem('userInfo', JSON.stringify({ userName: values.userName, password: values.password }));

            // 跳转到首页
            setTimeout(() => {
              /* 这里浏览器出现跳转空白，后续优化为哪里退出，登录后就去到哪里 */
              // window.history.length > 1
              //   ? this.$router.go(-1)
              //   : this.$router.push({ name: 'home' });
              this.$router.push({ name: 'home' });
            }, 1500);
          } else {
            message.error(err);
          }
        });
      },

      /**
       * 处理点击忘记密码处理
       * 本该跳转到对应页面处理，现在此页面暂未开发，就用弹窗提示
       */
      handleForgetPassword() {
        Modal.confirm({
          title: '忘记密码了？温馨提示：',
          centered: true,
          content: '用户名：admin  密码：123456',
          okText: '确认',
          cancelText: '取消',
        });
      }

    },
  };
</script>

<style lang="less" scoped>
  @import "../../styles/views/user/login.less";
</style>
