#### 查看安装包版本方式

#### 查看所有已安装包的版本

```shell
npm list

# command-line-input中
test@1.0.0 /Users/wangqiaojuan/projects/my-projects/笔记/前端学习案例/node/command-line-input
└── inquirer@8.2.0
```

#### 打开 package-lock.json

需要进行一些视觉扫描

#### 全局安装的软件包

```shell
npm list -g

# command-line-input中
/Users/wangqiaojuan/.nvm/versions/node/v16.13.1/lib
├── corepack@0.10.0
└── npm@8.1.2
```

#### 仅获取顶层的软件包

若要仅获取顶层的软件包（基本上就是告诉 npm 要安装并在 package.json 中列出的软件包），则运行

```shell
npm list --depth=0

# command-line-input中
test@1.0.0 /Users/wangqiaojuan/projects/my-projects/笔记/前端学习案例/node/command-line-input
└── inquirer@8.2.0
```
