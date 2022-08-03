## 深浅拷贝

### 浅拷贝

浅拷贝拷贝的是地址

常见方法：

1.拷贝对象：`Object.assgin() / 展开运算符{...obj}拷贝对象`

2.拷贝数组：`Array.prototype.concat() 或者[...arr]`

>问题：
>
>如果是简单数据类型拷贝值，引用数据类型拷贝的是地址 (简单理解： 如果是单层对象，没问题，如果有多层就有问题)

>直接赋值和浅拷贝的区别：
>
>直接赋值的方法，主要是对象，都会相互影响，因为是直接拷贝对象栈里面的地址
>
>浅拷贝如果是一层对象，不相互影响，如果出现多层对象拷贝还会相互影响

### 深拷贝

深拷贝拷贝的是对象，不是地址

常见方法：

#### 通过递归实现深拷贝

函数递归：如果一个函数在内部可以调用其本身，那么这个函数就是递归函数

```javascript
        const obj = {
            uname: 'jxy',
            age: 18,
            hobby: ['足球', 'CSGO'],
            family: {
                baby: 'j'
            }
        }
        const o = {}
        // 拷贝函数
        function deepCopy(newObj, oldObj) {
            for(let k in oldObj) {
                // 处理数组问题
                // 必须先写数组再写对象
                if(oldObj[k] instanceof Array) {
                    newObj[k]= [] 
                    deepCopy(newObj[k], oldObj[k])
                }else if (oldObj[k] instanceof Object) {
                    newObj[k]= {}
                    deepCopy(newObj[k], oldObj[k])
                }else {
                    // k是属性名 oldObj[k]是属性值
                    // newObj[k] === o.uname
                    newObj[k] = oldObj[k]
                }

            }
        }
        deepCopy(o, obj) // 函数调用 o 新对象 obj 旧对象
        o.age = 20
        o.hobby[0] = '篮球'
        o.family.baby = 'h'
        console.log(o)
        console.log(obj)
```

>注意：
>
>由于递归很容易发生“栈溢出”错误(stack overflow)，所以必须加退出条件 return

```javascript
        let i = 1
        function fn() {
            console.log(`这是第${i}次`)
            if(i >= 6) {
                return
            }
            i++
            fn()
        }
        fn()
```

利用递归函数实现 setTimeout 模拟 setInterval效果**

```javascript
        function getTime() {
            document.querySelector('div').innerHTML = new Date().toLocaleString()
            setTimeout(getTime, 1000)
        }
        getTime()
```

#### lodash/cloneDeep

首先引入lodash.js

```javascript
        const obj = {
            uname: 'jxy',
            age: 18,
            hobby: ['足球', 'CSGO'],
            family: {
                baby: 'j'
            }
        }
        const o = _.cloneDeep(obj)
        o.family.baby = 'h'
        console.log(o)
        console.log(obj)
```

#### 通过JSON.stringify()实现

```javascript
        const obj = {
            uname: 'jxy',
            age: 18,
            hobby: ['足球', 'CSGO'],
            family: {
                baby: 'j'
            }
        }
        // 把对象转换成 JSON字符串
        // JSON.stringify(obj)
        // 字符串转换成对象
        const o = JSON.parse(JSON.stringify(obj))
        o.family.baby = 'h'
        console.log(o)
        console.log(obj)
```

## 异常处理

### throw 抛异常

异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行

```javascript
        function fn(x, y) {
            if(!x || !y) {
                // throw `没有参数传递进来`
                throw new Error('没有参数传递进来')
            }
            return x + y
        }
        console.log(fn())
```

>总结：
>
>1.throw 抛出异常信息，程序也会终止执行
>
>2.throw 后面跟的是错误提示信息
>
>3.Error 对象配合 throw 使用，能够设置更详细的错误信息

### try/catch  捕获异常

我们可以通过try / catch 捕获错误信息（浏览器提供的错误信息）

```javascript
        function fn() {
            try {
                // 可能有问题的代码写在这里
                const p = document.querySelector('p')
                p.style.color = 'red'
            } catch(err) {
                console.log(err.message)
                // 中断
                return
            } finally {
                alert('执行')
            }
            console.log(111)
        }
        fn()
```

