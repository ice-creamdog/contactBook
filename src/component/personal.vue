
<template >
    <div class="personal_container">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="userName" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="userE-mail" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                
                <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="userTel" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="Enter your tel"></Input>
                </FormItem>
                <FormItem label="userNick" prop="name">
                    <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">save
                    </Button>
                    <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
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
                    name: '',
                    mail: '',
                    
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    
                }
        };
    } ,
    methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
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