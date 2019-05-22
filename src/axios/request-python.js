import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import { VueAxios } from './request-python-axios';
import { BUILD_PYTHON_HOST, TEST_PYTHON_HOST } from './host';

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? `${TEST_PYTHON_HOST}` : BUILD_PYTHON_HOST, // api base_url
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
