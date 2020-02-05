<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    label是选项显示的内容，value是点击,v-for循环遍历选项
                    <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <!-- P31:应该是:headers="getAuthHeaders()" -->
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    >
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
                 <el-button type="primary" @click="print">打印id</el-button>
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
                model:{},
            }
        },
        methods:{
            //p13:上传图片后后端返回的res，取出它的图片地址
            afterUpload(res){
                //使用Vue内部的方法，直接给数据添加属性
                this.$set(this.model,'icon',res.url)
                //this.model.icon = res.url
            },
            //async与await同用
            print(){
                console.log(this.model);
            },
            async save(){
                //P8：根据有无id执行不同的方法（区分新增和修改）
                //传入请求主体
                if(this.id){//put修改提交请求主体
                    await this.$http.put(`rest/items/${this.id}`,this.model)
                }else{
                //使用封装好的axios实例调用post传数据给数据库
                //本该最后加.then接收后端返回的数据result.data
                //但是此处使用async
                //也是返回res,等同于result.data(类似同步的一种写法但却是异步)
                //const res= 要调用的时候再调用
                await this.$http.post('rest/items',this.model)
                }
                //返回结果之后进行跳转到分类列表
                this.$router.push('/items/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/items/${this.id}`)
                this.model = res.data;
            },
        },
        created(){
            // 使用短路判断是否有id，有id则另外执行新的函数（与别的组件进行区分）
            this.id && this.fetch();
            //console.log(this.id);
        },
        //P8末尾BUG，进入编辑页面后跳转其他路由比如新建路由，data中的数据不会被释放，默认复用导致提交了重复id给后台创建新类型而报错。需要监听跳转路由的时候来清空data
        watch:{
            $route(to,from){
                Object.assign(this.$data, this.$options.data())
            }
        }
    }
</script>

<style>
</style>