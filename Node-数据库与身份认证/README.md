## 数据库的基本概念

市面上的数据库有很多种，最常见的数据库有如下几个：

- MySQL数据库（目前使用最广泛、流行度最高的开源免费数据库；Community +Enterprise）
- Oracle 数据库（收费）
- SQL Server 数据库（收费）
- Mongodb 数据库（Community +Enterprise）

>其中，MySQL、Oracle、SQL Server 属于传统型数据库（又叫做：关系型数据库或 SQL 数据库），这三者的设计理念相同，用法比较类似
>
>而Mongodb属于新型数据库（又叫做：非关系型数据库 或 NoSQL 数据库），它在一定程度上弥补了传统型数据库的缺陷。

## MySQL 的基本使用

### 使用 MySQL Workbench 管理数据库

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208031626998.png)

**创建数据库**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208031629705.png)

**创建数据表**

![](C:\Users\Sasha\Documents\202208031629191.png)

DataType 数据类型：

- int 整数
- varchar(len) 字符串
- tinyint(1) 布尔值

字段的特殊标识：

- PK（Primary Key）主键、唯一标识
- NN（Not Null）值不允许为空
- UQ（Unique）值唯一
- AI（Auto Increment）值自动增长

**向表中写入数据**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208031631373.png)

### 使用 SQL 管理数据库

SQL（英文全称：Structured Query Language）是结构化查询语言，专门用来访问和处理数据库的编程语言。能够让我们以编程的形式，操作数据库里面的数据

三个关键点：

- SQL 是一门数据库编程语言
- 使用 SQL语言编写出来的代码，叫做SQL 语句
- SQL 语言只能在关系型数据库中使用（例如 MySQL、Oracle、SQL Server）。非关系型数据库（例如Mongodb）不支持SQL语言

### SQL 的 SELECT 语句

SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）

```mysql
-- * 表示选取所有列 
select * from users

-- 多个列之间，用英文逗号，分割
select username, password from users
```

>注意：
>
>SQL 语句中的关键字对大小写不敏感。SELECT等效于 select，FROM 等效于 from

### SQL 的 INSERT INTO 语句

INSERT INTO 语句用于向数据表中插入新的数据行

```mysql
-- 向 user 表中，插入新数据，username 的值为 tony stark，password 的值为 098123
insert into users (username, password) values('tony stark', '098123')
```

### SQL 的 UPDATE 语句

Update 语句用于修改表中的数据

```mysql
-- 将 id 为 4 的用户密码，更新为 888888
update users set password = '888888' where id = 4

-- 更新 id 为 2 的用户，把密码更新为admin123，同时，把用户的状态更新为 1
update users set password = 'admin123', status = 1 where id = 2
```

### SQL 的 DELETE 语句

DELETE 语句用于删除表中的行

```mysql
-- 删除 users 表中， id为 4 的用户
delete from users where id = 4
```

### SQL 的 WHERE 子句

WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准

```mysql
-- 演示 where 子句的使用
select * from users where status = 1
select * from users where id >= 2
select * from users where username != 'ls'
```

**可在 WHERE 子句中使用的运算符**

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208031843297.png)

>注意：
>
>在某些版本的 SQL 中，操作符 <> 可以写为 !=

### SQL 的 AND 和 OR 运算符

- AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。
- AND 表示必须同时满足多个条件，相当于 JavaScript 中的 && 运算符，例如 if (a !== 10 && a !== 20) 
- OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 || 运算符，例如 if(a !== 10 || a !== 20)

```mysql
-- 使用 AND 来显示所有状态为 0 且 id < 3 的用户
select * from users where status = 0 and id < 3

-- 使用 OR 来显示所有状态为 1，或者 username 为 zs 的用户
select * from users where status = 1 or username = 'zs'
```

### SQL 的 ORDER BY 子句

- ORDER BY 语句用于根据指定的列对结果集进行排序。
- ORDER BY 语句默认按照升序对记录进行排序。
- 如果您希望按照降序对记录进行排序，可以使用 DESC 关键字。

