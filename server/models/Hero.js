const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{ type:String },
    //保存头像地址
    avatar:{ type:String },
    banner:{ type:String },
    title:{ type:String },
    categories:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Category' },],
    scores:{
        difficult:{ type:Number },
        skills:{ type:Number },
        attack:{ type:Number },
        survive:{ type:Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: { type: String },
        cost: { type: String },
        description: { type: String },
        tips: { type: String },
      }],
    items1:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Item' }],
    items2:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Item' }],
    usageTips:{ type:String },
    battleTips:{ type:String },
    teamTips:{ type:String },
    partners:[{
        hero: {type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{ type:String },
    }],
})


//导出mongoose的模型，何处需要用就哪里引用
module.exports = mongoose.model('Hero',schema, 'heroes')