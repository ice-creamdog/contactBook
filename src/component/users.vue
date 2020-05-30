
<template>
    <div class="user_container">
        <Layout class="layout">
            <Header class="layout-header">
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="search">
                            <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
                            </el-autocomplete>
                            <span class="icon"><el-button type="primary" icon="el-icon-search">搜索</el-button></span>
                        </div>
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <Icon type="ios-navigate"></Icon>
                                更多设置
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="ios-keypad"></Icon>
                                帮助
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="ios-analytics"></Icon>
                                头像
                            </MenuItem>
                            <MenuItem name="3">
                                <router-link to="/add">添加联系人</router-link>
                            </MenuItem>
                        </div>
                    </Menu>
            </Header>
                 <Content :style="{padding: '0 50px'}">
                  <Card>
                      <div style="min-height: 200px;">
                                  <el-table :data="tableData" style="width: 100%">
                                      <el-table-column type="expand">
                                          <template slot-scope="props">
                                              <el-form label-position="left" inline class="demo-table-expand">
                                              <el-form-item label="商品名称："><span>{{ props.row.name }}</span></el-form-item>
                                              <el-form-item label="所属店铺："><span>{{ props.row.shop }}</span></el-form-item>
                                              <el-form-item label="商品  ID："><span>{{ props.row.id }}</span></el-form-item>
                                              <el-form-item label="店铺  ID："><span>{{ props.row.shopId }}</span></el-form-item>
                                              <el-form-item label="商品分类："><span>{{ props.row.category }}</span></el-form-item>
                                              <el-form-item label="店铺地址："><span>{{ props.row.address }}</span> </el-form-item>
                                              <el-form-item label="商品描述："> <span>{{ props.row.desc }}</span></el-form-item>
                                              </el-form>
                                          </template>
                                      </el-table-column>

                              <el-table-column label="商品 ID" prop="id"></el-table-column>
                              <el-table-column label="商品名称" prop="name"></el-table-column>
                              <el-table-column label="描述" prop="desc"> </el-table-column>
                              <el-table-column label="操作" prop="desc"> </el-table-column>
                          </el-table>
                          Content
                      </div>
                  </Card>
                </Content>
            <Footer class="layout-footer-center"></Footer>
        </Layout>
     <router-link to="/personal">个人资料</router-link>
        
       
    </div>
</template>

<script>
export default {
   data() {
      return {
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
         restaurants: [],
        state: '',
        timeout:  null
      }
    },
     methods: {
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
         
         
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>

<style>
.search{
    float:right;
}
</style>
