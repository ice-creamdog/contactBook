
<template>
    <div class="register">
         <form>
            <label for="name">
                <input type="text " class="input" v-model="user.name" @focus.stop="focus=1" @blur="focus=0">
                <em v-show="focus===1||nameIn===false">*姓名不能为空且只能由字母、数字、下划线组成</em>
            </label>
            <label for="email">
                <input type="text" class="input" v-model="user.email" @focus.stop="focus=2" @blur="focus=0">
                <em v-show="focus==2||emailIn==false">*邮箱格式不正确</em>
            </label>
            <label for="pwd" class="last">
                <input type="password" class="input" v-model="user.pwd" @focus.stop="focus=3" @blur="focus=0">
                <em v-show="focus==3||pwdIn==false">*密码不能小于6位</em>
            </label>
            <button class="loginSub"  @click="Register">
                <span v-show="!result">注册速讯</span>
                <span v-if="req" v-show="result">注册成功</span>
                <span v-else v-show="result">重新注册</span>
                <i class="fa fa-spinner fa-spin" v-show="icon"></i>
                <i class="fa fa-check" v-if="req" v-show="result"></i>
                <i class="fa fa-times" v-else v-show="result"></i>
                
            </button>
        </form>
    </div>
</template>
<script>

    export default {
         data() {
            return {
               user:{
                   name:'',
                   email:'',
                   pwd:''
                   
               },
               icon: false, //控制转动
                result: false, // 得到响应之后
                req:"",
                focus:false,
                nameIn:true,
                pwdIn : true,
                emailIn:true
            };
        },
        methods:{
            Register(){
                this.nameIn = (this.user.name==''|| /\W/g.test(this.user.name))? false:true;
                this.emailIn = (this.user.email==''||!!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(this.user.email))? false :true;
                this.pwd = (this.user.pwd.length<6)? false:true;

                if(this.nameIn&&this.emailIn&&this.pwd){
                    this.icon = true; 
                    this.result = false;

                    this.$http.post('/register' ,{email:this.user.email,loginName:this.user.email,password:this.user.pwd}).then(result=>{
                        if(result.body.stasus==="200"){
                            this.req=true;
                            this.result = true;
                        }
                    })
                }

            }
        }
        
            

    }
</script>
<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
body{
    font-size: 14px;
    font-family: 'Microsoft YaHei',sans-serif;
    color: #333;
}
  .register{
    width: 994px;
    margin: 0 auto;
    margin-top: 200px; 

    label { 
    padding-left: 347px;
    font-size: 15px;
    display: block; 
    text-align: left;
    margin: 10px 0;}

    .input {
    width: 300px;
    height: 47px;
    line-height: 47px;
    box-sizing: border-box;
    border: 1px solid #d5d5d5;
    
    box-shadow: none;
    padding: 10px 8px;
    background-color: #fff; 
        }
        .last{
            .input{
                border-bottom: 1px solid #d5d5d5;
            }
        }
        .loginSub{
             margin-top: 18px; 
            width: 300px;
            height: 41px;
            line-height: 41px;
            background-color: #0f88eb;
            color: #fff; 
            font-size: 15px;
            border: none;
            border-radius: 3px;
            text-align: center;
            cursor: pointer; 
            i {
            margin-left: 5px;
            font-size: 20px;
                }
        }

  }

</style>
