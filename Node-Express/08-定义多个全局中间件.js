const express = require('express')
const app = express()

// 定义第一个全局中间件
app.use((req, res, next) => {
    console.log('这是第一个全局中间件')
    next()
})

// 定义第二个全局中间件
app.use((req, res, next) => {
    console.log('这是第二个全局中间件')
    next()
})

// 定义一个路由
app.get('/user', (req, res) => {
    res.send('User page.')
})


app.listen(800, () => {
    console.log('http://127.0.0.1:800')
})