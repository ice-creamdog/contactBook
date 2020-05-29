<template>
  <div class="app-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><img src="" alt=""></el-menu-item>
            <router-link to="/users" index="2" class="el-menu-item">用户</router-link>
             <el-button type="text" @click="open"  class="el-menu-item">登录</el-button>
            <router-link to="/register" index="3" class="el-menu-item">注册</router-link>
            <router-link to="/help " index="4" class="el-menu-item">帮助</router-link>
        </el-menu>
        <div class="chart"></div>
         <router-view></router-view> 
   </div>
</template>
<script>

export default {
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
       open() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    }
}
</script>

<style lang="scss" scoped>
element.style {
    background-color:grey;
}

.el-menu.el-menu--horizontal {
    border-bottom: solid 1px #e6e6e6;
}

.el-menu--horizontal {
    border-right: none;
}

.el-menu {
    width: 100%;
    height: 150px;
    border-right: solid 1px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color:grey;
    background: url(../assets/images/nav_bg.png) repeat-x;
    border-bottom: none;
    .el-menu-item{

        margin: 60px 0;
        margin-left: 80px;
        font-size: 30px;
        text-align: center;
        color: black;
        font-weight: bold;
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

    }
    
}


article, aside, blockquote, body, button, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, input, legend, li, menu, nav, ol, p, section, td, textarea, th, ul {
    margin: 0;
    padding: 0;
}

* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
user agent stylesheet
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #515a6e;
    background-color:#e6e6e6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

html {
    font-family: sans-serif;
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

.el-menu::after, .el-menu::before {
    display: inline;
    content: "";
    background-color: none;
    
}

:after, :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.el-menu::after {
    clear: both;
}

.el-menu::after, .el-menu::before {
    display: inline;
    content: "";
}

:after, :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.chart{
    width: 100%;
    height: 800px;
    background: url(../assets/images/banner-bg.jpg) no-repeat center;
    position: absolute;
}
</style>
