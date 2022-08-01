## Express 基本定义与使用

[Express中文网](https://www.expressjs.com.cn/)

- Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架
- Express 是用于快速创建web服务器或API接口服务器的第三方模块

### 安装

```npm
npm i express@4.17.1
```

### 创建基本的 web 服务器

```javascript
// 导入 express
const express = require('express')
// 创建 web 服务器
const app = express()
// 启动 web 服务器
app.listen(800, () => {
    console.log('express server running at http://127.0.0.1:800')
})
```

### 监听 GET 请求

通过 app.get() 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

```javascript
app.get('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
    res.send({
        name: 'zs',
        age: 20,
        gender: '男'
    })
```

>参数1：客户端请求的 URL 地址
>
>参数2：请求对应的处理函数
>
>- req：请求对象（包含了与请求相关的属性与方法）
>- res：响应对象（包含了与响应相关的属性与方法）

### 监听 POST 请求

通过 app.post() 方法，可以监听客户端的 POST 请求，具体的语法格式如下：

```javascript
app.post('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个文本字符串
    res.send('请求成功')
})
```

>参数1：客户端请求的 URL 地址
>
>参数2：请求对应的处理函数
>
>- req：请求对象（包含了与请求相关的属性与方法）
>- res：响应对象（包含了与响应相关的属性与方法）

### 把内容响应给客户端

通过 res.send() 方法，可以把处理好的内容，发送给客户端：

```javascript
// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
    res.send({
        name: 'zs',
        age: 20,
        gender: '男'
    })
})
app.post('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个文本字符串
    res.send('请求成功')
})
```

### 获取 URL 中携带的查询参数

通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：

```javascript
app.get('/', (req, res) => {
    //通过 req.query 可以获取到客户端发送过来的查询参数
    // 默认情况下，req.query 是一个空对象
    console.log(req.query)
    res.send(req.query)
})
```

### 获取 URL 中的动态参数

通过 req.params 对象，可以访问到 URL 中，通过 : 匹配到的动态参数：

```javascript
// 这里的 :id 是一个动态参数
app.get('/user/:id', (req, res) => {
    // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
    console.log(req.params)
    req.send(req.params)
})
```

## 托管静态资源

### express.static()

express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器，例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```javascript
// 调用 express.static() 方法，快速的对外提供静态资源
app.use(express.static('./clock'))
```

现在就可以访问public目录中的所有文件了：

```
http://localhost:3000/images/bg.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/login.js
```

>注意：
>
>Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在 URL 中

### 托管多个静态资源目录

如果要托管多个静态资源目录，请多次调用 express.static() 函数：

```javascript
// 调用 express.static() 方法，快速的对外提供静态资源
app.use(express.static('./clock'))
app.use(express.static('./files'))
```

>访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件

### 挂载路径前缀

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```javascript

```

现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：

```
http://localhost:3000/public/images/kitten.jpg
http://localhost:3000/public/css/style.css
http://localhost:3000/public/js/app.js
```

## nodemon

作用：

- 在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐


- 现在，我们可以使用 nodemon（https://www.npmjs.com/package/nodemon） 这个工具，它能够监听项目文件的变动，当代码被修改后，nodemon 会自动帮我们重启项目，极大方便了开发和调试

### 安装

在终端中，运行如下命令，即可将 nodemon 安装为全局可用的工具：

```npm
npm install -g nodemon
```

### 使用 nodemon

将 node 命令替换为 nodemon 命令，使用 nodemon app.js 来启动项目。使得代码被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果

```npm
node 1.js
nodemon 1.js
//若无法使用nodemon，管理员权限打开终端输入：set-ExecutionPolicy RemoteSigned 之后按Y
```

## Express 路由

- 在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系
- 每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数
- 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理
- 理解：打电话给运营商客服，按下1到0的键对应不同服务，这种按键和服务绑定的映射关系，就叫路由

Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下：

```javascript
app.METHOD(PATH, HANDLER)
```

>路由匹配的注意点：
>
>①按照定义的先后顺序进行匹配
>
>②请求类型和请求的URL同时匹配成功，才会调用对应的处理函数

### 最简单的用法

```javascript
// 导入 express
const express = require('express')
// 创建 web 服务器，命名为 app
const app = express()

// 挂载路由
app.get('/', (req, res) => {
    res.send('hello world.')
})
app.post('/', (req, res) => {
    res.send('Post Request.')
})

// 启动 web 服务器
app.listen(800, () => {
    console.log('express server running at http://127.0.0.1:800')
})
```

### 模块化路由

为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块

将路由抽离为单独模块的步骤如下：

​	①创建路由模块对应的 .js文件

​	②调用 express.Router()函数创建路由对象

​	③向路由对象上挂载具体的路由

​	④使用 module.exports 向外共享路由对象

​	⑤使用 app.use()函数注册路由模块

### 创建路由模块

```javascript
// router.js文件是路由模块
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 挂载具体的路由
router.get('/user/list', (req, res) => {
    res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
    res.send('Add new user.')
})

// 向外导出路由对象
module.exports = router
```

### 注册路由模块

```javascript
// 导入路由模块
const router = require('./05-router')
// 注册路由模块
app.use(router)
// app.user() 函数的作用，就是来注册全局中间件
```

### 为路由模块添加前缀

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

```javascript
// '/api', 是统一挂载的访问前缀
app.use('/api', router)
```

## Express 中间件

- 中间件（Middleware ），特指业务流程的中间处理环节

- 当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理

- Express 的中间件，本质上就是一个 function 处理函数，Express 中间件的格式如下：

  ```javascript
  //包含 req, res, next 三个参数，next() 参数把流转关系交给下一个中间件或路由
  const mw = function(req, res, next){
  	next()
  }
  ```

- next 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208012019835.png)

