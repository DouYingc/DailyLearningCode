## XMLHttpRequest的基本使用

XMLHttpRequest（简称 xhr）是浏览器提供的 Javascript 对象，通过它，可以请求服务器上的数据资源。之前所学的 jQuery 中的 Ajax 函数，就是基于 xhr 对象封装出来的

### 使用xhr发起GET请求

步骤：

①创建 xhr 对象

②调用 xhr.open() 函数

③调用 xhr.send() 函数

④监听 xhr.onreadystatechange 事件

```javascript
// 创建xhr对象
let xhr = new XMLHttpRequest()
// 调用open函数 指定请求方式和URL地址
xhr.open('get', 'http://www.liulongbin.top:3006/api/getbooks')
// 调用send函数 发起Ajax请求
xhr.send()
// 监听onreadystatechange事件
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        // 获取服务器响应的数据
        console.log(xhr.responseText)
    } 
}
```

### xhr对象的readyState属性

XMLHttpRequest 对象的 readyState 属性，用来表示当前 Ajax 请求所处的状态。每个 Ajax 请求必然处于以下状态中的一个：

|  值  |       状态       |                         描述                         |
| :--: | :--------------: | :--------------------------------------------------: |
|  0   |      UNSENT      | XMLHttpRequest  对象已被创建，但尚未调用  open方法。 |
|  1   |      OPENED      |               open() 方法已经被调用。                |
|  2   | HEADERS_RECEIVED |     send() 方法已经被调用，响应头也已经被接收。      |
|  3   |     LOADING      | 数据接收中，此时  response  属性中已经包含部分数据。 |
|  4   |       DONE       | Ajax  请求完成，这意味着数据传输已经彻底完成或失败。 |

### 使用xhr发起带参数的GET请求

使用 xhr 对象发起带参数的 GET 请求时，只需在调用 xhr.open 期间，为 URL 地址指定参数即可：

```javascript
// ...省略不必要的代码 同上
xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks?id=1')
// ...省略不必要的代码 同上

```

>这种在 URL 地址后面拼接的参数，叫做查询字符串

### 查询字符串

查询字符串（URL 参数）是指在 URL 的末尾加上用于向服务器发送信息的字符串（变量）

>格式：将英文的 ? 放在URL 的末尾，然后再加上 参数＝值 ，想加上多个参数的话，使用 & 符号进行分隔。以这个形式，可以将想要发送给服务器的数据添加到 URL 中

```javascript
// 不带参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks
// 带一个参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1
// 带两个参数的 URL 地址
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记
```

#### GET请求携带参数的本质

无论使用`$.ajax()`，还是使用 `$.get()`，又或者直接使用 xhr 对象发起 GET 请求，当需要携带参数的时候，本质上，都是直接将参数以查询字符串的形式，追加到 URL 地址的后面，发送到服务器的

```javascript
$.get('url', {name: 'zs', age: 20}, function() {})
// 等价于
$.get('url?name=zs&age=20', function() {})

$.ajax({ method: 'GET', url: 'url', data: {name: 'zs', age: 20}, success: function() {} })
// 等价于
$.ajax({ method: 'GET', url: 'url?name=zs&age=20', success: function() {} })
```

### URL编码与解码

URL 地址中，只允许出现英文相关的字母、标点符号、数字，因此，在 URL 地址中不允许出现中文字符
如果 URL 中需要包含中文这样的字符，则必须对中文字符进行编码（转义）

>URL编码的原则：使用安全的字符（没有特殊用途或者特殊意义的可打印字符）去表示那些不安全的字符
>URL编码原则的通俗理解：使用英文字符去表示非英文字符

#### 如何对URL进行编码与解码

浏览器提供了URL编码与解码的API，分别是：

encodeURI()  编码的函数

decodeURI()  解码的函数

