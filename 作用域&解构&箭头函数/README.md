## 一、作用域

了解作用域队程序执行的影响及作用域链的查找机制，使用闭包函数创建隔离作用域避免全局变量污染

### 局部作用域

#### 函数作用域：

在函数内部声明的变量只能在函数内部被访问，外部无法直接访问

```javascript
function getSum() {
    //函数内部是函数作用域	属于局部变量
    const num = 10
}
console.log(num)	//此处报错，函数外部不能使用局部作用域变量
```

>总结：
>
>1.函数内部声明的变量，在函数外部无法被访问
>
>2.函数的参数也是函数内部的局部变量
>
>3.不同函数内部声明的变量无法相互访问
>
>4.函数执行完毕后，函数内部的变量实际被清空了

#### 块作用域：

在JavaScript中使用{}包裹的代码称为代码块，代码块内部声明的变量外部将***有可能***无法被访问

```javascript
for (let t = 1; t <= 6; t++) {
    // t 只能在该代码块中被访问
    console.log(t)	//正常
}
//超出了t的作用域
console.log(t)	//报错
```

>总结：
>
>1.let声明的变量会产生块作用域，var不会产生块作用域
>
>2.const声明的常量也会产生块作用域
>
>3.不同代码块之间的变量无法互相访问
>
>4.推荐使用let或const

### 全局作用域

 script标签和.js文件的最外层就是所谓的全局作用域，在此声明的变量在函数内部也可以被访问，全局作用域中声明的变量，任何其他作用域都可以被访问

```javascript
//全局作用域下声明num变量
const num = 10
function fn() {
    //函数内部可以使用全局作用域的变量
    console.log(num)
}
```

>注意：
>
>1.为Window对象动态添加的属性默认也是全局的，不推荐！
>
>2.函数中未使用任何关键字声明的变量为全局变量，不推荐！！
>
>3.尽可能少的声明全局变量，防止全局变量被污染

### 作用域链

作用域链本质上是底层的变量查找机制

在函数被执行时，会优先查找当前函数作用域中查找变量

如果当前作用域查找不到则会依次逐级查找父级作用域直到全局作用域

>总结：
>
>1.嵌套关系的作用域串联起来形成了作用域链
>
>2.相同作用域链中按着从小到大的规则查找变量
>
>3.子作用域能够访问父作用域，父级作用域无法访问子级作用域

### JS垃圾回收机制

JS中内存你的分配和回收都是自动完成的，内存你在不使用的时候会被垃圾回收器自动回收

#### 内存泄露

不再用到的内存，没有及时释放，就叫做内存泄露

#### 内存的生命周期

JS环境中分配的内存，一般有如下生命周期：

1.内存分配：当我们声明变量、函数、对象的时候，系统会自动为他们分配内存

2.内存使用：即读写内存，也就是使用变量、函数等

3.内存回收：使用完毕，由垃圾回收自动回收不再使用的内存

>注意：
>
>1.全局变量一般不会回收（关闭页面回收）
>
>2.一般情况下局部变量的值，不用了，会被自动回收掉

#### 引用技术法：

IE采用的引用计数算法，定义“内存不再使用”的标签很简单，就是看一个对象是否有指向它的引用

算法：

1.跟踪记录每个值被引用的次数

2.如果这个值的被引用了一次，那么就记录次数1

3.多次引用会累加

4.如果减少一个引用就减1 

5.如果引用次数是0，则释放内存

>缺陷：
>
>嵌套引用，如果两个对象相互引用，尽管他们已不再使用，垃圾回收器不会进行回收，导致内存泄露

#### 标记清除法：

1.标记清除算法将“不再使用的对象”定义为“无法到达的对象”

2.从根部（JS中就是全局对象）触发定时扫描内存中的对象。凡是能从根部到达的对象，都是还需要使用的

3.那些无法由更不触发触及到的对象被标记为不再使用，稍后进行回收

### 闭包

一个函数对周围状态的引用捆绑在一起，内层函数中访问到其外层函数的作用域（闭包 = 内层函数 + 外层函数的变量）

```javascript
        function outer() {
            let a = 10
            function fn() {
                console.log(a)
            }
            return fn
        }
        const fun = outer()
        fun()
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207112036231.jpg)

>作用：
>
>封闭数据，提供操作，外部也可以访问函数内部的变量

#### 闭包应用

实现数据的私有

```javascript
        let i = 0
        function fn() {
            i++
            console.log(`函数被调用了${i}次`)
        }
```

>i在外部是全局变量，很容易被修改

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207112036562.jpg)

闭包的形式：

```javascript
        function count() {
            let i = 0
            function fn() {
                i++
                console.log(`函数被调用了${i}次`)
            }
            return fn
        }
        const fun = count()