>中间件注意事项：
>
>①一定要在路由之前注册中间件
>
>②客户端发送过来的请求，可以连续调用多个中间件进行处理
>
>③执行完中间件的业务代码之后，不要忘记调用 next() 函数
>
>④为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
>
>⑤连续调用多个中间件时，多个中间件之间，共享req和res对象
>

**定义中间件函数**

```javascript
// 定义一个最简单的中间件函数
const mw = function (req, res, next) {
    console.log('这是最简单的中间件函数')
    // 把流转关系，转交给下一个中间件或路由
    next()
}
```

### 全局中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件
通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件

```javascript
// 定义一个最简单的中间件函数
const mw = function (req, res, next) {
    console.log('这是最简单的中间件函数')
    // 把流转关系，转交给下一个中间件或路由
    next()
}

// 将 mw 注册为全局生效的中间件
app.use(mw)
```

**定义全局中间件的简化形式**

```javascript
// 定义全局中间件的简化形式
app.use((req, res, next) => {
    console.log('这是最简单的中间件函数')
    next()
})
```

**中间件的作用**

多个中间件之间，共享同一份 req 和 res。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208012019836.png)

```javascript
app.use((req, res, next) => {
    // 获取到请求到达服务器的时间
    const time = Date.now()
    // 为 req 对象挂载自定义属性，从而把时间共享给后面的所有路由
    req.startTime = time
    next()
})

app.get('/', (req, res) => {
    res.send('Home page.' + req.startTime)
})

app.get('/user', (req, res) => {
    res.send('User page.' + req.startTime)
})
```

**定义多个全局中间件**

可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用

```javascript
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

```

### 局部中间件

不使用 app.use() 定义的中间件，叫做局部生效的中间件

```javascript
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
```

**定义多个局部中间件**

可以在路由中，通过如下两种等价的方式，使用多个局部中间件：

```javascript
app.get('/', mw1, mw2, (req, res) => {
    res.send('Home page.')
})
app.get('/', [mw1, mw2], (req, res) => {
    res.send('Home page.')
})
```

## 中间件分类

为了方便大家理解和记忆中间件的使用，Express官方把常见的中间件用法，分成了 5 大类，分别是：

​	① 应用级别的中间件

​	② 路由级别的中间件

​	③ 错误级别的中间件

​	④ Express 内置的中间件

​	⑤ 第三方的中间件

### 应用级别的中间件

通过 `app.use()` 或 `app.get()` 或 `app.post()` ，绑定到 app 实例上的中间件，叫做应用级别的中间件

```javascript
// 应用级别的中间件 (全局中间件)
app.use((req, res, next) => {
    next()
})
// 应用级别的中间件 (局部中间件)
app.get('/', mw1, (req, res) => {
    res.send('Home page.')
})
```

### 路由级别的中间件

- 绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件
- 用法和应用级别中间件没有区别，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上

```javascript
const app = express()
const router = express.Router()

router.use(function (req, res, next) {
    console.log(1)
    next()
})

app.use('/', router)
```

### 错误级别的中间件

- 作用：用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
- 格式：错误级别中间件的处理函数中，必须有 4 个形参，形参顺序从前到后分别是 (err, req, res, next)
- 注意：错误级别的中间件必须注册在所有路由之后，否则无法捕获路由抛出的错误

```javascript
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 定义路由
app.get('/', (req, res) => {
    // 人为的制造错误
    throw new Error('服务器内部发生了错误')
    res.send('Home page.')
})

// 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
    console.log('发生了错误！' + err.message)
    res.send('Error:' + err.message)
})

// 启动服务器
app.listen(800, () => {
    console.log('Express server running at http://127.0.0.1:800')
})
```

### Express 内置的中间件

错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)

- express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
- express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
- express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```javascript
// 配置解析 application/json 格式数据的内置中间件
app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }))
```

