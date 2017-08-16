import test from 'ava';
import { Random } from '../..';

/* eslint no-bitwise: 0 */

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
  // datetime()
  t.regex(Random.datetime(), /^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/);
  // datetime(fmt)
  t.regex(Random.datetime('yyMMddhhmmss'), /^\d{12}$/);

  // datetime(timeStamp)
  t.regex(String(Random.datetime(true)), /^\d{13}$/);
  t.regex(String(Random.datetime(10)), /^\d{10}$/);

  // datetime(min, max)
  t.regex(Random.datetime('2017-08-15 05:00:00', '2017-08-15 09:30:00'), /^\d{4}-\d\d-\d\d 0[5-9]:\d\d:\d\d$/);

  // datetime(fmt, min, max)
  t.regex(Random.datetime('yyyy-MM-dd', '2017-08-15 08:00:00', '2017-08-18 08:00:00'), /^\d{4}-\d\d-1[5-8]$/);

  // datetime(min, max, timeStamp)
  const ret13 = Random.datetime('2017-08-15 05:00:00', '2017-08-15 09:30:00', true);
  const ret10 = Random.datetime('2017-08-15 05:00:00', '2017-08-15 09:30:00', 10);
  t.true(ret13 >= 1502744400000, ret13 <= 1502760600000);
  t.true(ret10 >= 1502744400, ret10 <= 1502760600);

  // const ret = Random.datetime();
  // const ret = Random.datetime('yyyy年MM月dd日');
  // const ret = Random.datetime(true);
  // const ret = Random.datetime(10);
  // const ret = Random.datetime('2017-08-15 08:00:00', '2017-08-15 12:30:00');
  // const ret = Random.datetime('yyyy年MM月dd日', '2017-08-15 08:00:00', '2017-08-15 12:30:00');
  // const ret = Random.datetime('2017-08-15 08:00:00', '2017-08-15 12:30:00', true);
  // const ret = Random.datetime('2017-08-15 08:00:00', '2017-08-15 12:30:00', 10);
});

test('Random.now', (t) => {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 修正时区偏移
  const date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
  t.true(Random.now() === date);
  t.true(Random.now('yyyyMMddhhmmss') === date.replace(/[-: ]/g, ''));

  t.true(Random.now(true) === Date.now());
  t.true(Random.now(10) === (Date.now() / 1000 | 0));
});
