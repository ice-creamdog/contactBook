
<template>
    <div class="settings_container">
        <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        
                        <MenuItem name="1">
                            <Button type="primary" ghost>修改密码</Button>
                        </MenuItem>
                        <MenuItem name="2">
                            <Button type="info" ghost>退出登录</Button>
                        </MenuItem>
                        <MenuItem name="3">
                           <Button type="error" ghost>删除用户</Button>
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
                        <h4>用户名</h4>
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
            
        }
    },
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