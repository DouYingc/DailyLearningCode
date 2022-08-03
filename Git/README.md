## Git基础

Git 是一个开源的分布式版本控制系统，是目前世界上最先进、最流行的版本控制系统。可以快速高效地处理从很小到非常大的项目版本管理

>特点：
>
>项目越大越复杂，协同开发者越多，越能体现出 Git 的高性能和高可用性

### 特性

Git 之所以快速和高效，主要依赖于它的如下两个特性：

① 直接记录快照，而非差异比较

② 近乎所有操作都是本地执行

#### SVN的差异比较

传统的版本控制系统（例如 SVN）是基于差异的版本控制，它们存储的是一组基本文件和每个文件随时间逐步累积的差异

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291715338.png)

>好处：
>
>节省磁盘空间
>
>缺点：
>
>耗时、效率低
>
>在每次切换版本的时候，都需要在基本文件的基础上，应用每个差异，从而生成目标版本对应的文件

#### Git的记录快照

Git 快照是在原有文件版本的基础上重新生成一份新的文件，类似于备份。为了效率，如果文件没有修改，Git不再重新存储该文件，而是只保留一个链接指向之前存储的文件

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291717590.png)

>缺点：
>
>占用磁盘空间较大
>
>优点：
>
>版本切换时非常快，因为每个版本都是完整的文件快照，切换版本时直接恢复目标版本的快照即可
>
>特点：
>
>空间换时间

#### 近乎所有操作都是本地执行

在 Git 中的绝大多数操作都只需要访问本地文件和资源，一般不
需要来自网络上其它计算机的信息

>特性：
>
>① 断网后依旧可以在本地对项目进行版本管理
>
>② 联网后，把本地修改的记录同步到云端服务器即可

###  Git中的三个区域

使用 Git 管理的项目，拥有三个区域，分别是工作区、暂存区、Git 仓库

###  Git中的三种状态

已修改modified：表示修改了文件，但还没将修改的结果放到暂存区

已暂存staged：表示对已修改文件的当前版本做了标记，使之包含在下次提交的列表中

已提交committed：表示文件已经安全地保存在本地的 Git 仓库中

>注意：
>
>工作区的文件被修改了，但还没有放到暂存区，就是已修改状态
>
>如果文件已修改并放入暂存区，就属于已暂存状态
>
>如果 Git 仓库中保存着特定版本的文件，就属于已提交状态

### 基本的Git工作流程

基本的 Git 工作流程如下：

① 在工作区中修改文件

② 将你想要下次提交的更改进行暂存

③ 提交更新，找到暂存区的文件，将快照永久性存储到 Git 仓库

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291853943.png)

### Git的基本操作

#### 获取Git仓库的两种方式

① 将尚未进行版本控制的本地目录转换为 Git 仓库

② 从其它服务器克隆一个已存在的 Git 仓库

#### 在现有目录中初始化仓库

如果自己有一个尚未进行版本控制的项目目录，想要用 Git 来控制它，需要执行如下两个步骤：

① 在项目目录中，通过鼠标右键打开“Git Bash”

② 执行`git init`命令将当前的目录转化为 Git 仓库

>`git init`命令会创建一个名为 .git 的隐藏目录，这个 .git 目录就是当前项目的 Git 仓库，里面包含了初始的必要文件，这些文件是 Git 仓库的必要组成部分

#### 工作区中文件的 4 种状态

工作区中的每一个文件可能有 4 种状态，这四种状态共分为两大类，如图所示：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291904605.png)

>Git 操作的终极结果：让工作区中的文件都处于“未修改”的状态

#### 检查文件的状态

可以使用`git status`命令查看文件处于什么状态，例如：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291911161.png)

>在状态报告中可以看到新建的所有文件出现在 Untracked files（未跟踪的文件）下面
>未跟踪的文件意味着 Git 在之前的快照（提交）中没有这些文件；Git 不会自动将之纳入跟踪范围，除非明确地告诉它“我需要使用 Git 跟踪管理该文件”

#### 以精简的方式显示文件状态

使用`git status`输出的状态报告很详细，但有些繁琐。如果希望以精简的方式显示文件的状态，可以使用如下两条完全等价的命令，其中 -s 是 --short 的简写形式:

