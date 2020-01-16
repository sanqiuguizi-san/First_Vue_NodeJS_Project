<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <!-- 此处的prop和label要去elementUI看看作用 -->
      <!-- p13:还有插槽的作用，显示items本行的数据 -->
        <el-table-column prop="_id" label="ID" width="230">
        </el-table-column>
        <el-table-column prop="name" label="英雄名称">
        </el-table-column>
        <el-table-column prop="title" label="称号">
        </el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" style="height:3rem">
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"> 
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <!-- 使用模板字符串和插槽组件获取本行id ,地址前加上斜杠从根目录开始-->
            <el-button type="primary" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items:[]
    }
  },
  methods:{
    async fetch(){
      //此处调用了res调用它然后返回items到页面中
      const res = await this.$http.get('rest/heroes')
      this.items = res.data
    },
    //P12根据id删除英雄列表中的分类
    async remove(row){
       this.$confirm(`是否确认要删除英雄"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          //注意await外一定要配套async
          const res = await this.$http.delete(`rest/heroes/${row._id}`)
          this.$message({
            //确认删除后，请求删除接口
            type: 'success',
            message: '删除成功!'
          });
          //删除后重新加载列表
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },
  created(){
    //组件默认进来之后做什么事情create,自动显示数据
    this.fetch()
  },
}
</script>

