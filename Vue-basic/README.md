## Vue介绍

- 动态构建用户界面的渐进式 JavaScript 框架
- 作者：尤雨溪

[中文官网](https://cn.vuejs.org/)
[英文官网](https://vuejs.org/)

### Vue特点

- 采用组件化模式，提高代码复用率、且让代码更好维护
- 声明式编码，让编码人员无需直接操作DOM，提高开发效率

### 与其它 JS 框架的关联

- 借鉴 Angular 的模板和数据绑定技术
- 借鉴 React 的组件化和虚拟 DOM 技术

### Vue周边库

- vue-cli: vue 脚手架
- vue-resource
- axios
- vue-router: 路由
- vuex: 状态管理
- element-ui: 基于 vue 的 UI 组件库(PC 端

## 初识Vue

- 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
- root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
- root容器里的代码被称为【Vue模板】
- Vue实例和容器是一一对应的
- 真实开发中只有一个Vue实例，并且会配合着组件一起使用
- {{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性
- 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新

```js
  <div id="root">
    <h1>Hello, {{name}}</h1>
    <h1>我的年龄是：{{age}}</h1>
    <h1>地址：{{address}}</h1>
  </div>


  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    // 创建 Vue 实例
    new Vue({
      el: '#root', // el 用于指定当前 Vue 实例为哪个容器服务，值通常为 css 选择器字符串
      // data 中用于存储数据， 数据供 el 所指定的容器去使用，值暂时先写成一个对象
      data: {
        name: 'DouYing',
        age: 20,
        address: '浙江丽水'
      }
    })
```

## 模板语法

**Vue模板语法有2大类：**

- 插值语法

  功能：用于解析标签体内容

  写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性

- 指令语法

  功能：用于解析标签（包括：标签属性、标签体内容、绑定事件…）

  举例：v-bind:href=“xxx” 或 简写为 :href=“xxx”，xxx同样要写js表达式，且可以直接读取到data中的所有属性

  备注：Vue中有很多的指令，且形式都是：v-???，此处我们只是拿v-bind举个例子
  ​

```vue
  <div id="root">
    <h1>插值语法：</h1>
    <h3>你好，{{name}}</h3>
    <hr />
    <h1>指令语法：</h1>
    <a v-bind:href="url" x="hello">点我进入DouYing的博客</a>
    <a :href="url" :x="hello">点我进入DouYing的博客</a>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false

    new Vue({
      el: '#root',
      data: {
        name: 'DouYing',
        url: 'http://www.douyingc.cn',
        hello: '你好'
      }
    })
```

## 数据绑定

**Vue中有2种数据绑定的方式：**

- 单向绑定(v-bind)

  语法：`v-bind:href ="xxx"` 或简写为 `:href`

  特点：数据只能从 data 流向页面

- 双向绑定(v-model)

  语法：`v-model:value="xxx"` 或简写为 `v-model="xxx"`

  特点：数据不仅能从 data 流向页面，还能从页面流向 data

**备注：**

- 双向绑定一般都应用在表单类元素上（如：input、select等）
- v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值
- v-model只能应用在表单类元素（输入类元素）表单类元素，是用户可以操作的，标题类的标签，不可以输入（没有Value值），不能捕获用户的输入，无法影响数据的变化

```vue
  <div id="root">
    <!-- 普通写法 -->
    <!-- 单向数据绑定：<input type="text" v-bind:value="name">
    <br>
    双向数据绑定：<input type="text" v-model:value="name">
    <br> -->

    <!-- 简写 -->
    单向数据绑定：<input type="text" :value="name">
    <br>
    双向数据绑定：<input type="text" v-model="name">
    <br>

    <!-- 如下代码是错误的，因为 v-model 只能应用在表单类元素(输入类元素)上 -->
    <!-- <h2 v-model:x="name">你好啊</h2> -->
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false

    new Vue({
      el: '#root',
      data: {
        name: 'DouYing'
      }
    })
```

## el和data的两种写法

**el的两种写法：**

- new Vue时候配置el属性
- 先创建Vue实例，随后再通过app.$mount(‘#root’)指定el的值

```js
// 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false

    // 第一种写法
    new Vue({
      el: '#root',
      data: {
        name: 'DouYing'
      }
    })
    // 第二种写法
    const app = new Vue({
      // el: '#root',
      data: {
        name: 'DouYing'
      }
    })
    console.log(app)
    setTimeout(() => {
      app.$mount('#root')
    }, 1000)
```

**data的两种写法：**

- 对象式
- 函数式（要求：data函数必须要返回一个对象return）

```js
// 对象式
new Vue({
  el: '#root',
  // data的第一种写法：对象式
  data: {
    name: 'DouYing'
  }
})

// 函数式
new Vue({
  el: '#root',
  // data的第二种写法：函数式
  // 不能写成箭头函数，否则 this 指向 window
  data: function () {
    console.log('@@@@', this) // 此处的 this 是 Vue 实例对象
    return {
      name: 'DouYing'
    }
  }
})
```

如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错

**一个重要的原则：**
由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了

## MVVM模型

- M：模型(Model) ：data中的数据
- V：视图(View) ：模板代码
- VM：视图模型(ViewModel)：Vue实例

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208071651287.png)

**观察发现：**

- data中所有的属性，最后都出现在了vm身上
- vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用

## 数据代理

### Object.defineProperty

```js
    let person = {
      name: 'DouYing',
      sex: '男',
    }
    Object.defineProperty(person, 'age', {
      value: 20,
      enumerable: true, // 控制属性是否可以枚举，默认值是 false
      writable: true, // 控制属性是否可以被修改，默认值是 false
      configurable: true, // 控制属实是否可以被删除，默认值是 false
    })
    console.log(person);
```

### get()和set()

```js
    let number = 20
    let person = {
      name: 'DouYing',
      sex: '男',
    }
    Object.defineProperty(person, 'age', {
      // value: 18,
      // enumerable: true, // 控制属性是否可以枚举，默认值是 false
      // writable: true, // 控制属性是否可以被修改，默认值是 false
      // configurable: true, // 控制属实是否可以被删除，默认值是 false

      // 当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
      get() {
        console.log('有人读取了age属性');
        return number
      },

      // 当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
      set(value) {
        console.log('有人修改了age属性，且值为', value);
        number = value
      }
    })
    console.log(person);
```

### 数据代理的定义

通过一个对象代理对另一个对象中属性的操作（读/写）

```js
  <!-- 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）-->
  <script>
    let obj = { x: 100 }
    let obj2 = { y: 200 }
    Object.defineProperty(obj2, 'x', {
      get() {
        return obj.x
      },

      set(value) {
        obj.x = value
      }
    })
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208071727627.png)

**总结：**

- Vue中的数据代理：

  通过vm对象来代理data对象中属性的操作（读/写）


- Vue中数据代理的好处：

  更加方便的操作data中的数据


- 基本原理：

  通过Object.defineProperty()把data对象中所有属性添加到vm上

  为每一个添加到vm上的属性，都指定一个getter/setter

  在getter/setter内部去操作（读/写）data中对应的属性

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208072153961.png)

## 事件处理

### 事件基本使用

- 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名
- 事件的回调需要配置在methods对象中，最终会在vm上
- methods中配置的函数，不要用箭头函数！否则this就不是vm了
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象
- @click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参

```js
  <div id="root">
    <h1>欢迎{{name}}学习</h1>
    <button v-on:click="showInfo1">点我提示信息1(不传参)</button>
    <!-- 简写 -->
    <button @click="showInfo2($event, 66)">点我提示信息2(传参)</button>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        name: 'DouYing',
      },
      methods: {
        showInfo1(event) {
          // console.log(event.target.innerText);
          // console.log(this); // 此处的 this 是 vm
          alert('同学你好1')
        },
        showInfo2(number, a) {
          // console.log(event.target.innerText);
          // console.log(this); // 此处的 this 是 vm
          console.log(event, number)
          alert('同学你好2')
        }
      }
    })
```

### 事件修饰符

**Vue中的事件修饰符：**

- prevent：阻止默认事件（常用）

  a标签跳转阻止跳转的默认行为

  ```html
  <a href="http://www.douyingc.cn" @click.prevent="showInfo">点我提示信息</a>
  ```

- stop：阻止事件冒泡（常用）

  阻止冒泡 点击的是按钮 冒泡到div身上

  ```html
  <div class="demo1" @click="showInfo">
    <button @click.stop="showInfo">点我提示信息</button>
  </div>
  ```

- once：事件只触发一次（常用）

  事件只触发一次

  ```html
  <button @click.once="showInfo">点我提示信息</button>
  ```

- capture：使用事件的捕获模式

  使用事件的捕获模式事件,是先捕获再冒泡

  - 不加：在冒泡阶段执行代码
  - 加：在捕获阶段执行代码

  ```js
  <div class="box1" @click.capture="showMsg(1)">
    div1
    <div class="box2" @click="showMsg(2)">
      div2
    </div>
  </div>

      const vm = new Vue({
        el: '#root',
        data: {
          name: 'DouYing',
        },
        methods: {
          showInfo(e) {
            alert('同学你好！')
            // console.log(e.target);
          },
          showMsg(msg) {
            console.log(msg);
            // alert('同学你好！')
          },
        }
      })
  ```

- self：只有event.target是当前操作的元素时才触发事件

  ```js
  <div class="demo1" @click.self="showInfo">
    <button @click="showInfo">点我提示信息</button>
  </div>

  const vm = new Vue({
    el: '#root',
    data: {
      name: 'DouYing',
    },
    methods: {
      showInfo(e) {
        alert('同学你好！')
        // console.log(e.target);
      },
    }
  })
  ```

- passive：事件的默认行为立即执行，无需等待事件回调执行完毕

  wheel 鼠标滚轮事件，加上大数字的循环，本来是要等循环事件结束之后，才会执行滚轮事件，但是加上passive后就能在循环事件的同时执行滚轮事件

  ```js
  <script type="text/javascript" src="../js/vue.js"></script>
  <style>
      *{
          margin-top: 20px;
      }
      .list{
          width: 200px;
          height: 200px;
          background-color: peru;
          overflow: auto;
      }
      li{
          height: 100px;
      }
  </style>
  </head>
  <body>

  <div id="root">
      <h2>欢迎来到{{name}}学习</h2>
  ```


      <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
      <ul @wheel.passive="demo" class="list">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
      </ul>

  </div>
  </body>

  <script>
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

  new Vue({
      el:'#root',
      data:{
          name:'DouYing'
      },
      methods:{
          demo(){
              for (let i = 0; i < 100000; i++) {
                  console.log('#')
              }
              console.log('累坏了')
          }
  })
  </script>
  ```

- 修饰符可以连续使用，用多个点连接

  先阻止默认行为 再阻止冒泡

  ```html
  <div class="demo1" @click="showInfo">
  	<!-- 修饰符可以连续写 -->
  	<a href="https://www.douyingc.cn" @click.prevent.stop="showInfo">点我提示信息</a>
  </div>
  ```

### 键盘事件

**Vue中常用的按键别名：**

- 回车 => enter
- 删除 => delete (捕获“删除”和“退格”键)
- 退出 => esc
- 空格 => space
- 换行 => tab (特殊，必须配合keydown去使用)
- 上 => up
- 下 => down
- 左 => left
- 右 => right

**Vue未提供别名的按键：**

可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

**系统修饰键（用法特殊）：**ctrl、alt、shift、meta

- 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
- 配合keydown使用：正常触发事件

**也可以使用keyCode去指定具体的按键（不推荐）**

**Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名**

```html
  <div id="root">
    <h1>欢迎{{name}}</h1>
    <!-- 按下回车 -->
    <input type="text" placeholder="按下回车提示输入" @keydown.enter="showInfo">
    <!-- 使用 CapsLock 切换大小写按键 多个单词使用 caps-lock
    有些特殊的按键，无法绑定，举例：特殊键盘的控制音量键
    top 键有些特殊 是失去焦点事件 只能配合keydown使用
    可以使用keyCode去指定具体的按键（不推荐）不同的键盘编码可能不统一 -->
    <input type="text" placeholder="按下回车提示输入" @keyup.13="showInfo">
    
    <!-- Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名 （不推荐） -->
    <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo">
    
    <!-- 只用按ctrl + y 时才有效(系统修饰键 后面可以 加 按键) -->
    <input type="text" placeholder="按下回车提示输入" @keydown.ctrl.y="showInfo">

  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    Vue.config.keyCodes.huiche = 13 // 定义了一个别名按钮 huiche
    new Vue({
      el: '#root',
      data: {
        name: 'DouYing'
      },
      methods: {
        showInfo(e) {
          // console.log(e.key, e.keyCode);
          console.log(e.target.value);
        }
      }
    })
  </script>
```

## 计算属性

### 姓名案例-插值语法

```vue
  <div id="root">
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    全名：<span>{{firstName}}-{{lastName}}</span>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三'
      }
    })
  </script>
```

### 姓名案例-methods

数据发生改变Vue一定会重写解析模板，并更新数据

```vue
  <div id="root">
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    全名：<span>{{fullName()}}</span>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三'
      },
      methods: {
        fullName() {
          console.log('@---fullName');
          return this.firstName + '-' + this.lastName
        }
      }
    })
  </script>
```

### 计算属性

- **定义**：要用的属性不存在，要通过已有属性计算得来

- **原理**：底层借助了Object.defineProperty方法提供的getter和setter

- **get函数什么时候执行？**

  初次读取时会执行一次

  当依赖的数据发生改变时会被再次调用

- **优势**：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便

- **备注**：

  计算属性最终会出现在vm上，直接读取使用即可

  如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变

```vue
  <div id="root">
    姓：<input type="text" v-model="firstName"><br>
    名：<input type="text" v-model="lastName"><br>
    全名：<span>{{fullName}}</span>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三',
      },
      computed: {
        fullName: {
          // get有什么用？ 当有人读取 fullName 时，get 就会被调用，且返回值就作为 fullName 的值
          // get什么时候调用？
          // 1.初次读取 fullName 时
          // 2.所依赖的数据发生变化时
          get() {
            console.log('get被调用了')
            console.log(this) // 此处的this 指向 vm
            return this.firstName + '-' + this.lastName
          },
          // set 什么时候调用？当 fullName 被修改时
          // set 不是必须写的, 如果确定数据只读,就可以不用书写set 
          set(value) {
            console.log('set', value)
            // 张-三
            const arr = value.split('-')
            this.firstName = arr[0]
            this.lastName = arr[1]
          }
        }
      }
    })
  </script>
```

### 计算属性简写(只读时可以使用)

计算属性更多的情况是不修改，呈现给用户看

```js
// 完整写法
fullName: {
          get() {
            console.log('get被调用了')
            console.log(this) // 此处的this 指向 vm
            return this.firstName + '-' + this.lastName
          },
          set(value) {
            console.log('set', value)
            // 张-三
            const arr = value.split('-')
            this.firstName = arr[0]
            this.lastName = arr[1]
          }
        }
```

```js
// 简写
computed: {
    fullName() {
      console.log('get被调用了')
      return this.firstName + '-' + this.lastName
    }
}
```

## 监视属性

### 天气案例（没用到监视属性）

```vue
  <div id="root">
    <h1>今天天气很{{info}}</h1>
    <button @click="changeWeather">切换天气</button>
    <!-- 绑定事件的时候：@xxx="yyy" yyy 可以写一些简单的语句 -->
    <!-- <button @click="isHot = !isHot">切换天气</button> -->
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        isHot: true
      },
      computed: {
        info() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        changeWeather() {
          this.isHot = !this.isHot
        }
      },
    })
  </script>
```

### 监视属性watch（也可以监视计算属性）

- 当被监视的属性变化时, 回调函数自动调用, 进行相关操作


- 监视的属性必须存在，才能进行监视

- 监视的两种写法：

  new Vue时传入watch配置

  通过vm.$watch监视

```vue
  <div id="root">
    <h1>今天天气很{{info}}</h1>
    <button @click="changeWeather">切换天气</button>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        isHot: true
      },
      computed: {
        info() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        changeWeather() {
          this.isHot = !this.isHot
        }
      },
      watch: {
        isHot: {
          immediate: true, // 初始化时让 handler 调用一下
          // handel 什么时候调用？当 isHot 发生改变时
          handler(newValue, oldValue) {
            console.log('isHot被修改了', newValue, oldValue) // 参数：newValue,oldValue 可以查看监视前的数值,和修改后的数值
          }
        }
      } 
    })
    vm.$watch('isHot', {
      immediate: true, // 初始化时让 handler 调用一下
      // handel 什么时候调用？当 isHot 发生改变时
      handler(newValue, oldValue) {
        console.log('isHot被修改了', newValue, oldValue) // 参数：newValue,oldValue 可以查看监视前的数值,和修改后的数值
      }
    })
  </script>
```

### 深度监视

- Vue中的watch默认不监测对象内部值的改变（一层）

- 配置deep:true可以监测对象内部值改变（多层）

- 备注：

  Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以

  使用watch时根据数据的具体结构，决定是否采用深度监视

**只监测a的变化 不监测b**

```vue
  <div id="root">
    <h1>今天天气很{{info}}</h1>
    <button @click="changeWeather">切换天气</button>
    <hr>
    <h2>a的值是：{{numbers.a}}</h2>
    <button @click="numbers.a++">点我让a+1</button>
    <h2>b的值是：{{numbers.b}}</h2>
    <button @click="numbers.b++">点我让b+1</button>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        isHot: true,
        numbers: {
          a: 1,
          b: 1
        }
      },
      computed: {
        info() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        changeWeather() {
          this.isHot = !this.isHot
        }
      },
      watch: {
        isHot: {
          // immediate: true, // 初始化时让 handler 调用一下
          // handel 什么时候调用？当 isHot 发生改变时
          handler(newValue, oldValue) {
            console.log('isHot被修改了', newValue, oldValue) // 参数：newValue,oldValue 可以查看监视前的数值,和修改后的数值
          }
        },
        // 监视多级结构中某个属性的变化
        'numbers.a': {
          handler() {
            console.log('a被修改了')
          }
        }
      }
    })
  </script>
```

**监视 a 和 b的变化（即监视整个number）**

配置项 deep:true 开启深度监测

```js
  <div id="root">
    <h1>今天天气很{{info}}</h1>
    <button @click="changeWeather">切换天气</button>
    <hr>
    <h2>a的值是：{{numbers.a}}</h2>
    <button @click="numbers.a++">点我让a+1</button>
    <h2>b的值是：{{numbers.b}}</h2>
    <button @click="numbers.b++">点我让b+1</button>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        isHot: true,
        numbers: {
          a: 1,
          b: 1
        }
      },
      computed: {
        info() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        changeWeather() {
          this.isHot = !this.isHot
        }
      },
      watch: {
        isHot: {
          // immediate: true, // 初始化时让 handler 调用一下
          // handel 什么时候调用？当 isHot 发生改变时
          handler(newValue, oldValue) {
            console.log('isHot被修改了', newValue, oldValue) // 参数：newValue,oldValue 可以查看监视前的数值,和修改后的数值
          }
        },
        // 监视多级结构中某个属性的变化
        numbers: {
          deep: true,
          handler() {
            console.log('numbers被修改了')
          }
        }
      }
    })
```

### 监视属性简写

要求： 不需要配置项时，可以使用简写

- **watch 方式一的正常写法**

  ```js
  watch: {
      isHot: {
            handler(newValue, oldValue) {
              console.log('isHot被修改了', newValue, oldValue) 
            }
  }
  ```

- **watch 方式一的简写 不允许书写成箭头函数**

  ```js
  watch: {
      isHot(newValue, oldValue) {
            console.log('isHot被修改了', newValue, oldValue)
          }
  }
  ```

- **watch 方式二的正常写法**

  ```js
      vm.$watch('isHot', {
        handler(newValue, oldValue) {
          console.log('isHot被修改了', newValue, oldValue)
        }
      })
  ```

- **watch 方式二的简写 不允许书写成箭头函数**

  ```js
      vm.$watch('isHot', function (newValue, oldValue) {
        console.log('isHot被修改了', newValue, oldValue)
      })
  ```

### watch 和 computed的区别

- **computed和watch之间的区别：**

  computed能完成的功能，watch都可以完成

  watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作

- **两个重要的小原则：**

  所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象

  所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象

- **需要在姓名改变时，延迟1s后实现才改变全名，只能使用watch**

  定时器 setTimeout 所指定的函数不是 Vue 所管理的函数，要写成箭头函数

  ```js
    watch: {
      firstName(val) {
        setTimeout(() => {
          this.fullName = val + '-' + this.lastName
        }, 1000);
      },
      lastName(val) {
        this.fullName = this.firstName + '-' + val
      }
    }
  ```

- **computed计算属性不能开启异步任务**

  因为其实现靠的是return 返回值，此时把return的返回值返回给了 setTimeout，则fullName没有返回值

  ```js
  computed:{
  	 fullName:{
  		setTimeout(()=>{
  			console.log('get被调用了')
  			return this.firstName + '-' + this.lastName
  		},1000)
  	} 
  }
  ```

## 绑定样式

- class样式

  写法:class="xxx" xxx可以是字符串、对象、数组

  ​	字符串写法适用于：类名不确定，要动态获取

  ​	对象写法适用于：要绑定多个样式，个数不确定，名字也不确定

  ​	数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用

- style样式

  :style="{fontSize: xxx}"其中xxx是动态值

  :style="[a,b]"其中a、b是样式对象

### class绑定

- **字符串写法**

  ```vue
  <div id="root">
  	<!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
  	<div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>
  </div>

  <script type="text/javascript">
  	Vue.config.productionTip = false

  	const vm = new Vue({
  		el:'#root',
  		data:{
  			name:'DouYing',
  			mood:'normal',
  		},
  		methods: {
  			changeMood(){
  				this.mood = 'happy'
  			}
  		},
  	})
  </script>
  ```

- **数组写法**

  div 初始有 basic 样式，日后可能增加样式多少个不确定

  ```js
  <!-- 绑定 class 样式--数组写法，适用于：要绑定样式个数不确定，名字也不确定 -->
  <div class="basic" :class="classArr">{{name}}</div><br>
  <div class="basic" :class="classArr">{{name}}</div> <br/><br/>
  const vm = new Vue({
  	el:'#root',
  	data:{
  		name:'DouYing
  		mood:'normal',
                  classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
  	},
  })
  ```

- **对象写法**

  div 初始有 basic 样式 切换text1 和 text2 （切换的个数确定，名字也确定，不确定的是到底使用不使用）

  ```js
  <!-- 绑定 class 样式--对象写法，适用于：要绑定样式个数确定，名字也确定，但要动态决定用不用 -->
  <div class="basic" :class="classObj">{{name}}</div>
  <div class="basic" :class="classObj">{{name}}</div> <br/><br/>
  const vm = new Vue({
  	el:'#root',
  	data:{
          classObj:{
  			atguigu1:false,
  			atguigu2:false,
  		},
  	},
  })
  ```

### style绑定

- **常规写法**

  ```vue
    <div id="root">
      <div class="basic" :style="styleObj">{{name}}</div>
    </div>
  </body>

  <script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
      el: '#root',
      data: {
        name: 'DouYing',
        styleObj: {
          fontSize: '40px',
          color: 'red',
          backgroundColor: 'orange'
        }
      },
    })
  </script>
  ```

- **数组写法（很少用）**

```vue
<div id="root">

	<!-- 绑定style样式--数组写法 -->
	// 方法1 两个对象用数组引用
	<div class="basic" :style="[styleObj,styleObj2]">{{name}}</div>
	// 方法2 在定义时就将两个对象定义为一个数组
	 <div class="basic" :style="[styleArr]">{{name}}</div>

</div>

<script type="text/javascript">
	Vue.config.productionTip = false

	const vm = new Vue({
		el:'#root',
		data:{
			// 方法1
             styleObj:{
				fontSize: '40px',
				color:'red',
			},
             styleObj2:{
				backgroundColor:'orange' // 背景颜色
			},
			// 方法2
			styleArr:[
					{
						fontSize: '40px',
						color:'blue',
					},
					{
						backgroundColor:'gray'
					}
				]
		},
	})
</script>
```

## 条件渲染

- v-if

  - 写法

    v-if="表达式" 

    v-else-if="表达式"

    v-else="表达式"

  - 适用于：切换频率较低的场景

  - 特点：不展示的DOM元素直接被移除

  - 注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”


- v-show
  - 写法：v-show="表达式"
  - 适用于：切换频率较高的场景
  - 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

​            

- 备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。

### 让div 隐藏 v-show

不仅可以可以写 Boolean 值 v-show=“false”，也可以写表达式 用表达式的结果来进行判断 v-show=“1 === 1”，此时结构存在但是不显示

```vue
  <div id="root">
    <!-- 使用 v-show 做条件渲染 -->
    <!-- <h1 v-show="a">欢迎{{name}}</h1> -->
    <!-- <h1 v-show="1 === 1">欢迎{{name}}</h1> -->

  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        name: 'DouYing',
        n: 0
      }
    })
  </script>
```

### 使用 v-if进行条件渲染

```vue
  <div id="root">
    <!-- 使用 v-if 做条件渲染 -->
    <!-- <h1 v-if="false">欢迎{{name}}</h1> -->
    <!-- <h1 v-if="1 === 1">欢迎{{name}}</h1> -->
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        name: 'DouYing',
        n: 0
      }
    })
  </script>
```

### v-if与template的配合使用

```vue
    <!-- v-if 与 template 配合使用 -->
    <template v-if="n === 1">
      <h2>DouYing</h2>
      <h2>浙江</h2>
      <h2>你好</h2>
    </template>
```

## 列表渲染

v-for指令:

- 用于展示列表数据
- 语法：v-for="(item, index) in xxx" :key="yyy"
- 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

### 遍历数组

**接受一个参数**

```vue
  <div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表</h2>
    <ul>
      <li v-for="p in persons" :key="p.id">{{p.name}}--{{p.age}}</li>
    </ul>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        persons: [
          { id: '001', name: '张三', age: 18 },
          { id: '002', name: '李四', age: 19 },
          { id: '003', name: '王五', age: 20 }
        ]
      },
    })
```

**接受两个参数**

```vue
  <div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表</h2>
    <ul>
      <li v-for="(p,index) in persons" :key="index">{{p.name}}--{{p.age}}</li>
    </ul>
  </div>
```

### 遍历对象

```vue
  <div id="root">
    <!-- 遍历对象 -->
    <h2>汽车信息（遍历对象）</h2>
    <ul>
      <li v-for="(value,k) in car" :key="k">
        {{k}}--{{value}}
      </li>
    </ul>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        car: {
          name: '奥迪A8',
          price: '70W',
          color: '黑色'
        },
      },
    })
  </script>
```

### 遍历字符串（用得少）

```vue
  <div id="root">
    <!-- 遍历字符串 -->
    <h2>测试遍历字符串（用得少）</h2>
    <ul>
      <li v-for="(char,index) in str" :key="index">
        {{char}}--{{index}}
      </li>
    </ul>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        str: 'hello'
      },
    })
  </script>
```

### 遍历指定次数（使用少）

```vue
  <div id="root">
    <!-- 遍历指定次数 -->
    <h2>测试遍历指定次数（用得少）</h2>
    <ul>
      <li v-for="(number,index) in 5" :key="index">
        {{number}}--{{index}}
      </li>
    </ul>
  </div>
```

### key的原理

**面试题：react、vue中的key有什么作用？（key的内部原理）**

- 虚拟DOM中key的作用：

  key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】 

  随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

- diff算法对比规则：

  (1)旧虚拟DOM中找到了与新虚拟DOM相同的key：

  ​	①若虚拟DOM中内容没变, 直接使用之前的真实DOM

  ​	②若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

  (2)旧虚拟DOM中未找到与新虚拟DOM相同的key

  ​     创建新的真实DOM，随后渲染到到页面


- 用index作为key可能会引发的问题：

  ​	①若对数据进行：逆序添加、逆序删除等破坏顺序操作:

  ​	会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低（因为要对后续的Dom重新新建）

  ​	②如果结构中还包含输入类的DOM：

  ​	会产生错误DOM更新 ==> 界面有问题

- 开发中如何选择key?:

  ①最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值

  ②如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

  ③不写key值时，Vue会把的索引值index自动作为key

**示例-数组中添加一个老刘**

添加的位置在数组的前面，会出现问题（索引为0，索引后移）；添加在数组的后面不会出现问题

```vue
  <div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表（遍历数据）</h2>
    <button @click.once="add">添加一个老刘</button>
    <ul>
      <li v-for="(p,index) in persons" :key="index">
        {{p.name}}--{{p.age}}
        <input type="text">
      </li>
    </ul>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        persons: [
          { id: '001', name: '张三', age: 18 },
          { id: '002', name: '李四', age: 19 },
          { id: '003', name: '王五', age: 20 }
        ],
      },
      methods: {
        add() {
          const p = { id: '004', name: '老刘', age: 40 }
          this.persons.unshift(p)
        }
      },
    })
```

**问题：**

数据串行，老刘--40把张三--18顶下去了

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208091709385.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208091709543.png)

**解决方法：** 

使用 p.id 作为key

```vue
  <div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表（遍历数据）</h2>
    <button @click.once="add">添加一个老刘</button>
    <ul>
      <li v-for="(p,index) in persons" :key="index">
        {{p.name}}--{{p.age}}
        <input type="text">
      </li>
    </ul>
  </div>
```

**虚拟Dom的对比算法**

**index作为key产生的问题**

1.diff首先对比生成的两个虚拟DOM 张三-18 和 老刘-30，发现不同，打个X

2.再对比两个input，发现相同打个X

3.再用相同的方法把三行都对比后，开始生成新的真实DOM

4.在这个新的真实DOM里，老刘-30是新的，但是input是沿用原来的，所以输入框内容包含“张三-18”

5.生成最后一个王五-20的时候，生成的input是新的，所以输入框内容为空
![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208091739123.png)

**id作为key的作用**

1.同样是对比两个虚拟DOM，但这一次有任何一个不同，内容都不会沿用

2.对比第一行，老刘-30 和 张三-18不同，在创建新的DOM时，直接创建新的内容 即老刘-30 空白input

3.对比其他行，都一样，所以都引用的原来的数据

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208091739081.png)

