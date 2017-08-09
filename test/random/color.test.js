import test from 'ava';
import { Random } from '../..';

/* Random color */
test('Random.color', (t) => {
  t.regex(Random.color(), /^#[\da-f]{6}$/i);
  t.true(Random.color('blue') === '#0074D9');
});

test('Random.hex', (t) => {
  t.regex(Random.hex(), /^[\da-f]{6}$/i);
  t.regex(Random.hex(true), /^#[\da-f]{6}$/i);
});

test('Random.rgb', (t) => {
  t.regex(Random.rgb(), /^rgb\(\d+, \d+, \d+\)$/);
});

test('Random.rgba', (t) => {
  t.regex(Random.rgba(), /^rgba\(\d+, \d+, \d+, [\d.]+\)$/);
});

test('Random.hsl', (t) => {
  t.regex(Random.hsl(), /^hsl\(\d+, \d+, \d+\)$/);
});
