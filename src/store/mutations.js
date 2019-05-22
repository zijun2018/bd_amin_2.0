/**
 *   @Project:   mutations集合
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/14 20:31
 *   @Note:      ——
 */

import * as types from './mutations-types';

const mutations = {
  [types.SET_LOGIN_STATUS](state, value) {
    state.isShowTest = value;
  }
};

export default mutations;