### 列表过滤

**watch方法过滤（少用）**

```vue
  <div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <ul>
      <li v-for="(p,index) in filPersons" :key="p.id">
        {{p.name}}-{{p.age}}-{{p.sex}}
      </li>
    </ul>
  </div>
  
  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    // 用watch 实现
    new Vue({
      el: '#root',
      data: {
        keyWord: '',
        persons: [
          { id: '001', name: '马冬梅', age: 18, sex: '女' },
          { id: '002', name: '周冬雨', age: 19, sex: '女' },
          { id: '003', name: '周杰伦', age: 20, sex: '男' },
          { id: '004', name: '温兆伦', age: 21, sex: '男' }
        ],
        filPersons: []
      },
      watch: {
        keyWord: {
          immediate: true, // 不等发生改变时就调用了一次（否则一开始没有数据）
          handler(val) {
            this.filPersons = this.persons.filter((p) => {
              return p.name.indexOf(val) !== -1
            })
          }
        }
      }
    })
  </script>
```

**computed方法过滤（常用）**

```vue
  <div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <ul>
      <li v-for="(p,index) in filPersons" :key="p.id">
        {{p.name}}-{{p.age}}-{{p.sex}}
      </li>
    </ul>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    // 用 computed 实现
    new Vue({
      el: '#root',
      data: {
        keyWord: '',
        persons: [
          { id: '001', name: '马冬梅', age: 18, sex: '女' },
          { id: '002', name: '周冬雨', age: 19, sex: '女' },
          { id: '003', name: '周杰伦', age: 20, sex: '男' },
          { id: '004', name: '温兆伦', age: 21, sex: '男' }
        ],
      },
      computed: {
        filPersons() {
          return this.filPersons = this.persons.filter((p) => {
            return p.name.indexOf(this.keyWord) !== -1
          })
        }
      }
    })
  </script>
```