**演示express.json 和 express.urlencoded**

```javascript
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件，解析爆弹中的 JSON 格式的数据
app.use(express.json())
// 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
    // 在服务器里可以使用 req.body 这个属性，来接受客户端发送过来的请求体数据
    // 默认情况下，如果不配做解析表单数据的中间件，则 req.body 默认等于 undefined
    console.log(req.body)
    res.send('ok')
})

app.post('/book', (req, res) => {
    // 在服务器里可以通过 req.body 来获取 JSON 格式的表单数据和 url-encoded 格式的数据
    console.log(req.body)
    res.send('ok')
})

// 启动服务器
app.listen(800, () => {
    console.log('Express server running at http://127.0.0.1:800')
})
```

### 第三方的中间件

非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率

- 例如：在express@4.16.0之前的版本中，经常使用body-parser这个第三方中间件，来解析请求体数据。使用步骤如下：

  ①运行 npm install body-parser安装中间件

  ②使用 require 导入中间件

  ③调用 app.use()注册并使用中间件

>注意：
>
>Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的

## 自定义中间件

自己手动模拟一个类似于express.urlencoded这样的中间件，来解析 POST 提交到服务器的表单数据

实现步骤：

​	①定义中间件

​	②监听 req的data事件

​	③监听 req的end事件

​	④使用 querystring模块解析请求体数据

​	⑤将解析出来的数据对象挂载为 req.body

​	将自定义中间件封装为模块

### 定义中间件

使用 app.use() 来定义全局生效的中间件

```javascript
// 这是解析表单数据的中间件
app.use((req, res, next) => {
    // 定义中间件具体的业务逻辑
})
```

### 监听 req 的 data 事件

- 在中间件中，需要监听req对象的data事件，来获取客户端发送到服务器的数据
- 如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以 data事件可能会触发多次，每一次触发data事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接

```javascript
// 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
let str = ''
// 监听 req 的 data 事件
req.on('data', (chunk) => {
    str += chunk
})
```

### 监听 req 的 end 事件

- 当请求体数据接收完毕之后，会自动触发 req 的 end 事件
- 因此，我们可以在 req 的 end 事件中，拿到并处理完整的请求体数据

```javascript
// 监听 req 的 end 事件
req.on('end', () => {
    // 在 str 中存放的是完整的请求体数据
    console.log(str)
    // TODO: 把字符串格式的请求体数据，解析成对象格式
})
```

### 使用 querystring 模块解析请求体数据

Node.js 内置了一个 querystring 模块，专门用来处理查询字符串。通过这个模块提供的 parse() 函数，可以轻松把查询字符串，解析成对象的格式

```javascript
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')
// 调用qs.parse() 方法，把查询字符串解析为对象
const body = qs.parse(str)
```

### 将解析出来的数据对象挂载为 req.body

上游的中间件和下游的中间件及路由之间，共享同一份 req 和 res。因此，我们可以将解析出来的数据，挂载为 req 的自定义属性，命名为 req.body，供下游使用

```javascript
// 监听 req 的 end 事件
req.on('end', () => {
    // 在 str 中存放的是完整的请求体数据
    // console.log(str)
    // TODO: 把字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str)
    req.body = body
    next()
})
```

### 将自定义中间件封装为模块

为了优化代码的结构，我们可以把自定义的中间件函数，封装为独立的模块

```javascript
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')


const bodyParser = (req, res, next) => {
    // 定义中间件具体的业务逻辑
    // 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str = ''
    // 监听 req 的 data 事件
    req.on('data', (chunk) => {
        str += chunk
    })
    // 监听 req 的 end 事件
    req.on('end', () => {
        // 在 str 中存放的是完整的请求体数据
        // console.log(str)
        // TODO: 把字符串格式的请求体数据，解析成对象格式
        const body = qs.parse(str)
        req.body = body
        next()
    })
}

module.exports = bodyParser

--------------分割线-------------------

// 导入自己封装的中间件模块
const customBodyParser = require('./16-custom-body-parser')
// 将自定义的中间件函数，注册为全局可用的中间件
app.use(customBodyParser)
```

## 使用 Express 写接口

### 创建基本的服务器

```javascript
// 导入 express
const express = require('express')
// 创建服务器实例
const app = express()

// 启动服务器
app.listen(800, () => {
    console.log('Express server running at http://127.0.0.1:800')
})
```

### 创建 API 路由模块

```javascript
// apiRouter.js (路由模块)
const express = require('express')
const router = express.Router()

// 在这里挂载对应的路由

module.exports = router

// app.js (导入并注册路由模块)
// 导入路由模块
const router = require('./18-apiRouter')
// 把路由模块，注册到 app 上
app.use('/api', router)
```

### 编写 GET 接口

