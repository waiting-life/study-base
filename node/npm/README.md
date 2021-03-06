#### npm install

```shell
npm install <package-name>
```

通常会在此命令中看到更多标志：

--save 安装并添加条目到 package.json 文件的 dependencies。
--save-dev 安装并添加条目到 package.json 文件的 devDependencies。

区别主要是，devDependencies 通常是开发的工具（例如测试的库），而 dependencies 则是与生产环境中的应用程序相关。

#### npm update

```shell
npm update
```

`npm`会检查所有软件包是否有满足版本限制的更新版本

也可以指定单个软件包更新

```shell
npm update <package-name>
```

#### 版本控制

除了简单的下载外，npm 还可以管理版本控制，因此可以指定软件包的任何特定版本，或者要求版本高于或低于所需版本。

很多时候，一个库仅与另一个库的主版本兼容。

#### 运行任务

package.json 文件支持一种用于指定命令行任务（可通过使用以下方式运行）的格式：

```shell
npm root -g # 全局的位置
```

#### npm 的语义版本控制

语义版本控制的概念很简单：所有的版本都有 3 个数字`x.y.z`

- 第一个数字是主版本。
- 第二个数字是次版本。
- 第三个数字是补丁版本。

当发布新的版本时，不仅仅是随心所欲地增加数字，还要遵循以下规则：

- 当进行不兼容的 API 更改时，则升级主版本。
- 当以向后兼容的方式添加功能时，则升级次版本。
- 当进行向后兼容的缺陷修复时，则升级补丁版本。

`npm` 设置了一些规则，可用于在 package.json 文件中选择要将软件包更新到的版本（当运行 npm update 时）
规则使用了这些符号：

- ^
- ~
- >
- > =
- <
- <=
- =
- -
- ||

这些规则的详情如下：

^: 只会执行不更改最左边非零数字的更新。 如果写入的是 ^0.13.0，则当运行 npm update 时，可以更新到 0.13.1、0.13.2 等，但不能更新到 0.14.0 或更高版本。 如果写入的是 ^1.13.0，则当运行 npm update 时，可以更新到 1.13.1、1.14.0 等，但不能更新到 2.0.0 或更高版本。
~: 如果写入的是 〜0.13.0，则当运行 npm update 时，会更新到补丁版本：即 0.13.1 可以，但 0.14.0 不可以。

> : 接受高于指定版本的任何版本。
> =: 接受等于或高于指定版本的任何版本。
> <=: 接受等于或低于指定版本的任何版本。
> <: 接受低于指定版本的任何版本。
> =: 接受确切的版本。
> -: 接受一定范围的版本。例如：2.1.0 - 2.6.2。
> ||: 组合集合。例如 < 2.1 || > 2.6。
> 可以合并其中的一些符号，例如 1.0.0 || >=1.1.0 <1.2.0，即使用 1.0.0 或从 1.1.0 开始但低于 1.2.0 的版本。

还有其他的规则：

无符号: 仅接受指定的特定版本（例如 1.2.1）。
latest: 使用可用的最新版本。

#### 卸载 npm 软件包

```shell
npm uninstall <package-name>
```

**注意**：

1. 如果使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用。

2. 如果程序包是开发依赖项（列出在 package.json 文件的 devDependencies 中），则必须使用 -D 或 --save-dev 标志从文件中移除：

```shell
npm uninstall -S <package-name>
npm uninstall -D <package-name>
```

3. 如果该软件包是全局安装的，则需要添加 -g 或 --global 标志：

```shell
npm uninstall -g <package-name>
```

#### node.js 包运行器 npx

轻松地运行本地命令
Node.js 开发者过去通常将大多数可执行命令发布为全局的软件包，以使它们处于路径中且可被立即地执行。

这很痛苦，因为无法真正地安装同一命令的不同版本。

运行 npx commandname 会自动地在项目的 node_modules 文件夹中找到命令的正确引用，而无需知道确切的路径，也不需要在全局和用户路径中安装软件包。

无需安装的命令执行
npx 的另一个重要的特性是，无需先安装命令即可运行命令。

这非常有用，主要是因为：

不需要安装任何东西。
可以使用 @version 语法运行同一命令的不同版本。
