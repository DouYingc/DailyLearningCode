## 同源策略

同源策略（英文全称 Same origin policy）是浏览器提供的一个安全功能

MDN 官方给定的概念：同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制

>通俗的理解：浏览器规定，A 网站的 JavaScript，不允许和非同源的网站 C 之间，进行资源的交互，例如：
>
>①无法读取非同源网页的Cookie、LocalStorage 和 IndexedDB
>
>②无法接触非同源网页的DOM
>
>③无法向非同源地址发送Ajax 请求

### 同源

如果两个页面的协议，域名和端口都相同，则两个页面具有相同的源

例如，下表给出了相对于 http://www.test.com/index.html 页面的同源检测：

|                URL                 | 是否同源 |                   原因                    |
| :--------------------------------: | :------: | :---------------------------------------: |
|   http://www.test.com/other.html   |    是    |       同源（协议、域名、端口相同）        |
|  https://www.test.com/about.html   |    否    |        协议不同（http  与  https）        |
|  http://blog.test.com/movie.html   |    否    | 域名不同（www.test.com 与 blog.test.com） |
| http://www.test.com:7001/home.html |    否    | 端口不同（默认的  80 端口与  7001 端口）  |
|  http://www.test.com:80/main.html  |    是    |       同源（协议、域名、端口相同）        |

## 跨域

同源指的是两个 URL 的协议、域名、端口一致，反之，则是跨域

>出现跨域的根本原因：浏览器的同源策略不允许非同源的 URL 之间进行资源的交互
>
>网页：http://www.test.com/index.html
>
>接口：http://www.api.com/userlist

### 浏览器对跨域请求的拦截

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207281651510.png)

>注意：
>
>浏览器允许发起跨域请求，但是，跨域请求回来的数据，会被浏览器拦截，无法被页面获取到！

### 如何实现跨域数据请求

现如今，实现跨域数据请求，最主要的两种解决方案，分别是 `JSONP` 和 `CORS`

JSONP：出现的早，兼容性好（兼容低版本IE）。是前端程序员为了解决跨域问题，被迫想出来的一种临时解决方案。缺点是只支持 GET 请求，不支持 POST 请求

CORS：出现的较晚，它是 W3C 标准，属于跨域 Ajax 请求的根本解决方案。支持 GET 和 POST 请求。缺点是不兼容某些低版本的浏览器

## JSONP

JSONP (JSON with Padding) 是 JSON 的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题

### 实现原理

由于浏览器同源策略的限制，网页中无法通过 Ajax 请求非同源的接口数据。但是 `<script>` 标签不受浏览器同源策略的影响，可以通过 src 属性，请求非同源的 js 脚本。
因此，JSONP 的实现原理，就是通过` <script>` 标签的 src 属性，请求跨域的数据接口，并通过函数调用的形式，接收跨域接口响应回来的数据

### 自己实现一个简单的JSONP

定义一个success回调函数

```javascript
<script>
    function success(data) {
        console.log('JSONP响应回来的数据是：')
        console.log(data)
    }
</script>
```

通过 script标签，请求接口数据

```javascript
<script src="http://www.liulongbin.top:3006/api/jsonp?callback=success&name=ls&age=20"></script>
```

### JSONP的缺点

由于 JSONP 是通过 `<script>` 标签的 src 属性，来实现跨域数据获取的，所以，JSONP 只支持 GET 数据请求，不支持 POST 请求。

>注意：
>
>JSONP 和 Ajax 之间没有任何关系，不能把 JSONP 请求数据的方式叫做 Ajax，因为 JSONP 没有用到 XMLHttpRequest 这个对象

### jQuery中的JSONP

jQuery 提供的 $.ajax() 函数，除了可以发起真正的 Ajax 数据请求之外，还能够发起 JSONP 数据请求

```javascript
$.ajax({
    url: 'http://www.liulongbin.top:3006/api/jsonp?name=zs&age=20',
    // 代表发起JSONP的请求
    dataType: 'jsonp',
    success: function (res) {
        console.log(res)
    }
})
```

