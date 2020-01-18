<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>新增广告</el-button>
                <el-row type="flex" style="flex-wrap:wrap;margin-top:0.6rem;">
                    <el-col :md="24" v-for="(item,i) in model.items" :key="i">
                        <el-form-item label="跳转连接(URL)">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图标" style="margin-top:0.6rem;">
                            <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :on-success="res=>$set(item,'image',res.url)"
                                >
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
                        </el-form-item>
                            <hr>
                            <hr>
                            <hr>
                    </el-col>
                </el-row>
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
                model:{
                    items:[]
                },
            }
        },
        methods:{
            async save(){
                //P8：根据有误id执行不同的方法（区分新增和修改）
                //传入请求主体
                if(this.id){//put修改提交请求主体
                    await this.$http.put(`rest/ads/${this.id}`,this.model)
                }else{
                //使用封装好的axios实例调用post传数据给数据库
                //本该最后加.then接收后端返回的数据result.data
                //但是此处使用async
                //也是返回res,等同于result.data(类似同步的一种写法但却是异步)
                //const res= 要调用的时候再调用
                await this.$http.post('rest/ads',this.model)
                }
                //返回结果之后进行跳转到分类列表
                this.$router.push('/ads/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/ads/${this.id}`)
                this.model = Object.assign({},this.model, res.data);
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

<style lang="scss" scoped>

</style>