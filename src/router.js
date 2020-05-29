
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
      {path:'/update',component:update}
    ],
    linkActiveClass:'mui-active'
  });

  export default router