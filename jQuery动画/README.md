## 获取位置

通过jQuery直接获取元素的位置

```javascript
  // 取值
  $('选择器').offset()
  // 取值
  $('选择器').position()
  // 返回值
  {top: 126, left: 58}
```

>参照物不同：
>
>offset参照html标签
>
>position参照离他最近有定位的祖先元素
>
>margin：
>
>offset会把外边距margin计算进去
>
>position以外边距margin为边界,不计算margin

## 滚动距离

通过jQuery获取元素的滚动距离

```javascript
  // 取值
  $('选择器').scrollLeft()
  $('选择器').scrollTop()
  // 赋值
  $('选择器').scrollLeft(值)
  $('选择器').scrollTop(值)
```

## 显示&隐藏动画

通过jQuery以动画的方式切换元素的显示&隐藏

```javascript
// 显示
$('选择器').show(持续时间)
// 隐藏
$('选择器').hide(持续时间)
// 显示&隐藏
$('选择器').toggle(持续时间)
```

>单位为毫秒

## 淡入&淡出动画

通过jQuery以淡入&淡出的方式切换元素的显示隐藏

```javascript
// 淡入
$('选择器').fadeIn(持续时间)
// 淡出
$('选择器').fadeOut(持续时间)
// 淡入&淡出
$('选择器').fadeToggle(持续时间)
```

>单位为毫秒

## 展开&收起动画

通过jQuery以展开(高度增大-显示)&收起(高度减小-隐藏)的方式切换元素的显示隐藏

```javascript
// 展开
$('选择器').slideDown(持续时间)
// 收起
$('选择器').slideUp(持续时间)
// 展开&收起
$('选择器').slideToggle(持续时间)
```

>单位为毫秒

## 动画队列及停止方法

通过jQuery为元素设置的多个动画会依次添加到动画队列中,并根据添加的顺序依次播放

```javascript
// 停止当前动画
$('选择器').stop()
// 清空队列 在动画当前状态停止
$('选择器').stop(true)
// 清空队列 直接到当前动画的结束状态
$('选择器').stop(true,true)
```

>动画方法和stop方法返回的是同一个jQuery对象(链式编程)
>
>传递1个true和传递2个true的区别
>
>1个:动画停止在执行stop方法的瞬间
>
>2个:直接到当前播放动画的结束状态

## 自定义动画

 jQuery提供了animate方法来实现更为复杂的动画效果

```javascript
  $('选择器').animate(动画属性, 持续时间)
```

>可以写成对象的形式
>
>数值类样式支持动画,支持多个
>
>默认单位是px
>
>支持非样式的特殊属性
>
>持续时间单位是毫秒

## 插入节点

jQuery 中封装了在指定位置动态插入元素节点的方法,可以插入节点或者改变节点位置

```javascript
// 4个方法参数一样  位置不同
$('父元素选择器').append(参数)   // 父元素结尾
$('父元素选择器').prepend(参数)  // 父元素开头
$('兄弟元素选择器').before(参数) // 兄弟元素前面
$('兄弟元素选择器').after(参数) // 兄弟元素后面
```

>插入节点:传入创建的dom元素或者html结构
>
>改变位置:传入现有的dom元素或者jQuery对象

## 动画的回调函数

所有的  jQuery 动画方法都支持传入回调函数

```javascript
$('选择器').基础动画方法(回调函数)
$('选择器').基础动画方法(持续时间, 回调函数)
$('选择器').animate(属性, 回调函数)
$('选择器').animate(属性, 持续时间, 回调函数)
```

>回调函数会在动画执行完毕时立刻执行
>
>回调函数中的this是执行动画的dom元素

动画的延迟方法

jQuery 不仅可以设置动画执行的速度，还能在动画执行前设置一定的延时

```javascript
$('选择器').delay(延迟时间).动画方法()
$('选择器').delay(延迟时间).动画方法().delay(延迟时间).动画方法()
```

>单位为毫秒

## 获取尺寸

jQuery 对获取元素尺寸进行了封装，使得在不同场景中获取元素尺寸十分方便

