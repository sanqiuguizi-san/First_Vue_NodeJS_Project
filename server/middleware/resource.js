//参数可有可无，看后面需不需要而定，反正可以不用
//将方法写成一个函数，在内部写方法，想调用就调用，很方便
module.exports = options =>{
    //P29：将增删改查前增加个模块导入中间件放入，记得修改地址
    return async(req,res,next)=>{
        //P11：通用数据库模型导入，因为直接传入的是categories，需要将第一个字母改大写地址classify同时改单数才正确
        const modelName = require('inflection').classify(req.params.resource)
        //req.Model给req对象中挂载一个属性Model时需要导入的模型，这样接口中就自动放入了模型导入,记得修改地址
        req.Model = require(`../models/${modelName}`);
        //异步，当处理完函数内内容才执行next()放入路由router
        next();
    }
}