### 列表排序

```vue
  <div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWord">
    <button @click="sortType = 1">年龄升序</button>
    <button @click="sortType = 2">年龄降序</button>
    <button @click="sortType = 0">原顺序</button>
    <ul>
      <li v-for="(p,index) in filPersons" :key="p.id">
        {{p.name}}-{{p.age}}-{{p.sex}}
      </li>
    </ul>
  </div>

  <script>
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false
    // 用 computed 实现
    new Vue({
      el: '#root',
      data: {
        keyWord: '',
        sortType: 0, // 0 原顺序 1 降序 2 升序
        persons: [
          { id: '001', name: '马冬梅', age: 22, sex: '女' },
          { id: '002', name: '周冬雨', age: 18, sex: '女' },
          { id: '003', name: '周杰伦', age: 28, sex: '男' },
          { id: '004', name: '温兆伦', age: 24, sex: '男' }
        ],
      },
      computed: {
        filPersons() {
          const arr = this.filPersons = this.persons.filter((p) => {
            return p.name.indexOf(this.keyWord) !== -1
          })
          // 判断是否需要排序
          if (this.sortType) {
            arr.sort((p1, p2) => {
              return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age
            })
          }
          return arr
        }
      }
    })
  </script>
```

## Vue检测数据改变的原理