```javascript
let str = '黑马程序员'
let str2 = encodeURI(str)
console.log(str2)
// 输出字符串  %E9%BB%91%E9%A9%AC%E7%A8%8B%E5%BA%8F%E5%91%98

console.log('------------')
let str3 = decodeURI('%E9%BB%91%E9%A9%AC')
console.log(str3)
// 输出字符串  黑马
```

>由于浏览器会自动对 URL 地址进行编码操作，因此，大多数情况下，程序员不需要关心 URL 地址的编码与解码操作

### 使用xhr发起POST请求

步骤：

①创建 xhr 对象

②调用 xhr.open() 函数

③设置 Content-Type 属性（固定写法）

④调用 xhr.send() 函数，同时指定要发送的数据

⑤监听 xhr.onreadystatechange 事件

```javascript
// 创建xhr对象
let xhr = new XMLHttpRequest()

//调用open函数
xhr.open('post','http://www.liulongbin.top:3006/api/addbook')

// 设置Content-Type属性
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

// 调用send函数
xhr.send('bookname=海底三万里&author=不知道&publisher=浙江图书出版社')


// 监听事件
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}
```

## 数据交换格式

数据交换格式，就是服务器端与客户端之间进行数据传输与交换的格式

>前端领域，经常提及的两种数据交换格式分别是 XML 和 JSON。其中 XML 用的非常少，所以，我们重点要学习的数据交换格式就是 JSON

### XML

XML 的英文全称是 EXtensible Markup Language，即可扩展标记语言。因此，XML 和 HTML 类似，也是一种标记语言

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document</title>
  </head>
  <body></body>
</html>
```

```xml
<note>
  <to>ls</to>
  <from>zs</from>
  <heading>通知</heading>
  <body>晚上开会</body>
</note>
```

>缺点：
>
>XML 格式臃肿，和数据无关的代码多，体积大，传输效率低
>
>在 Javascript中解析XML比较麻烦

>HTML和XML的区别：
>
>XML和HTML虽然都是标记语言，但是，它们两者之间没有任何的关系。
>
>HTML 被设计用来描述网页上的内容，是网页内容的载体
>
>XML 被设计用来传输和存储数据，是数据的载体

### JSON

JSON 的英文全称是 JavaScript Object Notation，即“JavaScript 对象表示法”，简单来讲，JSON 就是 Javascript 对象和数组的字符串表示法，它使用文本表示一个 JS 对象或数组的信息，因此，JSON 的本质是字符串

>作用：
>
>JSON 是一种轻量级的文本数据交换格式，在作用上类似于 XML，专门用于存储和传输数据，但是 JSON 比 XML 更小、更快、更易解析

>JSON语法注意事项
>
>①属性名必须使用双引号包裹
>
>②字符串类型的值必须使用双引号包裹
>
>③JSON 中不允许使用单引号表示字符串
>
>④JSON 中不能写注释
>
>⑤JSON 的最外层必须是对象或数组格式
>
>⑥不能使用 undefined或函数作为JSON的值
>
>JSON 的作用：在计算机与网络之间存储和传输数据。
>
>JSON 的本质：用字符串来表示Javascript对象数据或数组数据

#### 对象结构

对象结构在 JSON 中表示为 { } 括起来的内容。数据结构为 { key: value, key: value, … } 的键值对结构。其中，key 必须是使用英文的双引号包裹的字符串，value 的数据类型可以是数字、字符串、布尔值、null、数组、对象6种类型

```javascript
{
    "name": "zs",
    "age": 20,
    "gender": "男",
    "address": null,
    "hobby": ["吃饭", "睡觉", "打豆豆"]
}
```

#### 数组结构

数组结构在 JSON 中表示为 [ ] 括起来的内容。数据结构为 [ "java", "javascript", 30, true … ] 。数组中数据的类型可以是数字、字符串、布尔值、null、数组、对象6种类型

```javascript
[ "java", "python", "php" ]
[ 100, 200, 300.5 ]
[ true, false, null ]
[ { "name": "zs", "age": 20}, { "name": "ls", "age": 30} ]
[ [ "苹果", "榴莲", "椰子" ], [ 4, 50, 5 ] ]
```

#### JSON和JS对象的关系

JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串

```javascript
//这是一个对象
let obj = {a: 'Hello', b: 'World'}

