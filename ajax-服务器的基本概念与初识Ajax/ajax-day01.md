## 了解Ajax

Ajax的全称是Asynchronous Javascript And XML（异步 JavaScript和XML）

通俗的理解：在网页中利用XMLHttpRequest对象和服务器进行数据交互的方式，就是Ajax

>作用：
>
>Ajax能让我们轻松实现网页与服务器之间的数据交互。

### Ajax典型应用场景

1.用户名检测：注册用户时，通过ajax的形式，动态检测用户名是否被占用

2.搜索提示：当输入搜索关键字时，通过ajax的形式，动态加载搜索提示列表

3.数据分页显示：当点击页码值的时候，通过ajax的形式，根据页码值动态刷新表格的数据

4.数据的增删改查：数据的添加、删除、修改、查询操作，都需要通过ajax的形式，来实现数据的交互

## jQuery中的Ajax

浏览器中提供的XMLHttpRequest 用法比较复杂，所以jQuery对XMLHttpRequest进行了封装，提供了一系列Ajax相关的函数，极大地降低了 Ajax 的使用难度

>jQuery中发起Ajax请求最常用的三个方法：
>
>$.get( )
>
>$.post( )
>
>$.ajax( )

### $.get()函数

jQuery中`$.get()`函数的功能单一，专门用来发起get请求，从而将服务器上的资源请求到客户端来进行使用

```javascript
$.get(url, [data], [callback])
```

|  参数名  | 参数类型 | 是否必选 |           说明           |
| :------: | :------: | :------: | :----------------------: |
|   url    |  string  |    是    |     要请求的资源地址     |
|   data   |  object  |    否    | 请求资源期间要携带的参数 |
| callback | function |    否    |   请求成功时的回调函数   |

#### $.get()发起不带参数的请求

使用 `$.get()`函数发起不带参数的请求时，直接提供请求的 URL 地址和请求成功之后的回调函数即可

```javascript
$(function () {
    $('#btnGet').on('click', function() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', function (res) {
            console.log(res)
        })
    })
})
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207251759402.png)

#### $.get()发起带参数的请求

```javascript
$(function () {
    $('#btnGetInfo').on('click', function() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', {id: 1}, function (res) {
            console.log(res)
        })
    })
})
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207251759850.png)

### $.post()函数

jQuery 中`$.post()`函数的功能单一，专门用来发起post请求，从而向服务器提交数据

```javascript
$.post(url, [data], [callback])
```

|  参数名  | 参数类型 | 是否必选 |           说明           |
| :------: | :------: | :------: | :----------------------: |
|   url    |  string  |    是    |      提交数据的地址      |
|   data   |  object  |    否    |       要提交的数据       |
| callback | function |    否    | 数据提交成功时的回调函数 |

#### $.post()向服务器提交数据

```javascript
$(function () {
    $('#btnPost').on('click', function () {
        $.post('http://www.liulongbin.top:3006/api/addbook', {bookname: '活着', author: '余华', publisher: '上海图书出版社'}, function (res) {
            console.log(res)
        })
    })
})
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207251759792.png)

### $.ajax()函数

相比于`$.get()`和`$.post()`函数，jQuery中提供的`$.ajax()`函数，是一个功能比较综合的函数，它允许我们对Ajax请求进行更详细的配置

```javascript
$.ajax({
   type: '', // 请求的方式，例如 GET 或 POST
   url: '',  // 请求的 URL 地址
   data: { },// 这次请求要携带的数据
   success: function(res) { } // 请求成功之后的回调函数
})
```

#### $.ajax()发起GET请求

使用 `$.ajax()`发起GET请求时，只需要将type 属性的值设置为'GET' 即可

```javascript
$.ajax({
   type: 'GET', // 请求的方式
   url: 'http://www.liulongbin.top:3006/api/getbooks',  // 请求的 URL 地址
   data: { id: 1 },// 这次请求要携带的数据
   success: function(res) { // 请求成功之后的回调函数
       console.log(res)
   }
})
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207252002618.png)

#### $.ajax()发起POST请求

使用 `$.ajax()`发起POST请求时，只需要将type 属性的值设置为'POST' 即可

```javascript
$.ajax({
   type: 'POST', // 请求的方式
   url: 'http://www.liulongbin.top:3006/api/addbook',  // 请求的 URL 地址
   data: { // 要提交给服务器的数据
      bookname: '水浒传',
      author: '施耐庵',
      publisher: '上海图书出版社'
    },
   success: function(res) { // 请求成功之后的回调函数
       console.log(res)
   }
})
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207252002619.png)

## 接口

使用Ajax请求数据时，被请求的 URL 地址，就叫做数据接口（简称接口）。同时，每个接口必须有请求方式。

### 通过GET方法请求接口的过程

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207252004250.png)

### 通过POST方法请求接口的过程

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207252004110.png)

### 接口测试工具

为了验证接口能否被正常被访问，我们常常需要使用接口测试工具，来对数据接口进行检测。

>优点：
>
>接口测试工具能让我们在不写任何代码的情况下，对接口进行调用和测试。

#### 使用PostMan测试GET接口

>步骤：
>
>1.选择请求的方式
>
>2.填写请求的URL地址
>
>3.填写请求的参数
>
>4.点击 Send按钮发起GET请求
>
>5.查看服务器响应的结果

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207252033869.png)

#### 使用PostMan测试POST接口

>步骤：
>
>1.选择请求的方式
>
>2.填写请求的URL地址
>
>3.选择 Body面板并勾选数据格式
>
>4.填写要发送到服务器的数据
>
>5.点击 Send按钮发起POST请求
>
>6.查看服务器响应的结果

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207252033871.png)

### 接口文档

接口文档，顾名思义就是接口的说明文档，它是我们调用接口的依据。好的接口文档包含了对接口URL，参数以及输出内容的说明，我们参照接口文档就能方便的知道接口的作用，以及接口如何进行调用。

>接口文档可以包含很多信息，也可以按需进行精简，不过，一个合格的接口文档，应该包含以下6项内容，从而为接口的调用提供依据：
>
>1.接口名称：用来标识各个接口的简单说明，如`登录接口`，`获取图书列表接口`等。
>
>2.接口URL：接口的调用地址。
>
>3.调用方式：接口的调用方式，如`GET`或`POST`。
>
>4.参数格式：接口需要传递的参数，每个参数必须包含`参数名称`、`参数类型`、`是否必选`、`参数说明`这4项内容。
>
>5.响应格式：接口的返回值的详细描述，一般包含`数据名称`、`数据类型`、`说明`3项内容。
>
>6.返回示例（可选）：通过对象的形式，例举服务器返回数据的结构。