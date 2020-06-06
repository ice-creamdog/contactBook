
<template>
    <div class="register">
         <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <FormItem label="用户名" prop="loginName">
                    <Input type="text" v-model="formCustom.loginName"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="formCustom.password"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input type="text" v-model="formCustom.email"></Input>
            </FormItem>
           
            <FormItem>
                <Button type="primary" @click="register('formCustom')">注册</Button>
                <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import { setTimeout } from 'timers';
    export default {
        data () {
            
            
            
            return {
                formCustom: {
                    loginName:'',
                    password: '',
                    email: ''
                },
                ruleCustom: {
                    loginName: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ],
                    
                    email: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            register (name) {
                this.$message.success('Success!');
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(1)
                        this.$http({
                            method:'post',
                            url:'register',
                            params:{uEmail:this.formCustom.email,uLoginName:this.formCustom.loginName,uPassword:this.formCustom.password},
                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                            console.log(4)
                            if(result.body.status=="200"){
                                console.log(2)
                                this.formCustom.loginName="";
                                this.formCustom.password="";
                                this.formCustom.email="";
                                this.$message.success('Success!');
                                this.$router.push({path:'/login'})
                            }else if(result.body.status=="400"){
                                console.log("密码不能为空")
                            }
                            else{
                                console.log(3)
                                this.$message.error('注册失败，请重试');
                            }
                        })
                        
                    } else {
                        this.$message.error('输入格式有误，请重试');
                    }
                })
          }
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            
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
  
</style>