```javascript
  $('选择器').width() // 内容宽度
  $('选择器').height() // 内容高度
  $('选择器').innerWidth() // 内容宽度 + 内边距
  $('选择器').innerHeight() // 内容高度 + 内边距
  $('选择器').outerWidth() // 内容宽度 + 内边距 + 边框
  $('选择器').outerHeight() // 内容高度 + 内边距 + 边框
  $('选择器').outerWidth(true) // 内容宽度 + 内边距 + 边框 + 外边距
  $('选择器').outerHeight(true) // 内容高度 + 内边距 + 边框 + 外边距
```

## 事件参数

jQuery 绑定的事件中可以获取事件参数(事件对象),用法和原生js完全一致

```javascript
$('选择器').事件(function(event){
event.stopPropagation()
})
```

>jQuery已经处理好了事件参数的兼容性

## 删除节点

jQuery 中封装了动态删除元素节点的方法

```javascript
jQuery对象.remove()
```

>remove方法删除的是调用方法的元素节点

## 事件委托

jQuery 中封装了事件委托的支持 , 直接通过 on 方法即可使用

```javascript
// 直接绑定
$('选择器').on('事件名',function(){})
// 事件委托
$('祖先选择器').on('事件名', '后代选择器', function () {})
```

>减少事件注册
>
>解决动态增加后代元素的事件绑定问题
>
>原理是事件冒泡
>
>回调函数中的this是触发事件的dom对象

## 入口函数

jQuery 中提供了更为简便的入口函数写法

```javascript
// jQ写法
$(window).on('load', function () {})
// 完整写法
$(document).ready(function () {})
// 简化写法
$(function () {})
```

>页面资源加载完毕执行(包括图片、css等等)逻辑代码
>
>DOM载入完毕就会执行

## 轮播图

| 常用配置  |        含义        | 默认值 |    备注    |
| :-------: | :----------------: | :----: | :--------: |
| autoplay  | 轮播图效果自动执行 | false  | true/false |
|  arrows   |  是否显示翻页按钮  |  true  | true/false |
| prevArrow | 自定义 上一页 按钮 |   无   | 标签选择器 |
| nextArrow | 自定义 下一页 按钮 |   无   | 标签选择器 |
|   dots    |   是否显示指示器   | false  | true/false |

```javascript
// 调用插件方法初始化
$('.your-class').slick({
autoplay:true,
arrows:true
...
})
```

## 懒加载插件

jQuery 的懒加载插件 lazyload

懒加载：图片用到了再去加载，常见于有大量图片的网页，比如电商

```html
<!-- 图片 -->
<img class="lazyload" data-original="./images/1.png" alt="" />
```

```javascript
// 找到希望懒加载的图片并调用lazyload方法
$('.lazyload').lazyload()
```

> 图片地址设置给 data-original

## 全屏滚动

jQuery 的全屏滚动插件 fullpage

```html
<div id="fullpage">
<div class="section">第一屏</div>
<div class="section">第二屏</div>
<div class="section">第三屏</div>
</div>
```



>每个区域必须有 section 这个类名

```javascript
$('#fullpage').fullpage({
....
})
```

|      常用配置      |               含义                | 默认值 |        备注        |
| :----------------: | :-------------------------------: | :----: | :----------------: |
|     navigation     |           是否显示导航            | false  |     true/false     |
| navigationPosition |             导航位置              | right  |     left/right     |
|      anchors       |        每个区域的锚链接名         |   []   |      在地址栏      |
|     afterLoad      | 区域加载完毕的回调函数，有2个参数 |   无   | 参数：锚链接、索引 |

## 提交事件

form 标签本身具有提交数据的能力，但是现在基本不这么用

>点击提交按钮，输入区域点击回车都会触发表单提交
>
>表单中的 button 默认就是提交按钮

现在比较流行在表单的 submit 事件中阻止默认行为，自己获取数据并提交

```javascript
$('form').submit(function (event) {
// 阻止默认行为
event.preventDefault()
// 阻止默认行为
return false
})
```