>默认情况下，使用 jQuery 发起 JSONP 请求，会自动携带一个 callback=jQueryxxx 的参数，jQueryxxx 是随机生成的一个回调函数名称

### 自定义参数及回调函数名称

在使用 jQuery 发起 JSONP 请求时，如果想要自定义 JSONP 的参数以及回调函数名称，可以通过如下两个参数来指定：

```javascript
$.ajax({
    url: 'http://www.liulongbin.top:3006/api/jsonp?name=zs&age=20',
    // 代表发起JSONP的请求
    dataType: 'jsonp',
    // 发送到服务端的参数名称，默认为callback
    jsonp: 'callback',
    // 自定义的回调函数名称，默认为jQueryxxx的格式
    jsonpCallback: 'abc',
    success: function (res) {
        console.log(res)
    }
})
```

### jQuery中JSONP的实现过程

jQuery 中的 JSONP，也是通过 `<script>`标签的 src 属性实现跨域数据访问的，只不过，jQuery 采用的是动态创建和移除 `<script>` 标签的方式，来发起 JSONP 数据请求

>在发起 JSONP 请求的时候，动态向`<header>`中append一个`<script>`标签
>
>l在 JSONP 请求成功以后，动态从`<header>`中移除刚才append进去的`<script>`标签

```javascript
$('#btnJSONP').on('click', function () {
    $.ajax({
        url: 'http://www.liulongbin.top:3006/api/jsonp?address=浙江&location=丽水',
        dataType: 'jsonp',
        jsonpCallback: 'abc',
        success: function (res) {
            console.log(res)
        }
    })
})
```

## 防抖和节流

#### 防抖

防抖策略（debounce）是当事件被触发后，延迟 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时

#### 防抖的应用场景

用户在输入框中连续输入一串字符时，可以通过防抖策略，只在输入完后，才执行查询的请求，这样可以有效减少请求次数，节约请求资源

### 节流

节流策略（throttle），顾名思义，可以减少一段时间内事件的触发频率

#### 节流的应用场景

①鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次

②懒加载时要监听计算滚动条的位置，但不必每次滑动都触发，可以降低计算的频率，而不必去浪费CPU资源

#### 节流阀

节流阀为空，表示可以执行下次操作；不为空，表示不能执行下次操作
当前操作执行完，必须将节流阀重置为空，表示可以执行下次操作了
每次执行操作前，必须先判断节流阀是否为空

>高铁卫生间是否被占用，由红绿灯控制，红灯表示被占用，绿灯表示可使用
>假设每个人上卫生间都需要花费5分钟，则五分钟之内，被占用的卫生间无法被其他人使用
>上一个人使用完毕后，需要将红灯重置为绿灯，表示下一个人可以使用卫生间
>下一个人在上卫生间之前，需要先判断控制灯是否为绿色，来知晓能否上卫生间。

### 防抖和节流的区别

防抖：如果事件被频繁触发，防抖能保证只有最有一次触发生效！前面 N 多次的触发都会被忽略
节流：如果事件被频繁触发，节流能够减少事件触发的频率，因此，节流是有选择性地执行一部分事件

## HTTP协议

HTTP 协议即超文本传送协议 (HyperText Transfer Protocol) ，它规定了客户端与服务器之间进行网页内容传输时，所必须遵守的传输格式

>客户端要以HTTP协议要求的格式把数据提交到服务器
>
>服务器要以HTTP协议要求的格式把内容响应给客户端

### 通信

就是信息的传递和交换

>通信三要素：主体、内容、方式

### 通信协议

通信协议（Communication Protocol）是指通信的双方完成通信所必须遵守的规则和约定

>通俗的理解：
>
>通信双方采用约定好的格式来发送和接收消息，这种事先约定好的通信格式，就叫做通信协议

## HTTP请求消息

