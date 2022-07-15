## 深入对象

### 创建对象三种方式

1.利用对象字面量创建对象

```javascript
const o = {
    name: 'jxy'
}
```

2.利用new Object 创建对象

```javascript
        const obj = new Object({name: 'jxy'})
        obj.unmae = 'jxy'
```

3.利用构造函数创建对象

```javascript
        // 创建一个 构造函数
        function Pig(uname, age) {
            this.uname = uname
            this.age = age
        }
        // console.log(new Pig('佩奇', 6))
        const peppa = new Pig('佩奇', 6)
        console.log(peppa)

```

### 构造函数

是一种特殊的函数，主要用来初始化对象，可以快速创建多个类似的对象

>1.命名以大写字母开头
>
>2.只能由“new”操作符来执行

```javascript
        // 创建一个 构造函数
        function Pig(uname, age) {
            this.uname = uname
            this.age = age
        }
        // console.log(new Pig('佩奇', 6))
        const peppa = new Pig('佩奇', 6)
        console.log(peppa)

```

>1.使用 new 关键字调用函数的行为被称为实例化
>
>2.实例化构造函数时没有参数时可以省略 ()
>
>3.构造函数内部无需写return，返回值即为新创建的对象
>
>4.构造函数内部的 return 返回的值无效，所以不要写return
>
>5.new Object（） new Date（） 也是实例化构造函数

实例化执行过程

>1.创建新的空对象
>
>2.构造函数this指向新对象
>
>3.执行构造函数代码，修改this，添加新的属性
>
>4.返回新对象

### 实例成员&静态成员

#### 实例成员

通过构造函数创建的对象称为实例对象，实例对象中的属性和方法称为实例成员

```javascript
        function Per() {
            this.name = 'jxy'
            this.sayHi = function() {
                console.log(123)
            }
        }
        const uname = new Per()
        // uname就是实例成员
        console.log(uname)
        //调用实例方法
        uname.sayHi(uname.sayHi)
```

>1.实例对象的属性和方法即为实例成员
>
>2.为构造函数传入参数，动态创建结构相同但值不同的对象
>
>3.构造函数创建的实例对象彼此独立互不影响

#### 静态成员

构造函数的属性和方法被称为静态成员

```javascript
        // 静态属性
        Per.eyes = 2
        Per.arms = 2
        // 静态方法
        Per.walks = function () {
            console.log(`走路`)
            console.log(this.eyes)
        } 
```

>1.构造函数的属性和方法被称为静态成员
>
>2.一般公共特征的属性或方法静态成员设置为静态成员
>
>3.静态成员方法中的this指向构造函数本身

## 内置构造函数

在JavaScript中最主要的数据类型有6种

基本数据类型：字符串、数值、布尔、underfined、null

引用类型：对象 Object，Array，RegExp，Date等

包装类型：String、Number、Boolean等 

### Object

Object是内置的构造函数，用于创建普通对象

```javascript
const o = {
    name: 'jxy'
}
```

>推荐使用字面量方式声明对象，而不是Object构造函数

#### 静态方法

1.Object.keys 静态方法获取对象中所有属性（键）

```javascript
        const o = { uname: 'jxy', age: 20}
        // 获取所有的属性名
        console.log(Object.keys(o))
```

>注意：返回的是一个数组

2.Object.values 静态方法获取对象中所有属性值

```javascript
        const o = { uname: 'jxy', age: 20}
        // 获取所有的属性值
        console.log(Object.values(o))
```

>注意：返回的是一个数组

3.Object.assign 静态方法常用于对象拷贝

```javascript
         const o = { uname: 'jxy', age: 20}
        // 对象拷贝
        const obj = {}
        Object.assign(obj, o)
        console.log(obj)
```

>经常使用的场景给对象添加属性

### Array

Array是内置的构造函数，用于创建数组

```javascript
const arr = new Array(3, 5)
console.log(arr)
```

#### 核心方法

