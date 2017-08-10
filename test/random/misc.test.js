import test from 'ava';
import { Random } from '../..';

/* Random misc */
test('Random.uuid', (t) => {
  t.regex(Random.uuid(), /^[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/);
  t.regex(Random.guid(), /^[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/);
});

test('Random.id', (t) => {
  t.regex(Random.id(), /^[\dX]{18}$/);
});

test('Random.increment', (t) => {
  t.true(Random.increment() === 1);
  t.true(Random.increment() === 2);
  t.true(Random.increment() === 3);
});
