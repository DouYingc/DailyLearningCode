## form表单的基本使用

表单在网页中主要负责数据采集功能。HTML中的`<form>`标签，就是用于采集用户输入的信息，并通过`<form>`标签的提交操作，把采集到的信息提交到服务器端进行处理。

### 表单组成部分

>表单由三个基本部分组成：
>
>表单标签
>
>表单域：包含了文本框、密码框、隐藏域、多行文本框、复选框、单选框、下拉选择框和文件上传框等
>
>表单按钮

```html
<form>
    <input type="text" name="email_or_mobile" />
    <input type="password" name="password" />
    <input type="checkbox" name="remember_me" checked />
    <button type="submit">提交</button>
</form>
```

### form标签的属性

`<form>`标签用来采集数据，`<form>`标签的属性则是用来规定如何把采集到的数据发送到服务器

|  属性   |                              值                              |                    描述                    |
| :-----: | :----------------------------------------------------------: | :----------------------------------------: |
| action  |                           URL地址                            |    规定当提交表单时，向何处发送表单数据    |
| method  |                          get或post                           | 规定以何种方式把表单数据提交到 action  URL |
| enctype | application/x-www-form-urlencoded    multipart/form-data  text/plain |   规定在发送表单数据之前如何对其进行编码   |
| target  |           _blank  _self  _parent  _top  framename            |         规定在何处打开 action  URL         |

#### action

`action`属性用来规定当提交表单时，向何处发送表单数据

`action`属性的值应该是后端提供的一个URL地址，这个URL地址专门负责接收表单提交过来的数据

当`<form>`表单在未指定`action`属性值的情况下，`action`的默认值为当前页面的URL地址

>注意：
>
>当提交表单后，页面会立即跳转到`action`属性指定的URL地址

#### target

`target` 属性用来规定在何处打开 action URL

它的可选值有5个，默认情况下，`target`的值是_self，表示在相同的框架中打开action URL

|    值     |              描述              |
| :-------: | :----------------------------: |
|  _blank   |         在新窗口中打开         |
|   _self   |    默认。在相同的框架中打开    |
|  _parent  |  在父框架集中打开。（很少用）  |
|   _top    |  在整个窗口中打开。（很少用）  |
| framename | 在指定的框架中打开。（很少用） |

#### method

`method` 属性用来规定以何种方式把表单数据提交到action URL

它的可选值有两个，分别是get和post

默认情况下，`method`的值为get，表示通过URL地址的形式，把表单数据提交到action URL

>注意：
>
>get方式适合用来提交少量的、简单的数据
>
>post方式适合用来提交大量的、复杂的、或包含文件上传的数据
>
>在实际开发中，`<form>`表单的post提交方式用的最多，很少用get。例如登录、注册、添加数据等表单操作，都需要使用post方式来提交表单

#### enctype

`enctype` 属性用来规定在发送表单数据之前如何对数据进行编码

它的可选值有三个，默认情况下，`enctype`的值为application/x-www-form-urlencoded，表示在发送前编码所有的字符

|             值    值              |                             描述                             |
| :-------------------------------: | :----------------------------------------------------------: |
| application/x-www-form-urlencoded |                 在发送前编码所有字符（默认）                 |
|        multipart/form-data        | 不对字符编码。  在使用包含文件上传控件的表单时，必须使用该值 |
|            text/plain             |     空格转换为 “+”  加号，但不对特殊字符编码。（很少用）     |

>注意：
>
>在涉及到文件上传的操作时，必须将`enctype`的值设置为multipart/form-dat
>
>如果表单的提交不涉及到文件上传操作，则直接将`enctype`的值设置为application/x-www-form-urlencoded即可

### 表单的同步提交

通过点击submit按钮，触发表单提交的操作，从而使页面跳转到action URL 的行为，叫做表单的同步提交

>缺点：
>
>`<form>`表单同步提交后，整个页面会发生跳转，跳转到 action URL 所指向的地址，用户体验很差
>
>`<form>`表单同步提交后，页面之前的状态和数据会丢失

>解决方案：
>
>表单只负责采集数据，Ajax 负责将数据提交到服务器

## 通过Ajax提交表单数据

### 监听表单提交事件