由于 HTTP 协议属于客户端浏览器和服务器之间的通信协议。因此，客户端发起的请求叫做 HTTP 请求，客户端发送到服务器的消息，叫做 HTTP 请求消息

>注意：
>
>HTTP 请求消息又叫做 HTTP 请求报文

### 组成部分

HTTP 请求消息由请求行（request line）、请求头部（ header ） 、空行 和 请求体 4 个部分组成

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282123894.png)

#### 请求行

请求行由请求方式、URL 和 HTTP 协议版本 3 个部分组成，他们之间使用空格隔开

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282125845.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282125324.png)

#### 请求头部

请求头部用来描述客户端的基本信息，从而把客户端相关的信息告知服务器

请求头部由多行 键/值对 组成，每行的键和值之间用英文的冒号分隔

>比如：
>
>User-Agent 用来说明当前是什么类型的浏览器
>
>Content-Type 用来描述发送到服务器的数据格式
>
>Accept 用来描述客户端能够接收什么类型的返回内容
>
>Accept-Language 用来描述客户端期望接收哪种人类语言的文本内容

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282129478.png)

|    头部字段     |                      说明                      |
| :-------------: | :--------------------------------------------: |
|      Host       |               要请求的服务器域名               |
|   Connection    | 客户端与服务器的连接方式(close  或  keepalive) |
| Content-Length  |              用来描述请求体的大小              |
|     Accept      |         客户端可识别的响应内容类型列表         |
|   User-Agent    |              产生请求的浏览器类型              |
|  Content-Type   |       客户端告诉服务器实际发送的数据类型       |
| Accept-Encoding |         客户端可接收的内容压缩编码形式         |
| Accept-Language |        用户期望获得的自然语言的优先顺序        |

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282131186.png)

#### 空行

最后一个请求头字段的后面是一个空行，通知服务器请求头部至此结束

请求消息中的空行，用来分隔请求头部与请求体

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282132091.png)

#### 请求体

请求体中存放的，是要通过 POST 方式提交到服务器的数据

>注意：
>
>只有 POST 请求才有请求体，GET 请求没有请求体！

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282133146.png)

## HTTP响应消息

响应消息就是服务器响应给客户端的消息内容，也叫作响应报文

### 组成部分

HTTP响应消息由状态行、响应头部、空行 和 响应体 4 个部分组成

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282138488.png)

#### 状态行

状态行由 HTTP 协议版本、状态码和状态码的描述文本 3 个部分组成，他们之间使用空格隔开

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282140136.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282140137.png)

#### 响应头部

响应头部用来描述服务器的基本信息。响应头部由多行 键/值对 组成，每行的键和值之间用英文的冒号分隔

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282141607.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282141608.png)

#### 空行

在最后一个响应头部字段结束之后，会紧跟一个空行，用来通知客户端响应头部至此结束

响应消息中的空行，用来分隔响应头部与响应体

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282143562.png)

#### 响应体

响应体中存放的，是服务器响应给客户端的资源内容

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282143563.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282143525.png)

## HTTP请求方法

HTTP 请求方法，属于 HTTP 协议中的一部分，请求方法的作用是：用来表明要对服务器上的资源执行的操作。最常用的请求方法是 GET 和 POST

| 序号 |  方法   |                             描述                             |
| :--: | :-----: | :----------------------------------------------------------: |
|  1   |   GET   | (查询)发送请求来获得服务器上的资源，请求体中不会包含请求数据，请求数据放在协议头中。 |
|  2   |  POST   | (新增)向服务器提交资源（例如提交表单或上传文件）。数据被包含在请求体中提交给服务器。 |
|  3   |   PUT   | (修改)向服务器提交资源，并使用提交的新资源，替换掉服务器对应的旧资源。 |
|  4   | DELETE  |               (删除)请求服务器删除指定的资源。               |
|  5   |  HEAD   | HEAD  方法请求一个与 GET 请求的响应相同的响应，但没有响应体。 |
|  6   | OPTIONS | 获取http服务器支持的http请求方法，允许客户端查看服务器的性能，比如ajax跨域时的预检等。 |
|  7   | CONNECT |           建立一个到由目标资源标识的服务器的隧道。           |
|  8   |  TRACE  | 沿着到目标资源的路径执行一个消息环回测试，主要用于测试或诊断。 |
|  9   |  PATCH  |     是对  PUT 方法的补充，用来对已知资源进行局部更新 。      |

