import test from 'ava';
import Mock from '../..';


Mock.use((plugins, processors, Random) => {
  plugins.bar = param => `param: ${param}, now: ${Random.now(param)}`;
  processors.number = tpl => `number: ${tpl}`;
});

/* Plugin */
test('Plugin', (t) => {
  const ret = Mock.mock({ foo: '@bar(10)', num: 777 });
  t.regex(ret.foo, /^param: 10, now: \d{10}$/);
  t.is(ret.num, 'number: 777');
});
