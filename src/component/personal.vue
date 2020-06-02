
<template >
    <div class="personal_container">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                
                <FormItem label="用户邮箱" prop="uemail">
                    <Input v-model="formValidate.uemail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="用户id" >
                    <Input v-model="formValidate.uid" placeholder="Enter your e-mail" :disabled="true"></Input>
                </FormItem>
                <FormItem label="用户昵称" prop="uloginName">
                    <Input v-model="formValidate.uloginName" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="用户名" prop="uname">
                    <Input v-model="formValidate.uname" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="用户电话" prop="uphone">
                    <Input v-model="formValidate.uphone" placeholder="Enter your tel"></Input>
                </FormItem>
                <FormItem label="用户性别" prop="usex">
                    <Input v-model="formValidate.usex" placeholder="Enter your tel"></Input>
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
                    uemail:'',
                    uid:'',
                    uloginName:'',
                    uname:'',
                    uphone:'',
                    usex:'',

                    
                },
                ruleValidate: {
                    uname: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    uemail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    uloginName: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
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
                if(this.$store.state.isLogin){
                    //根据用户信息全局的用户名和用户密码获取全部信息
                    var data = JSON.stringify({

                            uemail: "",
                            uid: this.$store.state.userId,
                            uloginName: this.$store.state.currentUser,
                            uname: "",
                            upassword: "",
                            uphone: "",
                            usex: ""
                        // 发送全局的用户名和邮箱 密码  其他为本地的
                    })
                    this.$http.post('user/update',data).then(result=>{
                        if(result.body.status=="200"){
                            this.formValidate=result.body.message
                            
                        }else{
                            this.$message.error('获取失败')
                        }
                    })
                }else{this.$message.error("请先登录")}
                
            },
            // 点击提交修改，并把返回的数据加载到页面中
            update (name) {
                if(this.$store.state.isLogin){
                    this.$refs[name].validate((valid) => {
                    if (valid) {
                        var params = JSON.stringify({
                            uemail:this.formValidate.uemail,
                            uid:this.formValidate.uid,
                            uloginName:this.formValidate.uloginName,
                            uname:this.formValidate.uname,
                            upassword:"",
                            uphone:this.formValidate.uphone,
                            usex:this.formValidate.usex
                        })
                        this.$http.post('user/update',params).then(result=>{
                            if(result.body.status=="200"){
                                this.formValidate=result.body.message;
                                this.$store.dispatch("setUser",result.body.message.uloginName)
                                this.$message.success('修改成功')
                            }else{
                                this.$message.error('修改失败！请重试')
                            }
                        })
                        this.$Message.success('Success!');
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