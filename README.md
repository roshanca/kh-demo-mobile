# 网上开户移动版 Demo

[![Build Status](http://img.shields.io/travis/roshanca/kh-demo-mobile.svg?style=flat-square)](https://travis-ci.org/roshanca/kh-demo-mobile)
[![devDependency Status](https://david-dm.org/roshanca/kh-demo-mobile/dev-status.svg?style=flat-square)](https://david-dm.org/roshanca/kh-demo-mobile#info=devDependencies)

## 应用框架

[Framework7](http://www.idangero.us/framework7/)

Framework7 是一套开源框架，用于快速创建基于 `HTML5` 的混合移动应用（hybrid mobile apps, 一般指嵌套在系统 `webView` 容器内的 `HTML5` 的 Web 应用），其优雅的原生 JS 实现与对 iOS 原生系统之精美界面与流畅交互的完美模拟，是我选择它作为项目框架的主要原因。我还加了些许的 hack，使项目 APP 尽量能兼容地流畅地跑在 Android 里.

## 项目简介

为了使开发快速高效，使用了以下辅助工具（作为前端，应该不会陌生）：

* 样式预编译器：[LESS](http://www.lesscss.net)
* 模板引擎：[mustache](http://mustache.github.io)
* JS 模块依赖管理：[requirejs](http://requirejs.org)
* 自动化构建工具：[gulpjs](http://gulpjs.com)

### 源码结构

```
./src
|-- api         # => 模拟请求数据
|-- css
|-- font        # => icon font
|-- img
|-- js          
|-- less        # => CSS 编译文件
|-- mustache    # => 模板文件，负责填充数据
|-- index.html  # => 首页，也是整个 APP 的入口
└── ...         # => 其它页面
```

### One Page

我们开发 hybrid mobile apps, 与 PC 端的网页一点很大的不同是：页面之间的跳转，是通过 Ajax 来完成的。

__为什么这么做？__ 

答案是：减少请求。

手机上的带宽不比 PC，还要考虑到 3G 甚至 2G 的极端网络环境，所以不仅要保证传输的文件小，还要尽量使得数据传输的次数少，避免重复请求。
文件小，我们通过各类合并压缩工具来实现。优化请求数，我们采用 One Page 的模式。

### Framework7

很高兴地看到 Framework7 完美支持 One Page，只要页面结构符合框架的 page 规范，那从一个页面跳转到另一个页面得以完美的通过 Ajax 实现，并配上了华丽的 CSS3 动画。

简单介绍一个框架的几个概念，具体的，还要是要看[官方文档说明](http://www.idangero.us/framework7/docs/)。

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

一般情况下，每个在 `view` 下的 `pages`，只包含一个带 `data-page="{{pageName}}"` 的 `page`，`data-page` 是非常重要的，它决定了页面 `Controller` 的加载，这个在后面会提到。其子节点 `<div class="page-content"></div>` 内，就是页面的具体内容了。

#### 页面跳转

Framework7 提供了两种页面跳转方式，当然，都是基于 Ajax 的。

* `<a href="about.html">Go to About page</a>` 由链接自带的 `href` 去做跳转。
* `mainView.loadPage('about.html')` 由 JS 方法（具体某个 `view` 实例上的 `loadPage` 方法）来执行跳转。

特别要注意的是：
> By default Framework7 will load all links using Ajax, except links with additional external class (`<a href="somepage.html" class="external">`) and links with not correct href attribute (when it is empty or #).

## 开发

### 下载项目代码

* 通过 [Download Zip](https://github.com/roshanca/kh-demo-mobile/archive/master.zip) 来下载。
* `git clone git@github.com:roshanca/kh-demo-mobile.git`

### 安装依赖

```
bower install
```

此操作将下载 `Framework7`, `requirejs`, `requirejs-text` 和 `mustache` 四个最新的开发包，下载完毕后手动将最新的 JS 文件 copy 至项目 `src/js/libs` 的目录下，`Framework7` 还要将 `less` 文件夹改名为 `framework7` copy 至项目 `src/less` 目录下。

```
npm install
```

此操作主要是下载 `gulp` 与其插件，用于自动化构建项目，其配置文件 `gulpfile.js` 在项目根目录下。

### 开发预览

```
gulp
```

### Build

```
gulp build
```

## 许可
Copyright (c) 2014 Roshan Wu. GPL v2 Licensed, see [LICENSE](https://github.com/roshanca/kh-demo-mobile/blob/master/LICENSE) for details.
