
<template>
    <div class="add_container">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <FormItem label="联系人地址" prop="caddress">
                <Input type="text" v-model="formCustom.caddress"></Input>
            </FormItem>
            <FormItem label="联系人姓名" prop="cname">
                <Input type="text" v-model="formCustom.cname"></Input>
            </FormItem>
            <FormItem label="联系人电话" prop="cphone">
                <Input type="text" v-model="formCustom.cphone" ></Input>
            </FormItem>
            <FormItem label="联系人QQ" prop="cqq">
                <Input type="text" v-model="formCustom.cqq"></Input>
            </FormItem>
            <FormItem label="联系人性别" prop="csex">
                <Input type="text" v-model="formCustom.csex"></Input>
            </FormItem>
            <FormItem label="联系人分类" prop="ctype">
                <Input type="text" v-model="formCustom.ctype"></Input>
            </FormItem>
            <FormItem label="联系人工作" prop="cwork">
                <Input type="text" v-model="formCustom.cwork"></Input>
            </FormItem>
        <FormItem>
            <Button type="primary" @click="add('formCustom')">保存</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
    </div>
</template>

<script>
 export default {
        data () {
            
            
            return {
                formCustom: {
                    caddress:'',
                    cname:'',
                    cphone:'',
                    cqq:'',
                    csex:'',
                    ctype:'',
                    cwork:'',
                },
                ruleCustom: {
                    caddress:[
                        { required: false, message: 'Please fill in the password.', trigger: 'blur' },
                        
                    ],
                    cname:[
                        { required: false, message: 'Please fill in the password.', trigger: 'blur' },
                    ],
                    cphone:[
                        { required: true, message: 'Please fill in the phone number.', trigger: 'blur' },
                    ],
                    cqq:[
                        { required: false, message: 'Please fill in the password.', trigger: 'blur' },
                    ],
                    csex:[
                        { required: false, message: 'Please fill in the password.', trigger: 'blur' },
                    ],
                    ctype:[
                        { required: false, message: 'Please fill in the password.', trigger: 'blur' },
                    ],
                    cwork:[
                        { required: false, message: 'Please fill in the password.', trigger: 'blur' },
                    ],
                    
                }
            }
        },
        methods: {
            add (name) {
                if(this.$store.state.isLogin){
                    this.$refs[name].validate((valid) => {
                    if (valid) {
                        var params = JSON.stringify({
                            caddress:name.caddress,
                            cname:name.cname,
                            cphone:name.cphone,
                            cqq:name.cqq,
                            csex:name.csex,
                           ctype:name.ctype,
                           cwork:name.cwork,
                           uid:this.$store.state.userId
                        })
                        this.$http.post('/user/contact/update',).then(res=>{
                            if(res.body.status=='200'){
                                clearTimeout(timer)
                                this.formCustom.caddress="";
                                this.formCustom.cname="";
                                this.formCustom.cphone="";
                                this.formCustom.cqq="";
                                this.formCustom.csex="";
                                this.formCustom.ctype="";
                                this.formCustom.cwork="";
                                this.$Message.success('添加成功!');
                                var timer=setTimeout(()=>{
                                    this.$router.push({path:'/user'})
                                },1000)
                            }else{
                                this.$Message.error('添加失败，请重试');
                            }
                        })
                        
                    } else {
                        this.$Message.error('必须填写电话，请重试');
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

</style>