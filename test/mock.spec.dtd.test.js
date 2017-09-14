import test from 'ava';
import Mock from '..';

/* 数据模板定义 (Data Temaplte Definition，DTD) */

/* string */
test('Mock.mock({ "str|3": "" })', (t) => {
  t.regex(JSON.stringify(Mock.mock({ 'str|3': '' })), /{"str":"\w{3}"}/);
});

test('Mock.mock({ "str|3": "x" })', (t) => {
  t.deepEqual(Mock.mock({ 'str|3': 'x' }), { str: 'xxx' });
});

test('Mock.mock({ "str|1-5": "x" })', (t) => {
  const ret = Mock.mock({ 'str|1-5': 'x' });
  t.true(ret.str.length >= 1 && ret.str.length <= 5);
});

/* number */
test('Mock.mock({ "number|1-100": 1 })', (t) => {
  const ret = Mock.mock({ 'number|1-100': 1 });
  t.true(ret.number >= 1 && ret.number <= 100);
});

test('Mock.mock({ "number|10.1-6": 1 })', (t) => {
  const ret = Mock.mock({ 'number|10.1-6': 1 });
  const len = String(ret.number).length;
  t.true(len >= 4 && len <= 16);
});

test('Mock.mock({ "number|+1": 20 })', (t) => {
  const ret = Mock.mock({
    'list|3': [{ 'id|+1': 20 }],
  });
  t.deepEqual(ret, {
    list: [{ id: 20 }, { id: 21 }, { id: 22 }],
  });
});

/* boolean */
test('Mock.mock({ "boolean|1": true })', (t) => {
  const ret = Mock.mock({ 'boolean|1': true });
  t.true(ret.boolean);
});

test('Mock.mock({ "boolean|1-9": true })', (t) => {
  const ret = Mock.mock({ 'boolean|1-9': true });
  t.true(typeof ret.boolean === 'boolean');
});

/* object */
test('Mock.mock({"object|2":{"310000":"上海市","320000":"江苏省","330000":"浙江省","340000":"安徽省"}})', (t) => {
  const ret = Mock.mock({
    'object|2': {
      310000: '上海市',
      320000: '江苏省',
      330000: '浙江省',
      340000: '安徽省',
    },
  });
  const len = Object.keys(ret.object).length;
  t.deepEqual(len, 2);
});

test('Mock.mock({"object|1-3":{"310000":"上海市","320000":"江苏省","330000":"浙江省","340000":"安徽省"}})', (t) => {
  const ret = Mock.mock({
    'object|1-3': {
      310000: '上海市',
      320000: '江苏省',
      330000: '浙江省',
      340000: '安徽省',
    },
  });
  const len = Object.keys(ret.object).length;
  t.true(len >= 1 && len <= 3);
});

/* array */
// 'name|1': array
test('Mock.mock({"array|1":["AMD","CMD","UMD"]})', (t) => {
  const ret = Mock.mock({
    'array|1': ['AMD', 'CMD', 'UMD'],
  });
  t.deepEqual(ret.array[2], 'D');
});

// 'name|+1': array
test('Mock.mock({"array|+1":["AMD","CMD","UMD"]})', (t) => {
  const ret = Mock.mock({
    'array|+1': ['AMD', 'CMD', 'UMD'],
  });
  t.deepEqual(ret.array, 'AMD');
});

// 'name|min-max': array
test('Mock.mock({"array|1-3":[{"id|+1":10}]})', (t) => {
  const ret = Mock.mock({
    'array|1-3': [{ 'id|+1': 10 }],
  });
  const len = ret.array.length;
  t.true(len >= 1 && len <= 3);
});

// 'name|count': array
test('Mock.mock({"array|3":[{"id|+1":10}]})', (t) => {
  const ret = Mock.mock({
    'array|3': [{ 'id|+1': 10 }],
  });
  t.deepEqual(ret, {
    array: [{ id: 10 }, { id: 11 }, { id: 12 }],
  });
});

// 'name': array
test('Mock.mock({"array":[1,2,3]})', (t) => {
  const ret = Mock.mock({
    array: [1, 2, 3],
  });
  t.deepEqual(ret, {
    array: [1, 2, 3],
  });
});

/* function */
// 'name': function
test('Mock.mock({ "name": function })', (t) => {
  const ret = Mock.mock({
    bar: {
      foo: 'inner',
      name(root) {
        return `this: ${this.foo}, root: ${root.foo}`;
      },
    },
    foo: 'outer',
  });
  t.deepEqual(ret, {
    bar: {
      foo: 'inner',
      name: 'this: inner, root: outer',
    },
    foo: 'outer',
  });
});