### 更新数据时遇到的一个问题

**成功**

```js
methods: {
        updateMei() {
          this.persons[0].name = '马老师' // 奏效
          this.persons[0].age = 50 // 奏效
          this.persons[0].sex = '男' // 奏效
        }
      }
```

**失败 数据已经修改成功，但是Vue 没有发现数据的改变**

```js
methods: {
        updateMei() {
          this.persons[0] = { id: '001', name: '马老师', age: 50, sex: '男' }
        }
      }
```

**成功（后面解释原因）**

```js
methods: {
	updateMei(){
		this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'}) //奏效
	}
}		
```

### Vue监测数据改变的原理–对象

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208092302972.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208092302974.png)

**原理核心代码如下**
相当于创建了一个function Observer(obj)，用这个方法为每一个对象赋setter和getter方法

```js
  <script>
    let data = {
      name: 'DouYing',
      address: '浙江丽水'
    }

    // 创建一个监视的实例对象，用于监视 data 中属性的变化
    const obs = new Observer(data)
    console.log(obs)

    // 准备一个 vm 实例对象
    let vm = {}
    vm._data = data = obs

    function Observer(obj) {
      // 汇总对象中所有的属性形成一个数组
      const keys = Object.keys(obj)
      // 遍历
      keys.forEach((k) => {
        Object.defineProperty(this, k, {
          get() {
            return obj[k]
          },
          set(val) {
            console.log(`${k}被修改了，我要去解析模板，生成虚拟DOM`)
            obj[k] = val
          }
        })
      })
    }
  </script>
```

