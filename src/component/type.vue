
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
                                    
                                    <MenuItem name="1-2"><input type="text" placeholder="添加类型" style="width:150px ;font-size:12px" v-model="addInfo"><Button type="primary" ghost @click="Add">添加</Button></MenuItem>
                                    
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
                                            this.update()
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
                data1: [
                    {
                        typeName: 'John Brown',
                        typeId: 18,
                        typeComment: 'New York No. 1 Lake Park',
                        
                    },
                    {
                        typeName: 'John Brown',
                        typeId: 18,
                        typeComment: 'New York No. 1 Lake Park',
                        
                    },
                    {
                        typeName: 'John Brown',
                        typeId: 18,
                        typeComment: 'New York No. 1 Lake Park',
                        
                    },
                    {
                        typeName: 'John Brown',
                        typeId: 18,
                        typeComment: 'New York No. 1 Lake Park',
                        
                    }

                   
                ],
                delInfo:"",
                addInfo:"",
                
            };
        },
        created(){
            this.getCnoType()
        },
        methods:{
            getCnoType(){
                if(this.$store.state.isLogin==true){
                    this.$http({
                            method:'post',
                            url:'user/type/all',
                            params:{useId:this.$store.state.userId},

                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                    if(result.body.status=="200"){
                    this.data1 = this.data1.concat(result.body.message)
                    
                    
                    }else{
                    this.$message.error("获取联系人类型失败！")
                    }
              })}
              
            },
               Remove (index) {
                 this.data1.splice(index, 1);
                 var delObj = JSON.stringify({
                        typeComment: "",
                        typeId: "",
                        typeName: this.delInfo,
                        uid: this.$store.state.userId
                    })
                    this.$http.post('user/type/update',delObj).then(reult=>{
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
                if(this.$store.state.isLogin==true){
                    if(this.delInfo==""){
                     this.$message.error("输入不能为空")
                }else{
                    var delObj = JSON.stringify({
                        typeComment: "",
                        typeId: "",
                        typeName: this.delInfo,
                        uid: this.$store.state.userId
                    })
                    this.$http.post('user/type/update',delObj).then(reult=>{
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
            update () {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    }
                })
            },
            Add(){
                if(this.$store.state.isLogin==true){
                    if(this.addInfo==''){
                         this.$message.error("输入不能为空")
                    }else{
                        this.$http({
                            method:'post',
                            url:'user/type/add',
                            params:{
                    typeName:this.addInfo,
                    uId:this.$store.state.userId
                },

                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                    if(result.body.status=="200"){
                        this.$message.success("添加成功")
                        this.addInfo ='';
                        this.getCnoType()
                    }else{
                        this.$message.error('添加失败')
                        this.addInfo ='';
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
