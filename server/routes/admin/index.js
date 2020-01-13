//admin的分类接口，为了不扎堆将接口设定放在主index中而设置的
//函数接收一个参数：app对象（服务器对象）
//注意exports不要打错，是定义给主index的函数
module.exports = app =>{
    //此处放入的是express在admin的子路由
    //进行admin的增删改查
    const express = require('express')
    const router = express.Router()
    //引入mongoose的数据库模型
    const Category = require('../../models/Category')

    //此处开始admin端的路由编写
    //使用了async
    //创建分类的接口对应CategoryEdit
    router.post('/categories',async(req,res)=>{
        //创建数据，数据来源是客户端传过来的
        //数据库模型Category需要接收这个数据
        //req.body想要使用需要加await,async的用法
        //需要在主index中加入中间件
        //将数据库的json接收，并根据模块定义，转换为字符串类型保存起来
        const model = await Category.create(req.body)
        //将模块发送回客户端
        res.send(model)
    })
    //列表页的接口对应CategoryList
    router.get('/categories',async(req,res)=>{
        //从数据库中找到数据，限制10条或之定义
        const items = await Category.find().limit(10)
        res.send(items)
    })
    //分类页跳转编辑，加载初始数据，传入的是某个id,进入其详细编辑页面
    router.get('/categories/:id',async(req,res)=>{
        //从数据库中找到数据，限制10条或之定义
        //
        const model = await Category.findById(req.params.id)
        res.send(model);
    })

    //
    //挂载到路由上
    app.use('/admin/api',router)
}
