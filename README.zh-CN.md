# mockjs-lite

> 一个极简的仿真数据生成器

[官网首页](https://mockjs-lite.js.org)


## 特别说明

这个项目参(抄)考(袭)自 [Mock.js](https://github.com/nuysoft/Mock)，但为什么要重复造轮子呢？

1. 因为部分功能不好用，比如没有随机手机号，没有时间区间，占位图不能自己切源，等等。
1. 不够自由，不方便插件化自定义功能，不方便局部定义项目友好的数据。
1. 因为太大了，一个mock而已，为什么要这么大。
1. 因为看了源代码，就想重写了。

好吧，就当是练手了。  

**PS: 采用 ES6 重写，大部分功能代码抄袭 Mock.js，好用的留着，不好用的，自己改了。**


## Mockjs-Lite 与 Mockjs 差异说明

1. 移除了 ajax 部分，因为 xhr 劫持方式，确实不是很友好。(最好针对 jquery, axios 等插件化劫持)
1. 移除了 Path, RegExp 功能，感觉不是特别实用。
1. 移除 Random.natural 方法，其实就是单词太难写，完全可以 Random.integer Random.int 代替。
1. 移除 Random.dataImage 方法，很鸡肋，非常的鸡肋。
1. 精简了地址库，由原先的 113k 精简到了 15k，只保留了北上广之类的一线二线城市。
1. Function 功能优化，可以用 `this` 当前兄弟节点以及 `root` 全部对象。
1. Random.datetime 功能优化，增加时间区间，以及时间戳，10位时间戳的支持。
1. Image 部分优化，支持切换占位图源，默认七牛占位图。


## 为什么要用 Mockjs-Lite?

* 轻量和敏捷
* 简单的语法
* 直观的结果
* 方便自定义
* 编不下去了


## 用法

### 在项目中添加 Mockjs-Lite

```sh
$ yarn add mockjs-lite # 推荐
# 或者
$ npm i -S mockjs-lite
```

### 使用 Mockjs-Lite

```js
// 使用 Mock
const { Mock } = require('mockjs-lite');
const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
});
// 输出结果
console.log(JSON.stringify(data, null, 2));
```

或者 es6

```js
import { Mock, Random } from 'mockjs-lite';

const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
});

console.log(JSON.stringify(data, null, 2));
console.log(Random.now());
```

> PS: 别吐槽，例子抄 Mock.js 的 wiki 文档。。


## 相关

* [Mock.js](https://github.com/nuysoft/Mock) - 对，就是抄的他。。

