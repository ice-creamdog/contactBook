
<template>
    <div class="user_container">
        <Layout class="layout">
                
            <Header class="layout-header">
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="search">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                              <el-form-item >
                                    <el-input v-model="formInline.CName" placeholder="联系人姓名"></el-input>
                                  </el-form-item>
                                  <el-form-item >
                                    <el-input v-model="formInline.CSex" placeholder="联系人性别"></el-input>
                                  </el-form-item>
                                  <el-form-item >
                                    <el-select v-model="formInline.CtypeId" placeholder="请选择">
                                      <el-option v-for="item in formInline.CType" :key="item.typeId" :label="item.typeName" :value="item.typeId">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item>
                                    <el-button type="primary" @click="search">查询</el-button>
                                  </el-form-item>
                              </el-form>
                        </div>
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <Icon type="ios-navigate"></Icon>
                                <router-link to="/settings" >更多设置</router-link>
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="ios-keypad"></Icon>
                                <router-link to="/help">帮助</router-link>
                                
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="ios-analytics"></Icon>
                                <router-link to="/" >首页</router-link>
                            </MenuItem>
                            <MenuItem name="3">
                                <router-link to="/add"  >添加联系人</router-link>
                            </MenuItem>
                            <MenuItem name="4">
                                <router-link to="/personal">个人资料</router-link>
                            </MenuItem>
                            <MenuItem name="5">
                                <router-link to="/type"  >联系人类型详情</router-link>
                            </MenuItem>
                            
                        </div>
                        
                    </Menu>
            </Header>
            <Breadcrumb :style="{margin: '16px 0'}">
                            <BreadcrumbItem>用户</BreadcrumbItem>
                            
                    
                </Breadcrumb>
                 <Content :style="{padding: '0 50px'}">
                  <Card>
                      <div style="min-height: 200px;">
                                  <Table border :columns="columns12" :data="data6">
                                    <template slot-scope="{ row }" slot="name">
                                        <strong>{{ row.name }}</strong>
                                    </template>
                                    <template slot-scope="{ row, index }" slot="action">
                                        <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">更新</Button>
                                        <Button type="error" size="small" @click="remove(index)">删除</Button>
                                    </template>
                                </Table>
                          Content
                      </div>
                  </Card>
                </Content>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
     
        
       
    </div>
</template>

<script>
 export default {
        data () {
            return {
              formInline: {
                CName: '',
                CSex: '',
                CType:[],
                CtypeId:''
              },
              columns12: [
                    {
                        title: '联系人名字',
                        key: 'cName',
                        width: 300,
                        fixed: 'left'
                    },
                    {
                        title: '联系人电话',
                        key: 'cPhone',
                        width: 300
                    },
                    {
                        title: '联系人性别',
                        key: 'cSex',
                        width: 300
                    },
                    {
                        title: '联系人地址',
                        key: 'cAddress',
                        width: 300
                    },
                    {
                        title: '联系人qq',
                        key: 'cQQ',
                        width: 500
                    },
                    {
                        title: '联系人职务',
                        key: 'cWork',
                        width: 300
                    },
                    {
                        title: '联系人分类',
                        key: 'cType',
                        width: 300
                    },
                    {
                        title: '联系人id',
                        key: 'cId',
                        width: 300
                    },
                    {
                        title: '用户id',
                        key: 'uId',
                        width: 300
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
              data6: [
                {cId:'',
                  cSex:'',
                  cPhone:'',
                  cName:'',
                  cAddress:'',
                  cQQ:'',
                  cWork:'',
                  cType:'',
                  uId:''
                  
                  }
              ]
            }
        },
        created() {
          this.getCType()
          this.getContacter()
        },
        methods: {
            
            getCType(){
              if(localStorage.getItem('userToken')!=''){
               this.$http({
                            method:'post',
                            url:'user/type/all',
                            params:{uId:localStorage.getItem("userId")},
                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                if(result.body.status=="200"){
                  this.formInline.CType=this.formInline.CType.concat(result.body.message)
                  
                  
                }else{
                  this.$message.error("获取联系人类型失败！")
                  }
                })
              }else{this.$message.error('请先登录')}
              
            },

              search() {
          // 搜索功能
                    if(localStorage.getItem("userToken")!=''){
                        
                          if(this.CName==''&&this.CSex==""&&this.CType==''){
                            this.$message.error("输入不能都为空")
                          }else{
                            this.$http({
                                      method:'post',
                                      url:'user/contact/search',
                                      params:{  uId:localStorage.getItem("userId"),   cName:this.formInline.CName,  cSex:this.formInline.CSex,  cType:this.formInline.CtypeId
          },
                                      headers:{'Content-Type':'application/x-www-form-urlencoded'}
                                      
                                      }).then(result=>{
                              if(result.body.status=="200"){
                                this.data6=result.body.message
                                console.log(result.body.message)
                                this.formInline.CName ="";
                                this.formInline.Ctypeid ="",
                                this.formInline.CSex =""
                              }else{
                                this.$message.error("查询联系人失败")
                              }
                            })
                          }
                    }else{this.$message.error('请先登录')}
                    },
      //添加联系人之后重新新加载
          //删除联系人
          //修改联系人
            update (index) {
              var data4=this.data6[index]
                localStorage.setItem('cid',data4.cId)
                this.$router.push({path:'/update'})
            },
            remove (index) {
              if(localStorage.getItem('userToken')!=''){
                 var data3 = this.data6[index]
                 this.data6.splice(index, 1);
                 

                this.$http({
                            method:'post',
                            url:'user/contact/delete',
                            params:{cId:data3.cId,uId:localStorage.getItem("userId")},
                            headers:{'Content-Type':'application/x-www-form-urlencoded'} }).then(result=>{
                  if(result.body.status=="200"){
                    this.$message.success("删除成功")
                  }else{
                    this.$message.error("从数据库删除失败")
                  }
                }).catch(function (err) {
                console.log(err);
                this.$message.error({
                  message: err,
                  showClose: true
                })
              })
              }else{this.$message.error('请先登录')}
               
            },
          // 加载联系人信息
            getContacter(){
              if(localStorage.getItem('userToken')!=''){
                var data = JSON.stringify({   uId:localStorage.getItem("userId"),  uLoginName:localStorage.getItem('userName')})
                this.$http.post('user/contact/all',data).then(result=>{
                if(result.body.status=='200'){
                  console.log(result.body.message)
                  this.data6=result.body.message
                }else{
                  this.$message.error('联系人列表加载失败!')
                }
              }).catch(function (err) {
                console.log(err);
                this.$message.error({
                  message:"你还没有设置联系人，请设置",
                  showClose: true
                })
              })
              }else{this.$message.error('请先登录')}
              
            },
          
            
          },
      mounted() {
       
      }
  };
</script>

<style>
.search{
    float:right;
}
</style>
