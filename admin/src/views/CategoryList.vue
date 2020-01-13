<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="items">
      <!-- 此处的prop和label要去elementUI看看作用 -->
        <el-table-column prop="_id" label="ID" width="230">
        </el-table-column>
        <el-table-column prop="name" label="分类名称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"> 
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <!-- 使用模板字符串和插槽组件获取本行id ,地址前加上斜杠从根目录开始-->
            <el-button type="primary" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
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
      const res = await this.$http.get('categories')
      this.items = res.data
    }
  },
  created(){
    //组件默认进来之后做什么事情create,自动显示数据
    this.fetch()
  },
}
</script>

