<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props:{
            id:{}
        },
        data(){
            return{
                model:{}
            }
        },
        methods:{
            //async与await同用
            async save(){
                //使用封装好的axios实例调用post传数据给数据库
                //本该最后加.then接收后端返回的数据result.data
                //但是此处使用async
                //也是返回res,等同于result.data(类似同步的一种写法但却是异步)
                //const res= 要调用的时候再调用
                await this.$http.post('categories',this.model)
                //返回结果之后进行跳转到分类列表
                this.$router.push('/categories/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res = await this.$http.get(`categories/${this.id}`)
                this.model = res.data;
                // console.log(typeof(this.model));
            },
        },
        created(){
            // 使用短路判断是否有id，有id则另外执行新的函数（与别的组件进行区分）
            this.id && this.fetch();
        }
    }
</script>

<style lang="scss" scoped>

</style>