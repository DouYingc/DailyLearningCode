## 认识jQuery

jQuery是JavaScript类库（JS文件），封装了很多简单易用的方法（浏览器兼容），绝大多数用来简化DOM操作

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207232007388.png)

DOM语法

```javascript
      let li = document.querySelectorAll('li')
      for(let i = 0; i < li.length; i++) {
        li[i].onclick = function() {
          this.style.backgroundColor = 'pink'
        }
      }
```

jQuery语法

```javascript
      $('li').click(function () {
        $(this).css('backgroundColor', 'pink')
      })
```

## 选择器

jQuery 中通过选择器来获取 DOM 节点，功能类似于原生的querySelectorAll 方法，支持的选择器与 CSS 的选择器几乎一致。

```javascript
// 语法
$('选择器')
// 修改背景色
$('选择器').css('backgroundColor', 'yellowgreen')

```

## jQuery对象

jQuery 中利用选择器获取到的并非原生的DOM 对象，而是 jQuery对象

语法

```javascript
// 选择器获取
$('选择器')
// dom对象转换
$(dom对象)
```

>jQuery对象 和 DOM对象 的语法不能混用

## 事件绑定

在jQuery中以原生事件类型的名称为依据, 封装了相对应的事件处理方法

语法

```javascript
 $('选择器').事件名(function () {
     // 逻辑....
 })

```

>注意：
>
>事件名开头不需要写on
>
>回调函数中的 this 就是触发事件的 dom 元素

## 链式编程

链式编程 通过点(.) 把多个操作(方法)连续的写下去, 形成和 链子 一样的结构

语法

```javascript
$('.text').focus(回调函数).blur(回调函数).change(回调函数)
```

>大部分 jQ对象 方法的返回值还是同一个 jQ对象

## 内容操纵

```javascript
// 设置
$(‘选择器’).html('内容')
$(‘选择器’).text(‘内容')
// 读取
$('选择器').html()
$('选择器').text()
```

>设置时: html 方法解析标签 ,  text不解析标签
>
>取值时: html 方法获取标签 ,  text只获取文本
>
>有一种使用方式支持链式编程

## 过滤方法

jQuery 中封装了过滤方法,对 jQuery 对象中的 dom 元素再次筛选

```javascript
//  匹配的第一个元素
.first()
// 匹配的最后一个元素
.last()
// 根据索引匹配元素
.eq(索引)
```

>eq方法的索引从0开始
>
>返回的是jQuery对象

## 样式操纵

jQuery 中对样式的操作进行封装 , 可以设置或者获取样式

键值对方法设置

```javascript
// 1. 键值对设置
.css('样式名','值')
.css('backgroundColor','pink')
.css('color','red')
.css('width','200px')
.css('height',200)
```

对象方式设置

```javascript
// 2. 对象方式设置
.css(对象)
.css({
    backgroundColor:'pink',
    color:'red',
    width:'200px',
    height:200
})
```

样式获取

```javascript
// 3. 样式获取
.css('样式名')
.css('width')
```

>数值类的样式省略单位,默认会使用 px
>
>获取样式需要传递样式名

## 属性操纵

jQuery 中对属性的操作进行封装 , 可以设置、获取和删除属性

attr方法

```javascript
// 1.赋值
.attr('属性名','值')
// 2.取值
.attr('属性名')
// 3.删除属性
.removeAttr('属性名')
```

操纵value

jQuery 中封装了操纵表单元素value属性的方法，可以取值和赋值

```javascript
// 1. 赋值
.val('参数')
// 2. 取值
.val()
```

## 查找方法

jQuery 中封装了查找元素的方法，可以基于元素的结构关系查找新的元素

```javascript
// 1. 父元素
.parent()
// 2. 子元素 
.children()
// 3. 兄弟元素
.siblings()
// 4. 后代元素
.find('选择器')
```

>find方法方法需要传入选择器
>
>children 、sibings 方法支持传入选择器

## 操纵类名

jQuery 中封装了为网页元素添加、移除、检测、切换类名的方法。

```javascript
// 1. 添加类名
.addClass('类名')
// 2. 移除类名
.removeClass('类名')
// 3. 判断类名 返回布尔值
.hasClass('类名')
// 4. 切换类名
.toggleClass('类名')
```

>参数都是需要操纵的类名

## 事件进阶

 jQuery 中封装了更为灵活的 on/off、one 方法处理 DOM 事件

```javascript
// 1. 注册事件
.on('事件名', function(){})
// 2. 移除指定事件
.off('事件名')
// 3. 移除所有事件
.off()
// 4. 注册一次性事件
.one('事件名', function(){})
```

>on , one 方法回调函数中的 this 是触发事件的 dom 元素

## 触发事件

 jQuery 中如何通过代码的方式触发绑定的事件

```javascript
// 1. 直接触发
.事件名()
// 2. trigger触发
.trigger('事件名')
// 3. 触发自定义事件
.trigger('自定义事件')
// 4. 注册自定义事件
.on('自定义事件',function(){})
```

## window事件绑定

```javascript
// 滚动
$(window).scroll(function () {})
//  点击
$(window).click(function () {})
```

