import test from 'ava';
import Mock from '..';

/* 数据占位符定义 (Data Placeholder Definition，DPD) */

test('Mock.mock({ "name": "@hehe"})', (t) => {
  t.deepEqual(Mock.mock({ name: '@hehe' }), { name: '@hehe' });
});

test('Mock.mock({ "name": "@name", "email": "@email" })', (t) => {
  const ret = Mock.mock({
    name: '@name',
    email: '@email',
  });

  t.regex(JSON.stringify(ret), /^{"name":"[\w ]+","email":"[a-z]\.\w+@\w+\.[a-z.]+"}$/);
});

test('Mock.mock({ "name": "@name", "email": "@email(\'qq.com\')" })', (t) => {
  const ret = Mock.mock({
    name: '@name',
    email: '@email("qq.com")',
  });

  t.regex(JSON.stringify(ret), /^{"name":"[\w ]+","email":"[a-z]\.\w+@qq.com+"}$/);
});

test('name|+1: ["@integer", "@email", "@boolean"]', (t) => {
  const ret = Mock.mock({
    'list|5-10': [
      {
        'name|+1': ['@integer', '@email', '@boolean'],
      },
    ],
  });

  t.regex(
    JSON.stringify(ret),
    /(?=.+"name":"-?\d+")(?=.+"name":"(true|false)")(?=.+"name":"[a-z.@]+")/,
  );
});