//这是一个 JSON 字符串，本质是一个字符串
let json = '{"a": "Hello", "b": "World"}' 
```

JSON和JS对象的互转

要实现从 JSON 字符串转换为 JS 对象，使用 JSON.parse() 方法

```javascript
let jsonStr = '{"a": "Hello", "b": "world"}'
let obj = JSON.parse(jsonStr)
console.log(obj)
// 结果是 {a: 'Hello', b: 'World'}
```

要实现从 JS 对象转换为 JSON 字符串，使用 JSON.stringify() 方法

```javascript
let obj2 = {a: 'hello', b: 'world'}
let str = JSON.stringify(obj2)
console.log(str)
// 结果是 '{"a": "Hello", "b": "World"}'
```

#### 序列化和反序列化

把数据对象转换为字符串的过程，叫做序列化，例如：调用 JSON.stringify() 函数的操作，叫做 JSON 序列化

把字符串转换为数据对象的过程，叫做反序列化，例如：调用JSON.parse()函数的操作，叫做JSON反序列化

## 封装自己的Ajax函数

### 定义options参数选项

itheima() 函数是我们自定义的 Ajax 函数，它接收一个配置对象作为参数，配置对象中可以配置如下属性

method   请求的类型

url           请求的URL地址

data        请求携带的数据

success   请求成功之后的回调函数

### 处理data参数

需要把 data 对象，转化成查询字符串的格式，从而提交给服务器，因此提前定义 resolveData 函数如下

```javascript
function resolveData(data) {
    let arr = []
    for(let k in data) {
        let str = k + '=' + data[k]
        arr.push(str) 
    }


    return arr.join('&')
}

let result = resolveData({name: 'zs', age: 20})
console.log(result)
```

### 定义itheima函数

在 itheima() 函数中，需要创建 xhr 对象，并监听onreadystatechange 事件：

```javascript
function itheima(options) {
    let xhr = new XMLHttpRequest()

    // 把外界传入的data转换成 查询字符串
    let qs = resolveData(options.data)

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}
```

### 判断请求类型

不同的请求类型，对应 xhr 对象的不同操作，因此需要对请求类型进行 if … else … 的判断

```javascript
if(options.method.toUpperCase() === 'GET') {
    // 发起GET请求
    xhr.open(options.method, options.url + '?' + qs)
    xhr.send()
} else if (options.method.toUpperCase() === 'POST') {
    // 发起POST请求
    xhr.open(options.method, options.url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(qs)
}
```

## XMLHttpRequest Level2的新特性

旧版XMLHttpRequest 的缺点

>①只支持文本数据的传输，无法用来读取和上传文件
>
>②传送和接收数据时，没有进度信息，只能提示有没有完成

XMLHttpRequest Level2的新功能

>①可以设置 HTTP 请求的时限
>
>②可以使用 FormData对象管理表单数据
>
>③可以上传文件
>
>④可以获得数据传输的进度信息

### 设置HTTP请求时限

有时，Ajax 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的 XMLHttpRequest 对象，增加了 timeout 属性，可以设置 HTTP 请求的时限：

```javascript
 xhr.timeout = 3000
```

上面的语句，将最长等待时间设为 3000 毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个 timeout 事件，用来指定回调函数：

```javascript
 xhr.ontimeout = function(event){
     alert('请求超时！')
 }
```

### FormData对象管理表单数据

Ajax 操作往往用来提交表单数据。为了方便表单处理，HTML5 新增了一个 FormData 对象，可以模拟表单操作：

```javascript
// 新建FormData对象
let fd = new FormData()
// 调用append函数，向fd中追加数据
fd.append('uname', 'zs')
fd.append('upwd', '123456')

// 创建xhr对象
let xhr = new XMLHttpRequest()
xhr.open('post', 'http://www.liulongbin.top:3006/api/formdata')
xhr.send()

xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText))
    }
}
```

FormData对象也可以用来获取网页表单的值，示例代码如下：

```javascript
// 新建FormData对象
let fd = new FormData()
// 调用append函数，向fd中追加数据
fd.append('uname', 'zs')
fd.append('upwd', '123456')

