
<template >
    <div class="personal_container">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                
                <FormItem label="用户邮箱" prop="uemail">
                    <Input v-model="formValidate.uEmail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="用户id" >
                    <Input v-model="formValidate.uId" placeholder="Enter your e-mail" :disabled="true"></Input>
                </FormItem>
                <FormItem label="用户昵称" prop="uloginName">
                    <Input v-model="formValidate.uLoginName" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="用户名" prop="uname">
                    <Input v-model="formValidate.uName" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="用户电话" prop="uphone">
                    <Input v-model="formValidate.uPhone" placeholder="Enter your tel"></Input>
                </FormItem>
                <FormItem label="用户性别" prop="usex">
                    <Input v-model="formValidate.uSex" placeholder="Enter your tel"></Input>
                </FormItem>
                
                
                
                <FormItem>
                    <Button type="primary" @click="updateInfo('formValidate')">保存修改
                    </Button>
                    <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    <router-link to="/settings">more settings</router-link>
                    
                </FormItem>
            </Form>
   
    </div>
</template>

<script>
export default {
     data () {
             return {
                formValidate: {
                    uEmail:'',
                    uId:'',
                    uLoginName:'',
                    uName:'',
                    uPhone:'',
                    uSex:' ',

                    
                },
                ruleValidate: {
                    uname: [
                        { required: false, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    uemail: [
                        { required: false, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    uloginName: [
                        { required: false, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    
                }
        };
    } ,
    created(){
        
        this.getUserInfo()
    },
    methods: {

            // 初次登录获取用户信息，并加载到页面中
            getUserInfo(){
                //后面判断是否登陆（登陆标志），不登陆就返回空
                if(localStorage.getItem('userToken')!=''){
                    //根据用户信息全局的用户名和用户密码获取全部信息
                    var data = JSON.stringify({

                            uEmail: localStorage.getItem("userEmail"),
                            uId:localStorage.getItem("userId"),
                            uLoginName: localStorage.getItem('userName'),
                            uName: localStorage.getItem('Name'),
                            uPassword:'',
                            uPhone:localStorage.getItem('userPhone'),
                            uSex:"男"
                        // 发送全局的用户名和邮箱 密码  其他为本地的
                    })
                    this.$http.post('user/update',data).then(result=>{
                        if(result.body.status=="200"){
                            localStorage.setItem('Name',result.body.message.uName)
                            localStorage.setItem('userPhone',result.body.message.uPhone)
                            this.formValidate=result.body.message
                            
                        }else{
                            this.$message.error('获取失败')
                        }
                    })
                }else{this.$message.error("请先登录")}
                
            },
            // 点击提交修改，并把返回的数据加载到页面中
            updateInfo (name) {
                if(localStorage.getItem('userToken')!=''){
                    this.$refs[name].validate((valid) => {
                    if (valid) {
                        var params = JSON.stringify({
                            uEmail:localStorage.getItem("userEmail"),
                            uId:localStorage.getItem("userId"),
                            uLoginName:localStorage.getItem('userName'),
                            uName:this.formValidate.uName,
                            uPassword:'',
                            uPhone:this.formValidate.uPhone,
                            uSex:this.formValidate.uSex
                        })
                        this.$http.post('user/update',params).then(result=>{
                            if(result.body.status=="200"){
                                this.formValidate=result.body.message;
                                 localStorage.setItem("userName",result.body.message.uLoginName)
                                 localStorage.setItem('userEmail',result.body.message.uEmail)
                                localStorage.setItem('Name',result.body.message.uName)
                                localStorage.setItem('userPhone',result.body.message.uPhone)
                                this.$store.dispatch("setUser",result.body.message.uLoginName)
                                this.$message.success('修改成功')
                            }else{
                                this.$message.error('修改失败！请重试')
                            }
                        })
                        
                    } else {
                        this.$Message.error('输入有误，请重试');
                    }
                })
                }else{this.$message.error("请先登录")}
                
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
      
}

</script>

<style>

body{
    background-color: #E9EEF3;
}
.ivu-form{
    height: 1000px;
    width: 1000px;
    margin: 200px auto;
    padding: 20px 30px;
    background-color:#E9EEF3
}
.ivu-form .ivu-form-item{
    margin: 50px 0;
    margin-left: 10px
}
.ivu-input {
    display: inline-block;
    width: 400px;
    height: 52px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 14px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    -webkit-transition: border .2s ease-in-out,background .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
    transition: border .2s ease-in-out,background .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
}
</style>