### Vue.set方法（Vue Api）

- 管理者想添加 Vue 尚不完善的功能
- 如：添加一个性别，当时性别有没有定义下来，随着用户的交互，代码的发现，需要性别

**解决方式（两种方式）：**

- Vue.set(target,key,val) 在Vue身上

  ​	target 目标（往谁的身上添加属性）

  ​	key 什么属性

  ​	val 属性的值

  ```js
  Vue.set(vm._data.student,'sex','男')
  ```

- vm.$set(vm._data.student,‘sex’,‘男’) 在vm身上

  ```js
  vm.$set(vm._data.student,'sex','女')
  ```

上面两种方法 _data均可省略

**局限性**

- 只能对对象属性用set
- 不能对Vue实例，或Vue实例的根数据对象用set，即不能直接往data里插一个新的数据
  **添加一个功能点我给学生添加一个性别**

```vue
<div id="root">
	<button @click="addSex">添加一个性别属性，默认值是男</button>
	<h2>姓名：{{student.name}}</h2>
	<h2 v-if="student.sex">性别：{{student.sex}}</h2>
</div>

<script type="text/javascript">
Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

const vm = new Vue({
	el:'#root',
	data:{
	},
	methods: {
		addSex(){
			// Vue.set(this.student,'sex','男')  或者
			this.$set(this.student,'sex','男')
		}
	}
})
</script>
```

