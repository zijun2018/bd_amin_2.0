/**
 *   @Project:   登录模块的vue store
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/14 19:54
 *   @Note:      ——
 */
// getters,getter放在state前面的原因：避免Eslint的state报错
const getters = {
  userInfo: state => state.userInfo
};

// mutations,mutations放在state前面的原因：避免Eslint的state报错
const mutations = {
  SET_USER_INFO(state, obj) {
    state.userInfo = obj;
  }
};

// actions,actions放在state前面的原因：避免Eslint的state报错
const actions = {
  setUserInfo({ commit }, obj) {
    commit('SET_USER_INFO', obj);
  }
};

// initial state
const state = {
  userInfo: '',
};

export default {
  namespaced: true, // 空间命名，与根级别写法不一致,例如：'login/setToken'
  state,
  getters,
  actions,
  mutations
};
