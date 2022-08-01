// 导入 express 模块
const express = require('express')
const { Chunk } = require('webpack')
// 创建 express 的服务器实例
const app = express()


// 导入自己封装的中间件模块
const customBodyParser = require('./16-custom-body-parser')
// 将自定义的中间件函数，注册为全局可用的中间件
app.use(customBodyParser)

app.post('/user', (req, res) => {
    res.send(req.body)
})

// 启动服务器
app.listen(800, () => {
    console.log('Express server running at http://127.0.0.1:800')
})
