# 网上开户移动版 Demo

[![Build Status](http://img.shields.io/travis/roshanca/kh-demo-mobile.svg?style=flat-square)](https://travis-ci.org/roshanca/kh-demo-mobile)
[![devDependency Status](https://david-dm.org/roshanca/kh-demo-mobile/dev-status.svg?style=flat-square)](https://david-dm.org/roshanca/kh-demo-mobile#info=devDependencies)

***

## 项目简介

为了使开发快速高效，使用了以下辅助工具（作为前端，应该不会陌生）：

* 样式预编译器：[LESS](http://www.lesscss.net)
* JS 模块依赖管理：[requirejs](http://requirejs.org)
* 自动化构建工具：[gulpjs](http://gulpjs.com)
* 应用框架：[Framework7](http://www.idangero.us/framework7/)

### 源码结构

```
./src
|-- api                # => 模拟请求数据
|-- css
|-- font               # => icon font
|-- img
|-- js  
|   |-- controllers    # => 逻辑控制器，负责控制页面上所有数据、界面的交互
|   |-- libs           # => 库文件
|   |-- models         # => 单独的数据处理文件
|   |-- services       # => 基本上是一些全局的服务代码，比如登录、开户类型判断等
|   |-- views          # => 关于界面交互的方法，主要是 DOM 操作
|   |-- app.js         # => 核心 JS，实例化并配置主框架，路由的入口也在这
|   |-- router.js      # => 路由
|   └── utils.js       # => 工具
|-- less               # => CSS 编译文件
|-- index.html         # => 首页，也是整个 APP 的入口
└── ...                # => 其它页面
```

### One Page

我们开发 hybrid mobile apps, 与 PC 端的网页一点很大的不同是：页面之间的跳转，是通过 Ajax 来模拟完成的（其实是局部刷新）。

**为什么这么做？**

答案是：减少请求。

手机上的带宽不比 PC，还要考虑到 3G 甚至 2G 的极端网络环境，所以不仅要保证传输的文件小，还要尽量使得数据传输的次数少，避免重复请求。

文件小，可通过各类合并压缩工具来实现。

优化请求数，便要采用 One Page 的模式（即真正的整个页面的加载，只发生一次）。

### Framework7

Framework7 是一套开源框架，用于快速创建基于 `HTML5` 的混合移动应用（hybrid mobile apps, 一般指嵌套在系统 `webView` 容器内的 `HTML5` 的 Web 应用），其优雅的原生 JS 实现与对 iOS 原生系统之精美界面与流畅交互的完美模拟，是我们选择它作为项目框架的主要原因。为了兼容更多设备，我们还在其中加了些许的 hack，使项目尽量能稳定流畅地跑在众多 Android 设备里.

很高兴地看到 Framework7 默认即采用 One Page 的模式，只要页面结构符合框架的 page 规范，那从一个页面跳转到另一个页面得以完美的通过 Ajax 模拟实现，并且还配上了华丽的 CSS3 动画（当然可配置取消动画，在 Android 下为了保证系统流畅性，我们就取消了页面间跳转的动画）。

下面简单介绍一个框架的几个概念，具体的，还要是要看[官方文档说明](http://www.idangero.us/framework7/docs/)。

#### Layout

基本布局包含了：

```html
<body>
  <!-- Views -->
  <div class="views">
    <!-- Your main view, should have "view-main" class -->
    <div class="view view-main">
      <!-- Top Navbar-->
      <div class="navbar">
        ...
      </div>
      <!-- Pages container -->
      <div class="pages navbar-through toolbar-through">
        <!-- Page, "data-page" contains page name -->
        <div data-page="index" class="page">
          <!-- Scrollable page content -->
          <div class="page-content">
            ...
          </div>
        </div>
      </div>
      <!-- Bottom Toolbar-->
      <div class="toolbar">
        ...
      </div>
    </div>
  </div>
</body>
```

可以看到，基本上是个“上、中、下”的结构，上下固定，中间是内容展示区。

#### Views

一系列独立的可视界面的容器。每一个单独的 `View` 可拥有各自不同的 `navbar` 和 `toolbar`，甚至不同的样式。

#### pages

一般情况下，每个在 view 下的 pages，只包含一个带 `data-page="{{pageName}}"` 的 page，`data-page` 是非常重要的，它决定了页面级的 JS 加载。

路由 JS (router.js) 内的路由表，其实是一张 JS 加载指向表。它的其中一段代码，就是根据 `pageName` 来获取页面控制器 JS 的方法。是的，它会去 controllers 的目录下搜寻 `pageName + Controller` 这样的格式的 JS 文件。比如登录页 login.html, 它的 `data-page` 为 'login', 那么它所对应的 controller 是 loginController.js, 可能在 controller 中会依赖 loginView，说不定还会涉及模拟数据 api 目录下的 login.json. 你会发现，保证名称一致，不是什么坏事。

```js
/**
 * Load (or reload) controller from js code (another controller) - call it's init function
 * @param  controllerName
 * @param  query
 */
function load(controllerName, query) {
  if (controllerName in hash) {
    require(['controllers/' + hash[controllerName] + 'Controller'], function (controller) {
      controller.init(query);
    });
  }
}
```

一般来讲，你的工作从这里开始：`<div class="page-content"></div>` 内，是页面的具体内容，在这里写你的页面代码。

#### 页面跳转

Framework7 提供了两种页面跳转方式，当然，都是基于 Ajax 的：

* `<a href="about.html">Go to About page</a>` 由链接自带的 `href` 去做跳转。
* `mainView.loadPage('about.html')` 由 JS 方法（具体某个 `view` 实例上的 `loadPage` 方法）来执行跳转。

当然，这里所指的跳转，不是传统意义的页面跳转，其实都是 Ajax 刷新。

需要特别要注意的是，如果需要来一次真正的页面跳转，官方文档已经给出了方案：
> By default Framework7 will load all links using Ajax, except links with additional external class (`<a href="somepage.html" class="external">`) and links with not correct href attribute (when it is empty or #).

***

## 如何使用

### 准备工作

1. 安装 git: [http://git-scm.com/downloads](http://git-scm.com/downloads)
1. 安装 nodeJS: [http://nodejs.org](http://nodejs.org)
1. 安装包管理工具 NPM，一般来说，它会随 nodeJS 的安装而随自动安装好的
1. 通过 NPM 安装 gulp: `npm install -g gulp`

检查以上工具安装是否成功，请在终端中输入 `git -v`, `node -v`, `npm -v` 和 `gulp -v`，如若成功输出对应的版本好则表示安装成功！

### 下载项目代码

* 通过 [Download Zip](https://github.com/roshanca/kh-demo-mobile/archive/master.zip) 来下载。
* 通过 git 直接检出代码至本地：`git clone git@github.com:roshanca/kh-demo-mobile.git`

### 安装依赖

```
npm install
```

此操作主要是下载安装 `gulp` 与其任务插件，用于自动化构建项目（测试、编译、压缩合并等等），其配置文件 `gulpfile.js` 在项目根目录下。

***

## 开发预览

在终端中定位至项目根目录下，输入：

```
gulp
```

这时系统默认浏览器会自动打开，载入项目页面。

开发过程中是支持浏览器的 LiveReload 的，通过监视项目源文件中的 html, less, js, 图片等文件，它们一有变化浏览器即可自动刷新。想要了解更多这项技术的细节，请访问：[browserSync](http://www.browsersync.io).

***

## Build

当开发到一定阶段的时候，要分发版本了上正式环境了，从开发环境到正式环境，必须经历一轮 build：

```
gulp build
```

build 的主要工作，是合并压缩 css 和 js，并将 index.html 中的资源引用替换成 build 后的资源，并且压缩了其余的 html 和 模板文件还有图片等。

***

## 许可
Copyright (c) 2014 Roshan Wu. GPL v2 Licensed, see [LICENSE](https://github.com/roshanca/kh-demo-mobile/blob/master/LICENSE) for details.
