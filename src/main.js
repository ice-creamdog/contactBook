import Vue from "vue"


import VueRouter from "vue-router";
Vue.use(VueRouter);
import VueResource from "vue-resource";
Vue.use(VueResource);
import VueCoolies from 'vue-cookies'
Vue.use(VueCoolies)


import store from './vuex/store'
import App from "./App.vue"
import Element from "element-ui"
Vue.use(Element)
import iView from 'view-design'
Vue.use(iView)
import 'view-design/dist/styles/iview.css';
import 'view-design/dist/iview.min.js'
import 'element-ui/lib/index.js'
import  'element-ui/lib/theme-chalk/index.css'


Vue.http.options.root='http://120.78.169.148:8646';

Vue.http.headers.common['token'] = store.state.token

Vue.http.interceptors.push(function (request, next) {
  // modify url  本地调试使用本地ip地址
  
  // modify headers
  if (store.state.token) {
    
      request.headers.set('token', `${store.state.token}`);
  }
  // request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  next((response) => {
    // 请求发送后的处理逻辑
    if (response.status === 400 || response.status === 401) {
      // 当 Token 已经失效时，清空所有保存在 setToken 的数据
    }
    return response;
  });
});

import router from "./router";

var vm = new Vue({
  el:"#app",
  render:c=>c(App),
  store,
  router,//挂载路由对象
})