在jQuery中，可以使用如下两种方式，监听到表单的提交事件：

```javascript
$('#form1').submit(function(e) {
   alert('监听到了表单的提交事件')
})

$('#form1').on('submit', function(e) {
   alert('监听到了表单的提交事件')
})
```

### 阻止表单默认提交行为

当监听到表单的提交事件以后，可以调用事件对象的event.preventDefault()函数，来阻止表单的提交和页面的跳转

```javascript
$('#form1').submit(function(e) {
   // 阻止表单的提交和页面的跳转
   e.preventDefault()
})

$('#form1').on('submit', function(e) {
   // 阻止表单的提交和页面的跳转
   e.preventDefault()
})
```

### 快速获取表单中的数据

#### serialize()函数

为了简化表单中数据的获取操作，jQuery提供了 serialize()函数，其语法格式如下：

```javascript
$(selector).serialize()
```

>优点：
>
>可以一次性获取到表单中的所有的数据
>
>注意：
>
>在使用 serialize()函数快速获取表单数据时，必须为每个表单元素添加name属性！

## 模板引擎

模板引擎，顾名思义，它可以根据程序员指定的模板结构和数据，自动生成一个完整的HTML页面

>优点：
>
>减少了字符串的拼接操作
>
>使代码结构更清晰
>
>使代码更易于阅读与维护

### art-template模板引擎

art-template 是一个简约、超快的模板引擎。中文官网首页为http://aui.github.io/art-template/zh-cn/index.html

### 使用传统方式渲染UI结构

```html
<div id="title"></div>
<div>姓名：<span id="name"></span></div>
<div>年龄：<span id="age"></span></div>
<div>会员：<span id="isVIP"></span></div>
<div>注册时间：<span id="regTime"></span></div>
<div>爱好：
    <ul id="hobby">
        <li>爱好1</li>
        <li>爱好2</li>
    </ul>
</div>
```



```javascript
let data = {
    title: '<h3>用户信息</h3>',
    name: 'zs',
    age: 20,
    isVIP: true,
    regTime: new Date(),
    hobby: ['吃饭', '睡觉', '打豆豆']
}

$(function () {
    $('#name').html(data.name)
    $('#title').html(data.title)
    $('#age').html(data.age)
    $('#isVIP').html(data.isVIP)
    $('#regTime').html(data.regTime)

    let rows = []
    $.each(data.hobby, function (i, item) {
        rows.push(`<li>${item}</li>`)
    })
    $('#hobby').html(rows.join(''))
})
```

### art-template使用步骤

①导入 art-template

②定义数据

③定义模板

④调用 template函数

⑤渲染HTML结构

### art-template标准语法

art-template提供了{{ }} 这种语法格式，在{{ }} 内可以进行变量输出，或循环数组等操作，这种{{ }} 语法在art-template中被称为标准语法

#### 输出

```javascript
{{value}}
{{obj.key}}
{{obj['key']}}
{{a ? b : c}}
{{a || b}}
{{a + b}}
```

>在{{ }} 语法中，可以进行变量的输出、对象属性的输出、三元表达式输出、逻辑或输出、加减乘除等表达式输出

#### 原文输出

```javascript
{{@ value }}
```

>如果要输出的value值中，包含了HTML标签结构，则需要使用原文输出语法，才能保证HTML标签被正常渲染

#### 条件输出

如果要实现条件输出，则可以在{{ }} 中使用if… else if …/if 的方式，进行按需输出

```javascript
{{if value}} 按需输出的内容 {{/if}}

{{if v1}} 按需输出的内容 {{else if v2}} 按需输出的内容 {{/if}}

```

#### 循环输出

如果要实现循环输出，则可以在{{ }} 内，通过each语法循环数组，当前循环的索引使用`$index `进行访问，当前的循环项使用`$value`进行访问

```javascript
{{each arr}}
    {{$index}} {{$value}}
{{/each}}
```

#### 过滤器

过滤器的本质，就是一个function处理函数

```javascript
{{value | filterName}}
```

过滤器语法类似管道操作符，它的上一个输出作为下一个输入

定义过滤器的基本语法：

```javascript
template.defaults.imports.filterName = function(value){/*return处理的结果*/}
```

