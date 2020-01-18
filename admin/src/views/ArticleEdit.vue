<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <!-- label是选项显示的内容，value是点击,v-for循环遍历选项 -->
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="文章详情">
                <vue-editor  v-model="model.body" useCustomImageHandler  @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //p20：导入富文本编辑器
    import { VueEditor } from 'vue2-editor'
    export default {
        props:{
            id:{}
        },
        data(){
            return{
                model:{},
                categories:[]
            }
        },
        //导入文本框子组件
        components: { VueEditor },
        methods:{
            //富文本编辑器内部的图片上传效果方法，自行修改为上传后台地址
            //写成async await的异步方法
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                //此处上传文件需要提交表单数据,将富文本编辑器生成的file保存到表单中
                const formData = new FormData();
                //字段修改，前端返回给后台的Form Data键浏览器默认为"file"
                formData.append("file", file);
                
                //编写调用上传图片接口的方法，传出的数据是formdata
                const res =await this.$http.post('upload',formData)
                //此时后端返回res中包含有res.url,使用该url传入到编辑器中
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            },
            async save(){
                //P8：根据有误id执行不同的方法（区分新增和修改）
                //传入请求主体
                if(this.id){//put修改提交请求主体
                    await this.$http.put(`rest/articles/${this.id}`,this.model)
                }else{
                //使用封装好的axios实例调用post传数据给数据库
                //本该最后加.then接收后端返回的数据result.data
                //但是此处使用async
                //也是返回res,等同于result.data(类似同步的一种写法但却是异步)
                //const res= 要调用的时候再调用
                await this.$http.post('rest/articles',this.model)
                }
                //返回结果之后进行跳转到分类列表
                this.$router.push('/articles/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/articles/${this.id}`)
                this.model = res.data;
            },
            async fetchCategories(){
                const res = await this.$http.get(`rest/categories`)
                this.categories = res.data;
            },
        },
        created(){
            // 使用短路判断是否有id，有id则另外执行新的函数（与别的组件进行区分）
            this.fetchCategories();
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

<style lang="scss" scoped>

</style>