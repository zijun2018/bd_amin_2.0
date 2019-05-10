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
        <img src="../../assets/logo.png" alt="">
        <p>展业宝CMS</p>
      </div>
      <!-- Part1-2: description -->
      <p class="login-title-part2">展业宝后台管理系统 - By@量化云前端团队</p>
    </div>

    <!-- Part2: 登录表单 -->
    <div class="user-login-form">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit">
          <a-form-item>
            <a-input
              v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
              placeholder="Username"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
              type="password"
              placeholder="Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
            >
              Remember me
            </a-checkbox>
            <a
              class="login-form-forgot"
              href=""
            >
              Forgot password
            </a>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              Log in
            </a-button>
            Or <a href="">
            register now!
          </a>
          </a-form-item>
        </a-form>
    </div>
  </div>
</template>

<script>
  import {
    Form,
    Input,
    Icon,
    Checkbox,
    Button
} from 'ant-design-vue';

  export default {
    name: 'Login',

    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      AIcon: Icon,
      ACheckbox: Checkbox,
      AButton: Button
    },

    beforeCreate () {
      this.form = this.$form.createForm(this);
    },

    methods: {
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  /*@import "../../styles/global/base";*/
  @import "../../styles/views/user/login.less";
</style>
