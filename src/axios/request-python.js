import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import { VueAxios } from './request-python-axios';
import { BUILD_PYTHON_HOST, TEST_PYTHON_HOST } from './host';

const ENV = process.env.NODE_ENV; // 当前环境（development/production）
let BASE_URL = '';
if (ENV === 'development') {
  BASE_URL = TEST_PYTHON_HOST; // 测试环境接口地址，根据服务器自适应（未写定具体域名）
} else if (ENV === 'production') {
  // 匹配正式/测试环境
  const isBuild = /https:\/\/(bd\.9quant\.cn)/i.test(window.location.href.toLowerCase());
  if (isBuild) {
    BASE_URL = BUILD_PYTHON_HOST; // 正式环境接口地址，根据服务器自适应（未写定具体域名）
  } else {
    BASE_URL = TEST_PYTHON_HOST; // 测试环境接口地址，根据服务器自适应（未写定具体域名）
  }
} else {
  BASE_URL = TEST_PYTHON_HOST; // 其它环境接口地址，根据服务器自适应（未写定具体域名）
}

// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_URL, // api base_url
  timeout: 20000 // 请求超时时间
});
const err = (error) => {
  notification.error({ message: '后台执行错误', description: error.info });
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => config, err);

// response interceptor
service.interceptors.response.use(response => response.data, err);

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service);
  }
};

export {
  installer as VueAxios,
  service as axios
};
