import test from 'ava';
import { Mock } from '../..';

Mock.use((plugins, Random) => {
  plugins.bar = param => `param: ${param}, now: ${Random.now(param)}`;
});

/* Plugin */
test('Plugin', (t) => {
  const ret = Mock.mock({ foo: '@bar(10)' });
  t.regex(ret.foo, /^param: 10, now: \d{10}$/);
});