### Vue监测数据改变的原理–数组

```js
data:{
   	hobby:['抽烟','喝酒','烫头'],
   	friends:[
   		{name:'jerry',age:35},
   		{name:'tony',age:36}
   	]
   }
},
```

直接用下标修改会因为下图原因（因为数组保存的是个字符串，Vue不会对每个字符去设置一个getter和setter）

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208100009430.png)

要修改数组要通过 Vue 默认修改数组的方法 (7个操作数组的方法)
（注：这些方法是将Array中的同名方法进行封装，在里面插入setter和getter）

- push 最后的位置新增一个元素

- pop 删除最后一个元素

- shift 删除第一个元素

- unshift 最前面添加一个元素

- splice 指定位置插入一个元素，或者删除一个元素，或者替换调一个元素

- sort 数组排序

- reverse 翻转数组

- filter 不影响原数组，但是还想使用filter 怎么办？

  ​	把过滤生成的新数组，替换掉原来的数组

共同点：可以修改数组，引起数组的改变

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202208100009429.png)

### Vue数据监测总结

Vue监视数据的原理：

- vue会监视data中所有层次的数据

- 如何监测对象中的数据

  ​	通过setter实现监视，且要在new Vue时就传入要监测的数据

  ​	(1).对象中后追加的属性，Vue默认不做响应式处理

  ​	(2).如需给后添加的属性做响应式，请使用如下API：

  ​	Vue.set(target，propertyName/index，value) 或 

  ​	vm.$set(target，propertyName/index，value)

