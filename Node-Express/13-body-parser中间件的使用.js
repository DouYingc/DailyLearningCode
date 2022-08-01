// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')
// 使用 app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
    // 如果没有配置任何解析表单数据的中间件，则 req.body 默认 = undefined
    console.log(req.body)
    res.send('ok')
})

// 启动服务器
app.listen(800, () => {
    console.log('Express server running at http://127.0.0.1:800')
})