>总结：
>
>1.try...catch 用于捕获错误信息
>
>2.将预估可能发生错误的代码写在 try 代码段中
>
>3.如果 try 代码段中出现错误后，会执行 catch 代码段，并截获到错误信息

### debugger

我们可以通过try / catch 捕获错误信息（浏览器提供的错误信息）

## 处理this

### this指向

#### 普通函数

普通函数的调用方式决定了this的值，即谁调用this的值指向谁

```javascript
        function fn() {
            console.log(this)
        }
        fn()
```

>普通函数没有明确调用者时 this 值为 window，严格模式下没有调用者时 this 的值为 undefined

#### 箭头函数

箭头函数中的 this 与普通函数完全不同，也不受调用方式的影响，事实上箭头函数中并不存在 this

>1.箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中 this 的值和外层的 this 是一样的
>
>2.箭头函数中的this引用的就是最近作用域中的this
>
>3.向外层作用域中，一层一层查找this，直到有this的定义

>总结：
>
>1.函数内不存在this，沿用上一级的
>
>2.不适用：构造函数，原型函数，dom事件函数等等
>
>3.适用：需要使用上层this的地方
>
>4.使用正确的话，它会在很多地方带来方便，后面我们会大量使用慢慢体会

### 改变this

#### call()方法

使用call方法调用函数，同时指定被调用函数中this的值

```javascript
fun.call(thisArg, arg1, arg2, ...)
```

>thisArg：在 fun 函数运行时指定的 this 值
>
>arg1，arg2：传递的其他参数
>
>返回值就是函数的返回值，因为它就是调用函数

#### apply()方法

使用apply方法调用函数，同时指定被调用函数中的this的值

```javascript
fun.apply(thisArg, [argsArray])
```

>thisArg：在fun函数运行时指定的 this 值
>
>argsArray：传递的值，必须包含在数组里面
>
>返回值就是函数的返回值，因为它就是调用函数
>
>因此 apply 主要跟数组有关系，比如使用 Math.max() 求数组的最大值

#### bind()方法

bind() 方法不会调用函数。但是能改变函数内部this 指向

```javascript
fun.bind(thisArg, arg1, arg2, ...)
```

>thisArg：在 fun 函数运行时指定的 this 值
>
>arg1，arg2：传递的其他参数
>
>返回由指定的 this 值和初始化参数改造的 原函数拷贝
>
>因此当我们只是想改变 this 指向，并且不想调用这个函数的时候，可以使用 bind，比如改变定时器内部的this指向

> 相同点: 
>
> 都可以改变函数内部的this指向.
>
> 区别点: 
>
> call 和 apply 会调用函数, 并且改变函数内部this指向.
>
> call 和 apply 传递的参数不一样, call 传递参数 aru1, aru2..形式 apply 必须数组形式[arg]
>
> bind 不会调用函数, 可以改变函数内部this指向.
>
> 主要应用场景: 
>
> call 调用函数并且可以传递参数
>
> apply 经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值
>
> bind 不调用函数,但是还想改变this指向. 比如改变定时器内部的this指向

## 性能优化

### 节流

所谓节流，就是指连续触发事件但是在n秒中只执行一次函数

```javascript
    const box = document.querySelector('.box')
    let i = 1 
    function mouseMove() {
      box.innerHTML = ++i
    }
    // 节流函数 throttle
    function throttle(fn, t) {
      let startTime = 0
      return function () {
        // 得到当前时间
        let now = Date.now()
        // 判断如果大于等于 500 就调用函数
        if(now - startTime >= t) {
          fn()
          // 起始时间=当前时间    写在调用函数下面
          startTime = now
        }

      }
    }
    box.addEventListener('mousemove', throttle(mouseMove, 500))
```

### 防抖

所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

```javascript
    const box = document.querySelector('.box')
    let i = 1 
    function mouseMove() {
      box.innerHTML = ++i
    }
    // 节流函数 throttle
    // 防抖函数
    function debounce(fn, t) {
        let timeId 
        return function() {
            if(timeId) clearTimeout(timeId)
            timeId = setTimeout(function(){
                fn()
            }, t)
        }
    }

    box.addEventListener('mousemove', debounce(mouseMove, 500))
```