- 如何监测数组中的数据？

  ​	通过包裹数组更新元素的方法实现，本质就是做了两件事：

  ​	(1).调用原生对应的方法对数组进行更新

  ​	(2).重新解析模板，进而更新页面

- 在Vue修改数组中的某个元素一定要用如下方法：

  ​	1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()

  ​	2.Vue.set() 或 vm.$set()

特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性

**综合案例**

```vue
  <div id="root">
    <h1>学生信息</h1>

    <button @click="student.age++">年龄+1岁</button> <br />
    <button @click="addSex">添加性别属性，默认值：男</button> <br />
    <button @click="student.sex = '未知' ">修改性别</button> <br />
    <button @click="addFirend">在列表首位添加一个朋友</button> <br />
    <button @click="updateFirstFirendName">修改第一个朋友的名字为：张三</button> <br />
    <button @click="addHobby">添加一个爱好</button> <br />
    <button @click="updateHobby">修改第一个爱好为：开车</button> <br />
    <button @click="removeRap">过滤掉爱好中的Rap</button> <br />

    <h3>姓名：{{student.name}}</h3>
    <h3>年龄：{{student.age}}</h3>
    <h3 v-if="student.sex">性别：{{student.sex}}</h3>
    <h3>爱好：</h3>
    <ul>
      <li v-for="(h,index) in student.hobby" :key="index">
        {{h}}
      </li>
    </ul>
    <h3>朋友们：</h3>
    <ul>
      <li v-for="(f,index) in student.friends" :key="index">
        {{f.name}}--{{f.age}}
      </li>
    </ul>
  </div>
</body>

<script type="text/javascript">
  Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    el: '#root',
    data: {
      student: {
        name: 'DouYing',
        age: 20,
        hobby: ['唱', '跳', 'Rap'],
        friends: [
          { name: 'jerry', age: 35 },
          { name: 'tony', age: 36 }
        ]
      }
    },
    methods: {
      addSex() {
        // Vue.set(this.student, 'sex', '男')
        this.$set(this.student, 'sex', '男')
      },
      addFirend() {
        this.student.friends.unshift({ name: 'jack', age: 70 })
      },
      updateFirstFirendName() {
        this.student.friends[0].name = '张三'
      },
      addHobby() {
        this.student.hobby.push('ikun')
      },
      updateHobby() {
        // this.student.hobby.splice(0, 1, '开车')
        // Vue.set(this.student.hobby, 0, '开车')
        this.$set(this.student.hobby, 0, '开车')
      },
      removeRap() {
        this.student.hobby = this.student.hobby.filter((h) => {
          return h !== 'Rap'
        })
      }
    },
  })
</script>
```