## HTTP响应状态码

HTTP 响应状态码（HTTP Status Code），也属于 HTTP 协议的一部分，用来标识响应的状态

响应状态码会随着响应消息一起被发送至客户端浏览器，浏览器根据服务器返回的响应状态码，就能知道这次 HTTP 请求的结果是成功还是失败了

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207282148245.png)

### 组成和分类

HTTP 状态码由三个十进制数字组成，第一个十进制数字定义了状态码的类型，后两个数字用来对状态码进行细分

| 分类 |                           分类描述                           |
| :--: | :----------------------------------------------------------: |
| 1**  | 信息，服务器收到请求，需要请求者继续执行操作（实际开发中很少遇到  1**  类型的状态码） |
| 2**  |                  成功，操作被成功接收并处理                  |
| 3**  |              重定向，需要进一步的操作以完成请求              |
| 4**  |          客户端错误，请求包含语法错误或无法完成请求          |
| 5**  |        服务器错误，服务器在处理请求的过程中发生了错误        |

#### 2** 成功相关的响应状态码

2** 范围的状态码，表示服务器已成功接收到请求并进行处理。常见的 2** 类型的状态码如下：

| 状态码 | 状态码英文名称 |                           中文描述                           |
| :----: | :------------: | :----------------------------------------------------------: |
|  200   |       OK       |            请求成功。一般用于  GET 与 POST  请求             |
|  201   |    Created     | 已创建。成功请求并创建了新的资源，通常用于  POST 或 PUT  请求 |

#### 3** 重定向相关的响应状态码

3** 范围的状态码，表示表示服务器要求客户端重定向，需要客户端进一步的操作以完成资源的请求。常见的 3** 类型的状态码如下：

| 状态码 |   状态码英文名称   |                           中文描述                           |
| :----: | :----------------: | :----------------------------------------------------------: |
|  301   | Moved  Permanently | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
|  302   |       Found        | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
|  304   |   Not  Modified    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源（响应消息中不包含响应体）。客户端通常会缓存访问过的资源。 |

#### 4** 客户端错误相关的响应状态码

4** 范围的状态码，表示客户端的请求有非法内容，从而导致这次请求失败。常见的 4** 类型的状态码如下：

| 状态码 |  状态码英文名称  |                           中文描述                           |
| :----: | :--------------: | :----------------------------------------------------------: |
|  400   |   Bad  Request   | 1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。  2、请求参数有误。 |
|  401   |   Unauthorized   |                    当前请求需要用户验证。                    |
|  403   |    Forbidden     |             服务器已经理解请求，但是拒绝执行它。             |
|  404   |    Not Found     |         服务器无法根据客户端的请求找到资源（网页）。         |
|  408   | Request  Timeout |     请求超时。服务器等待客户端发送的请求时间过长，超时。     |

#### 5** 服务端错误相关的响应状态码

5** 范围的状态码，表示服务器未能正常处理客户端的请求而出现意外错误。常见的 5** 类型的状态码如下：

| 状态码 |     状态码英文名称     |                           中文描述                           |
| :----: | :--------------------: | :----------------------------------------------------------: |
|  500   | Internal  Server Error |                服务器内部错误，无法完成请求。                |
|  501   |    Not  Implemented    | 服务器不支持该请求方法，无法完成请求。只有  GET 和 HEAD  请求方法是要求每个服务器必须支持的，其它请求方法在不支持的服务器上会返回501 |
|  503   |  Service  Unavailable  |    由于超载或系统维护，服务器暂时的无法处理客户端的请求。    |