```mysql
-- 对 users 表中的数据，按照 status 字段进行升序排序
select * from users order by status

-- 对 users 表中的数据，按照 id 字段进行降序排序
-- desc 表示降序排序，asc 表示升序排序，默认情况下是升序排序
select * from users order by id desc

-- 对 users 表中的数据，先按照 status 字段进行降序排序，再按照 username 的字母顺序，进行升序排序
select * from users order by status desc, username asc
```

### SQL 的 COUNT(*) 函数

COUNT(*) 函数用于返回查询结果的总数据条数

```mysql
-- 使用 count(*) 来统计 users 表中，状态为 0 用户的总数量
select count(*) from users where status = 0

-- 使用 AS 关键字给列起别名
select count(*) as total from users where status = 0
select username as uname, password as upwd from users
```

## 在项目中操作 MySQL

- 安装操作 MySQL数据库的第三方模块（mysql）
- 通过 mysql模块连接到 MySQL 数据库
- 通过 mysql模块执行 SQL 语句

### 安装与配置 mysql 模块

**安装 mysql 模块**

mysql模块是托管于npm上的第三方模块。它提供了在Node.js项目中连接和操作MySQL数据库的能力

```npm
npm i mysql
```

**配置 mysql 模块**

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置

```js
// 导入 mysql 模块
const mysql = require('mysql')
// 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1', // 数据的 IP 地址
    user: 'root', // 登录数据库的账号
    password: 'jxy123321', // 登录数据库的密码
    database: 'my_db_01' // 指定要操作哪个数据库
})
```

**测试 mysql 模块能否正常工作**

调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果

```javascript
// 测试 mysql 模块能否正常工作
db.query('select 1', (err, results) => {
    // mysql 模块工作期间报错
    if(err) return console.log(err.message)
    // 能够成功的执行 SQL 语句
    console.log(results)
})
```

### 使用 mysql 模块操作 MySQL 数据库

**查询数据**

```javascript
// 查询 users 表中所有的数据
const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
    // 查询数据失败
    if(err) return console.log(err.message)
    // 查询数据成功
    console.log(results)
})
```

**插入数据**

```javascript
// 向 users 表中新增一条数据，期中 username 的值为 DouYing，password 的值为 123321
const user = {username: 'DouYing', password: '123321'}
//定义待执行的 SQL 语句
const sqlStr = 'insert into users (username, password) values (?, ?)'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password], (err, results) => {
    // 执行 SQL 语句失败
    if(err) return console.log(err.message)
    // 执行 SQL 语句成功
    // 如果执行的是 insert into 插入语句，则 results 是一个对象
    // 可以通过 affectedRows 属性，来判断是否插入数据成功
    if(results.affectedRows === 1) {
        console.log('插入数据成功')
    }
})
```

**插入数据的便捷方式**

向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据

```javascript
// 插入数据的便捷方式
const user = {username: 'DouYing1', password: '123321'}
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users set ?'
// 执行 SQL 语句
db.query(sqlStr, user, (err,results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('插入数据成功')
    }
})
```

**更新数据**

```javascript
// 更新用户的信息
const user = {id: 6, username: 'DouYingccc', password: '123321'}
// 定义 SQL 语句
const sqlStr = 'update users set username=?, password=? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user.username, user.password, user.id], (err,results) => {
    if(err) return console.log(err.message)
    if(results.affectedRow === 1) {
        console.log('更新成功')
    }
})
```

**更新数据的便捷方式**

更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速更新表数据

```javascript
// 更新数据的便捷方式
const user = {id: 6, username: 'DouYingcc', password: '10086'}
// 定义 SQL 语句
const sqlStr = 'update users set ? where id=?'
// 执行 SQL 语句
db.query(sqlStr,[user, user.id], (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRow === 1) {
        console.log('更新数据成功')
    }
})
```

**删除数据**

在删除数据时，推荐根据 id 这样的唯一标识，来删除对应的数据

```javascript
// 删除 id 为 5 的用户
const sqlStr = 'delete from users where id=?'
db.query(sqlStr, 5, (err, results) => {
    if(err) return console.log(err.message)
    // 执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
    if(results.affectedRows === 1) {
        console.log('删除数据成功')
    }
})
```

**标记删除**

