
import { setTimeout } from 'timers';
<template>
    <div class="settings_container">
        <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        
                        <MenuItem name="1">
                            <el-popover placement="top" width="160" v-model="visible">
                                <p>确定删除当前用户吗</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="deleteUser">确定</el-button>
                                </div>
                                <el-button slot="reference" type="danger"  >删除用户</el-button>
                            </el-popover>
                        </MenuItem>
                        <MenuItem name="2">
                            <Button type="info" ghost @click="logOut" >退出登录</Button>
                        </MenuItem>
                        
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                </Breadcrumb>
                <Card style="background-color:#f5f7f9">
                    <div style="min-height: 500px; ">
                       <div class="user">
                        <div class="img"><img src="" alt=""></div>
                        <h4>{{user}}</h4>
                       </div>
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            Users:{},
            user:localStorage.getItem('userName')
        }
    },
    methods:{
        logOut(){
            if(localStorage.getItem('userToken')!=''){}else{this.$message.error('请先登录')}
            this.$http({
                            method:'post',
                            url:'user/logout',
                            params:{uId:localStorage.getItem('userId')},

                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{

                                localStorage.removeItem("userName");
                                localStorage.removeItem("userToken");
                                localStorage.removeItem('userId');
                                localStorage.removeItem("userEmail");
                                localStorage.removeItem("Name");
                                localStorage.removeItem("userPhone")
                                this.$store.dispatch("setUser",null);
                                this.$store.dispatch("setToken","");
                                this.$store.dispatch("setId",null);
                                this.$router.push({path:'/'})
            })
        },
        deleteUser(){
            
            if(localStorage.getItem('userToken')!=''){
                this.$http({
                            method:'post',
                            url:'user/delete',
                            params:{uLoginName:localStorage.getItem('userName'),uPassword:""},

                            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                            
                            }).then(result=>{
                if(result.body.status=="200"){

                    clearTimeout(timer);
                    this.$message.success('删除成功！');
                    localStorage.removeItem("userName");
                    localStorage.removeItem("userToken");
                    localStorage.removeItem('userId')
                    localStorage.removeItem("userEmail")
                    this.$store.dispatch("setUser",null)
                    this.$store.dispatch("setToken","")
                    this.$store.dispatch("setId",null)

                    const timer=setTimeout(()=>{
                        this.$router.push({path:'/'})
                    })
                }else{this.$message.error('删除失败，请重试！');}
            })
            }else{this.$message.error('请先登录')}
            
        }
    }
}
</script>

<style>
.settings_container{
    margin: 200px auto;
    width: 1000px;
    height: 800px;
    
}
.user{
    margin: 100px 0;
}
.user .img
{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border:1px solid black;
    margin: 20px auto;    
}
.user h4{
    display: block;
    margin: 40px auto;
    text-align: center;
}
</style>