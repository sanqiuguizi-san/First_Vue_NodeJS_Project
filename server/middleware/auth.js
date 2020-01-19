//参数可有可无，看后面需不需要而定，反正可以不用
//将方法写成一个函数，在内部写方法，想调用就调用，很方便
module.exports = options =>{
    //函数返回一个异步函数，就是我们的token校验中间件
    //P29：token登录校验判断中间件
    return async(req,res,next)=>{

        //引入jsonwebtoken
        const jwt =require('jsonwebtoken')
        //引入http-assert报错模块依赖
        const assert =require('http-assert')
        //引入用户信息数据库模块,P29注意路径
        const AdminUser = require('../models/AdminUser')

        //P27：服务端验证路由:添加异步中间件函数，对token进行判断是否登录
        //获取到前端给与的请求头属性，判空，再用空格分隔，拿到后面的token
        const token = String(req.headers.authorization || '').split(' ').pop()
        //将获取的密文解密，正确后才解构得到中间的id，之后进行查询
        //P28:此时还需要判断token是否为空，否则报错
        assert(token,401,'请提供jwt.token')
        const { id } = jwt.verify(token,req.app.get('secret'))
        //进行查询，如果id不存在或者id直接无效
        assert(id,401,'无效的jwt.token')
        req.user = await AdminUser.findById(id)
        //如果req.user存在，则继续执行，否则报错
        assert(req.user,401,'用户不存在')
        //如果中间件处理完毕，就执行后面的异步方法
        await next()
    }
}