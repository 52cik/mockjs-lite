import test from 'ava';
import { Random } from '../..';

/* Random date */
test('Random.date', (t) => {
  t.regex(Random.date(), /^\d{4}-\d\d-\d\d$/);
  t.regex(Random.date('yyMMdd'), /^\d{6}$/);
});

test('Random.time', (t) => {
  t.regex(Random.time(), /^\d\d:\d\d:\d\d$/);
  t.regex(Random.time('hhmmss'), /^\d{6}$/);
});

test('Random.datetime', (t) => {
  t.regex(Random.datetime(), /^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/);
  t.regex(Random.datetime('yyMMddhhmmss'), /^\d{12}$/);
});

test('Random.now', (t) => {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 修正时区偏移
  const date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
  t.true(Random.now() === date);
  t.true(Random.now('yyyyMMddhhmmss') === date.replace(/[-: ]/g, ''));
});
