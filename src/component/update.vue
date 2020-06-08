
<template>
    <div class="update_container">
         <Form ref="formCustom" :model="formCustom"  :label-width="80">
        
        
        <FormItem label="姓名" >
            <Input type="text" v-model="formCustom.cName"></Input>
        </FormItem>
        <FormItem label="电话" >
            <Input type="text" v-model="formCustom.cPhone"></Input>
        </FormItem>
        <FormItem label="性别">
            <Select v-model="formCustom.cSex" style="width:400px;height:52px">
                <Option  value="男" >男</Option>
                <Option  value="女" >女</Option>
            </Select>
        </FormItem>
        <FormItem label="分类">
            <Select v-model="formCustom.ctypeId"  style="width:400px;height:52px">
                <Option v-for="item in formCustom.cType" :key="item.typeId"  :value="item.typeId">{{item.typeName}}</Option>
            </Select>
        </FormItem>
        <FormItem label="邮箱" >
            <Input type="text" v-model="formCustom.cEmail"></Input>
        </FormItem>
        <FormItem label="地址" >
            <Input type="text" v-model="formCustom.cAddress"></Input>
        </FormItem>
        <FormItem label="QQ" >
            <Input type="text" v-model="formCustom.cQq"></Input>
        </FormItem>
        <FormItem label="职务" >
            <Input type="text" v-model="formCustom.cWork"></Input>
        </FormItem>
        <FormItem label="id" >
            <Input type="text" v-model="formCustom.cId" disabled></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </div>
</template>

<script>
 export default {
        data () {
            
           
            
            
            return {
                id:localStorage.getItem("cid"),
                formCustom: {
                    cName:'',
                    cPhone:'',
                    cSex:'',
                    cType:[],
                    cEmail:'',
                    cAddress:'',
                    cQq:'',
                    cWork:'',
                    ctypeId:''
                },
                
            }
        },
        created(){
            this.getContacter()
           
          
        },
        methods: {
            
            getContacter(){
                if(localStorage.getItem('userToken'=="")){
                    this.$message.error('请登录')
                }else{
                    this.$http({
                            method:'post',
                            url:'user/contact/select',
                            params:{uId:localStorage.getItem("userId"),cId:this.id},
                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                if(result.body.status=="200"){
                  this.formCustom=result.body.message
                 
                    this.$http({
                                    method:'post',
                                    url:'user/type/all',
                                    params:{uId:localStorage.getItem("userId")},
                                    headers:{'Content-Type':'application/x-www-form-urlencoded'}
                                    
                                    }).then(result=>{
                        if(result.body.status=="200"){
                        this.formCustom.cType=result.body.message
                        
                        
                        }else{
                        this.$message.error("获取联系人类型失败！")
                        }
                        })
              
                  
                  
                }else{
                  this.$message.error("获取联系人类型失败！")
                  }
                })
                }
            },
            handleSubmit (name) {
                
                    if (localStorage.getItem("userToken")) {
                        this.$http.post('user/contact/update',{
                            cAddress:this.formCustom.cAddress,
                            cId:this.id,
                            cName:this.formCustom.cName,
                            cPhone:this.formCustom.cPhone,
                            cQq:this.formCustom.cQq,
                            cSex:this.formCustom.cSex,
                            cType:this.formCustom.ctypeId,
                            cWork:this.formCustom.cWork,
                            uId:localStorage.getItem('userId')
                        }).then(result=>{
                            if(result.body.status=="200"){
                                this.$Message.success('修改成功');
                                this.$router.push({path:'/users'})
                                localStorage.removeItem("cid")
                            }else{
                                this.$Message.error('修改失败');
                            }
                        })
                        
                    } else {
                        this.$Message.error('Fail!');
                    }
                
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        
    }
</script>

<style>

</style>