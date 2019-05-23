/**
 *   @Project:   封装axios
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/15 11:40
 *   @Note:      请求拦截、响应拦截、错误统一处理
 */

import axios from 'axios';
import QS from 'qs';
import { message } from 'ant-design-vue';
import { BUILD_HOST, TEST_HOST } from './host';


/** *************************************************** */
/*                      环境的切换                        */
/** *************************************************** */

const ENV = process.env.NODE_ENV; // 当前环境（development/production）
if (ENV === 'development') {
  axios.defaults.baseURL = TEST_HOST; // 测试环境接口地址，根据服务器自适应（未写定具体域名）
} else if (ENV === 'production') {
  // 匹配正式/测试环境
  const isBuild = /https:\/\/(bd\.9quant\.cn)/i.test(window.location.href.toLowerCase());
  if (isBuild) {
    axios.defaults.baseURL = BUILD_HOST; // 正式环境接口地址，根据服务器自适应（未写定具体域名）
  } else {
    axios.defaults.baseURL = TEST_HOST; // 测试环境接口地址，根据服务器自适应（未写定具体域名）
  }
} else {
  axios.defaults.baseURL = TEST_HOST; // 其它环境接口地址，根据服务器自适应（未写定具体域名）
}


/** *************************************************** */
/*                    请求超时时间                        */
/** *************************************************** */

axios.defaults.timeout = 10000; // 10s


/** *************************************************** */
/*                      请求拦截器                        */
/** *************************************************** */

axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如是否存在token,如果存在，则统一在http请求的header上都加上token
    let userInfo = {};
    if (sessionStorage.getItem('userInfo')) {
      userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    } else if (localStorage.getItem('userInfo')) {
      userInfo = JSON.parse(localStorage.getItem('userInfo'));
    } else {
      userInfo = {};
    }
    config.headers.Authorization = `Bearer ${userInfo.token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);


/** *************************************************** */
/*                      响应拦截器                        */
/** *************************************************** */

axios.interceptors.response.use(
  (response) => {
    // 网络请求响应成功，做些什么
    if (response.status === 200) {
      // 这里可以针对后台接口，处理对应的成功和失败的状态码（这里的状态码由后台定义）
      switch (Number(response.data.code)) {
        // 0: 返回成功,返回成功里面的data数据
        case 0:
          return Promise.resolve(response.data);
        // 1001: （随手写）
        case 1001:
        default:
          // 返回不是0,返回包含接口code在内的所有数据
          return Promise.resolve(response);
      }
    }
    // 其他情况的处理
    return Promise.reject(response);
  },
  (error) => {
    // 网络请求状态码不是200的情况的处理, 此处可以处理协议请求状态码
    if (error.response.status) {
      switch (Number(error.response.status)) {
        // 401: 未登录
        case 401:
          this.$router.push({ name: 'user_login' });
          break;
        // 403: 登录过期
        case 403:
          this.$router.push({ name: 'user_login' });
          break;
        // 404: 请求不存在
        case 404:
          message.error('网络请求不存在', 1.5);
          break;
        // 否则返回状态码对应的描述
        default:
          message.error(error.response.statusText, 1.5);
      }
    }
    return Promise.reject(error.response);
  }
);


/** *************************************************** */
/*                        封装方法                        */
/** *************************************************** */

/**
 * get方法，对应get请求
 * @param url {String} 请求地址
 * @param paramsObj {Object} 参数对象，包含请求参数、成功回调、失败回调
 * @return {Promise<any>}
 */
export function requestGet(url, paramsObj) {
  axios.get(url, {
    params: paramsObj.params
  })
    .then((res) => {
      paramsObj.success && paramsObj.success(res.data);
    })
    .catch((err) => {
      paramsObj.error && paramsObj.error(err);
    });
}

/**
 * post方法，对应post请求
 * @param url {String} 请求地址
 * @param paramsObj {Object} 参数对象，包含请求参数、成功回调、失败回调
 * @return {Promise<any>}
 */
export function requestPost(url, paramsObj) {
  axios({
    url,
    method: 'post',
    headers: { 'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    data: QS.stringify(paramsObj.params)
  })
    .then((res) => {
      paramsObj.success && paramsObj.success(res.data);
    })
    .catch((err) => {
      paramsObj.error && paramsObj.error(err);
    });
}

/**
 * post方法，对应post请求
 * @param url {String} 请求地址
 * @param paramsObj {Object} 参数对象，包含请求参数、成功回调、失败回调
 * @return {Promise<any>}
 */
export function requestUpload(url, paramsObj) {
  axios(url, {
    method: 'post',
    headers: { 'content-Type': 'multipart/form-data' },
    data: paramsObj.params && paramsObj.params
  })
    .then((res) => {
      paramsObj.success && paramsObj.success(res.data);
    })
    .catch((err) => {
      paramsObj.error && paramsObj.error(err);
    });
}
