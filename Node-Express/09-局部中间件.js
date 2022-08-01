const express = require('express')
const app = express()

// 定义中间件函数
const mw1 = (req, res, next) => {
    console.log('调用了局部生效的中间件')
    next()
}

// 定义一个路由
app.get('/', mw1, (req, res) => {
    res.send('Home page.')
})
app.get('/user', (req, res) => {
    res.send('User page.')
})

app.listen(800, () => {
    console.log('http://127.0.0.1:800')
})