import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import App from './App.vue';
import router from './routers/router';
import store from './store/store';
import './registerServiceWorker';
import 'ant-design-vue/dist/antd.css';
import './styles/global/index.less';

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  error: '@/assets/error.png',
  loading: '@/assets/loading.png'
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
