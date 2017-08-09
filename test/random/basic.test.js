import test from 'ava';
import { Random } from '../..';

/* Random basic */
test('Random.integer', (t) => {
  t.true(typeof Random.integer() === 'number');
  t.true(Random.integer(10) >= 10);
  let ret = Random.integer(10, 20);
  t.true(ret >= 10 && ret <= 20);
  ret = Random.integer(-10, -20);
  t.true(ret <= -10 && ret >= -20);
});

test('Random.boolean', (t) => {
  t.true(typeof Random.boolean() === 'boolean');
  t.false(Random.boolean(1));
  t.true(Random.boolean(1, undefined, true));
  t.true(typeof Random.boolean(1, 10) === 'boolean');
});

test('Random.float', (t) => {
  t.true(typeof Random.float() === 'number');
  let ret = Random.float(1, 9, 3);
  t.true(ret > 1 && ret < 10 && String(ret).length >= 5);
  ret = Random.float(9, 9, 3);
  t.true(Math.floor(ret) === 9 && String(ret).length >= 5);
  ret = Random.float(9, 9, 3, 5);
  t.true(Math.floor(ret) === 9 && String(ret).length <= 7);
});

test('Random.character', (t) => {
  t.true(typeof Random.character() === 'string');
  t.true(/^[a-z]$/.test(Random.character('lower')));
  t.true(/^[A-Z]$/.test(Random.character('upper')));
  t.true(/^\d$/.test(Random.character('number')));
  t.true(/^\W$/.test(Random.character('symbol')));
  t.true(/^[a-z]$/i.test(Random.character('alpha')));
  t.true(/^[呵哈嘿]$/i.test(Random.character('呵哈嘿')));
});

test('Random.string', (t) => {
  t.true(/^.{3,7}$/.test(Random.string()));
  t.true(/^[a-z]{3,7}$/.test(Random.string('lower')));
  t.true(/^[A-Z]{3,7}$/.test(Random.string('upper')));
  t.true(/^\d{3,7}$/.test(Random.string('number')));
  t.true(/^\W{3,7}$/.test(Random.string('symbol')));
  t.true(/^[a-z]{3,7}$/i.test(Random.string('alpha')));
  t.true(/^.{5}$/i.test(Random.string(5)));
  t.true(/^[呵哈嘿]{1,3}$/i.test(Random.string('呵哈嘿', 1, 3)));
});

test('Random.range', (t) => {
  t.deepEqual(Random.range(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  t.deepEqual(Random.range(3, 7), [3, 4, 5, 6]);
  t.deepEqual(Random.range(1, 10, 2), [1, 3, 5, 7, 9]);
});