>返回false 或者 preventDefault 都可以阻止默认行为

## 日期选择器

jQuery 的日期选择器插件 datepicker ,让用户在不同的浏览器下可以用一致的方式来选择日期

```javascript
<!-- 准备html结构 -->
<input type="text" class="datapicker" />

  // 调用插件方法
  $('.datapicker').datepicker({
    …
  })
```



| 常用配置 |           含义           | 默认值 |        备注        |
| :------: | :----------------------: | :----: | :----------------: |
| autoPick |   是否自动选择当前日期   | false  |     true/false     |
| autoHide | 选择日期之后是否自动关闭 | false  |     true/false     |
| language |         语言模式         |   空   | 需要结合语言包使用 |

>默认显示的是英文，需要导入 中文语言包

## 表单验证

jQuery 的表单验证插件 validate , 验证用户在表单中输入的内容

```javascript
$('form').validate({
// 配置
})
```

|  常用配置   |                   含义                    | 默认值 |     备注     |
| :---------: | :---------------------------------------: | :----: | :----------: |
|   onBlur    |              失去焦点时验证               | false  |  true/false  |
|  onSubmit   |              提交表单时验证               |  true  |  true/false  |
|  sendForm   |               是否提交表单                |  true  |  true/false  |
|    valid    |     所有表单项验证通过执行的 回调函数     |   无   | this是jQ对象 |
|   invalid   | 至少一个表单项为通过验证时执行的 回调函数 |   无   | this是jQ对象 |
| description |               错误提示信息                |   无   |    Object    |

```html
      <input
        type="password"
        name="password"
        data-required
        data-pattern=".{6,}"
      />
```

|  自定义属性   |        含义        |    备注    |
| :-----------: | :----------------: | :--------: |
| data-required | 验证表单项不能为空 |  不需要值  |
| data-pattern  | 基于正则表达式验证 | 正则表达式 |

```html
  <input
    type="password"
    name="password"
    data-required
    data-describedby="password-error"
    data-description="password"
data-pattern=".{6,}"
  />
  <span class="error" id="password-error"></span>
```

```javascript
  $('form').validate({
    description: {
      password: {
        required: '密码不能为空!',
        pattern: '密码不能少于6位!',
      },
    },
```

| 自定义属性       | 含义                   | 备注                      |
| ---------------- | ---------------------- | ------------------------- |
| data-describedby | 指定显示错误信息的标签 | 标签的id                  |
| data-description | 指定错误信息的内容     | 和description中的属性对应 |

>这2个属性需要结合 description 配置使用

> 表单元素要放在form里面

## 克隆

jQuery 中封装了克隆(复制)，节点的方法

```javascript
// 不带事件
.clone()
// 带事件
.clone(true)
```

>方法返回的还是 jQuery对象  
>
>传入 true 事件也会一起克隆

## 获取dom对象

jQuery 封装了获取内部dom对象的方法

```javascript
// get方法获取
.get(索引)
// 中括号获取
[索引]
```

>索引从 0 开始  
>
>获取到的是dom对象

表单序列化

jQuery 中封装了快速获取表单数据的方法 , 叫做序列化

```javascript
$('form').serialize()
```

>表单元素要有 name 属性才可以获取到value 值
>
>获取到的数据格式是 name1=value1&name2=value2 的字符串

## 插件机制

插件是 jQuery 提供的扩展机制 , 本质是往 jQuery 原型对象上添加方法

```javascript
  jQuery.fn.extend({
    插件名 (参数) {
      // 逻辑
    }
  })
```

>jQuery 是$ 的别名
>
>jQuery 内部也是通过这种方式添加方法

## 工具方法

 jQuery 除了封装了大量的 DOM操作外，还提供了一些工具方法，这些方法通过 $ 或 jQuery 直接调用 

```javascript
   // 遍历数组
  $.each(数组, function (下标, 值) {})
   // 遍历并返回新数组
  $.map(数组,function(值){
    // 返回新的值
  })
```

>不仅仅只有这2个方法
>
>逐步被 ES6 及更高级的版本新增特性取代

