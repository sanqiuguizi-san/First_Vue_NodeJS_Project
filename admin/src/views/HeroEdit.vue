<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    label是选项显示的内容，value是点击,v-for循环遍历选项
                    <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-tabs type="border-card" value="skill">
                <el-tab-pane label="基本信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload"
                            >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <!-- P16 select加载的目标（对象还是数组） -->
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <!-- P16 select加载的目标（对象还是数组） -->
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <!-- P16 select加载的目标（对象还是数组） -->
                        <el-select v-model="model.items2" multiple>
                            <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="skill">
                    <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap;margin-top:0.6rem;">
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res=>$set(item,'icon',res.url)"
                                    >
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="小贴士">
                                <el-input v-model="item.tips" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                            </el-form-item>
                                <hr>
                                <hr>
                                <hr>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top:1rem">
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
                categories:[],
                items:[],
                model:{
                    name:'',
                    avatar:'',
                    scores:{
                        difficult:0,
                        skills:0,
                        attack:0,
                        survive:0,
                    },
                    skills:[],
                },
            }
        },
        methods:{
            //p13:上传图片后后端返回的res，取出它的图片地址
            afterUpload(res){
                //使用Vue内部的方法，直接给数据添加属性(显式赋值)
                //this.$set(this.model,'avatar',res.url)
                //当model中已经定义过，可以直接赋值，建议此方法
                this.model.avatar = res.url
            },
            //async与await同用
            print(){
                console.log(this.model);
            },
            async save(){
                //P8：根据有无id执行不同的方法（区分新增和修改）
                //传入请求主体
                if(this.id){//put修改提交请求主体
                    await this.$http.put(`rest/heroes/${this.id}`,this.model)
                }else{
                //使用封装好的axios实例调用post传数据给数据库
                //本该最后加.then接收后端返回的数据result.data
                //但是此处使用async
                //也是返回res,等同于result.data(类似同步的一种写法但却是异步)
                //const res= 要调用的时候再调用
                await this.$http.post('rest/heroes',this.model)
                }
                //返回结果之后进行跳转到分类列表
                this.$router.push('/heroes/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            //加载当前id英雄的内容
            async fetch(){
                const res = await this.$http.get(`rest/heroes/${this.id}`)
                //P16 因为后面异步传入的model直接覆盖了data中定义好的属性，需要用另外的方法而不是覆盖
                this.model = Object.assign({},this.model, res.data)
            },
            //将分类数据传入定义好的categories空数组中
            async fetchCategories(){
                const res = await this.$http.get(`rest/categories`)
                this.categories = res.data;
            },
            //将分类数据传入定义好的categories空数组中
            async fetchItems(){
                const res = await this.$http.get(`rest/items`)
                this.items = res.data;
            },
        },
        created(){
            //执行将分类传入的异步请求
            this.fetchCategories();
            this.fetchItems();
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
.avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 5rem;
height: 5rem;
line-height: 5rem;
text-align: center;
}
.avatar {
width: 5rem;
height: 5rem;
display: block;
}
</style>