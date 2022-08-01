const express = require('express')
const app = express()

// 导入路由模块
const router = require('./05-router')
// 注册路由模块
app.use('/api', router)
// app.user() 函数的作用，就是来注册全局中间件


app.listen(800, () => {
    console.log('express server running at http://127.0.0.1:800')
})