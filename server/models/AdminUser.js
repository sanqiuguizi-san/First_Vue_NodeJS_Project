const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username:{ type:String },
    //设置方法将明文转为密文再保存到数据库
    password:{ 
        type:String, 
        //查询时不返回该字段到res中
        select:false,
        set(val){
            return require('bcryptjs').hashSync(val,10)
        }
    },
})


//导出mongoose的模型，何处需要用就哪里引用
module.exports = mongoose.model('AdminUser',schema)