定义格式化时间过滤器

```javascript
<div>注册时间：{{regTime | dateFormat}}</div>
```

```javascript
 template.defaults.imports.dateFormat = function(date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()

    return y + '-' + m + '-' + d // 注意，过滤器最后一定要 return 一个值
 }
```

## 模板引擎实现原理

### 正则与字符串操作

#### 基本语法

exec() 函数用于检索字符串中的正则表达式的匹配

如果字符串中有匹配的值，则返回该匹配值，否则返回 null

```javascript
RegExpObject.exec(string)
```

```javascript
let str = 'hello'
let pattern = /o/
let result = pattern.exec(str)
console.log(result)
```

#### 分组

正则表达式中 ( ) 包起来的内容表示一个分组，可以通过分组来提取自己想要的内容

```javascript
 var str = '<div>我是{{name}}</div>'
 var pattern = /{{([a-zA-Z]+)}}/

 var patternResult = pattern.exec(str)
 console.log(patternResult)
 // 得到 name 相关的分组信息
 // ["{{name}}", "name", index: 7, input: "<div>我是{{name}}</div>", groups: undefined]
```

#### 字符串的replace函数

replace() 函数用于在字符串中用一些字符替换另一些字符，语法格式如下：

```javascript
var result = '123456'.replace('123', 'abc') 
// 得到的 result 的值为字符串 'abc456'
```

```javascript
    let str = '<div>我是{{name}}</div>'
    let pattern = /{{([a-zA-Z]+)}}/
    let patternResult = pattern.exec(str)
    // console.log(patternResult)
    str = str.replace(patternResult[0], patternResult[1])
    console.log(str)
```

##### 多次replace

```javascript
let str = '<div>{{name}}今年{{ age }}岁了</div>'
let pattern = /{{\s*([a-zA-Z]+)\s*}}/

// 第一次匹配
let res1 = pattern.exec(str)
str = str.replace(res1[0], res1[1])
console.log(str) // 输出 <div>name今年{{ age }}岁了</div>

// 第二场匹配
let res2 = pattern.exec(str)
str = str.replace(res2[0], res2[1])
console.log(str) // 输出 <div>name今年age岁了</div>

// 第三次匹配
let res3 = pattern.exec(str)
console.log(res3)   //null
```

##### 使用while循环replace

```javascript
let str = '<div>{{name}}今年{{ age }}岁了</div>'
let pattern = /{{\s*([a-zA-Z]+)\s*}}/

let patternResult = null
while(patternResult = pattern.exec(str)) {
    str = str.replace(patternResult[0], patternResult[1])
}
console.log(str)
```

##### replace替换为真值

```javascript
let data = {
    name: '张三',
    age: 20
}

let str = '<div>{{name}}今年{{ age }}岁了</div>'
let pattern = /{{\s*([a-zA-Z]+)\s*}}/

let patternResult = null
while(patternResult = pattern.exec(str)) {
    str = str.replace(patternResult[0], data[patternResult[1]])
}
console.log(str)
```

### 实现简易的模板引擎

>步骤：
>
>①定义模板结构
>
>②预调用模板引擎
>
>③封装 template函数
>
>④导入并使用自定义的模板引擎

1.定义模板结构

```html
    <script type="text/html" id="tpl-user">
        <div>姓名：{{name}}</div>
        <div>年龄：{{age}}</div>
        <div>性别：{{  gender}}</div>
        <div>住址：{{address  }}</div>
    </script>
```

2.预调用模板引擎

```javascript
// 定义数据
let data = {
    name: 'zs',
    age: 23,
    gender: '男',
    address: '浙江丽水'
}

// 调用模板引擎
let htmlStr = template('tpl-user', data)

// 渲染html结构
document.getElementById('user-box').innerHTML = htmlStr
```

3.封装 template函数

```javascript
function template(id, data) {
  let str = document.getElementById(id).innerHTML
  let pattern = /{{\s*([a-zA-Z]+)\s*}}/
  
  let patternResult = null
  while(patternResult = pattern.exec(str)) {
    str = str.replace(patternResult[0], data[patternResult[1]])
  }

  return str
}
```

导入并使用自定义的模板引擎

最后导入JS