```git
git status -s
git status --short
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291913465.png)

>未跟踪文件前面有红色的 ?? 标记

#### 跟踪新文件

使用命令 `git add` 开始跟踪一个文件。 所以，要跟踪 index.html 文件，运行如下的命令即可：

```git
git add index.html
```

此时再运行 `git status` 命令，会看到 index.html 文件在 Changes to be committed 这行的下面，说明已被跟踪，并处于暂存状态：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291915810.png)

以精简的方式显示文件的状态:

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291915154.png)

>新添加到暂存区中的文件前面有绿色的 A 标

#### 提交更新

现在暂存区中有一个 index.html 文件等待被提交到 Git 仓库中进行保存。可以执行 `git commit` 命令进行提交,其中 -m 选项后面是本次的提交消息，用来对提交的内容做进一步的描述：

```git
git commit -m "新建了index.html文件"
```

提交成功之后，会显示如下的信息：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291919170.png)

提交成功之后，再次检查文件的状态，得到提示如下：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291919171.png)

>证明工作区中所有的文件都处于“未修改”的状态，没有任何文件需要被提交

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291920374.png)

#### 对已提交的文件进行修改

目前，所有文件已经被 Git 跟踪，并且工作区和 Git 仓库中的 所有文件内容保持一致。当我们修改了工作区中 index.html 的内容之后，再次运行 `git status` 和 `git status -s` 命令，会看到如下的内容：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291923487.png)

>文件 index.html 出现在 Changes not staged for commit 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区
>
>注意：修改过的、没有放入暂存区的文件前面有红色的 M 标记

#### 暂存已修改的文件

目前，工作区中的 index.html 文件已被修改，如果要暂存这次修改，需要再次运行 `git add` 命令，这个命令是个多功能的命令，主要有如下 3 个功效：

① 可以用它开始跟踪新文件

② 把已跟踪的、且已修改的文件放到暂存区

③ 把有冲突的文件标记为已解决状态

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291925938.png)

#### 提交已暂存的文件

再次运行 `git commit -m "提交消息"` 命令，即可将暂存区中记录的 index.html 的快照，提交到 Git 仓库中进行保存：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291929543.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291930248.png)

#### 撤销对文件的修改 

撤销对文件的修改指的是：把对工作区中对应文件的修改，还原成 Git 仓库中所保存的版本

```git
git checkout -- index.html
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291932354.png)

>操作的结果：所有的修改会丢失，且无法恢复！危险性比较高，请慎重操作！
>
>撤销操作的本质：用 Git 仓库中保存的文件，覆盖工作区中指定的文件

#### 向暂存区中一次性添加多个文件

如果需要被暂存的文件个数比较多，可以使用如下的命令，一次性将所有的新增和修改过的文件加入暂存区：

```git
git add .
```

>今后在项目开发中，会经常使用这个命令，将新增和修改过后的文件加入暂存区

#### 取消暂存的文件

如果需要从暂存区中移除对应的文件，可以使用如下的命令：

```git
git reset HEAD 要移除的文件名称
```

#### 跳过使用暂存区域

Git 标准的工作流程是工作区 → 暂存区 → Git 仓库，但有时候这么做略显繁琐，此时可以跳过暂存区，直接将工作区中的修改提交到 Git 仓库，这时候 Git 工作的流程简化为了工作区 → Git 仓库

Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：

```git
git commit -a -m "描述信息"
```

#### 移除文件

从 Git 仓库中移除文件的方式有两种：

① 从 Git 仓库和工作区中同时移除对应的文件

② 只从 Git 仓库中移除指定的文件，但保留工作区中对应的文件

```git
 # 从Git仓库和工作区中同时移除文件
git rm -f index.html
# 只从Git仓库中移除文件, 保留工作区中的文件
git rm --cached index.html
```

#### 忽略文件

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。 在这种情况下，我们可以创建一个名为 .gitignore 的配置文件，列出要忽略的文件的匹配模式

文件 .gitignore 的格式规范如下：

① 以 # 开头的是注释

② 以 / 结尾的是目录

③ 以 / 开头防止递归

④ 以 ! 开头表示取反

⑤ 可以使用 glob 模式进行文件和文件夹的匹配（glob 指简化了的正则表达式）

#### glob 模式

所谓的 glob 模式是指简化了的正则表达式：

① 星号 * 匹配零个或多个任意字符

② [abc] 匹配任何一个列在方括号中的字符 （此案例匹配一个 a 或匹配一个 b 或匹配一个 c）

③ 问号 ? 只匹配一个任意字符

④ 在方括号中使用短划线分隔两个字符， 表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配所有 0 到 9 的数字）

⑤ 两个星号 ** 表示匹配任意中间目录（比如 a/**/z 可以匹配 a/z 、a/b/z 或 a/b/c/z 等）

#### .gitignore 文件的例子

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207291955214.png)

#### 查看提交历史

如果希望回顾项目的提交历史，可以使用`git log`这个简单且有效的命令

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292000999.png)

