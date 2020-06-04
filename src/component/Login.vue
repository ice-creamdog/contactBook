
import { isLogin } from '../vuex/getters';
<template>
    <div class="login_container">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="loginName">
            <Input type="text" v-model="formInline.loginName" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="login('formInline')">Signin</Button>
        </FormItem>
    </Form>
    </Form>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                formInline: {
                   loginName: '',
                    password: ''
                },
                loginIng:false,
                message:{},
                ruleInline: {
                   loginName: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            
        },
        methods: {
            // 点击登录，如果通过表达式验证，发送请求
            // 判断响应状态，成功就保存信息到个人资料页面，并且实现跳转
            // 失败就提示用户密码错误
            login(name) {
                
                this.$refs[name].validate((valid) => {
                    
                    if (valid) {
                        
                        this.$http.post('user/login',{uLoginName:this.formInline.loginName,uPassword:this.formInline.password},{emulateJSON:true}).then(result=>{
                            
                            if(result.body.status==="200"){
                                this.message=result.body.status;
                                this.formInline.loginName="";
                                this.formInline.password="";
                                this.loginIng=true;
                                this.$message.success("登录成功");
                                sessionStorage.setItem("userName",result.body.message.uloginName)                              
                                this.$store.dispatch("setUser",result.body.message.uloginName)                              
                                this.$store.dispatch("setId",result.body.message.uid)
                                this.$router.push({path:'/users'})
                            }else{
                                this.$message.error("登录失败，请重试")
                            }
                    })
                    } else {
                        this.$Message.error('输入格式不规范');
                    }
                })
            }
        },
        

    }

</script>

<style>

</style>