```

>这样就实现了数据私有，无法直接修改i

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207112036561.png)

### 变量提升

是JavaScript中比较“奇怪”的现象，它允许在变量声明之前即被访问（仅存在于var声明变量）

```javascript
        // 1.所有var声明的变量提升到当前作用域的最前面
        // 2.只提升声明，不提升赋值
        console.log(num + '件')
        var num = 10

        //上面的两行代码相当于
        var num
        console.log(num + '件')
        num = 10


        function fn() {
            console.log(num)
            var num = 10
        }
        fn()
```

>注意：
>
>1.变量在未声明即被访问时会报语法错误
>
>2.变量在var声明之前即被访问，变量的值为underfined
>
>3.let/const声明的变量不存在变量提升
>
>4.变量提升出现在相同作用域当中
>
>5.实际开发中推荐先声明再访问变量

## 二、函数进阶

### 函数提升

函数提升与变量提升比较类似，是指函数在声明之前即可被调用

```javascript
        // 1.会把所有函数声明提升到当前作用域的最前面
        // 2.只提升函数声明，不提升函数调用
        fn()
        function fn() {
            console.log(`函数提升`)
        }

        //函数表达式必须先声明和赋值，后调用，否则报错
	fun()
        var fun = function () {
            console.log(`函数表达式`)
        }
```

>总结：
>
>1.函数提升能够使函数的声明调用更灵活
>
>2.函数表达式不存在提升的现象
>
>3.函数提升出现在相同作用域当中

### 函数参数

#### 动态参数

arguments是函数内部内置的伪数组变量，它包含了调用函数时所传入的所有实参

```javascript
        function getSum() {
            //arguments 动态参数 只存在于函数里面
            //是伪数组
            // console.log(arguments)
            let sum = 0
            for(let i = 0; i < arguments.length; i++) {
                sum += arguments[i]
            }
            console.log(sum)
        }
        getSum(2, 3, 4, 5)
```



>总结：
>
>1.arguments是一个伪数组，只存在于函数中
>
>2.arguments的作用是动态获取函数的实参
>
>3.可以通过for循环依次得到传递过来的实参

#### 剩余参数

剩余参数允许我们将一个不定数量的参数表示为一个数组

>...是语法符号，置于最末函数形参之前，用于获取多余的实参
>
>借助...获取的剩余实参，是个真数组

#### 展开运算符

展开运算符(...)，将一个数组进行展开

```javascript
        const arr1 = [1, 2, 3]
        // 展开运算符，可以展开数组
        console.log(...arr1)

        //求数组最大小值
        console.log(Math.max(...arr1)) // 3
        console.log(Math.min(...arr1)) // 1

        //合并数组
        const arr2 = [3, 4, 5]
        const arr = [...arr1, ...arr2]
        console.log(arr)
```

>1.不会修改原数组
>
>典型运用场景：求数组最大值（最小值）、合并数组等

>剩余参数：函数参数使用，得到真数组
>
>展开运算符：数组中使用，数组展开

### 箭头函数

引入箭头函数的目的是更简短的函数写法并且不绑定this，箭头函数的语法比函数表达式更简洁

>使用场景：箭头函数更适用于那些本来需要匿名函数的地方

#### 基本语法

语法1：基本写法

```javascript
        const fn = () => {
            console.log(123)
        }
        fn()
```

语法2：只有一个参数可以省略小括号

```javascript
        const fn = x => {
           return x + x
        }
        console.log(fn(1)) // 2
```

语法3：如果函数体只有一行代码，可以写到一行上，并且无需写return直接返回值

```javascript
        const fn = (x, y) => x + y
        console.log(fn(1, 2))
```

语法4：加括号的函数体返回对象字面量表达式

```javascript
        const fn = (uname) => ({uname: uname})
        console.log(fn('刘德华'))
```

#### 箭头函数参数

>普通函数有arguments动态参数
>
>箭头函数没有arguments动态参数，但是有剩余参数...args

```javascript
        const getSum = (...arr) => {
            let sum = 0
            for(let i = 0; i < arr.length; i++) {
                sum += arr[i]
            }
            return sum
        }
        const result = getSum(2, 3, 4)
        console.log(result)
```

#### 箭头函数this

箭头函数不会创建自己的this，它只会从自己的作用域链的上一层沿用this

```javascript
        // 箭头函数中的this     是上一层的作用域的this
        const fn = () => {
            console.log(this)
        }
        fn()

        // 对象方法箭头函数 this
        const obj = {
            uname: 'jxy',
            sayHi: () => {
                console.log(this)   // this 指向 window
            }
        }
        obj.sayHi()

        const obj = {
            uname: 'jxy',
            sayHi: function() {
                console.log(this)
                let i = 10
                const count = () => {
                    console.log(this) // 指向 obj
                }
                count()
            }
        }
        obj.sayHi()