- 使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作
- 所谓的标记删除，就是在表中设置类似于 status 这样的状态字段，来标记当前这条数据是否被删除
- 当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 status 字段标记为删除即可

```javascript
// 标记删除
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr,[1, 6], (err,results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1) {
        console.log('标记删除成功')
    }
})
```

## 前后端的身份认证

### Web 开发模式

目前主流的 Web 开发模式有两种，分别是：

- 基于服务端渲染的传统 Web 开发模式
- 基于前后端分离的新型 Web 开发模式

**服务端渲染的 Web 开发模式**

服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不需要使用 Ajax 这样的技术额外请求页面的数据

```javascript
app.get('/index.html', (req, res) => {
  const user = { name: 'Bruce', age: 29 }
  const html = `<h1>username:${user.name}, age:${user.age}</h1>`
  res.send(html)
})
```

- 优点：

  ① 前端耗时少。因为服务器端负责动态生成HTML内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电

  ② 有利于SEO。因为服务器端响应的是完整的HTML页面内容，所以爬虫更容易爬取获得信息，更有利于SEO。

- 缺点：

  ① 占用服务器端资源。即服务器端完成HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力

  ② 不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。

**前后端分离的 Web 开发模式**

前后端分离的开发模式，依赖于 Ajax 技术的广泛应用。简而言之，前后端分离的 Web 开发模式，就是后端只负责提供 API 接口，前端使用 Ajax 调用接口的开发模式

- 优点：

  ① 开发体验好。前端专注于UI页面的开发，后端专注于api的开发，且前端有更多的选择性。

  ② 用户体验好。Ajax技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。

  ③ 减轻了服务器端的渲染压力。因为页面最终是在每个用户的浏览器中生成的。

- 缺点：

  ① 不利于 SEO。因为完整的HTML页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。（解决方案：利用Vue、React等前端框架的SSR（serverside render）技术能够很好的解决SEO问题！）

**如何选择 Web 开发模式**

不谈业务场景而盲目选择使用何种开发模式都是耍流氓

- 企业级网站，主要功能是展示，没有复杂交互，且需要良好的 SEO，可考虑服务端渲染
- 后台管理项目，交互性强，无需考虑 SEO，可使用前后端分离
- 为同时兼顾首页渲染速度和前后端分离开发效率，可采用首屏服务器端渲染 + 其他页面前后端分离的开发模式

### 身份认证

- **身份认证**又称“身份验证”、“鉴权”，是指通过一定的手段，完成对用户的确认
- 如各大网站的手机验证码登录、账号密码验证等
- 服务端渲染推荐使用`Session认证机制`
- 前后端分离推荐使用`JWT认证机制`

>身份认证的目的，是为了确认当前所声称为某种身份的用户，确实是所声称的用户。例如，你去找快递员取快递，你要怎么证明这份快递是你的

### Session 认证机制

**1.HTTP 协议的无状态性**

- 了解 HTTP 协议的无状态性是进一步学习 Session 认证机制的必要前提
- HTTP 协议的无状态性，指的是客户端的每次 HTTP 请求都是独立的，连续多个请求之间没有直接的关系，服务器不会主动保留每次 HTTP 请求的状态

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208032025021.png)

**2.如何突破 HTTP 无状态的限制**

对于超市来说，为了方便收银员在进行结算时给 VIP 用户打折，超市可以为每个 VIP 用户发放会员卡

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208032028635.png)

>注意：
>
>现实生活中的会员卡身份认证方式，在 Web 开发中的专业术语叫做 Cookie

**3.关于Cookie**

- Cookie 是存储在用户浏览器中的一段不超过 4 KB 的字符串。它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。

- 不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器

- Cookie的几大特性：

  ①自动发送

  ②域名独立

  ③过期时限

  ④4KB 限制

**4.Cookie 在身份认证中的作用**

- 客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中
- 随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208032040462.png)

**5.Cookie不具有安全性**

- 由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全性
- 因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器
- 注意区分伪造跟盗取的不同

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208032044498.png)

**6.提高身份认证的安全性**

- 为了防止客户伪造会员卡，收银员在拿到客户出示的会员卡之后，可以在收银机上进行刷卡认证。只有收银机确认存在的会员卡，才能被正常使用
- 这种“会员卡 + 刷卡认证”的设计理念，就是 Session 认证机制的精髓

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208032046219.png)

