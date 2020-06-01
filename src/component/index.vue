<template>
  <div class="app-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><img src="" alt=""></el-menu-item>
            <router-link to="/users" index="2" class="el-menu-item">用户</router-link>
             
             <router-link to="/login" class="el-menu-item" >登录</router-link>
            <router-link to="/register" index="3" class="el-menu-item">注册</router-link>
            <router-link to="/help " index="4" class="el-menu-item">帮助</router-link>
        </el-menu>
        
        <div class="slide" v-on:mouseover="stop()" v-on:mouseout="move()"> 
                <div class="slideshow"> 
                <transition-group tag="ul" name="image"> 
                    <li v-for="(img, index) in imgArray" v-show="index===mark" :key="img"> 
                    <a href="#"> 
                    <img :src='img'> 
                    </a> 
                    </li> 
                </transition-group> 
                </div> 
                <div class="bullet"> 
                <span v-for="(item, index) in imgArray" :class="{ 'active':index===mark }"
                @click="change(index)" :key="index"></span> 
                </div> 
        </div> 
        
         <router-view></router-view> 
   </div>
</template>
<script>
 
export default {
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        mark: 0,
        timer: null, //定时器 
        imgArray: [ 
    '../assets/images/timg1.jpg', 
    '../assets/images/timg2.jpg', 
    '../assets/images/timg3.jpg', 
    '../assets/images/timg4.jpg'
   ] 
      };
    },
    methods: {

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      autoPlay () { 
   this.mark++; 
   if (this.mark === 4) { 
    this.mark = 0 
   } 
  }, 
  play () { 
   this.timer = setInterval(this.autoPlay, 2500) 
  }, 
  change (i) { 
   this.mark = i 
  }, 
  stop () { 
   clearInterval(this.timer) 
  }, 
  move () { 
   this.timer = setInterval(this.autoPlay, 2500) 
  } 
 }, 
 created () { 
  this.play() 
 } 
}

</script>

<style lang="scss" scoped>
* { 
  margin: 0; 
  padding: 0; 
  list-style: none; 
 } 
 .slide { 
  width: 2000px; 
  height: 800px; 
  margin: 0 auto; 
  margin-top: 50px; 
  overflow: hidden; 
  position: relative; 
 } 
 .slide.slideshow { 
  width: 2000px; 
  height: 800px; 
 } 
  .slide.slideshow ul li { 
  position: absolute; 
 } 
 .slide.slideshow ul li  img { 
  width: 2000px; 
  height: 800px; 
 } 
 .slide .bar { 
  position: absolute; 
  width: 100%; 
  bottom: 10px; 
  margin: 0 auto; 
  z-index: 10; 
  text-align: center; 
 } 
 .slide .bar span { 
  width: 20px; 
  height: 5px; 
  border: 1px solid; 
  background: white; 
  display: inline-block; 
  margin-right: 10px; 
 } 
  .slide .bar span.active { 
  background: red !important; 
 } 

.image-enter-active { 
  transform: translateX(0); 
  transition: all 1.5s ease; 
 } 
 .image-leave-active { 
  transform: translateX(-100%); 
  transition: all 1.5s ease; 
 } 
 .image-enter { 
  transform: translateX(100%); 
 } 
 .image-leave { 
  transform: translateX(0); 
 } 

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
    background: url(../assets/images/timg4.jpg) no-repeat center;
    position: absolute;
}
</style>
