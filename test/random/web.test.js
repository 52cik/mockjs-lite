import test from 'ava';
import { Random } from '../..';

/* Random web */
test('Random.protocol', (t) => {
  t.regex(Random.protocol(), /^\w+$/);
  t.regex(Random.protocol('http https'), /^https?$/);
  t.regex(Random.protocol('ws,wss'), /^wss?$/);
  t.regex(Random.protocol(['http', 'ws']), /^(http|ws)$/);
});

test('Random.tld', (t) => {
  t.regex(Random.tld(), /^[a-z.]+$/);
  t.regex(Random.tld('com cn'), /^(com|cn)$/);
  t.regex(Random.tld('com,cn'), /^(com|cn)$/);
  t.regex(Random.tld(['com', 'cn']), /^(com|cn)$/);
});

test('Random.domain', (t) => {
  t.regex(Random.domain(), /^\w+\.[a-z.]+$/);
  t.regex(Random.domain('www'), /^www\.\w+.[a-z.]+$/);
  t.regex(Random.domain('admin', 'com'), /^admin\.\w+\.com$/);
});

test('Random.url', (t) => {
  t.regex(Random.url(), /^\w+:\/\/[a-z.]+\/\w+$/);
  t.regex(Random.url('https'), /^https:\/\/[a-z.]+\/\w+$/);
  t.regex(Random.url('https', 'm.taobao.com'), /^https:\/\/m\.taobao\.com\/\w+$/);
});

test('Random.email', (t) => {
  t.regex(Random.email(), /^[a-z]\.\w+@\w+\.[a-z.]+$/);
  t.regex(Random.email('qq.com'), /^[a-z]\.\w+@qq\.com$/);
});

test('Random.ip', (t) => {
  t.regex(Random.ip(), /^\d+(\.\d+){3}$/);
});
