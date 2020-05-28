import Vue from "vue"


import VueRouter from "vue-router";
Vue.use(VueRouter);

import app from "./app.vue"
import router from "./router.js";

var vm = new Vue({
    el:"#app",
    render:c=>c(app),
    router,//挂载路由对象
  })