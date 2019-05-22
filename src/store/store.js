/**
 *   @Project:   vuex store首页
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/13 17:37
 *   @Note:      ——
 */


import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import mutations from './mutations';
import * as action from './actions';
import * as actionsAxios from './actions-axios';
import * as getters from './getters';
import state from './state';
import loginModule from './modules/login';

const actions = { ...action, ...actionsAxios };

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  state,
  modules: {
    login: loginModule
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