|  方法   | 作用  | 说明  |
|  :----:  | :----:  | :----:  |
| forEach | 遍历数组 | 不返回，用于不改变值，经常用于查找打印输出值 |
| filter | 过滤数组 | 筛选数组元素，并生成新数组 |
| map  | 迭代数组 | 返回新数组，新数组里面的元素是处理之后的值，经常用于处理数据 |
| reduce | 累计器 | 返回函数累计处理的结果，经常用于求和等 |

1.reduce 返回函数累计处理的结果，经常用于求和等

```javascript
const arr = [1, 2, 3]
arr.reduce(function (prev, item) {
            return prev + item
}, 0)
```

```javascript
const arr = [1, 2, 3]
const re = arr.reduce((prev, item) => prev + item)
console.log(re)
```

>prev是累计值，item是当前元素

>累计值参数：
>
>1.如果有起始值，则以起始值为准开始累计， 累计值 = 起始值
>
>2.如果没有起始值， 则累计值以数组的第一个数组元素作为起始值开始累计
>
>3.后面每次遍历就会用后面的数组元素 累计到 累计值 里面 （类似求和里面的 sum ）

#### 其他方法

5.实例方法 `join` 数组元素拼接为字符串，返回字符串(重点)

```javascript
        const spec = { size: '40cm*40cm', color: '黑色' }
        // 用values取出所有的值
        // console.log(Object.values(spec))
        // 转换为字符串
        // Object.values(spec).join('/')
        document.querySelector('div').innerHTML = 				Object.values(spec).join('/')
```

6.实例方法 `find` 查找元素，返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回undefined(重点)

```javascript
        const arr = [{
        name: '小米',
        price: 1000
        }, {
        name: '小米',
        salary: 2000
        }, {
        name: '华为',
        salary: 5000
        },
        ]
        const re = arr.find(item => item.name === '小米')
        console.log(re)
```

7.实例方法 `every` 检测数组所有元素是否都符合指定条件，如果所有元素都通过检测返回true，否则返回false(重点)

```javascript
	const arr = [10, 20, 30, 40]
        const re = arr.every(item => item >= 10)
        console.log(re)
```

8.实例方法 `some` 检测数组中的元素是否满足指定条件如果数组中有元素满足条件返回true，否则返回false

9.实例方法 `concat` 合并两个数组，返回生成新数组

10.实例方法 `sort` 对原数组单元值排序

11.实例方法 `splice` 删除或替换原数组单元心

12.实例方法 `reverse` 反转数组

13.实例方法 `findIndex` 查找元素的索引值

#### Array.form()

伪数组转换为真数组

```javascript
        const li = document.querySelectorAll('li')
        // console.log(li)
        const lis = Array.from(li)
        lis.pop()
        console.log(lis)
```

### String

1.实例属性`length`用来获取字符串的度长(重点)

2.实例方法`split('分隔符')`用来将字符串拆分成数组(重点)

```javascript
        const str = 'pink,red'
        const arr = str.split(',')
        console.log(arr)
```

3.实例方法`substring(需要截取的第一个字符的索引[ ,结束的索引号])`用于字符串截取(重点)

```javascript
        const str = '今天又要做核酸了'
        console.log(str.substring(5, 7))
```

4.实例方法`startsWith(检测字符串[，检测位置索引号])`检测是否以某字符开头(重点)

```javascript
        const str = '今天我很开心'
        console.log(str.startsWith('今天')) // true
```

5.实例方法`includes(搜索的字符串[，检测位置索引号])`判断一个字符串是否包含在另一个字符串中，根据情况返回true或false(重点)

````javascript
        const str = 'jxy最帅'
        console.log(str.includes('jxy'))
````

6.实例方法`toUpperCase`用于将字母转换成大写

7.实例方法`toLowerCase`用于将就转换成小写

8.实例方法`indexOf`检测是否包含某字符

9.实例方法`endsWith`检测是否以某字符结尾

10.实例方法`replace`用于替换字符串，支持正则匹配

11.实例方法`match`用于查找字符串，支持正则匹配

### Number

#### 常用方法

toFixed()设置保留小数位的长度

```javascript
        const num = 10.1234
        console.log(num.toFixed(2)) // 10.12
```