```

>事件回调函数使用箭头函数时，this为全局的Window，因此DOM事件回调函数为了简便，不推荐使用箭头函数

## 三、解构赋值

### 数组解构

数组解构是将数组的单元值快速批量赋值给一系列变量的简洁语法

#### 基本语法

1.赋值运算符 = 左侧的[]用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量

2.变量的顺序对应数组单元值的位置依次进行赋值操作

```javascript
        const arr = [100, 60, 80]
        // 数组解构
        const [max, min, avg] = arr
        // 相当于下面的三行
        // const max = arr[0]
        // const min = arr[1]
        // const avg = arr[2]
        console.log(max)
        console.log(min)
        console.log(avg)
```

典型应用交互2个变量：

```javascript
        let a = 1
        let b = 2;
        [b, a] = [a, b]
        console.log(a, b)
```

>加; 的原因
>
>1.立即执行函数
>
>2.数组解构

#### 细节

变量多 单元值少的情况：

```javascript
        const [a, b, c, d] = [1, 2, 3]
        console.log(a) // 1
        console.log(b) // 2
        console.log(c) // 3
        console.log(d) // underfined
```

变量少 单元值多的情况：

```javascript
        const [e, f] = [1, 2, 3]
        console.log(e) // 1
        console.log(f) // 2
```

利用剩余参数解决变量少 单元值多的情况：

```javascript
        const [a, b, ...c] = [1, 2, 3, 4]
        console.log(a) // 1
        console.log(b) // 2
        console.log(c) // [3, 4] 真数组
```

防止有underfined传递单元值的情况，可以设置默认值：

```javascript
        const [a = '手机', b = '华为'] = ['小米']
        console.log(a) // 小米
        console.log(b) // 华为
```

按需导入，忽略某些返回值：

```javascript
        const [a, b, , d] = ['小米', '苹果', '华为', '格力']
        console.log(a) // 小米
        console.log(b) // 华为
        console.log(d) // 格力
```

支持多维数组的解构：

```javascript
        const [a, b, [c, d]] = [1, 2, [3, 4]]
        console.log(a) // 1
        console.log(b) // 2
        console.log(c) // 3
        console.log(d) // 4
```

### 对象解构

对象结构是将对象属性和方法快速批量赋值给一系列变量的简洁语法

#### 基本语法

1.赋值运算符 = 左侧的 {} 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量

2.对象属性的值将被赋值给与属性名相同的变量

3.注意解构的变量名不要和外面的变量名冲突否则报错

4.对象中找不到与变量名一致的属性时变量值为 undefined

```javascript
         const { uname, age } = { uname: 'jxy', age: 18 }
         console.log(uname)
         console.log(age)
```

#### 细节

给新的变量名赋值：

```javascript
        //  对象解构的变量名 可以重新改名 旧变量名：新变量名
        const { uname: username, age } = { uname: 'jxy', age: 18 }
```

数组对象解构：

```javascript
        // 解构数组对象
        const arr = [
            {
                uname: '佩奇',
                age: 18
            }
        ]
        const [{ uname, age }] = arr
        console.log(uname)
        console.log(age)
```

多级对象解构

```javascript
        const pig = {
            name: '佩奇',
            family: {
                mother: '猪妈妈',
                father: '猪爸爸',
                sister: '乔治'
            },
            age: 6
        }
        const { name, family: { mother, father, sister }} = pig
        console.log(name)        
        console.log(mother)        
        console.log(father)        
        console.log(sister)        

```

### 遍历数组forEach方法

forEach()方法用于调用数组的每个元素，并将元素传递给回调函数

>主要使用场景：遍历数组的每个元素

语法：

```javascript
        const arr = ['red', 'green', 'pink']
        arr.forEach(function(item, index){
            console.log(item) //数组元素 red green pink
            console.log(index) // 索引号
        })
```

>注意：
>
>1.forEach主要是遍历数组
>
>2.参数当前数组元素是必须写的，索引号可选

### 筛选数组filter方法

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

> 主要使用场景： 筛选数组符合条件的元素，并返回筛选之后元素的新数组

```javascript
        const arr = [10, 20, 30]
        arr.filter(function (item, index) {
            console.log(item)
            console.log(index)
        })
```

>注意：
>
>返回值：返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组
>
>参数：currentValue 必须写， index 可选
>
>因为返回新数组，所以不会影响原数组