### Express 中使用 Session 认证

**安装 express-session 中间件**

```npm
npm install express-session
```

**配置 express-session 中间件**

express-session 中间件安装成功后，需要通过 app.use() 来注册 session 中间件

```javascript
// TODO_01：请配置 Session 中间件
const session = require('express-session')
app.use(session({
  secret: 'DouYing', // secret 属性的值可以为任意字符串
  resave: false, // 固定写法
  saveUninitialized: true, // 固定写法
}))
```

**向 session 中存数据**

当 express-session 中间件配置成功后，即可通过 req.session 来访问和使用 session 对象，从而存储用户的关键信息

```javascript
// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  req.session.user = req.body // 将用户的信息，存储到 Session 中
  req.session.islogin = true // 将用户的登录状态，存储到 Session 中

  res.send({ status: 0, msg: '登录成功' })
})
```

**从 session 中取数据**

可以直接从 req.session 对象上获取之前存储的数据

```javascript
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  // 判断用户是否登录
  if(req.session.islogin) {
    return res.send({status: 1, msg: 'fail'})
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})
```

**清空 session**

调用 req.session.destroy() 函数，即可清空服务器保存的 session 信息

```javascript
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})
```

### JWT 认证机制

- Session 认证机制需要配合 Cookie 才能实现。
- 由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证
- **JWT（英文全称：JSON Web Token）** 是目前最流行的跨域认证解决方案

>注意：
>
>当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制
>
>当前端需要跨域请求后端接口的时候，推荐使用 JWT 认证机制

**JWT 的工作原理**

用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208032115143.png)

**JWT 的组成部分**

JWT 通常由三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名）

- Payload 是真正的用户信息，加密后的字符串
- Header 和 Signature 是安全性相关部分，保证 Token 安全性
- 三者使用 . 分隔

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiQnJ1Y2UiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiaGVsbG8iLCJlbWFpbCI6InNjdXRAcXEuY29tIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2NDE4NjU3MzEsImV4cCI6MTY0MTkwMTczMX0.bmqzAkNSZgD8IZxRGGyVlVwGl7EGMtWitvjGD-a5U5c
```

**JWT 的使用方式**

- 客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中
- 此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是把 JWT 放在 HTTP 请求头的 Authorization 字段中
- 加上 Bearer 前缀

```javascript
Authorization: Bearer <token>
```

### Express 中使用 JWT

**安装 JWT 相关的包**

- jsonwebtoken 用于生成 JWT 字符串
- express-jwt 用于将 JWT 字符串解析还原成 JSON 对象

```npm
//安装多个包中间用空格隔开
npm install jsonwebtoken express-jwt
```

**导入 JWT 相关的包**

```javascript
// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
```

**定义 secret 密钥**

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 secret 密钥：

- 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
- 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

```javascript
// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = ' DouYing 好好学习~'
```

**在登录成功后生成 JWT 字符串**

调用 jsonwebtoken 包提供的 sign() 方法，将用户的信息加密成 JWT 字符串，响应给客户端

```javascript
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  res.send({
    status: 200,
    message: '登录成功！',
    // jwt.sign() 生成 JWT 字符串
    // 参数：用户信息对象、加密密钥、配置对象 token 有效期
    // 尽量不保存敏感信息，因此只有用户名，没有密码
    token: jwt.sign({username: userinfo.username}, secretKey, { expiresIn: '30s' }) // 要发送给客户端的 token 字符串
  })
```

**将 JWT 字符串还原为 JSON 对象**

- 客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证
- 此时，服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象

```javascript
// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```

**使用 req.user 获取用户信息**

当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 req.user 对象，来访问从 JWT 字符串中解析出来的用户信息

```javascript
// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  })
})
```

**捕获解析 JWT 失败后产生的错误**

当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。我们可以通过 Express 的错误中间件，捕获这个错误并进行相关的处理

```javascript
// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, net) => {
  // 这次错误是由 token 解析失败导致的
  if(err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  res.send({
    status: 500,
    message: '未知的错误'
  })
})
```

