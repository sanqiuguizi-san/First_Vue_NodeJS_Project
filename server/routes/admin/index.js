//admin的分类接口，为了不扎堆将接口设定放在主index中而设置的
//函数接收一个参数：app对象（服务器对象）
//注意exports不要打错，是定义给主index的函数
module.exports = app =>{
    //此处放入的是express在admin的子路由
    //进行admin的增删改查
    const express = require('express')
    //引入jsonwebtoken
    const jwt =require('jsonwebtoken')

    //导入密码加密依赖
    const bcrypt = require('bcryptjs')

    //引入http-assert报错模块依赖
    const assert =require('http-assert')
    //引入用户信息数据库模块
    const AdminUser = require('../../models/AdminUser')
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

    
    //P29：token登录校验判断中间件
    const authMiddleware = require('../../middleware/auth')

    //插入一个表示通用的模块导入的中间件
    const resourceMiddleware = require('../../middleware/resource')

    //挂载到路由上
    //p11:crud通用接口,此处resource是前端传过来的分类名
    //P29:添加登录校验中间件函数去调用,模块组件也简化为中间件
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)

    //导入文件上传数据处理依赖
    //设定图片上传后保存的地址
    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})
    //在接口中加入中间件接收处理前端给的单文件file，保存好
    app.post('/admin/api/upload',upload.single('file'), 
    //P29添加登录校验中间件authMiddleware
    authMiddleware(),async(req,res)=>{
        const file = req.file
        //将图片url地址拼好返回给前端异步显示,因为file中是没有url这个属性的
        //模板字符串动态更新file中的filename
        file.url = `http://localhost:3000/uploads/${file.filename}`
        //将file传入到req中添加这个参数（属性，前端可以调用其中地址来显示图片
        res.send(file)
    })

    //P25:登录路由及jwt授权
    app.post('/admin/api/login',async(req,res)=>{
        const { username, password } = req.body
        //ES语法根据用户名找用户,当对象内键和值相同，可以直接写成一个
        //返回一个用户对象，包含其所有属性
        //
        const user = await AdminUser.findOne({username}).select('+password')
        //如果没有这个用户,P28:使用assert暴力抛出错误err
        //包含了状态码和message
        //当第一个参数是满足的就不执行后面的报错
        assert(user,422,'用户名不存在');
        
        //P26:校验密码(若用户存在),比较明文和密文是否匹配(明文,密文)
        //返回布尔值
        const isValid = bcrypt.compareSync(password,user.password);
        assert(isValid,422,'密码错误');

        //返回token  安装npm i jsonwebtoken
        //生成token,(第一个参数，保存一些数据，会散列进行加密)
        //第二个是全局秘钥(app中定义好)，单一参数的get是获取app配置
        const token = jwt.sign({id: user._id},app.get('secret'))
        //此时返回的token是加密的用户信息，如果单独想要获取用户名等信息需要在对象中再加。
        //因为token返回值不是对象，要封进去，如果还想加东西，就另外再写接口咯，懒2333
        res.send({token});
    })

    //错误处理中间件
    app.use(async(err,req,res,next)=>{
        //console.log(err);
        //接收assert抛出的err中的status,没有指定的状态码的话返回500
        //因为可能存在别的状态码
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}