#### 回退到指定的版本

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292003753.png)

## Git分支

在进行多人协作开发的时候，为了防止互相干扰，提高协同开发的体验，建议每个开发者都基于分支进行项目功能的开发，例如：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292025669.png)

### master 主分支

在初始化本地 Git 仓库的时候，Git 默认已经帮我们创建了一个名字叫做 master 的分支。通常我们把这个master 分支叫做主分支、

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292025669.png)

>在实际工作中，master 主分支的作用是：用来保存和记录整个项目已完成的功能代码
>
>因此，不允许程序员直接在 master 分支上修改代码，因为这样做的风险太高，容易导致整个项目崩溃

### 功能分支

由于程序员不能直接在 master 分支上进行功能的开发，所以就有了功能分支的概念。

功能分支指的是专门用来开发新功能的分支，它是临时从 master 主分支上分叉出来的，当新功能开发且测试完毕后，最终需要合并到 master 主分支上，如图所示：

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292028078.png)

### 查看分支列表

使用如下的命令，可以查看当前 Git 仓库中所有的分支列表：

```git
git branch
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292030792.png)

>注意：
>
>分支名字前面的 * 号表示当前所处的分支

### 创建新分支

使用如下的命令，可以基于当前分支，创建一个新的分支，此时，新分支中的代码和当前分支完全一样：

```git
git branch 分支名称
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292031947.png)

### 切换分支

使用如下的命令，可以切换到指定的分支上进行开发：

```git
git checkout login
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292032823.png)

### 分支的快速创建和切换

使用如下的命令，可以创建指定名称的新分支，并立即切换到新分支上：

```git
# -b 表示创建一个新分支
# checkout 表示切换到刚才新建的分支上
git checkout -b 分支名称
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292034450.png)

>注意：
>"git checkout -b 分支名称" 是下面两条命令的简写形式：
>
>① git branch 分支名称
>
>② git checkout 分支名称

### 合并分支

功能分支的代码开发测试完毕之后，可以使用如下的命令，将完成后的代码合并到 master 主分支上：

```git
# 切换到master分支
git checkout master
# 在master分支上运行git merge 命令 将login 分支的代码合并到master分支
git merge login
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292036430.png)

>合并分支时的注意点：
>
>假设要把 C 分支的代码合并到 A 分支，则必须先切换到 A 分支上，再运行 git merge 命令，来合并 C 分支！

### 删除分支

当把功能分支的代码合并到 master 主分支上以后，就可以使用如下的命令，删除对应的功能分支：

```git
git branch -d 分支名称
```

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292039522.png)

### 遇到冲突时的分支合并

如果在两个不同的分支中，对同一个文件进行了不同的修改，Git 就没法干净的合并它们。 此时，我们需要打开这些包含冲突的文件然后手动解决冲突

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207292041436.png)

### 将本地分支推送到远程仓库

如果是第一次将本地分支推送到远程仓库，需要运行如下的命令：

```git
# -u 表示把本地分支和远程分支进行关联，只在第一次推送的时候需要带 -u 参数
git push -u 远程仓库的别名 本地分支名称:远程分支名称

# 案例：
git push -u origin payment:pay

# 如果希望远程分支的名称和本地分支名称保存一致，可以队命令进行简化
git push -u origin payment
```

>注意：
>
>第一次推送分支需要带 -u 参数，此后可以直接使用 git push 推送代码到远程分支

### 查看远程仓库中所有的分支列表

 通过如下的命令，可以查看远程仓库中，所有的分支列表的信息：

```git
git remote show 远程仓库名称
```

### 跟踪分支

跟踪分支指的是：从远程仓库中，把远程分支下载到本地仓库中。需要运行的命令如下：

```git
#  从远程仓库中，把对应的远程分支下载到本地仓库，保持本地分支和远程分支名称相同
git checkout 远程分支名称

# 示例：
git checkout pay

# 从远程仓库中，把对应的远程分支下载到本地仓库，并把下载的本地分支进行重命名
git checkout -b 本地分支名称 远程仓库名称/远程分支名称

# 示例：
git checkout -b payment origin/pay
```

### 拉取远程分支的最新的代码

可以使用如下的命令，把远程分支最新的代码下载到本地对应的分支中：

```git
 # 从远程仓库拉去当前分支最新的代码，保存当前分支的代码和远程分支代码一致
 git pull
```

### 删除远程分支

可以使用如下的命令，删除远程仓库中指定的分支：

```git
# 删除远程仓库中指定名称的远程分支
git push 远程仓库名称 --delete 远程分支名称

# 示例：
git push origin --delete pay
```