```javascript
router.get('/get', (req, res) => {
    // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query
    // 调用 res.send() 方法，向客户端响应处理的结果
    res.send({
        status: 0, // 0 表示处理成功, 1 表示处理失败
        msg: 'GET 请求成功！', // 状态的描述
        data: query // 需要响应给客户端的数据
    })
})
```

### 编写 POST 接口

```javascript
// 定义 POST 接口
router.post('/post', (req, res) => {
    // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
    const body = req.body
    // 调用 res.send() 方法，向客户端响应结果
    res.send({
        status: 0, // 0 表示处理成功, 1 表示处理失败
        msg: 'POST 请求成功！', // 状态的描述
        data: body // 需要响应给客户端的数据
    })
})
```

>注意：
>
>如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))

### CORS 跨域资源共享

**接口的跨域问题**

刚才编写的 GET 和 POST接口，存在一个很严重的问题：不支持跨域请求
解决接口跨域问题的方案主要有两种：

- CORS（主流的解决方案，推荐使用）
- JSONP（有缺陷的解决方案：只支持 GET 请求）

**使用 cors 中间件解决跨域问题**

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题
使用步骤分为如下 3 步：

- 运行 npm install cors 安装中间件
- 使用 const cors = require('cors') 导入中间件
- 在路由之前调用 app.use(cors()) 配置中间件

**CORS**

- CORS（Cross-Origin Resource Sharing，跨域资源共享）解决跨域，是通过 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源
- 浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可解除浏览器端的跨域访问限制
- CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口
- CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）

**CORS 响应头部 - Access-Control-Allow-Origin** 

响应头部中可以携带一个 Access-Control-Allow-Origin 字段

```javascript
Access-Control-Allow-Origin: <origin> | *
```

其中，origin 参数的值指定了允许访问该资源的外域 URL

例如，下面的字段值将只允许来自 http://itcast.cn 的请求：

```javascript
res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn')
```

如果指定了 Access-Control-Allow-Origin 字段的值为通配符 *，表示允许来自任何域的请求

```javascript
res.setHeader('Access-Control-Allow-Origin', '*')
```

**CORS 响应头部 - Access-Control-Allow-Headers**

- 默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
- 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败

```javascript
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')
```

**CORS 响应头部 - Access-Control-Allow-Methods**

- 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。
- 如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Allow-Methods来指明实际请求所允许使用的 HTTP 方法

```javascript
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
res.setHEader('Access-Control-Allow-Methods', '*')
```

**CORS请求的分类**

客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类，分别是：

- 简单请求
- 预检请求

**简单请求**

同时满足以下两大条件的请求，就属于简单请求：

- 请求方式：GET、POST、HEAD 三者之一
- HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）

**预检请求**

只要符合以下任何一个条件的请求，都需要进行预检请求：

- 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
- 请求头中包含自定义头部字段
- 向服务器发送了 application/json 格式的数据
- 在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据

**简单请求和预检请求的区别**

- 简单请求的特点：客户端与服务器之间只会发生一次请求
- 预检请求的特点：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求

### JSONP 接口

浏览器端通过 script 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP

特点：

- JSONP 不属于真正的 Ajax 请求，因为它没有使用XMLHttpRequest 这个对象。
- JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求

**创建 JSONP 接口的注意事项**

如果项目中已经配置了 CORS 跨域资源共享，为了防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口

```javascript
// 必须在配置 cors 中间件之前，配置 JSONP 的接口
app.get('/api/jsonp', (req, res) => {
    // TODO: 定义 JSONP 接口具体的实现过程
})
```

**实现 JSONP 接口的步骤**

​	①获取客户端发送过来的回调函数的名字

​	②得到要通过JSONP形式发送给客户端的数据

​	③根据前两步得到的数据，拼接出一个函数调用的字符串

​	④把上一步拼接得到的字符串，响应给客户端的 script 标签进行解析执行

**实现 JSONP 接口的具体代码**

```javascript
// 必须在配置 cors 中间件之前，配置 JSONP 的接口
app.get('/api/jsonp', (req, res) => {
    // TODO: 定义 JSONP 接口具体的实现过程
    // 获取客户端发送过来的回调函数的名字
    const funcName = req.query.callback
    // 定义要发送到客户端的数据对象
    const data = {name: 'zs', age: 22}
    // 拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 把拼接的字符串响应给客户端
    res.send(scriptStr)
})
```

**在网页中使用 jQuery 发起 JSONP 请求**

调用 $.ajax() 函数，提供 JSONP 的配置选项，从而发起 JSONP 请求

```javascript
// 为 JSONP 按钮绑定点击事件处理函数
$('#btnJSONP').on('click', function () {
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:800/api/jsonp',
        dataType: 'jsonp',
        success: function (res) {
            console.log(res)
        }
    })
})
```