// 创建xhr对象
let xhr = new XMLHttpRequest()
xhr.open('post', 'http://www.liulongbin.top:3006/api/formdata')
xhr.send(fd)

xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText))
    }
}
```

### 上传文件

新版 XMLHttpRequest 对象，不仅可以发送文本信息，还可以上传文件

步骤：

①定义 UI结构

②验证是否选择了文件

③向 FormData中追加文件

④使用 xhr发起上传文件的请求

⑤监听 onreadystatechange事件

#### 定义UI结构

```html
<!-- 文件选择框 -->
<input type="file" id="file1">
<!-- 上传文件的按钮 -->
<button id="btnUpload">上传文件</button>
<br />
<!-- img标签，来显示上传成功以后的图片 -->
<img src="" alt="" id="img" width="800">
```

#### 验证是否选择了文件

```javascript
// 验证上传文件按钮
let btnUpload = document.querySelector('#btnUpload')
// 给按钮添加click事件监听
btnUpload.addEventListener('click', function () {
    // 获取用户选择的文件列表
    let files = document.querySelector('#file1').files
    if(files.length <= 0) {
        return alert('请选择要上传的文件')
    }
})
```

#### 向FormData中追加文件

```javascript
// 向FormData中追加文件
// 创建FormData 对象
let fd = new FormData()
// 将用户选择的文件添加到FormData中
fd.append('avatar', files[0])
```

#### 使用 xhr 发起上传文件的请求

```javascript
// 创建xhr对象
let xhr = new XMLHttpRequest()
// 调用open函数 指定请求类型和url地址
xhr.open('post','http://www.liulongbin.top:3006/api/upload/avatar')
// 发起请求
xhr.send(fd)
```

#### 监听onreadystatechange事件

```javascript
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        if(data.status === 200) {
            // 上传成功
            document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url
        } else {
            // 上传失败
            console.log('图片上传失败' + data.message);
        }
    }
}
```

### 显示文件上传进度

新版本的 XMLHttpRequest 对象中，可以通过监听 xhr.upload.onprogress 事件，来获取到文件的上传进度

```javascript
// 监听文件上传进度
xhr.upload.onprogress = function (e) {
    if(e.lengthComputable) {
        // 计算出上传进度
        let percentComplete = Math.ceil((e.loaded / e.total) * 100)
        console.log(percentComplete)
    }
}
```

#### 导入需要的库

```html
<link rel="stylesheet" href="./lib/bootstrap.css" />
<script src="./lib/jquery.js"></script>
```

#### 基于Bootstrap渲染进度条

```html
<!-- bootstrap中的进度条 -->
<div class="progress" style="width: 500px; margin: 15px 10px;">
    <div class="progress-bar progress-bar-striped active" style="width: 50%" id="percent">
      50%
    </div>
</div>
```

#### 监听上传进度的事件

```javascript
// 监听文件上传进度
xhr.upload.onprogress = function (e) {
    if(e.lengthComputable) {
        // 计算出上传进度
        let percentComplete = Math.ceil((e.loaded / e.total) * 100)
        console.log(percentComplete)

        // 动态设置进度条
        $('#percent').attr('style', 'width:' + percentComplete + '%;').html(percentComplete + '%')
    }
}
```

#### 监听上传完成的事件

```javascript
// 监听上传完成的事件
xhr.upload.onload = function () {
    $('#percent').removeClass().addClass('progress-bar progress-bar-success')
}
```

## jQuery高级用法

### jQuery实现文件上传

#### 定义UI结构

```html
<!-- 导入 jQuery -->
<script src="./lib/jquery.js"></script>

