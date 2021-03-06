
import VueRouter from 'vue-router'

import Login from './component/login.vue'
import register from './component/register.vue'
import index from './component/index.vue'
import users from './component/users.vue'
import help from './component/help.vue'
import add from './component/add.vue'
import personal from './component/personal.vue'
import settings from './component/settings.vue'
import update from './component/update.vue'
import type from './component/type.vue'




var router = new VueRouter({
    routes: [
      {path:'/',redirect: '/home'},
      {path:'/home' ,component:index},
      {path:'/login',component:Login },
      {path:'/register' ,component:register},
      {path:'/help' ,component:help},
      {path:'/users',component:users},
      {path:'/add',component:add},
      {path:'/personal',component:personal},
      {path:'/settings',component:settings},
      {path:'/update',component:update},
      {path:'/type',component:type}
    ],
    linkActiveClass:'mui-active'
  });
  
  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  })

  export default router