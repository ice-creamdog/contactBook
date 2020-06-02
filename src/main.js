import Vue from "vue"


import VueRouter from "vue-router";
Vue.use(VueRouter);
import VueResource from "vue-resource";
Vue.use(VueResource);


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

Vue.http.options.root='http://112.74.86.158:8646';


import router from "./router";

var vm = new Vue({
  el:"#app",
  render:c=>c(App),
  store,
  router,//挂载路由对象
})