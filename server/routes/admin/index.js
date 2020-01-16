//admin的分类接口，为了不扎堆将接口设定放在主index中而设置的
//函数接收一个参数：app对象（服务器对象）
//注意exports不要打错，是定义给主index的函数
module.exports = app =>{
    //此处放入的是express在admin的子路由
    //进行admin的增删改查
    const express = require('express')
    const router = express.Router({
        //添加一个参数，使得底部父级路由的url可以合并到子接口中的url中进行调用，否则内部是无法访问app.use中定义的参数resource的。也就无法根据地址导入模型
        mergeParams:true
    })
    //引入mongoose的数据库模型
    //P11:crud通用接口，每个类型都是不一样的模型，所以删除这个固定模型。
    //const Category = require('../../models/Category')
    
    //此处开始admin端的路由编写
    //使用了async
    //创建分类的接口对应CategoryEdit
    //传入新分类名并在数据库新建分类
    router.post('/',async(req,res)=>{

        //创建数据，数据来源是客户端传过来的
        //数据库模型Category需要接收这个数据
        //req.body想要使用需要加await,async的用法
        //需要在主index中加入中间件
        //将数据库的json接收，并根据模块定义，转换为字符串类型保存起来
        const model = await req.Model.create(req.body)
        //将模块发送回客户端
        res.send(model)
    })
    //根据修改页面的URL（包含id）找到修改接口
    router.put('/:id',async(req,res)=>{
        const model =await req.Model.findByIdAndUpdate(req.params.id,req.body)
        //将模块发送回客户端
        res.send(model);
    })
    //根据列表页面id进行删除分类
    router.delete('/:id',async(req,res)=>{
        //仅执行删除并返回消息
        //根据传入的id修改
         await req.Model.findByIdAndDelete(req.params.id,req.body)
        //将模块发送回客户端
        res.send({
            success:true
        });
    })
    //列表页的接口对应CategoryList,获取分类列表
    router.get('/',async(req,res)=>{
        //P11:因为这个父子字段可能不是所有类型都需要，所以需要设置逻辑判断
        //setOptions设置查询选项内容
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        //从数据库中找到数据，限制10条或之定义
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //分类页跳转编辑，加载初始数据，传入的是某个id,进入其详细编辑页面
    router.get('/:id',async(req,res)=>{
        //从数据库中找到数据，限制10条或之定义
        const model = await req.Model.findById(req.params.id)
        res.send(model);
    })

    //挂载到路由上
    //p11:crud通用接口,此处resource是前端传过来的分类名
    app.use('/admin/api/rest/:resource',
    //插入一个中间件表示通用的模块导入
    async(req,res,next)=>{
        //P11：通用数据库模型导入，因为直接传入的是categories，需要将第一个字母改大写地址同时改单数才正确
        const modelName = require('inflection').classify(req.params.resource)
        //req.Model给req对象中挂载一个属性Model时需要导入的模型，这样接口中就自动放入了模型导入
        req.Model = require(`../../models/${modelName}`);
        //异步，当处理完函数内内容才执行next()放入路由router
        next();
    },router)

    //导入文件上传数据处理依赖
    //设定图片上传后保存的地址
    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})
    //在接口中加入中间件接收处理前端给的单文件file，保存好
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        //将图片url地址拼好返回给前端异步显示,因为file中是没有url这个属性的
        //模板字符串动态更新file中的filename
        file.url = `http://localhost:3000/uploads/${file.filename}`
        //将file传入到req中添加这个参数（属性，前端可以调用其中地址来显示图片
        res.send(file)
    })
}
