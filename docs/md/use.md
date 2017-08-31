# 使用

### 在项目中添加 Mockjs-Lite

```sh
$ yarn add -D mockjs-lite # 推荐
# 或者
$ npm i -D mockjs-lite
```

### 使用 Mockjs-Lite

```js
// 使用 Mock
const Mock = require('mockjs-lite');
const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
});
// 输出结果
console.log(JSON.stringify(data)); // {"list":[{"id":1},{"id":2},{"id":3},{"id":4}]}
```

**或者 ES6**

```js
import Mock, { Random } from 'mockjs-lite';

const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
});

console.log(JSON.stringify(data));// {"list":[{"id":1},{"id":2},{"id":3},{"id":4}]}
console.log(Random.now()); // 2017-08-30 17:17:17
```

**PS: 别吐槽，例子抄 Mock.js 的 wiki 文档。**

----

### HTML 中使用 Mockjs-Lite

```html
<script src="/dist/mock.js"></script>
<script>
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
});

console.log(JSON.stringify(data));// {"list":[{"id":1},{"id":2},{"id":3},{"id":4}]}
console.log(Mock.Random.now()); // 2017-08-30 17:17:17
</script>
```
