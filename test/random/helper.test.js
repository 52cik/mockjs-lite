import test from 'ava';
import { Random } from '../..';

/* Random helper */
test('Random.capitalize', (t) => {
  t.deepEqual(Random.capitalize('hello'), 'Hello');
});

test('Random.upper', (t) => {
  t.deepEqual(Random.upper('hello'), 'HELLO');
});

test('Random.lower', (t) => {
  t.deepEqual(Random.lower('HELLO'), 'hello');
});

test('Random.shuffle', (t) => {
  t.regex(Random.shuffle(['a', 'e', 'i', 'o', 'u']).join(''), /^[aeiou]+$/);
});