<!-- 文件选择框 -->
<input type="file" id="file1" />
<!-- 上传文件按钮 -->
<button id="btnUpload">上传</button>
```

#### 验证是否选择了文件

```javascript
$(function () {
    $('#btnUpload').on('click', function () {
        let files = $('#file1')[0].files
        if(files.length <= 0) {
            return alert('请选择文件上传')
        }
        console.log('ok')
    })
})
```

#### 向FormData中追加文件

```javascript
 // 向 FormData 中追加文件
 let fd = new FormData()
 fd.append('avatar', files[0])
```

#### 使用jQuery发起上传文件的请求

```javascript
// 发起jQuery的Ajax请求上传文件
$.ajax({
    method: 'POST',
    url: 'http://www.liulongbin.top:3006/api/upload/avatar',
    data: fd,
    processData: false,
    contentType: false,
    success: function (res) {
        console.log(res)
    }
})
```

### jQuery实现loading效果

#### ajaxStart(callback)

Ajax 请求开始时，执行 ajaxStart 函数。可以在 ajaxStart 的 callback 中显示 loading 效果

```javascript
// 监听到Ajax请求发起，显示图片
$(document).ajaxStart(function () {
    $('#loading').show()
})
```

>注意： 
>
>$(document).ajaxStart() 函数会监听当前文档内所有的 Ajax 请求

#### ajaxStop(callback)

Ajax 请求结束时，执行 ajaxStop 函数。可以在 ajaxStop 的 callback 中隐藏 loading 效果

```javascript
// 监听到Ajax请求完成，隐藏图片
$(document).ajaxStop(function () {
    $('#loading').hide()
})
```

## axios

Axios是专注于网络数据请求的库，相比于原生的XMLHttpRequest对象，axios简单易用，相比于jQuery，axios更加轻量化，只专注于网络数据请求

### axios发起GET请求

axios 发起 get 请求的语法：

```javascript
 axios.get('url', { params: { /*参数*/ } }).then(callback)
```

示例：

```javascript
document.querySelector('#btn1').addEventListener('click', function () {
    let url = 'http://www.liulongbin.top:3006/api/get'
    let paramsObj = {
        name: 'zs',
        age: 20
    }
    axios.get(url, {params: paramsObj}).then(function (res) {
        console.log(res)
    })
})
```

### axios发起POST请求

axios 发起 post 请求的语法：

```javascript
 axios.post('url', { /*参数*/ }).then(callback)
```

示例：

```javascript
document.querySelector('#btn1').addEventListener('click', function () {
    let url = 'http://www.liulongbin.top:3006/api/post'
    let dataObj = {
        address: '浙江',
        location: '丽水'
    }
    axios.post(url, dataObj).then(function (res) {
        console.log(res.data)
    })
})
```

### 直接使用axios发起请求

axios 也提供了类似于 jQuery 中 $.ajax() 的函数，语法如下：

```javascript
 axios({
     method: '请求类型',
     url: '请求的URL地址',
     data: { /* POST数据 */ },
     params: { /* GET参数 */ }
 }) .then(callback)
```

#### 直接使用axios发起GET请求

```javascript
document.querySelector('#btn').addEventListener('click', function () {
    let url = 'http://www.liulongbin.top:3006/api/get'
    let paramsData = {
        name: '钢铁侠',
        age: 35
    }
    axios({
        method: 'get',
        url: url,
        params: paramsData
    }).then(function (res) {
        console.log(res.data)
    })
})
```

#### 直接使用axios发起POST请求

```javascript
document.querySelector('#btn').addEventListener('click', function () {
    axios({
        method: 'POST',
        url: 'http://www.liulongbin.top:3006/api/post',
        data: {
            name: '娃哈哈',
            age: 18,
            gender: '女'
        }
    }).then(function (res) {
        console.log(res.data)
    })
})
```

