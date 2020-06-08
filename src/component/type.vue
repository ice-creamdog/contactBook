
<template>
    <div class="layout">
        <Layout>
            <Header>
                
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>用户</BreadcrumbItem>
                    <BreadcrumbItem>联系人类型</BreadcrumbItem>
                    
                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff' ,width:'400px'} " >
                            <Menu active-name="1-2" theme="light" width="300px" :open-names="['1']">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        操作
                                    </template>
                                    
                                    <MenuItem name="1-1"><input type="text" placeholder="删除类型" style="width:150px ;font-size:12px" v-model="delInfo"><Button type="error" ghost @click="Delete">删除</Button></MenuItem>
                                    
                                    <MenuItem name="1-2"><input type="text" placeholder="添加类型" style="width:150px ;font-size:12px" v-model="addName"><Button type="primary" ghost @click="Add">添加</Button></MenuItem>
                                    
                                </Submenu>
                                
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '20px 100px', minHeight: '280px', background: '#fff'}">
                            <Table stripe border="" :columns="columns1" :data="data1">
                                
                                 
                            </Table>
                             
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2020 &copy; TalkingData</Footer>
        </Layout>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return{
                columns1: [
                    {
                        title: '类型名称',
                        key: 'typeName'
                    },
                    {
                        title: '类型Id',
                        key: 'typeId'
                    },
                    {
                        title: '类型说明',
                        key: 'typeComment'
                    },{
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.update(params.index)
                                        }
                                    }
                                }, '更新'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.Remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [ ],
                delInfo:"",
                addName:"",
                addComment:''
                
            };
        },
        created(){
            this.getCnoType()
        },
        methods:{
            getCnoType(){
                if(localStorage.getItem('userToken')!=''){
                    this.$http({
                            method:'post',
                            url:'user/type/all',
                            params:{uId:localStorage.getItem("userId")},

                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                    if(result.body.status=="200"){
                    this.data1 = result.body.message;
                    
                    
                    }else{
                    this.$message.error("获取联系人类型失败！")
                    }
              }).catch(function (err) {
                console.log(err);
                this.$message.error({
                  message:"你还没有设置联系人类型，请设置",
                  showClose: true
                })
              })}
              
            },
               Remove (index) {
                  var  data=this.data1[index]
                 this.data1.splice(index, 1);
                 
                 var delObj = JSON.stringify({
                        typeComment: data.typeComment?data.typeComment:"",
                        typeId: data.typeId,
                        typeName: data.typeName,
                        uId: localStorage.getItem("userId")
                    })
                    this.$http.post('user/type/delete',delObj).then(result=>{
                    if(result.body.status=="200"){
                        this.$message.success("删除成功")
                        this.delInfo=""
                        this.getCnoType()
                    }else{
                        this.$message.error("删除失败，请确认要删除的类型是否正确")
                          }
                    
                     })
            },                  

            Delete(){
                if(localStorage.getItem('userToken')!=''){
                    if(this.delInfo==""){
                     this.$message.error("输入不能为空")
                }else{
                    for( var i=0, l =this.data1.length;i <l;i++){
                        if(this.delInfo==this.data1[i].typeName){
                            var data2 = this.data1[i]
                        }
                    }
                    var delObj = JSON.stringify({
                        typeComment: '',
                        typeId: data2.typeId,
                        typeName: this.delInfo,
                        uId: localStorage.getItem("userId")
                    })
                    this.$http.post('user/type/delete',delObj).then(reult=>{
                    if(result.body.status=="200"){
                        this.$message.success("删除成功")
                        this.delInfo=""
                        this.getCnoType()
                    }else{
                        this.$message.error("删除失败，请确认要删除的类型是否正确")
                          }
                    
                     })
                     }
                }else{{this.$message.error('请先登录')}}
                
                
                
            },
            update (index) {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('div', [
                                h('Input', {
                            props: {
                                value: this.value1,
                                autofocus: true,
                                placeholder: 'Please enter your name...',
                                width:"100px"
                            },
                            on: {
                                input: (val) => {
                                    
                                    this.value1 = val;
                                }
                            },
                            
                        }),h('Input', {
                            props: {
                                value: this.value2,
                                autofocus: true,
                                placeholder: 'Please enter your name...',
                                width:"100px",
                                size:'small'
                            },
                            on: {
                                input: (val) => {
                                    
                                    this.value2 = val;
                                }
                            },
                            
                        }),
                               
                            ])
                        
                    },
                    onOk:()=>{
                        if(this.value1==''&&this.value2==""){
                            this.$message.error("输入不能都为空")
                        }else{
                            var data=this.data1[index];

                        data.typeName=this.value1;
                        data.typeComment=this.value2
                        this.$http.post('user/type/update',{typeComment:data.typeComment,typeId:data.typeId,typeName:data.typeName,uId:localStorage.getItem('userId')}).then(result=>{
                            if(result.body.status=="200"){
                                this.data1[index]=result.body.message
                                this.value1="";
                                this.value2="";
                                this.$message.success('更新成功')
                            }else{
                                this.$message.error('失败了，请重试')
                            }
                        })
                        }
                        
                        
                    }
                })
            },
            Add(){
                if(localStorage.getItem('userToken')!=''){
                    if(this.addName==""){
                         this.$message.error("输入不能为空")
                    }else{
                        this.$http({
                            method:'post',
                            url:'user/type/add',
                            params:{typeName:this.addName,uId:localStorage.getItem("userId") },
                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                    if(result.body.status=="200"){
                        this.$message.success("添加成功")
                        this.addName ="";
                        
                        this.getCnoType()
                    }else{
                        this.$message.error('添加失败')
                        this.addName ="";
                        
                         }
                    })
                    }
                
                }else{{this.$message.error('请先登录')}}
                
            }
        }

    }
</script><style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
