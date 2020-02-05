const express = require("express")

const app = express()

//设置后端全局秘钥，但是此处是为了简化，实际会放在环境变量而不是代码中
app.set('secret','sanqiuguizi')

//中间件
//跨域中间件cors(此处没有设定变量，直接使用了)
app.use(require('cors')())
//express中内置的的json中间件
//涉及async、await异步中间件
app.use(express.json())

//托管静态文件（上传图片资源）可以直接使用uploads路径访问其下所有资源
app.use('/uploads',express.static(__dirname + '/uploads'))

//引入MongoDB数据库
//此处直接进入db.js（js后缀貌似可以省略）
require('./plugins/db')(app)

//从admin的路由文件夹下获取地址，引用进最大路由js中
//引用过来是个函数，需要执行同时将app参数传入过去
//require直接寻找目录下的package指定的main文件,一般是文件下的index
//现指"index.js"
require('./routes/admin')(app)
//引入web端路由文件
require('./routes/web')(app)

//创建服务器和监听端口
app.listen(3000,()=>{
    console.log('http://localhost:3000');
});