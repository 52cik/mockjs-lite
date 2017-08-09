import test from 'ava';
import { Random } from '../..';

/* Random image */
test('Random.image', (t) => {
  t.regex(Random.image(), /\/\d+x\d+$/);
  t.regex(Random.image('100'), /\/100$/);
  t.regex(Random.image('100', '360'), /\/100\/360$/);
  t.regex(Random.image('100', '360', 'text'), /\/100\/360&text=text$/);
  t.regex(Random.image('100', '360', 'fff', 'png', 'text'), /\/100\/360\/fff\.png&text=text/);
  t.regex(Random.image('100', '360', 'fff', 'text'), /\/100\/360\/fff&text=text/);
});

test('Random.setImageHost', (t) => {
  Random.setImageHost('pic.fed.tm');
  t.regex(Random.image(), /pic\.fed\.tm\/\d+x\d+$/);
  t.regex(Random.image('100'), /pic\.fed\.tm\/100$/);
  t.regex(Random.image('100', '360'), /pic\.fed\.tm\/100\/360$/);
  t.regex(Random.image('100', '360', 'text'), /pic\.fed\.tm\/100\/360&text=text$/);
  t.regex(Random.image('100', '360', 'fff', 'png', 'text'), /pic\.fed\.tm\/100\/360\/fff\.png&text=text/);
  t.regex(Random.image('100', '360', 'fff', 'text'), /pic\.fed\.tm\/100\/360\/fff&text=text/);
});
